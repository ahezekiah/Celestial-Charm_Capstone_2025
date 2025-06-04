import React, { useEffect, useRef, useState } from 'react';
import { useCartWishlist } from '../../context/CartWishlistContext';
import './ProductsPage_WLC.css';

export default function ProductPage({ title, apiUrl }) {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const cache = useRef({});
    const { toggleCart, toggleWishlist, isInCart, isInWishlist } = useCartWishlist();
    
    useEffect(() => {
        const key = `${filter}-${currentPage}`;
        if (cache.current[key]) {
            const cached = cache.current[key];
            setItems(cached.products);
            setTotalPages(cached.totalPages);
            setStartIndex(cached.startIndex);
            setEndIndex(cached.endIndex);
            setTotalItems(cached.totalItems);
        } else {
            fetch(`${apiUrl}?page=${currentPage}&type=${filter}`)
            .then(res => res.json())
            .then(data => {
                cache.current[key] = data;
                setItems(data.products);
                setTotalPages(data.totalPages);
                setStartIndex(data.startIndex);
                setEndIndex(data.endIndex);
                setTotalItems(data.totalItems);
            });
        }
        }, [apiUrl, currentPage, filter]);




    const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);
    return (
        <>
        <div className="product-page">
            <h1 className="page-title">{title}</h1>
            <div className='filter-bar'>
                {['all', 'fashion', 'fragrances', 'jewelry'].map(type => (
                    <button
                        key={type}
                        className={`filter-button ${filter === type ? 'active' : ''}`}
                        onClick={() => {
                            setFilter(type);
                            setCurrentPage(1);
                        }}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
            {totalItems > 0 && (
            <div className="results-meta">
                Showing {startIndex}–{endIndex} of {totalItems} results
            </div>
            )}
            <div className='card-grid'>
                {filteredItems.map((item, index) => (
                    <a href={item.url} key={index} target="_blank" rel="noopener noreferrer" className="product-card">
                        <img src={item.image} alt={item.name} className="product-image" />
                        <h3 className="product-name">{item.name}</h3>
                        <p className="product-price">{item.price}</p>
                        <p className="product-desc">{item.desc}</p>
                        <div key={index} className="product-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                <button onClick={() => toggleCart(items)}>
                                    <i className={`bi ${isInCart(item) ? 'bi-cart-x-fill' : 'bi-cart-plus-fill'}`}></i>
                                    {' '}
                                    {isInCart(items) ? ' Remove from Cart' : ' Add to Cart'}
                                </button>
                                <button onClick={() => toggleWishlist(items)}>
                                    <i className={`bi ${isInWishlist(item) ? 'bi-bag-heart-fill' : 'bi-bag-heart'}`}></i>
                                    {' '}
                                    {isInWishlist(items) ? ' Remove from Wishlist' : ' Add to Wishlist'}
                                </button>
                            </div>
                        </div>
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
        </>
    );
};