import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import ProductPageByType from "../../../../components/Products/ProductsPageByType";


export default function Fragrances() {
    return (
        <>
            <Navbar3 />
                <ProductPageByType title="Fragrances Collection" type="fragrances" />
            <Footer />
        </>
    );
};