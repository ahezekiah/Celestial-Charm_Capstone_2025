import ProductPage from '../../../components/Products/ProductPage';
import NavBar from '../../../components/NavBars/Navbar1';
import Footer from '../../../components/Footer/Footer';

export default function Anime() {
    return (
        <>
        <NavBar />
            <ProductPage title="Anime Inspired Products" apiUrl="/api/anime" />
        <Footer />
        </>
    );
}