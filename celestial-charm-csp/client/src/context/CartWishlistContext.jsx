import React, { createContext, useContext, useState } from 'react';

const CartWishlistContext = createContext();

export function CartWishlistProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const toggleItem = (item, list, setList) => {
        const exists = list.some(i => i.name === item.name);
        const updated = exists
            ? list.filter(i => i.name !== item.name)
            : [...list, item];
        setList(updated);
    };

    const toggleCart = (item) => toggleItem(item, cart, setCart);
    const toggleWishlist = (item) => toggleItem(item, wishlist, setWishlist);

    const isInCart = (item) => cart.some(i => i.name === item.name);
    const isInWishlist = (item) => wishlist.some(i => i.name === item.name);

    return (
        <CartWishlistContext.Provider value={{
            cart, wishlist, toggleCart, toggleWishlist, isInCart, isInWishlist
        }}>
            {children}
        </CartWishlistContext.Provider>
    );
}

export const useCartWishlist = () => useContext(CartWishlistContext);
