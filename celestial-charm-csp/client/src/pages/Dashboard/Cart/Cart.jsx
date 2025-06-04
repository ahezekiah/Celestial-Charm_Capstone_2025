import { useCartWishlist } from "../../../context/CartWishlistContext";
import Navbar3 from '../../../components/NavBars/Navbar3';
import Footer from '../../../components/Footer/Footer';

export default function Cart() {
    const { toggleCart, cart } = useCartWishlist();
    return (
        <>
        <Navbar3 />
            <div style={{ padding: '2rem' }}>
            <h2><i className="bi bi-bag-fill"></i> Your Cart <i className="bi bi-bag-fill"></i></h2>
            {cart.length === 0 ? <p>No items in cart.</p> : (
                <ul>
                    {cart.map((item, i) => (
                        <li key={i}>
                            {item.name} – {item.price}
                            <button onClick={() => toggleCart(item)}><i className="bi bi-trash2-fill"></i> Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <Footer />
        </>
    );
};