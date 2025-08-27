import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useUser } from "../../../../context/UserContext";

const questions = [
    {
        id: 1,
        question: 'Which role fits you best?',
        options: ['Main Vocalist', 'Leader', 'Magicial Girl', 'Shonen Hero'],
    },
    {
        id: 2,
        question: 'Pick a color palette:',
        options: ['Pastel Pink + White', 'Black + Purple', 'Neon Green', 'Sky Blue + Yellow'],
    },
    {
        id: 3,
        question: 'Choose a K-pop concept:',
        options: ['Cute & Bubbly', 'Dark & Powerful', 'Fantasy Dreamcore', 'Tech-Futuristic'],
    },
    {
        id: 4,
        question: 'What anime genre fits your vibe the best?',
        options: ['Romance', 'Action', 'Fantasy', 'Slice of Life'],
    },
    {
        id: 5,
        question: 'Which hangout sounds perfect to you?',
        options: ['Photo booth café', 'Concert stage', 'Anime con', 'Rooftop at sunset'],
    },
];

export default function Personality() {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState('');
    const { user, refreshUser } = useUser();

    const handleAnswerChange = (questionId, option) => {
        setAnswers({ ...answers, [questionId]: option });
    };


    const handleSubmit = () => {
        const values = Object.values(answers);
        if (values.length !== questions.length) {
            alert('Please answer all questions!');
            return;
        }

        const vibeCount = {
            cutie: values.filter(v => ['Cute & Bubbly', 'Pastel Pink + White', 'Photo booth café'].includes(v)).length,
            dark: values.filter(v => ['Dark & Powerful', 'Black + Purple', 'Concert stage'].includes(v)).length,
            dreamer: values.filter(v => ['Fantasy Dreamcore', 'Fantasy', 'Rooftop at sunset'].includes(v)).length,
        };

        const maxVibe = Object.entries(vibeCount).sort((a, b) => b[1] - a[1])[0][0];

        const personalityResult =
        maxVibe === 'cutie' ? 'K-Drama Dreamer' :
        maxVibe === 'dark' ? 'K-pop Demon Hunter' :
        'Anime Mystic';

        setResult(`You're a ${personalityResult}`);

        fetch('/api/quiz/personality', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`  
            },
            body: JSON.stringify({
                userId: user?._id, // Use user ID from the fetched user data
                answers,
                result: personalityResult
            }),
        })
        .then(response => response.json())
        .then(() => refreshUser())
        .then((data) => {
                console.log('Results saved:', data); 
                refreshUser();
            })
        .catch((error) => console.error('Error saving results:', error));
    };
    return (
        <>
        <Navbar3 />
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Personality Quiz</h1>
            {questions.map((q) => (
                <div key={q.id} className="mb-6">
                    <p className="text-lg font-semibold mb-3 text-purple-800">{q.question}</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {q.options.map((option) =>(
                            <button key={option} onClick={() => handleAnswerChange(q.id, option)}
                            className={`border rounded-lg px-4 py-2 text-sm ${
                                answers[q.id] === option
                                    ? 'bg-purple-600 text-white border-purple-600'
                                    : 'bg-white text-purple-700 border-purple-300 hover:bg-purple-100'
                            }`}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit} 
            className="mt-6 w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600  font-semibold transition-colors">
                Reveal My Vibe
            </button>
            {result && (
                <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-400 text-purple-800">
                    <h2 className="text-xl font-bold">Your Vibe is:</h2>
                    <p className="mt-2">{result}</p>
                    <br/>
                <div className="text-center mt-6">
                    <button onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                        Take Quiz Again?</button>
                </div>
                </div>
                
            )}
            </div>
        </div>
        <Footer />
        </>
    );
}