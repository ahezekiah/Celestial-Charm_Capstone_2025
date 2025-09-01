export async function api(path, { method = "GET", body, headers = {}, ...rest } = {}) {
    const opts = {
        method,
        credentials: "include",
        headers: { ...headers },
        ...rest,
    };
    if (body !== undefined) {
        opts.headers["Content-Type"] = "application/json";
        opts.body = JSON.stringify(body);
    }
    const res = await fetch(path, opts);

    // Some gateways return HTML on errors – guard parsing
    const ctype = res.headers.get("content-type") || "";
    const isJSON = ctype.includes("application/json");

    if (!res.ok) {
        const err = isJSON ? await res.json().catch(() => ({})) : { message: await res.text() };
        throw new Error(err.message || `HTTP ${res.status}`);
    }

    return isJSON ? res.json() : res.text();
    }



// Special helper for /auth/me: 401 means "not logged in"
// export async function getMe() {
//     const res = await fetch('/api/auth/me', { credentials: 'include' });
//     if (res.status === 401) return null;        // <- handle unauthenticated
//     const data = await res.json().catch(() => ({}));
//     if (!res.ok) throw new Error(data?.message || 'Failed to load session');
//     return data.user;                           // { id, email, username, ... }
// }
