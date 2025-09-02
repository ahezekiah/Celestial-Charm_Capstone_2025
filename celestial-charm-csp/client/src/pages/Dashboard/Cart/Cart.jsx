import { useCartWishlist } from "../../../context/CartWishlistContext";
import Navbar3 from '../../../components/NavBars/Navbar3';
import Footer from '../../../components/Footer/Footer';
import '../CartWishlist.css'; 
import CartDrawer from "../../../components/Cart/CartDrawer";


    const authedPost = async (url, body) => {
    const token = localStorage.getItem('token');
    return fetch(url, {
        method: 'POST',
        credentials : 'include',
        headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body || {})
    }).then(async r => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok || d.ok === false) throw new Error(d.error || 'Request failed');
        return d;
    });
};
    const normalizeId = it => it.id || it._id || it.itemId;


    const toGems = (s)=>Math.max(1,Math.round((Number(String(s).replace(/[^0-9.]/g,''))||0)*10));
    const price = (it)=> it.priceGems ?? toGems(it.price);
export default function Cart() {
    const { toggleCart, cart } = useCartWishlist();
    
    const removeLine = async (it) => {
        await authedPost("/api/store/cart/remove", { itemId: it.id || it._id });
        toggleCart(it);
    };

    const moveToWishlist = async (it) => {
        await authedPost("/api/store/move-to-wishlist", { itemId: it.id || it._id });
        toggleCart(it); // client reflect
    };

  const total = cart.reduce((sum, it)=> sum + price(it) * (it.qty || 1), 0);
    
    const checkout = async () => {
        try {
            // 1) sync client cart → server
            const items = cart.map(it => ({
            itemId: String(normalizeId(it)),
            qty: Math.max(1, Number(it.qty || 1))
            }));
            await authedPost('/api/store/cart/sync', { items });

            // 2) run checkout on server (will move to inventory)
            const d = await authedPost('/api/store/cart/checkout');

            // 3) clear local cart + show success
            cart.slice().forEach(toggleCart);
            alert(`Checked out! Items are now in your Inventory. Balance: ${d.remainingGems ?? '?'} 💎`);
        } catch (e) {
            alert(e.message);
        }
        };

    return (
        <>
        <Navbar3 />
            <div className="cart-wishlist-page">
                <h2 className="cart-wishlist-title"><i className="bi bi-bag-fill"></i> Your Cart <i className="bi bi-bag-fill"></i></h2>
                {cart.length === 0 ? <div className="empty">Cart is empty.</div> : (
                <div className="item-list">
                    {cart.map((it, i) => (
                        <div key={i} className="item-card">
                            <div className="item-info">
                                <img src={it.image} alt={it.name} />
                                <div>
                                    <div className="item-name">{it.name}</div>
                                    <div className="item-price">{price(it)} <i className="bi bi-gem text-blueish"></i></div>
                                </div>
                            </div>
                            <div className="actions">
                                <button onClick={()=>moveToWishlist(it)} className="move-btn">
                                    Move to Wishlist <i className="bi bi-bag-heart-fill text-magenta"></i>
                                </button>
                                <button onClick={()=>removeLine(it)} className="remove-btn"> Remove <i className="bi bi-trash2-fill"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
                )}

                {cart.length > 0 && (
                    <div className="checkout-bar">
                    <div className="checkout-inner">
                        <span className="total-chip">Total: {total} <i className="bi bi-gem text-blueish"></i></span>
                        <button className="checkout-btn" onClick={checkout}>Checkout ({total} <i className="bi bi-gem text-blueish"></i>)</button>
                    </div>
                    </div>
                )}
                {/* <div className="checkout-bar">
                    <div className="checkout-inner">
                        <span className="total-chip">Total: {cart.reduce((s,it)=>s+showGems(it),0)} <i className="bi bi-gem text-blueish"></i></span>
                        <button
                            onClick={async () => {
                                await authedPost("/api/store/cart/checkout");
                                // clear client cart on success:
                                cart.slice().forEach(it => toggleCart(it));
                                alert("Checked out! Items added to Inventory.");
                            }}
                            className="checkout-btn">
                            Checkout ({cart.reduce((s,it)=>s+showGems(it),0)} <i className="bi bi-gem text-blueish"></i>)
                        </button>
                    </div>
                </div> */}
            </div>
        <Footer />
        </>
    );
};