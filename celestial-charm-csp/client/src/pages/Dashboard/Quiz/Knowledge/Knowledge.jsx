import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import { set } from "mongoose";

export default function Knowledge() {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [gems, setGems] = useState(null);
    const { updateUserContext, refreshUser, user } = useUser();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');
    
const fetchQuestions = async () => {
    setLoading(true);
    try {
        const response = await fetch(`/api/quiz/knowledge/questions?difficulty=${difficulty}&limit=10`);
        const data = await response.json();
        setQuestions(data || []);
        setAnswers({});
        setScore(null);
        setGems(null);
    } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([
            { _id: '1', question: 'Fallback Q1', options: ['A','B','C','D'], correct: 'A' },
            { _id: '2', question: 'Fallback Q2', options: ['A','B','C','D'], correct: 'B' },
            { _id: '3', question: 'Fallback Q3', options: ['A','B','C','D'], correct: 'C' },
            { _id: '4', question: 'Fallback Q4', options: ['A','B','C','D'], correct: 'D' },
        ]);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => { fetchQuestions(); }, [difficulty]);

    // const handleAnswer = (questionIndex, option) => {
    //     setAnswers({ ...answers, [questionIndex]: option });
    // };

    // const handleSubmit = () => {
    //     const correctCount = questions.reduce((count, question, index) => 
    //         count + (answers[index] === question.correct ? 1 : 0), 0);

    //     setScore(correctCount);
    //     setGems(correctCount);

    //     fetch('/api/quiz/knowledge', {
    //         method: 'POST',
    //         headers: { 
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`  
    //         },
    //         body: JSON.stringify({
    //             userId: user?._id,
    //             answers,
    //             score: correctCount,
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Results saved:', data); 
    //             refreshUser();
    //         })
    //         .catch((error) => console.error('Error saving results:', error));
    // };
const handleSubmit = async () => {
    let scoreCount = 0;
    questions.forEach(question => { if (answers[question._id] === question.correct) scoreCount++; });
    setScore(scoreCount);
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/quiz/knowledge/submit', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`  
            },
            body: JSON.stringify({
                difficulty,
                score: scoreCount,
                total: questions.length,
            }),
        });
        const data = await response.json();
        console.log('Results saved:', data);
        if (response.ok) {
            setGems(data.gemsEarned || 0);
            // await refreshUser();
            updateUserContext({ ...user, gems: (user?.gems || 0) + (data.gemsEarned || 0) });
        }
    } catch (error) {
        console.error('Error saving results:', error);
    }
};
    return (
        <>
        <Navbar3 />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to bg-purple-200 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Knowledge Quiz</h1>
                <div className="mb-6 flex gap-4 justify-center">
                    {['easy', 'medium', 'hard'].map((level) => ( 
                        <button key={level} onClick={() => setDifficulty(level)}
                        className={`px-4 py-2 rounded-xl border ${difficulty === level ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                    <button onClick={fetchQuestions} className="ml-auto px-4 py-2 rounded-xl bg-gray-100">New Questions</button>
                </div>
                {/* {questions.map((q, i) =>(
                    <div key={i} className="mb-6">
                        <p className="text-lg font-semibold mb-3 text-indigo-900">
                            {i + 1}. {q.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt) => (
                                <button key={opt} onClick={() => handleAnswer(i, opt)}
                                className={`border rounded-lg px-4 py-2 text-sm ${
                                    answers[i] === opt ?
                                    'bg-indigo-600 text-white border-indigo-600' :
                                    'bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-100'
                                }`}>{opt}</button>
                            ))}
                        </div>
                    </div>
                ))} */}
                {loading && <p>Loading questions...</p>}
                {!loading && questions.length === 0 && <p>No questions available.</p>}
                {!loading && questions.map((q, idx) => (
                    <div key={q._id} className="mb-4 p-4 rounded-xl border">
                        <div className="font-semibold mb-2 text-indigo-900">
                            {idx + 1}. {q.question}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt) => (
                                <button key={opt} onClick={() => setAnswers({ ...answers, [q._id]: opt })}
                                className={`border rounded-lg px-4 py-2 text-sm ${
                                    answers[q._id] === opt ?
                                    'bg-indigo-600 text-white border-indigo-600' :
                                    'bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-100'
                                }`}>{opt}</button>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleSubmit}
                className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold">
                    Submit Answers</button>

                {score !== null && (
                    <div className="mt-8 p-6 bg-indigo-100 text-center rounded-lg font-bold text-purple-800">
                        You got {score} / {questions.length} correct!
                    <br/>
                    <div className="text-center mt-6">
                        <button onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                            Take Quiz Again?</button>
                    </div>
                    </div>
                )}
                {gems !== null && (
                    <div className="mt-8 p-6 bg-indigo-100 text-center rounded-lg font-bold text-purple-800">
                        You've earned {gems} <i className="bi bi-gem"></i>
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
}