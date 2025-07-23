import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import { useEffect, useState } from "react";

export default function Results() {
    const [personality, setPersonality] = useState([]);
    const [knowledge, setKnowledge] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch('/api/quiz/results', {
            headers: { Authorization: `Bearer ${token}`},
        })
        .then(response => response.json())
        .then(data => {
            setPersonality(data.personality);
            setKnowledge(data.knowledge);
        })
    }, [])
    return (
        <>
        <Navbar3 />

        <Footer />
        </>
    );
}