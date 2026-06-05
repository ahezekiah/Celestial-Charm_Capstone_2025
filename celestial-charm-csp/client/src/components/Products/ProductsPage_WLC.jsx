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
                {['all', 'fashion', 'fragrance', 'jewelry'].map(type => (
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
                        {/* HINT: managed in Cart/Wishlist */}
                        <div className="manage-hint" onClick={(e) => e.stopPropagation()}>
                            Manage this item in your <a href="/cart">Cart</a> or <a href="/wishlist">Wishlist</a>.
                        </div>

                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
            
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