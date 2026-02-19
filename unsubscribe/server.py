#!/usr/bin/env python3
"""Lightweight unsubscribe handler. Runs as a systemd service on EC2.

Handles:
    GET  /unsubscribe?token=<token>  — marks lawyer as unsubscribed, shows confirmation
    POST /unsubscribe?token=<token>  — same (supports List-Unsubscribe-Post one-click)
    GET  /unsubscribe/status         — JSON health check + stats
"""

import json
import sqlite3
import sys
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse, parse_qs

DB_PATH = Path(__file__).resolve().parent / "unsubscribes.db"
PORT = 8900

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


def get_stats() -> dict:
    conn = sqlite3.connect(str(DB_PATH))
    count = conn.execute("SELECT COUNT(*) FROM unsubscribes").fetchone()[0]
    conn.close()
    return {"total_unsubscribes": count, "status": "ok"}


class Handler(BaseHTTPRequestHandler):
    def _handle(self):
        parsed = urlparse(self.path)

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
