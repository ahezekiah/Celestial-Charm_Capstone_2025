import { useState } from "react";
import "./FAQ.css";

const faqData = [
    {
        question: "What is Celestial Charm?",
        answer:
            "A curated site with jewelry, fashion, books, and fragrances inspired by K-pop and anime.",
    },
    {
        question: "Why did I choose to make this site?",
        answer: "Because I love anime, K-pop, and everything in between!",
    },
    {
        question: "Can I actually buy the items displayed on this site?",
        answer:
            "Nope, it's a showcase that links out to original creators or sellers.",
    },
    ];
    
    export default function FAQ() {
        const [activeIndex, setActiveIndex] = useState(null);
    
        const toggleIndex = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    
        return (
            <div className="faq-container">
                {faqData.map((item, index) => (
            <div key={index} className="faq-item">
                <button className="faq-question" onClick={() => toggleIndex(index)}>
                    {item.question}
                    <span className="faq-icon">
                        {activeIndex === index ? "−" : "+"}
                    </span>
                </button>
                {activeIndex === index && <p className="faq-answer">{item.answer}</p>}
            </div>
        ))}
        </div>
    );
}