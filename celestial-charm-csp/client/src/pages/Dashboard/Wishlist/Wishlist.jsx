
import { useCartWishlist } from "../../../context/CartWishlistContext";
import Navbar3 from "../../../components/NavBars/Navbar3";
import Footer from "../../../components/Footer/Footer";
import '../CartWishlist.css';

export default function Wishlist() {
    const { toggleWishlist, wishlist } = useCartWishlist();
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
                                    <div className="item-price">{item.price}</div>
                                </div>
                            </div>
                            <button onClick={() => toggleWishlist(item)} className="remove-btn"><i className="bi bi-trash2-fill"></i></button>
                        </div>
                    ))}
                </div>
                )}
            </div>
        <Footer />
        </>
    );
}