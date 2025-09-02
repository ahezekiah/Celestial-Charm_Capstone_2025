
import { useCartWishlist } from "../../../context/CartWishlistContext";
import Navbar3 from "../../../components/NavBars/Navbar3";
import Footer from "../../../components/Footer/Footer";
import '../CartWishlist.css';

export default function Wishlist() {
    const { toggleWishlist, wishlist } = useCartWishlist();

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
                <h2 className="cart-wishlist-title"><i className="bi bi-heart-half"></i> Your Wishlist <i className="bi bi-heart-half"></i></h2>
                {wishlist.length === 0 ? <p>No items in wishlist.</p> : (
                <div className="item-list">
                    {wishlist.map((item, index) => (
                        <div key={index} className="item-card">
                            <div className="item-info">
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-price">{showGems(item)} <i className="bi bi-gem text-blueish"></i></div>
                                </div>
                            </div>

                            <div className="actions">
                                <button onClick={async () => {
                                    await authedPost("/api/store/move-to-cart", { itemId: item.id || item._id, qty: 1 });
                                // reflect client state
                                    toggleWishlist(item);
                                }} className="move-btn">
                                    Move to Cart <i className="bi bi-cart-plus-fill text-magenta"></i>
                                </button>
                                <button onClick={() => toggleWishlist(item)} className="remove-btn"> Remove <i className="bi bi-trash2-fill"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        <Footer />
        </>
    );
}