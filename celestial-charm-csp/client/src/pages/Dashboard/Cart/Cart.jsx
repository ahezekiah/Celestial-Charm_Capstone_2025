import { useCartWishlist } from "../../../context/CartWishlistContext";
import Navbar3 from '../../../components/NavBars/Navbar3';
import Footer from '../../../components/Footer/Footer';
import '../CartWishlist.css'; 

export default function Cart() {
    const { toggleCart, cart } = useCartWishlist();
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
                                    <div className="item-price">{item.price}</div>
                                </div>
                            </div>
                            <button onClick={() => toggleCart(item)} className="remove-btn"><i className="bi bi-trash2-fill"></i> Remove</button>
                        </div>
                    ))}
                </div>
                )}
            </div>
        <Footer />
        </>
    );
};