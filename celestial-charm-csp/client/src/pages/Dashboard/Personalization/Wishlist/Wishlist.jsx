
import { useCartWishlist } from "../../../../context/CartWishlistContext";
import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";

export default function Wishlist() {
    const { toggleWishlist, wishlist } = useCartWishlist();
    return (
        <>
        <Navbar3 />
            <div style={{ padding: '2rem' }}>
            <h2><i className="bi bi-heart-half"></i> Your Wishlist <i className="bi bi-heart-half"></i></h2>
            {wishlist.length === 0 ? <p>No items in wishlist.</p> : (
                <ul>
                    {wishlist.map((item, i) => (
                        <li key={i}>
                            {item.name} – {item.price}
                            <button onClick={() => toggleWishlist(item)}><i className="bi bi-trash2-fill"></i> Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <Footer />
        </>
    );
}