import { useState } from "react";
import "./FAQ.css";

const faqData = [
    {
        question: "What is Celestial Charm?",
        answer:
            "A curated site with jewelry, fashion, and fragrances inspired by K-pop and anime. Also a place where you can find different genres of books; " + 
            "going from romace, to fantasy, to even mystery/thriller! "
    },
    {
        question: "Why did I choose to make this site?",
        answer: "Because I love anime, K-pop, and books, so I wanted a place where people like me can find cool stuff related to those interests.",
    },
    {
        question: "Can I actually buy the items displayed on this site?",
        answer:
            "No. It is just a showcase website that has links to original creator(s) or seller(s).",
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