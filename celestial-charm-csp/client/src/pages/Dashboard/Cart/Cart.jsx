import { useCartWishlist } from "../../../context/CartWishlistContext";
import Navbar3 from '../../../components/NavBars/Navbar3';
import Footer from '../../../components/Footer/Footer';
import '../CartWishlist.css'; 

export default function Cart() {
    const { toggleCart, cart } = useCartWishlist();

    const authedPost = async (url, body) => {
    const token = localStorage.getItem("token");
    if (!token) return Promise.resolve(); // offline mode
    return fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body || {})
    }).then(() => {});
    };
    const toGems = (s) => Math.max(1, Math.round((Number(String(s).replace(/[^0-9.]/g,''))||0)*10));
    const showGems = (item) => item.priceGems ?? toGems(item.price);

    return (
        <>
        <Navbar3 />
            <div className="cart-wishlist-page">
                <h2 className="cart-wishlist-title"><i className="bi bi-bag-fill"></i> Your Cart <i className="bi bi-bag-fill"></i></h2>
                {cart.length === 0 ? <p>No items in cart.</p> : (
                <div className="item-list">
                    {cart.map((item, index) => (
                        <div key={index} className="item-card">
                            <div className="item-info">
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-price">{showGems(item)} <i className="bi bi-gem text-blueish"></i></div>
                                </div>
                            </div>
                            <div className="actions">
                                <button onClick={async () => { await authedPost("/api/store/move-to-wishlist", { itemId: item.id || item._id }); toggleCart(item); } } className="move-btn">
                                    Move to Wishlist <i className="bi bi-bag-heart-fill text-magenta"></i>
                                </button>
                                <button onClick={() => toggleCart(item)} className="remove-btn"> Remove <i className="bi bi-trash2-fill"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
                )}
                <div className="checkout-bar">
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
            </div>
        <Footer />
        </>
    );
};