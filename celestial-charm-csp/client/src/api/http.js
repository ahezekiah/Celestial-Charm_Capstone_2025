// export async function api(path, opts = {}) {
//     const res = await fetch(`/api${path}`, {
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
//         ...opts
//     });
//     // optional: throw on !ok
//     return res.ok ? res.json() : Promise.reject(await res.json().catch(() => ({ message: res.statusText })));
// }


const API_BASE = "/api";

export async function api(path, opts = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
        ...opts
    });

    let body = null;
    try { body = await res.json(); } catch {}

    if (!res.ok) {
        const msg = body?.message || `HTTP ${res.status}`;
        throw new Error(msg);
    }
    return body;
}


