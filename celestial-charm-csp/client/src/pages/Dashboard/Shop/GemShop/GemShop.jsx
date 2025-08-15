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

        </div>
        <Footer />
        </>
    );
};