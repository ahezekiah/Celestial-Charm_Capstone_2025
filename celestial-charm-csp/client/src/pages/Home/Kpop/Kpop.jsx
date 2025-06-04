import ProductPage from '../../../components/Products/ProductPage';
import Navbar1 from '../../../components/NavBars/Navbar1';
import Footer from '../../../components/Footer/Footer';

export default function Kpop() {

    return (
        <>
        <Navbar1 />
            <ProductPage title="K-Pop Inspired Products" apiUrl="/api/kpop" />
        <Footer />
        </>
    );
}