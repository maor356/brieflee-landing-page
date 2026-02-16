/**
 * Runtime configuration — injected values that should not be committed as secrets.
 * On the EC2 server, replace the placeholder below with the real webhook URL.
 * This file is served as a static asset and loaded before other scripts.
 */
window.__BRIEFLEE_SLACK_WEBHOOK = 'REPLACE_WITH_SLACK_WEBHOOK';
