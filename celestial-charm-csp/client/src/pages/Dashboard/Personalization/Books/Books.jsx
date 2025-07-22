import Navbar3 from '../../../../components/NavBars/Navbar3';
import Footer from '../../../../components/Footer/Footer';
import BooksCarousel from '../../../../components/BooksCarousel/BooksCarousel';

export default function Books() {
    return (
        <>
            <Navbar3 />
                <BooksCarousel />
            <Footer />
        </>
    );
}