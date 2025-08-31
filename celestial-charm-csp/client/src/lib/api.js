// api.js
// src/lib/api.js
export async function api(path, { method = 'GET', body, headers = {} } = {}) {
    const res = await fetch(`/api${path}`, {
        method,
        credentials: 'include',                   // << important
        headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });

    // Always try to parse JSON
    let data = null;
    try { data = await res.json(); } catch {}

    // Normalize errors
    if (!res.ok) {
        const message = data?.message || `HTTP ${res.status}`;
        const error = new Error(message);
        error.status = res.status;
        error.data = data;
        throw error;
    }

    return data;
}


// Special helper for /auth/me: 401 means "not logged in"
export async function getMe() {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.status === 401) return null;        // <- handle unauthenticated
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || 'Failed to load session');
    return data.user;                           // { id, email, username, ... }
}
