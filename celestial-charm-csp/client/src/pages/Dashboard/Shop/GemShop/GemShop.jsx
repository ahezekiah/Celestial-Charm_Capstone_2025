import { useEffect, useState } from 'react';
import Navbar3 from '../../../../components/NavBars/Navbar3';
import Footer from '../../../../components/Footer/Footer';
import { useUser } from '../../../../context/UserContext';

export default function GemShop() {
    const { user, updateUserContext } = useUser();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/store/items')
            .then(response => response.json())
            .then(data => setItems(data.items || []))
            .catch(() => setError('Failed to load items.'))
            .finally(() => setLoading(false));
    }, []);

    const handlePurchase = (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const res = fetch('/api/store/purchase-gems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ itemId })
            });
            const data = res.json();
            if (!res.ok) throw new Error(data.error || 'Purchase failed');
            updateUserContext({ ...user, gems: data.gemsLeft });
            alert(`Purchased ${data.inventoryItem.name} for ${data.inventoryItem.priceGems} gems! You now have ${data.gemsLeft} gems left.`);
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <>
        <Navbar3 />
        <div className='min-h-screen bg-grsadient-to-b from-purple-50 to bg-indigo-50 p-6'>
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Gem Shop</h1>
                <p className='mb-6'>Your gems: <b>{user?.gems ?? 0}</b></p>
                {loading && <div>Loading items...</div>}
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <img src={item.image} alt={item.name} className="h-40 w-full object-cover mb-4 rounded" />
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h2>
                            <p className="text-gray-600 mb-4 flex-grow">{item.type} · {item.desc}</p>
                            <div className="mt-auto">
                                <span className="text-lg font-bold text-indigo-600">{item.priceGems} Gems</span>
                                <button
                                    onClick={() => handlePurchase(item.id)}
                                    className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                                >
                                    Purchase
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};