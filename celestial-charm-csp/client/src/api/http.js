// minimal fetch helper that always sends cookies
export async function api(path, init = {}) {
    const url = `/api${path.startsWith('/') ? path : `/${path}`}`;
    const res = await fetch(url, { credentials: 'include', ...init });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
    try { 
        return JSON.parse(text); 
    } catch { 
        return text; 
    }
}





