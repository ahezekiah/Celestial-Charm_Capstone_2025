
import { useCartWishlist } from "../../../context/CartWishlistContext";
import Navbar3 from "../../../components/NavBars/Navbar3";
import Footer from "../../../components/Footer/Footer";
import '../CartWishlist.css';

const authedPost = async (url, body) => {
    const token = localStorage.getItem("token");
    if (!token) return Promise.resolve();
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type":"application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body || {})
    }).then(r => r.json()).then(d => {
        if (d && d.ok === false) throw new Error(d.error || "Request failed");
        return d;
    });
    };
    const toGems = (s)=>Math.max(1,Math.round((Number(String(s).replace(/[^0-9.]/g,''))||0)*10));
    const price = (it)=> it.priceGems ?? toGems(it.price);


export default function Wishlist() {
    const { toggleWishlist, wishlist, toggleCart } = useCartWishlist();

    const moveToCart = async (it) => {
        await authedPost("/api/store/move-to-cart", { itemId: it.id || it._id, qty: 1 });
        toggleWishlist(it); // remove locally
        toggleCart({ ...it, priceGems: price(it) }); // add locally
    };

    const remove = async (it) => {
        await authedPost("/api/store/wishlist/remove", { itemId: it.id || it._id });
        toggleWishlist(it);
    };
    return (
        <>
        <Navbar3 />
            <div className="cart-wishlist-page">
                <h2 className="cart-wishlist-title"><i className="bi bi-heart-half"></i> Your Wishlist <i className="bi bi-heart-half"></i></h2>
                {wishlist.length === 0 ?  <div className="empty">Wishlist is empty.</div> : (
                <div className="item-list">
                    {wishlist.map((it, i) => (
                        <div key={i} className="item-card">
                            <div className="item-info">
                                <img src={it.image} alt={it.name} />
                                <div>
                                    <div className="item-name">{it.name}</div>
                                    <div className="item-price">{price(it)} <i className="bi bi-gem text-blueish"></i></div>
                                </div>
                            </div>

                            <div className="actions">
                                <button onClick={()=>moveToCart(it)} className="move-btn">
                                    Move to Cart <i className="bi bi-cart-plus-fill text-magenta"></i>
                                </button>
                                <button onClick={()=>remove(it)} className="remove-btn"> Remove <i className="bi bi-trash2-fill"></i></button>
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