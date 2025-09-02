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


    const getGems = (item) =>
        item.priceGems ??
        Math.round(parseFloat(String(item.price).replace(/[^0-9.]/g, "") || 0) * 10);

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
            {/* <div className='card-grid'>
                {filteredItems.map((item, index) => (
                    <div key={index} className="product-card" onClick={() => window.open(item.url, '_blank')}>
                        <img src={item.image} alt={item.name} className="product-image" />
                        <h3 className="product-name">{item.name}</h3>
                        <p className="product-price">{(item.priceGems ?? Math.round(parseFloat(String(item.price).replace(/[^0-9.]/g,"")||0)*10))} <i className="bi bi-gem text-blueish"></i></p>
                        <p className="product-desc">{item.desc}</p>
                        <div key={index} className="product-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                <button onClick={(e) => {
                                        e.stopPropagation(); 
                                        const priceGems = item.priceGems ?? Math.round(parseFloat(String(item.price).replace(/[^0-9.]/g,"")||0)*10);
                                        toggleCart({ ...item, priceGems });
                                    }}>
                                    <i className={`bi ${isInCart(item) ? 'bi-cart-x-fill' : 'bi-cart-plus-fill'}`}></i>
                                    {' '}
                                    {isInCart(item) ? ' Remove from Cart' : ' Add to Cart'}
                                </button>
                                <button onClick={(e) => {
                                        e.stopPropagation(); 
                                        const priceGems = item.priceGems ?? Math.round(parseFloat(String(item.price).replace(/[^0-9.]/g,"")||0)*10);
                                        toggleWishlist({ ...item, priceGems });
                                    }}>
                                    <i className={`bi ${isInWishlist(item) ? 'bi-bag-heart-fill' : 'bi-bag-heart'}`}></i>
                                    {' '}
                                    {isInWishlist(item) ? ' Remove from Wishlist' : ' Add to Wishlist'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div> */}
            <div className="card-grid">
                {filteredItems.map((item, idx) => {
                const gems = getGems(item);
                const inCart = isInCart(item);
                const inWish = isInWishlist(item);

                return (
                    <div
                    key={`${item._id || item.id || idx}`}
                    className="product-card"
                    onClick={() => window.open(item.url, "_blank")}
                    >
                    <img src={item.image} alt={item.name} className="product-image" />
                    <div className="card-body">
                        <h3 className="product-name">{item.name}</h3>
                        <p className="product-price">{(item.priceGems ?? Math.round(parseFloat(String(item.price).replace(/[^0-9.]/g,"")||0)*10))} <i className="bi bi-gem text-blueish"></i></p>
                        {/* <div className="price-chip">{gems} <i className="bi bi-gem text-blueish"></i></div> */}
                        <p className="product-desc">{item.desc}</p>
                        <div className="cta-row">
                        <button
                            className={`cta-btn ${inCart ? "in-cart" : ""}`}
                            onClick={(e) => {
                            e.stopPropagation();
                            toggleCart({ ...item, priceGems: gems });
                            }}
                        >
                            <i className={`bi ${inCart ? "bi-cart-x-fill" : "bi-cart-plus-fill"}`} />{" "}
                            {inCart ? "Remove" : "Add to Cart"}
                        </button>
                        <button
                            className={`cta-btn ${inWish ? "in-wish" : ""}`}
                            onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist({ ...item, priceGems: gems });
                            }}
                        >
                            <i className={`bi ${inWish ? "bi-bag-heart-fill" : "bi-bag-heart"}`} />{" "}
                            {inWish ? "Wishlisted" : "Wishlist"}
                        </button>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
            {/* <div className="pagination">
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
            </div> */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                        >
                        {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
        </>
    );
};