// // api/http.js
// export async function api(path, init = {}) {
//     const url = `/api${path.startsWith('/') ? path : `/${path}`}`;
//     const res = await fetch(url, { credentials: 'include', ...init });
//     const text = await res.text();
//     if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
//     try { return JSON.parse(text); } catch { return text; }
//     }


export async function api(path, init={}) {
    const url = `/api${path.startsWith('/') ? path : `/${path}`}`;
    const res = await fetch(url, { credentials: 'include', ...init });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    try { return await res.json(); } catch { return null; }
}




