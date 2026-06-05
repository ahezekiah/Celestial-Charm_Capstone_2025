import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";

export default function Blog(){

    return(
        <>
        <Navbar3 />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to bg-purple-200 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Blog Posts</h1>
                    <p className="text-center text-gray-500">Our blog is coming soon! Stay tuned for updates, tips, and insights on how to make the most of your Celestial Charm experience.</p>
                </div>
            </div>
        <Footer />
        </>
    );
};