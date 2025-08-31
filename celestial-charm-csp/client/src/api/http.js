// api.js
export async function api(path, options = {}) {
    const res = await fetch(`/api${path}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });

    let data = null;
    try { data = await res.json(); } catch { /* no body */ }

    if (!res.ok) {
        const err = new Error(data?.message || `${res.status} ${res.statusText}`);
        err.status = res.status;
        err.data = data;
        throw err;
    }
  return data; // parsed JSON on success
}

// Special helper for /auth/me: 401 means "not logged in"
export async function getMe() {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.status === 401) return null;        // <- handle unauthenticated
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || 'Failed to load session');
    return data.user;                           // { id, email, username, ... }
}
