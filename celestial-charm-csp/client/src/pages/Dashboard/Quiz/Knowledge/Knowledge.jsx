import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";

const questions = [
    {
        question: "Which K-pop girl group released the song 'Pink Venom'?",
        options: ['BLACKPINK', 'Twice', 'Red Velvet', 'ITZY'],
        correct: 'BLACKPINK',
    },
    {
        question: 'Who is the main character in Demon Slayer?',
        options: ['Tanjiro Kamado', 'Satoru Gojo', 'Izuku Midoriya', 'Monkey D. Luffy',],
        correct: 'Tanjiro Kamado',
    },
    {
        question: 'Which K-pop boy group performed at Coachella 2024?',
        options: ['BTS', 'Stray Kids', 'ATEEZ', 'ENHYPEN'],
        correct: 'ATEEZ',
    },
    {
        question: "In 'Attack on Titan', who has the Founding Titan power?",
        options: ['Eren Yeager', 'Mikasa Ackerman', 'Armin Arlert', 'Levi Ackerman'],
        correct: 'Eren Yeager',
    },
    {
        question: "Which K-pop girl group debuted with the song 'Fearless'?",
        options: ['LE SSERAFIM', 'ITZY', 'IVE', 'STAYC'],
        correct: 'LE SSERAFIM',
    },
    {
        question: "From the anime 'Jujutsu Kaisen', what does the term 領域展開 (Ryōiki Tenkai) mean'?",
        options: ['Domain Expansion', 'Cursed Technique', 'Shinigami Power', 'Spirit Bomb'],
        correct: 'Domain Expansion',
    },
];
export default function Knowledge() {
    const [users, setUser] = useState(null);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [gems, setGems] = useState(null);
    const { updateUserContext, refreshUser, user } = useUser();
    

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //     //     fetch('/api/auth/me', {
    //     //         headers: { 'Authorization': `Bearer ${token}` },
    //     // })
    //     //     .then(response => response.json())
    //     //     .then(data => setUser(data.user))
    //     //     .catch(() => setUser(null));

    //         fetch('/api/auth/me', {
    //             headers: { Authorization: `Bearer ${localStorage.getItem(token)}`}
    //         })
    //         .then(res => res.json)
    //         .then(data => {
    //             if (data.user) updateUserContext(data.user);
    //         })
    //         .catch(() => setUser(null));
    //     };
        
    // }, []);

    const handleAnswer = (questionIndex, option) => {
        setAnswers({ ...answers, [questionIndex]: option });
    };

    const handleSubmit = () => {
        const correctCount = questions.reduce((count, question, index) => 
            count + (answers[index] === question.correct ? 1 : 0), 0);

        setScore(correctCount);
        setGems(correctCount);

        fetch('/api/quiz/knowledge', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`  
            },
            body: JSON.stringify({
                userId: user?._id,
                answers,
                score: correctCount,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Results saved:', data); 
                refreshUser();
            })
            .catch((error) => console.error('Error saving results:', error));
    };
    return (
        <>
        <Navbar3 />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to bg-purple-200 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Knowledge Quiz</h1>
                {questions.map((q, i) =>(
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