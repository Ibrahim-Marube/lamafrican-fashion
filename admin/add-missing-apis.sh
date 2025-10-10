#!/usr/bin/env bash
set -euo pipefail
cd "$HOME/lamafrican-fashion/admin"
if [ -f lib/api.ts ]; then cp lib/api.ts lib/api.ts.bak; fi
node - << 'EOTS'
const fs = require('fs');
const p = 'lib/api.ts';
let s = fs.readFileSync(p, 'utf8');
const missing = ['customersAPI', 'inquiriesAPI', 'mediaAPI'];
missing.forEach(name => {
  if (!s.includes(`export const ${name}`)) {
    const path = name.replace('API', '').replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    s += `\nexport const ${name} = { getAll: () => api.get('/${path}') };`;
  }
});
fs.writeFileSync(p, s);
console.log('ok');
EOTS
DEV_PID=$(lsof -ti tcp:3001 || true); if [ -n "$DEV_PID" ]; then kill "$DEV_PID" || true; sleep 1; fi
npm run dev >/dev/null 2>&1 & disown || true
echo done
