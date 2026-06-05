import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";

export default function Music(){

    return(
        <>
        <Navbar3 />
            <div className="min-h-screen bg-[#D4D3EA] p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-[#530761] mb-6 text-center">Music Recommendations</h1>
                    <p className="text-center text-gray-500">Our music recommendation feature is coming soon! Get ready to discover celestial tunes that perfectly complement your gaming experience. Stay tuned for updates!</p>
                </div>
            </div>
            <Footer />
        </>
    );
};