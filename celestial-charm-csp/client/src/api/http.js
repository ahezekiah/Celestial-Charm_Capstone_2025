// export async function api(path, init={}) {
//     const url = `/api${path.startsWith('/') ? path : `/${path}`}`;
//     const res = await fetch(url, { credentials: 'include', ...init });
//     if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
//     try { return await res.json(); } catch { return null; }
// }

export async function api(path, opts = {}) {
    const res = await fetch(`/api${path}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
        ...opts
    });
    // optional: throw on !ok
    return res.ok ? res.json() : Promise.reject(await res.json().catch(() => ({ message: res.statusText })));
}



