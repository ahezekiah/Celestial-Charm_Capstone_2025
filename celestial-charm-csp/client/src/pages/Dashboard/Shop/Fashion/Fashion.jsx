import Navbar3 from '../../../../components/NavBars/Navbar3';
import Footer from '../../../../components/Footer/Footer';
import ProductPageByType from '../../../../components/Products/ProductsPageByType';

export default function Fashion() {

    return (
            <>
                <Navbar3 />
                    <ProductPageByType title="Fashion Collection" type="fashion" />
                <Footer />
            </>
        );
};