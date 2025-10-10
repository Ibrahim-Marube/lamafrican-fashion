#!/usr/bin/env bash
set -euo pipefail
ROOT="$HOME/lamafrican-fashion/admin"
cd "$ROOT"
mkdir -p lib
if [ ! -f lib/api.ts ]; then
cat > lib/api.ts << 'EOTS'
import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002/api';
export const api = axios.create({ baseURL });
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  remove: (id: string) => api.delete(`/products/${id}`),
};
export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
};
EOTS
fi
if [ -f app/dashboard/products/page.tsx ]; then
  cp app/dashboard/products/page.tsx app/dashboard/products/page.tsx.bak
  node - << 'EOTS'
const fs = require('fs');
const p = 'app/dashboard/products/page.tsx';
if (!fs.existsSync(p)) process.exit(0);
let s = fs.readFileSync(p, 'utf8');
if (!s.includes("Failed to fetch products:")) {
  s = s.replace(/catch\s*\(\s*error[^\)]*\)\s*{[\s\S]*?}/m, (m) => {
    return `
    } catch (error: any) {
      console.error('Failed to fetch products:',
        error?.response?.status,
        error?.response?.data || error?.message
      );
      alert(\`Products API error: \${error?.response?.status || ''} \${typeof error?.response?.data === 'string' ? error?.response?.data : JSON.stringify(error?.response?.data || {})}\`);
    }`;
  });
  fs.writeFileSync(p, s);
  console.log("ok");
} else {
  console.log("ok");
}
EOTS
fi
if [ ! -f .env.local ]; then
  echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3002/api" > .env.local
else
  if ! grep -q "NEXT_PUBLIC_API_BASE_URL" .env.local; then
    echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3002/api" >> .env.local
  fi
fi
DEV_PID=$(lsof -ti tcp:3001 || true)
if [ -n "$DEV_PID" ]; then
  kill "$DEV_PID" || true
  sleep 1
fi
npm run dev &>/dev/null & disown || true
echo "done"
