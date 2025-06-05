import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import ProductsPageByType from '../../../../components/Products/ProductsPageByType';
export default function Jewelry() {
    return (
        <>
            <Navbar3 />
                <ProductsPageByType title="Jewelry Collection" type="jewelry" />
            <Footer />
        </>
    );
};