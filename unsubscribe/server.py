#!/usr/bin/env python3
"""Lightweight unsubscribe + email tracking handler. Runs as a systemd service on EC2.

Handles:
    GET  /unsubscribe?token=<token>  — marks lawyer as unsubscribed, shows confirmation
    POST /unsubscribe?token=<token>  — same (supports List-Unsubscribe-Post one-click)
    GET  /unsubscribe/status         — JSON health check + stats
    GET  /track/open?token=<t>&v=<n> — records email open, fires Mixpanel event, returns 1x1 GIF
    GET  /track/click?url=<u>&token=<t>&v=<n> — records link click, fires Mixpanel event, 302 redirects
"""

import base64
import json
import sqlite3
import sys
import threading
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse, parse_qs, urlencode
from urllib.request import Request, urlopen

DB_PATH = Path(__file__).resolve().parent / "unsubscribes.db"
PORT = 8900

# Mixpanel project token — replaced at deploy time via sed, or set env var MIXPANEL_TOKEN
MIXPANEL_TOKEN = "REPLACE_WITH_MIXPANEL_TOKEN"

# 1x1 transparent GIF (43 bytes)
TRACKING_GIF = base64.b64decode(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
)

CONFIRM_HTML = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Desabonnement - Brieflee</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
        .card { background: white; border-radius: 12px; padding: 48px; max-width: 480px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
        .check { font-size: 48px; margin-bottom: 16px; color: #22c55e; }
        h1 { font-size: 22px; color: #1a1a1a; margin-bottom: 12px; }
        p { font-size: 15px; color: #666; line-height: 1.6; }
        a { color: #2563eb; }
        .brand { margin-top: 32px; font-size: 13px; color: #999; }
    </style>
</head>
<body>
    <div class="card">
        <div class="check">&#10003;</div>
        <h1>Vous avez ete desabonne(e)</h1>
        <p>Vous ne recevrez plus d'emails de notre part.<br>
        Si c'est une erreur, contactez-nous a <a href="mailto:yizhaq@brieflee.be">yizhaq@brieflee.be</a>.</p>
        <p class="brand">Brieflee</p>
    </div>
</body>
</html>"""

ERROR_HTML = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erreur - Brieflee</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
        .card { background: white; border-radius: 12px; padding: 48px; max-width: 480px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
        h1 { font-size: 22px; color: #1a1a1a; margin-bottom: 12px; }
        p { font-size: 15px; color: #666; line-height: 1.6; }
        a { color: #2563eb; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Lien invalide</h1>
        <p>Ce lien de desabonnement n'est pas valide ou a deja ete utilise.<br>
        Contactez <a href="mailto:yizhaq@brieflee.be">yizhaq@brieflee.be</a> si vous souhaitez vous desabonner.</p>
    </div>
</body>
</html>"""


def init_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.execute("""
        CREATE TABLE IF NOT EXISTS unsubscribes (
            token       TEXT PRIMARY KEY,
            unsub_at    TEXT NOT NULL,
            ip          TEXT
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS email_opens (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            token       TEXT NOT NULL,
            variation   INTEGER,
            opened_at   TEXT NOT NULL,
            ip          TEXT,
            user_agent  TEXT
        )
    """)
    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_opens_token ON email_opens(token)"
    )
    conn.execute("""
        CREATE TABLE IF NOT EXISTS email_clicks (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            token       TEXT NOT NULL,
            variation   INTEGER,
            url         TEXT NOT NULL,
            clicked_at  TEXT NOT NULL,
            ip          TEXT,
            user_agent  TEXT
        )
    """)
    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_clicks_token ON email_clicks(token)"
    )
    conn.commit()
    conn.close()


def unsubscribe(token: str, ip: str = "") -> bool:
    conn = sqlite3.connect(str(DB_PATH))
    try:
        # Check if already unsubscribed
        row = conn.execute("SELECT token FROM unsubscribes WHERE token = ?", (token,)).fetchone()
        if row:
            return True  # Already done
        conn.execute(
            "INSERT INTO unsubscribes (token, unsub_at, ip) VALUES (?, ?, ?)",
            (token, datetime.utcnow().isoformat(), ip),
        )
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()


def record_open(token: str, variation: int | None, ip: str, user_agent: str) -> None:
    conn = sqlite3.connect(str(DB_PATH))
    try:
        conn.execute(
            "INSERT INTO email_opens (token, variation, opened_at, ip, user_agent) VALUES (?, ?, ?, ?, ?)",
            (token, variation, datetime.utcnow().isoformat(), ip, user_agent),
        )
        conn.commit()
    except Exception:
        pass
    finally:
        conn.close()


def record_click(token: str, variation: int | None, url: str, ip: str, user_agent: str) -> None:
    conn = sqlite3.connect(str(DB_PATH))
    try:
        conn.execute(
            "INSERT INTO email_clicks (token, variation, url, clicked_at, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?)",
            (token, variation, url, datetime.utcnow().isoformat(), ip, user_agent),
        )
        conn.commit()
    except Exception:
        pass
    finally:
        conn.close()


def fire_mixpanel(event_name: str, token: str, variation: int | None, ip: str, email: str | None = None, name: str | None = None, extra_props: dict | None = None) -> None:
    """Send event + user profile to Mixpanel via HTTP API (non-blocking)."""
    import os
    mp_token = os.environ.get("MIXPANEL_TOKEN") or MIXPANEL_TOKEN
    if not mp_token or mp_token == "REPLACE_WITH_MIXPANEL_TOKEN":
        return

    distinct_id = email or token

    event_data = {
        "event": event_name,
        "properties": {
            "token": mp_token,
            "distinct_id": distinct_id,
            "ip": ip,
            "$ip": ip,
        },
    }
    if variation is not None:
        event_data["properties"]["variation"] = variation
    if email:
        event_data["properties"]["$email"] = email
    if name:
        event_data["properties"]["$name"] = name
    if extra_props:
        event_data["properties"].update(extra_props)

    people_data = {
        "$token": mp_token,
        "$distinct_id": distinct_id,
        "$ip": ip,
        "$set": {},
    }
    if email:
        people_data["$set"]["$email"] = email
    if name:
        people_data["$set"]["$name"] = name
    if variation is not None:
        people_data["$set"]["last_variation"] = variation

    def _send():
        try:
            track_payload = base64.b64encode(json.dumps([event_data]).encode()).decode()
            req = Request(
                f"https://api-eu.mixpanel.com/track?verbose=1&data={track_payload}",
                method="GET",
            )
            urlopen(req, timeout=5)

            people_payload = base64.b64encode(json.dumps([people_data]).encode()).decode()
            req2 = Request(
                f"https://api-eu.mixpanel.com/engage?verbose=1&data={people_payload}",
                method="GET",
            )
            urlopen(req2, timeout=5)
        except Exception:
            pass

    threading.Thread(target=_send, daemon=True).start()


def get_stats() -> dict:
    conn = sqlite3.connect(str(DB_PATH))
    unsub_count = conn.execute("SELECT COUNT(*) FROM unsubscribes").fetchone()[0]
    open_count = conn.execute("SELECT COUNT(*) FROM email_opens").fetchone()[0]
    unique_opens = conn.execute("SELECT COUNT(DISTINCT token) FROM email_opens").fetchone()[0]
    click_count = conn.execute("SELECT COUNT(*) FROM email_clicks").fetchone()[0]
    unique_clicks = conn.execute("SELECT COUNT(DISTINCT token) FROM email_clicks").fetchone()[0]
    conn.close()
    return {
        "total_unsubscribes": unsub_count,
        "total_opens": open_count,
        "unique_opens": unique_opens,
        "total_clicks": click_count,
        "unique_clicks": unique_clicks,
        "status": "ok",
    }


class Handler(BaseHTTPRequestHandler):
    def _handle(self):
        parsed = urlparse(self.path)

        # ── Tracking pixel ──
        if parsed.path == "/track/open":
            params = parse_qs(parsed.query)
            token = params.get("token", [None])[0]
            variation_str = params.get("v", [None])[0]
            variation = int(variation_str) if variation_str and variation_str.isdigit() else None
            email = params.get("email", [None])[0]
            name = params.get("name", [None])[0]
            ip = self.headers.get("X-Real-IP") or (self.client_address[0] if self.client_address else "")
            user_agent = self.headers.get("User-Agent", "")

            if token and len(token) >= 10:
                record_open(token, variation, ip, user_agent)
                fire_mixpanel("Email Opened", token, variation, ip, email=email, name=name)

            # Always return the GIF regardless of token validity
            self.send_response(200)
            self.send_header("Content-Type", "image/gif")
            self.send_header("Content-Length", str(len(TRACKING_GIF)))
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
            self.end_headers()
            self.wfile.write(TRACKING_GIF)
            return

        # ── Click tracking redirect ──
        if parsed.path == "/track/click":
            params = parse_qs(parsed.query)
            url = params.get("url", [None])[0]
            token = params.get("token", [None])[0]
            variation_str = params.get("v", [None])[0]
            variation = int(variation_str) if variation_str and variation_str.isdigit() else None
            email = params.get("email", [None])[0]
            name = params.get("name", [None])[0]
            ip = self.headers.get("X-Real-IP") or (self.client_address[0] if self.client_address else "")
            user_agent = self.headers.get("User-Agent", "")

            if token and len(token) >= 10 and url:
                record_click(token, variation, url, ip, user_agent)
                fire_mixpanel("Link Clicked", token, variation, ip, email=email, name=name, extra_props={"url": url})

            # 302 redirect to the actual URL
            redirect_url = url or "https://brieflee.be"
            self.send_response(302)
            self.send_header("Location", redirect_url)
            self.end_headers()
            return

        # ── Status / health check ──
        if parsed.path == "/unsubscribe/status":
            data = json.dumps(get_stats())
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(data.encode())
            return

        if parsed.path != "/unsubscribe":
            self.send_response(404)
            self.end_headers()
            return

        params = parse_qs(parsed.query)
        token = params.get("token", [None])[0]

        if not token or len(token) < 10:
            self._respond(400, ERROR_HTML)
            return

        ip = self.client_address[0] if self.client_address else ""
        success = unsubscribe(token, ip)
        if success:
            self._respond(200, CONFIRM_HTML)
        else:
            self._respond(500, ERROR_HTML)

    def _respond(self, code, html):
        self.send_response(code)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode("utf-8"))

    def do_GET(self):
        self._handle()

    def do_POST(self):
        self._handle()

    def log_message(self, fmt, *args):
        print(f"{datetime.utcnow().isoformat()} {args[0]}", flush=True)


def main():
    init_db()
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    server = HTTPServer(("127.0.0.1", port), Handler)
    print(f"Unsubscribe server running on 127.0.0.1:{port}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
