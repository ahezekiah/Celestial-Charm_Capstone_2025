import Navbar3 from '../../../components/NavBars/Navbar3';
import Footer from "../../../components/Footer/Footer";
import ProductsPage_WLC from '../../../components/Products/ProductsPage_WLC';

export default function Anime2() {
    return(
        <>
        <Navbar3 />
            <ProductsPage_WLC title="Anime Inspired Products" apiUrl="/api/anime2" />
        <Footer />
        </>
    )
}