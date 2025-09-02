import { useEffect, useState } from 'react';
import Navbar3 from '../../../../components/NavBars/Navbar3';
import Footer from '../../../../components/Footer/Footer';
import { useAuth } from '../../../../context/AuthContext';
import CartDrawer from '../../../../components/Cart/CartDrawer';

export default function GemShop() {
    const { user, updateUser } = useAuth();
    const [items, setItems] = useState(/** @type {Array<any>} */([]));
    const [loading, setLoading] = useState(true);
    const [bundles, setBundles] = useState(/** @type {Array<any>} */([]));
    const [cartOpen, setCartOpen] = useState(false);
    const [cartIds, setCartIds] = useState(new Set());
    const [wishIds, setWishIds] = useState(new Set());
    const [error, setError] = useState('');
    const [bundlesError, setBundlesError] = useState('');
    const [custom, setCustom] = useState(1);


    // useEffect(() => {
    //     fetch('/api/store/items')
    //         .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
    //         .then((data) => setItems(Array.isArray(data.items) ? data.items : []))
    //         .catch(() => setError('Failed to load items.'))
    //         .finally(() => setLoading(false));

    //     // const token = localStorage.getItem('token');
    //     // fetch('/api/store/gem-bundles', { headers: { Authorization: `Bearer ${token}` }, credentials: 'include' })
    //     //     .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
    //     //     .then((data) => setBundles(Array.isArray(data.bundles) ? data.bundles : []))
    //     //     .catch(() => setError('Failed to load gem bundles.'))
    //     //     .finally(() => setBundles([]));
    // }, []);
    useEffect(() => {
        const token = localStorage.getItem('token'); // confirm this key matches your login code
        (async () => {
            try {
            const r = await fetch('/api/store/gem-bundles', {
                headers: { Authorization: token ? `Bearer ${token}` : '' },
                credentials: 'include'
            });

            // Log exactly what came back so you can see 401/404/etc.
            const raw = await r.text();
            console.log('GET /api/store/gem-bundles →', r.status, raw);

            if (!r.ok) {
                // If it’s an auth issue, show a clear UI hint
                if (r.status === 401 || r.status === 403) {
                setBundles([]);
                setBundlesError('Sign in to view bundles (401)');
                return;
                }
                throw new Error(`bundles fetch failed ${r.status}`);
            }

            const data = JSON.parse(raw);
            setBundles(Array.isArray(data.bundles) ? data.bundles : []);
            setBundlesError('');
            } catch (e) {
            console.error(e);
            setBundles([]);
            setBundlesError('Could not load gem bundles');
            }
        })();
}, []);

    const authedPost = async (url, body) => {
    const token = localStorage.getItem('token');
    return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(body || {})
        }).then(async r => {
            const data = await r.json();
            if (!r.ok || data.ok === false) throw new Error(data.error || 'Request failed');
            return data;
        });
    };

    const buyBundle = async (bundleId) => {
        try {
        const data = await authedPost('/api/store/gem-bundles/purchase', { bundleId });
        updateUser({ ...user, gems: data.remainingGems });
        alert(`Purchased ${data.bundle?.title} — new balance: ${data.remainingGems} 💎`);
        } catch (e) {
        alert(e.message || 'Bundle purchase blocked. Daily limit reached.');
        }
    };
    const buyCustom = async () => {
    const amount = Math.max(1, Math.floor(Number(custom) || 0));
    try {
        const d = await authedPost(`/api/store/gem-bundles/purchase-custom`, { amount });
        alert(`Purchased ${amount} 💎 and received ${d.gained} 💎 — new balance: ${d.remainingGems} 💎`);
        setCustom(1);
    } catch (e) {
        alert(e.message);
    }
    };




    
    {error && <div className="text-red-600 mb-4">{error}</div>}
    
    return (
        <>
        <Navbar3 />
            

        <div className="min-h-screen bg-lavender py-10">
            <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Gem Shop</h1>
                <div className="text-sm text-gray-700 mb-6">Buy gems using your gems. Bundles give bonuses; custom is 2x value — pay N, get 2N</div>
                
            </div>
            

            <p className="mb-6">Your gems: <b>{user?.gems ?? 0}</b></p>
            {/* {loading && <div>Loading items...</div>} */}
            {error && <div className="text-rose-600 mb-4 text-sm">{error}</div>}
            


            {/* Custom (single/multiple) */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">Custom</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl shadow p-4">
                    <div className="text-2xl">🧪</div>
                    <div className="font-semibold mt-1">Custom Gems</div>
                    <div className="text-sm text-gray-600">1:1 — no bonus</div>
                    <div className="mt-3 flex items-center gap-2">
                    <input
                        type="number"
                        min={1}
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                        className="w-24 rounded-lg border px-3 py-2"
                    />
                    <span className="font-semibold"><i className="bi bi-gem text-blueish"></i></span>
                    </div>
                    <button
                    onClick={buyCustom}
                    className="mt-3 w-full px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                    Buy {Math.max(1, Number(custom) || 1)} <i className="bi bi-gem text-blueish"></i>
                    </button>
                </div>
                </div>
            </section>




            {/* Gem Bundles (buy gems with gems) */}
            <section className="mb-10">
                <h2 className="text-xl font-bold mb-3">Gem Bundles (Buy Gems with Gems)</h2>
                {bundlesError && <div className="text-rose-600 mb-3 text-sm">{bundlesError}</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {bundles.map((b )=> (
                    <div key={b.id} className="bg-white rounded-2xl shadow p-4">
                    <div className="text-2xl">{b.emoji}</div>
                    <div className="font-semibold mt-1">{b.title}</div>
                    <div className="text-sm text-gray-600">{b.blurb}</div>
                    <div className="mt-3 text-sm">Cost: <b>{b.costGems}</b> <i className="bi bi-gem text-blueish"></i></div>
                    <div className="text-sm">You get: <b>{b.giveGems} </b><i className="bi bi-gem text-blueish"></i></div>
                    <button
                        onClick={() => buyBundle(b.id)}
                        className="mt-3 w-full px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Buy Bundle
                    </button>
                    </div>
                ))}
                </div>
            </section>

            {/* Items */}
            {/* <section>
                <h2 className="text-xl font-bold mb-3">Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((it) => {
                    const inCart = cartIds.has(it.id);
                    const inWish = wishIds.has(it.id);
                    return (
                    <div key={it.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
                        <img src={it.image} alt={it.name} className="w-full h-40 object-cover rounded-xl mb-3" />
                        <div className="font-semibold">{it.name}</div>
                        <div className="text-sm text-gray-600">{it.type} · {it.theme}</div>
                        <div className="mt-2 text-indigo-700 font-bold">{it.priceGems} <i className="bi bi-gem text-blueish"></i></div>

                        <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
                        <button onClick={() => buyNow(it.id)} className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                            Buy Now
                        </button>

                        {!inCart && !inWish && (
                            <>
                            <button onClick={() => addToCart(it.id)} className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50">
                                Add to Cart
                            </button>
                            <button onClick={() => addToWish(it.id)} className="col-span-2 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50">
                                Wishlist
                            </button>
                            </>
                        )}

                        {inCart && (
                            <button onClick={() => moveToWish(it.id)} className="col-span-2 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50">
                            Move to Wishlist
                            </button>
                        )}

                        {inWish && (
                            <button onClick={() => moveToCart(it.id)} className="col-span-2 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50">
                            Move to Cart
                            </button>
                        )}
                        </div>
                    </div>
                    );
                })}
                </div>
            </section> */}
            </div>
        </div>
        <Footer />
        </>
    );
};