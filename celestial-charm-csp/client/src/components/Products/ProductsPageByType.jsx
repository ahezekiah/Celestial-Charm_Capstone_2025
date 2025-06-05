import React, { useEffect, useRef, useState } from 'react';
import { useCartWishlist } from '../../context/CartWishlistContext';
import './ProductsPage_WLC.css';

export default function ProductPageByType({ title, type }) {
    const [theme, setTheme] = useState('');
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const cache = useRef({});
    const { toggleCart, toggleWishlist, isInCart, isInWishlist } = useCartWishlist();

    useEffect(() => {
        const key = `${type}-${theme}-${currentPage}`;
        const query = `/api/${type}?page=${currentPage}${theme ? `&theme=${theme}` : ''}`;


        if (cache.current[key]) {
        const cached = cache.current[key];
        setItems(cached.products);
        setTotalPages(cached.totalPages);
        setStartIndex(cached.startIndex);
        setEndIndex(cached.endIndex);
        setTotalItems(cached.totalItems);
        } else {
        fetch(query)
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
    }, [type, theme, currentPage]);

    return (
        <div className="product-page">
        <h1 className="page-title">{title}</h1>

        <div className='filter-bar'>
            {['', 'kpop', 'anime'].map(t => (
            <button
                key={t || 'all'}
                className={`filter-button ${theme === t ? 'active' : ''}`}
                onClick={() => {
                setTheme(t);
                setCurrentPage(1);
                }}
            >
                {t === '' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
            ))}
        </div>

        {totalItems > 0 && (
            <div className="results-meta">
            Showing {startIndex}–{endIndex} of {totalItems} results
            </div>
        )}

        <div className='card-grid'>
            {items.map((item, index) => (
            <div key={index} className="product-card" onClick={() => window.open(item.url, '_blank')}>
                <img src={item.image} alt={item.name} className="product-image" />
                <h3 className="product-name">{item.name}</h3>
                <p className="product-price">{item.price}</p>
                <p className="product-desc">{item.desc}</p>
                <div className="card-actions">
                <button onClick={(e) => { e.stopPropagation(); toggleCart(item); }}>
                    <i className={`bi ${isInCart(item) ? 'bi-cart-x-fill' : 'bi-cart-plus-fill'}`}></i>
                    {isInCart(item) ? ' Remove from Cart' : ' Add to Cart'}
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}>
                    <i className={`bi ${isInWishlist(item) ? 'bi-bag-heart-fill' : 'bi-bag-heart'}`}></i>
                    {isInWishlist(item) ? ' Remove from Wishlist' : ' Add to Wishlist'}
                </button>
                </div>
            </div>
            ))}
        </div>

        <div className="pagination">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            &lt;
            </button>
            {[...Array(totalPages)].map((_, idx) => (
            <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={currentPage === idx + 1 ? 'active' : ''}
            >
                {idx + 1}
            </button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            &gt;
            </button>
        </div>
        </div>
    );
}
