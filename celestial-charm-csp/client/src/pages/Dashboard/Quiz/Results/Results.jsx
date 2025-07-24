import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import { useEffect, useState } from "react";

export default function Results() {
    const [personality, setPersonality] = useState([]);
    const [knowledge, setKnowledge] = useState([]);

    useEffect(() => {
        // const token = localStorage.getItem("token");
        // fetch('/api/quiz/results', {
        //     headers: { Authorization: `Bearer ${token}`},
        // })
        // .then(response => response.json())
        // .then(data => {
        //     setPersonality(data.personality);
        //     setKnowledge(data.knowledge);
        // })
        const fetchResults = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch('/api/quiz/results', {
                    headers: { Authorization: `Bearer ${token}`},
                });
                const data = await res.json();
                if(data?.personality && data?.knowledge){
                    setPersonality(data.personality);
                    setKnowledge(data.knowledge);
                }
            } catch (error) {
                console.error('Failed to fetch quiz results:', error);
            }
        };
        fetchResults();
    }, []);
    return (
        <>
        <Navbar3 />
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl mb-4 font-bold">Your Quiz History</h1>
                
                <h2 className="text-xl mt-6 mb-2 text-purple-700">Personality Quiz Results</h2>
                {Array.isArray(personality) && personality.map((r, i) => (
                    <div key={i} className="bg-purple-100 p-3 mb-2 rounded">
                        <strong>{r.result}</strong> - {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                ))}

                <h2 className="text-xl mt-6 mb-2 text-purple-700">Knowledge Quiz Results</h2>
                {Array.isArray(knowledge) && knowledge.map((r, i) => (
                    <div key={i} className="bg-purple-100 p-3 mb-2 rounded">
                        Score: {r.score} / 6 | Gems: {r.gems} - {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                ))}
            </div>
        <Footer />
        </>
    );
}