// const api = (path, opts = {}) =>
// fetch(`/api${path}`, {
//     credentials: "include",
//     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
//     ...opts,
// }).then(async (r) => {
//     const data = await r.json().catch(() => ({}));
//     if (!r.ok) throw new Error(data.message || "Request failed");
//     return data;
// });

export async function api (path, opts = {}) {
    fetch(`/api${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
        ...opts,
    }).then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.message || "Request failed");
        return data;
    });
};
