import { useEffect, useState } from "react";
import Navbar3 from '../../../components/NavBars/Navbar3';
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

export default function Inventory() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gems, setGems] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('/api/store/inventory', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setItems(data.inventory || []);
            setGems(data.gems || 0);
        })
        .catch(err => console.error('Error fetching inventory:', err))
        .finally(() => setLoading(false));
    }, []);
    return (
        <>
        <Navbar3 />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to bg-purple-200 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Your Inventory</h1>
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : (
                        <>
                        <div className="mb-6 text-center">
                            <span className="text-lg font-semibold text-yellow-600">Gems: {gems}</span>
                        </div>
                        {items.length === 0 ? (
                            <p className="text-center text-gray-500">Your inventory is empty. Visit the <Link to='/shop' className="hover:text-teal hover:underline text-magenta font-semibold">shop</Link> to purchase items!</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {items.map((item, index) => (
                                    <div key={index} className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                                        <img src={item.image} alt={item.name} className="w-32 h-32 object-cover mb-4 rounded-md" />
                                        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                                        <p className="text-yellow-600 font-bold mt-2">{item.priceGems} Gems</p>
                                        <p className="text-sm text-gray-500 mt-1">Purchased on: {new Date(item.purchasedAt).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}