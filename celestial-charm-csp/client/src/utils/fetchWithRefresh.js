export default async function fetchWithRefresh(url, options = {}) {
    const res = await fetch(url, options);

    if (res.status === 401 && localStorage.getItem('refreshToken')) {
        const refreshRes = await fetch('/api/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
        });

        if (refreshRes.ok) {
            const { token } = await refreshRes.json();
            localStorage.setItem('token', token);

            return fetch(url, {
                ...options,
                headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
                },
            });
        }
    }

    return res;
}
