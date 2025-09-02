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

    useEffect(() => {
        fetch('/api/store/items')
            .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
            .then((data) => setItems(Array.isArray(data.items) ? data.items : []))
            .catch(() => setError('Failed to load items.'))
            .finally(() => setLoading(false));

        fetch('/api/store/gem-bundles')
            .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
            .then((data) => setBundles(Array.isArray(data.bundles) ? data.bundles : []))
            .catch(() => setError('Failed to load gem bundles.'))
            .finally(() => setBundles([]));
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

    const buyNow = async (id) => {
        const data = await authedPost('/api/store/purchase-gems', { itemId: id, qty: 1 });
        updateUser({ ...user, gems: data.remainingGems });
        alert('Purchased with gems! Check your Inventory.');
    };
    const addToCart = async (id) => {
        await authedPost('/api/store/cart/add', { itemId: id, qty: 1 });
        setCartIds(new Set([...cartIds, id]));
        setCartOpen(true);
    };
    const addToWish = async (id) => {
        await authedPost('/api/store/wishlist/add', { itemId: id });
        setWishIds(new Set([...wishIds, id]));
    };
    const moveToWish = async (id) => {
        await authedPost('/api/store/move-to-wishlist', { itemId: id });
        setCartIds(new Set([...Array.from(cartIds)].filter(x => x !== id)));
        setWishIds(new Set([...wishIds, id]));
    };
    const moveToCart = async (id) => {
        await authedPost('/api/store/move-to-cart', { itemId: id, qty: 1 });
        setWishIds(new Set([...Array.from(wishIds)].filter(x => x !== id)));
        setCartIds(new Set([...cartIds, id]));
    };
    const removeFromCart = async (id) => {
        await authedPost('/api/store/cart/remove', { itemId: id });
        setCartIds(new Set([...Array.from(cartIds)].filter(x => x !== id)));
    };
    const removeFromWish = async (id) => {
        await authedPost('/api/store/wishlist/remove', { itemId: id });
        setWishIds(new Set([...Array.from(wishIds)].filter(x => x !== id)));
    };
    const checkout = async () => {
        const data = await authedPost('/api/store/cart/checkout');
        updateUser({ ...user, gems: data.remainingGems });
        alert('Checked out! Items added to Inventory.');
        setCartOpen(false);
        setCartIds(new Set());
    };
    const buyBundle = async (bundleId) => {
        try {
        const data = await authedPost('/api/store/gem-bundles/purchase', { bundleId });
        updateUser({ ...user, gems: data.remainingGems });
        } catch (e) {
        alert(e.message || 'Bundle purchase blocked. Daily limit reached.');
        }
    };


    // const handlePurchase = (itemId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const res = fetch('/api/store/purchase-gems', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`
    //             },
    //             body: JSON.stringify({ itemId })
    //         });
    //         const data = res.json();
    //         if (!res.ok) throw new Error(data.error || 'Purchase failed');
    //         updateUser({ ...user, gems: data.gemsLeft });
    //         alert(`Purchased ${data.inventoryItem.name} for ${data.inventoryItem.priceGems} gems! You now have ${data.gemsLeft} gems left.`);
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

    
    {error && <div className="text-red-600 mb-4">{error}</div>}
    
    return (
        <>
        <Navbar3 />
            <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            onMoveToWish={moveToWish}
            onRemoveFromCart={removeFromCart}
            // onRemoveFromWish={removeFromWish}
            onCheckout={checkout}
        />

        <div className="min-h-screen bg-lavender py-10">
            <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Gem Shop</h1>
                <button className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50" onClick={() => setCartOpen(true)}>
                Open Cart
                </button>
            </div>

            <p className="mb-6">Your gems: <b>{user?.gems ?? 0}</b></p>
            {loading && <div>Loading items...</div>}
            {error && <div className="text-rose-600 mb-4">{error}</div>}

            {/* Gem Bundles (buy gems with gems) */}
            <section className="mb-10">
                <h2 className="text-xl font-bold mb-3">Gem Bundles (Buy Gems with Gems)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {bundles.map((b) => (
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
            <section>
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
            </section>
            </div>
        </div>
        <Footer />
        </>
    );
};