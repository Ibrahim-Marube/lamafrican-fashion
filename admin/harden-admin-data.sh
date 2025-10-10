#!/usr/bin/env bash
set -euo pipefail
ROOT="$HOME/lamafrican-fashion/admin"
cd "$ROOT"
arr_guard() {
  f="$1"; [ -f "$f" ] || return 0; cp "$f" "$f.bak" || true
  node -e "
const fs=require('fs');const p='$f';let s=fs.readFileSync(p,'utf8');
s=s.replace(/setProducts\\(\\s*response\\.data\\s*\\)/,'setProducts(Array.isArray(response.data)?response.data:(Array.isArray(response.data?.data)?response.data.data:[]))');
s=s.replace(/setCategories\\(\\s*response\\.data\\s*\\)/,'setCategories(Array.isArray(response.data)?response.data:(Array.isArray(response.data?.data)?response.data.data:[]))');
s=s.replace(/setOrders\\(\\s*response\\.data\\s*\\)/,'setOrders(Array.isArray(response.data)?response.data:(Array.isArray(response.data?.data)?response.data.data:[]))');
s=s.replace(/setCustomers\\(\\s*response\\.data\\s*\\)/,'setCustomers(Array.isArray(response.data)?response.data:(Array.isArray(response.data?.data)?response.data.data:[]))');
s=s.replace(/setInquiries\\(\\s*response\\.data\\s*\\)/,'setInquiries(Array.isArray(response.data)?response.data:(Array.isArray(response.data?.data)?response.data.data:[]))');
s=s.replace(/setFiles\\(\\s*response\\.data\\s*\\)/,'setFiles(Array.isArray(response.data)?response.data:(Array.isArray(response.data?.data)?response.data.data:[]))');
s=s.replace(/const\\s+(orders|inquiries|products|categories|customers|files)\\s*,?\\s*set\\w+\\s*=\\s*useState\\((?!\\[)([^)]*)\\)/g,(m,k)=>m.replace(/\(.*\)/,'([])'));
s=s.replace(/(\\w+)\\.filter\\(/g,(m,k)=>\`(Array.isArray(\${k})?\${k}:[]).filter(\`);
if(!/Request failed:/.test(s)){s=s.replace(/catch\\s*\\(\\s*error[^\\)]*\\)\\s*{[\\s\\S]*?}/m,\`
} catch (error: any) {
  console.error('Request failed:', error?.response?.status, error?.response?.data || error?.message);
}\`);}
fs.writeFileSync(p,s);
";
}
arr_guard app/dashboard/products/page.tsx
arr_guard app/dashboard/categories/page.tsx
arr_guard app/dashboard/orders/page.tsx
arr_guard app/dashboard/custom-orders/page.tsx
arr_guard app/dashboard/customers/page.tsx
arr_guard app/dashboard/inquiries/page.tsx
arr_guard app/dashboard/media/page.tsx
DEV_PID=$(lsof -ti tcp:3001 || true); if [ -n "$DEV_PID" ]; then kill "$DEV_PID" || true; sleep 1; fi
npm run dev >/dev/null 2>&1 & disown || true
echo ok
