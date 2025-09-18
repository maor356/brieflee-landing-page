#!/usr/bin/env node
const { spawn } = require('node:child_process');
const path = require('node:path');

const polyfillPath = path.resolve(__dirname, 'crypto-hash-polyfill.cjs');
const env = { ...process.env };
const existingNodeOptions = env.NODE_OPTIONS ? `${env.NODE_OPTIONS} --require ${polyfillPath}` : `--require ${polyfillPath}`;
env.NODE_OPTIONS = existingNodeOptions;

const vitePackageDir = path.dirname(require.resolve('vite/package.json'));
const viteBin = path.join(vitePackageDir, 'bin/vite.js');

const child = spawn(process.execPath, [viteBin], {
  stdio: 'inherit',
  env,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
