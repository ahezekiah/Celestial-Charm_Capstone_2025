// const API_BASE = "/api";

// export async function api(path, opts = {}) {
//     const res = await fetch(`${API_BASE}${path}`, {
//         credentials: "include",
//         headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
//         ...opts
//     });

//     let body = null;
//     try { body = await res.json(); } catch {}

//     if (!res.ok) {
//         const msg = body?.message || `HTTP ${res.status}`;
//         throw new Error(msg);
//     }
//     return body;
// }
// api/http.js
const BASE = "/api";

export async function api(path, options = {}) {
    const opts = {
        credentials: "include",            // ⬅ important for cookie sessions
        headers: { Accept: "application/json", ...(options.headers || {}) },
        ...options,
    };
    return fetch(BASE + path, opts);
}


