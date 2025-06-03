import React, { useEffect, useState } from 'react';
import NavBar from '../NavBars/Navbar1';
import Footer from '../Footer/Footer';
import './ProductPage.css';

export default function ProductPage({ title, apiUrl }) {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // useEffect(() => {
    //     fetch(`http://localhost:5000${apiUrl}`)
    //         .then(response => response.json())
    //         .then(data => setItems(data));
    // }, [apiUrl]);

    
    useEffect(() => {
        fetch(`${apiUrl}?page=${currentPage}`)
        .then(res => res.json())
        .then(data => {
            setItems(data.products);
            setTotalPages(data.totalPages);
        });
    }, [apiUrl, currentPage]);

    const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);
    return (
        <>
        <NavBar />
        <div className="product-page">
            <h1 className="page-title">{title}</h1>
            <div className='filter-bar'>
                {['all', 'fashion', 'fragrances', 'jewelry'].map(type => (
                    <button
                        key={type}
                        className={`filter-button ${filter === type ? 'active' : ''}`}
                        onClick={() => setFilter(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
            <div className='card-grid'>
                {filteredItems.map((item, index) => (
                    <a href={item.url} key={index} target="_blank" rel="noopener noreferrer" className="product-card">
                        <img src={item.image} alt={item.name} className="product-image" />
                        <h3 className="product-name">{item.name}</h3>
                        <p className="product-price">{item.price}</p>
                        <p className="product-desc">{item.desc}</p>
                    </a>
                ))}
            </div>
            <div className="pagination">
                <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}>
                    &lt;
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                <button
                    key={idx + 1}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={currentPage === idx + 1 ? 'active' : ''}>
                    {idx + 1}
                </button>
                ))}
                <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}>
                &gt;
                </button>
            </div>
        </div>
        <Footer />
        </>
    );
};