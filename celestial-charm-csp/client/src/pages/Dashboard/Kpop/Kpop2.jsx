import Navbar3 from '../../../components/NavBars/Navbar3';
import Footer from "../../../components/Footer/Footer";
import ProductsPage_WLC from '../../../components/Products/ProductsPage_WLC';

export default function Kpop2() {
    return (
        <>
        <Navbar3 />
            <ProductsPage_WLC title="K-Pop Inspired Products" apiUrl="/api/kpop2" />
        <Footer />
        </>
    )
}