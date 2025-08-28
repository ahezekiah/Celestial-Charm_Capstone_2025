import React, { createContext, useState, useContext, useU } from "react";

const UserAnswersContext = createContext();

export const useUserAnswers = () => useContext(UserAnswersContext);

export const UserAnswersProvider = ({ children }) => {
    const [answers, setAnswers] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    return (
        <UserAnswersContext.Provider value={{ answers, setAnswers, wishlist, setWishlist }}>
            {children}
        </UserAnswersContext.Provider>
    );
};