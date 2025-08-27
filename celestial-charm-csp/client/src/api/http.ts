export async function api(path: string, init?: RequestInit) {
    const url = `/api${path.startsWith('/') ? path : `/${path}`}`;
    return fetch(url, { credentials: 'include', ...init });
}

