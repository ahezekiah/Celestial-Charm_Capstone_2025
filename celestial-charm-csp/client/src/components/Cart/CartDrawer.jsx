import { useEffect, useState } from "react";

export default function CartDrawer({ open, onClose, onMoveToWish, onRemove, onCheckout }) {
    const [data, setData] = useState({ lines: [], totalGems: 0, haveGems: 0 });

    useEffect(() => {
        if (!open) return;
        const token = localStorage.getItem("token");
        fetch("/api/store/cart", { headers: { Authorization: `Bearer ${token}` }, credentials: "include" })
        .then(r => r.json())
        .then(d => setData(d.ok ? d : { lines: [], totalGems: 0, haveGems: 0 }))
        .catch(() => setData({ lines: [], totalGems: 0, haveGems: 0 }));
    }, [open]);

    return (
        <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/30 ${open ? 'opacity-100' : 'opacity-0'} transition-opacity`} onClick={onClose}/>
        <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-lavender shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold"><i className="bi bi-bag-fill"></i> Your Cart <i className="bi bi-bag-fill"></i></h2>
            <button className="text-gray-500 hover:text-black" onClick={onClose}><i className="bi bi-x-lg"/></button>
            </div>

            <div className="p-5 space-y-3 overflow-y-auto h-[calc(100%-160px)]">
            {data.lines.length === 0 ? (
                <div className="text-sm text-gray-600">Your cart is empty.</div>
            ) : data.lines.map(l => (
                <div key={l.itemId} className="flex gap-3 border rounded-xl p-3">
                <img src={l.image} alt={l.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                    <div className="font-semibold">{l.name}</div>
                    <div className="text-sm text-gray-600">Qty: {l.qty}</div>
                    <div className="text-indigo-700 font-bold">{l.lineGems} <i className="bi bi-gem text-blueish"></i></div>
                    <div className="mt-2 flex gap-2">
                    <button className="px-2 py-1 rounded-lg border text-xs" onClick={() => onMoveToWish(l.itemId)}> Move to Wishlist <i className="bi bi-bag-heart-fill text-magenta"></i></button>
                    <button className="px-2 py-1 rounded-lg border text-xs" onClick={() => onRemove(l.itemId)}> Remove <i className="bi-cart-x-fill text-magenta"></i></button>
                    </div>
                </div>
                </div>
            ))}
            </div>

            <div className="p-5 border-t">
            <div className="flex items-center justify-between text-sm">
                <span>Have - </span><span className="font-semibold">{data.haveGems} <i className="bi bi-gem text-blueish"></i></span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span>Total - </span><span className="font-semibold">{data.totalGems} <i className="bi bi-gem text-blueish"></i></span>
            </div>
            <button
                disabled={data.totalGems === 0 || data.haveGems < data.totalGems}
                onClick={onCheckout}
                className="mt-3 w-full px-4 py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
                Checkout - ({data.totalGems} <i className="bi bi-gem text-blueish"></i>)
            </button>
            {data.totalGems > 0 && data.haveGems < data.totalGems && (
                <div className="text-xs text-rose-600 mt-2">Not enough gems — buy a bundle first.</div>
            )}
            </div>
        </aside>
        </div>
    );
}
