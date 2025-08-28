export async function api(path, init={}) {
    const url = `/api${path.startsWith('/') ? path : `/${path}`}`;
    const res = await fetch(url, { credentials: 'include', ...init });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    try { return await res.json(); } catch { return null; }
}




