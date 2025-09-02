import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import { useState, useMemo } from "react";
import { getPersonalityMeta } from "../../../../utils/personalityMeta";
import { Link } from "react-router-dom";


// ---------- Question bank (12) ----------
const QUESTIONS = [
  // Extrovert(E) vs Introvert(I)
    {
        id: "Q1",
        text: "Concert night: what's your default move?",
        axis: "EI",
        A: { label: "Front row, making friends in the queue", letter: "E" },
        B: { label: "Back row, soaking vibes with AirPods after", letter: "I" },
    },
    {
        id: "Q2",
        text: "Group projects feel like…",
        axis: "EI",
        A: { label: "Brainstorm swarm, let's go!", letter: "E" },
        B: { label: "Let me cook solo, I'll present later", letter: "I" },
    },

    // Sensing(S) vs Intuition(N)
    {
        id: "Q3",
        text: "Your bias' teaser drops:",
        axis: "SN",
        A: { label: "Focus on styling, set, choreography details", letter: "S" },
        B: { label: "Spin lore theories and hidden symbolism", letter: "N" },
    },
    {
        id: "Q4",
        text: "Anime plot preference?",
        axis: "SN",
        A: { label: "Crisp action, clear goals, grounded world", letter: "S" },
        B: { label: "Mind-bendy arcs & worldbuilding mysteries", letter: "N" },
    },

    // Thinking(T) vs Feeling(F)
    {
        id: "Q5",
        text: "Fandom debate pops off:",
        axis: "TF",
        A: { label: "Drop receipts and logic to settle it", letter: "T" },
        B: { label: "De-escalate, keep it kind & inclusive", letter: "F" },
    },
    {
        id: "Q6",
        text: "Friend asks for comeback outfit advice:",
        axis: "TF",
        A: { label: "Break down color theory + silhouettes", letter: "T" },
        B: { label: "Boost their confidence & pick what feels 'them'", letter: "F" },
    },

    // Judging(J) vs Perceiving(P)
    {
        id: "Q7",
        text: "Trip to Korea planning style:",
        axis: "JP",
        A: { label: "Full itinerary, reservations locked", letter: "J" },
        B: { label: "Vibe route — explore and improvise", letter: "P" },
    },
    {
        id: "Q8",
        text: "Your workspace before studying:",
        axis: "JP",
        A: { label: "Tidy, calendar synced, to-do list ready", letter: "J" },
        B: { label: "Organized chaos — I know where things are", letter: "P" },
    },

    // bonus variety (repeat axes with new skins)
    {
        id: "Q9",
        text: "Which role do you play in a dance cover team?",
        axis: "EI",
        A: { label: "Hype captain + social lead", letter: "E" },
        B: { label: "Precision choreo analyst", letter: "I" },
    },
    {
        id: "Q10",
        text: "When an MV ends on a cliffhanger, you…",
        axis: "SN",
        A: { label: "Replay to catch concrete clues", letter: "S" },
        B: { label: "Draft a 3-page theory thread", letter: "N" },
    },
    {
        id: "Q11",
        text: "Choosing your next anime:",
        axis: "TF",
        A: { label: "Reviews, ratings, staff — objective pick", letter: "T" },
        B: { label: "What makes my heart feel something?", letter: "F" },
    },
    {
        id: "Q12",
        text: "Deadline incoming:",
        axis: "JP",
        A: { label: "Schedule, milestones, done early", letter: "J" },
        B: { label: "Creative sprint right before — still clutch", letter: "P" },
    },
];

const INITIAL_ANS = Object.fromEntries(QUESTIONS.map((q) => [q.id, null]));

function computeMbti(answers) {
    const tallies = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    QUESTIONS.forEach((q) => {
        const pick = answers[q.id];
        if (!pick) return;
        tallies[pick] += 1;
    });
    const EorI = tallies.E >= tallies.I ? "E" : "I";
    const SorN = tallies.S >= tallies.N ? "S" : "N";
    const TorF = tallies.T >= tallies.F ? "T" : "F";
    const JorP = tallies.J >= tallies.P ? "J" : "P";
    return `${EorI}${SorN}${TorF}${JorP}`;
}

export default function Personality() {
    const [answers, setAnswers] = useState(INITIAL_ANS);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    const progress = useMemo(() => {
        const answered = Object.values(answers).filter(Boolean).length;
        return Math.round((answered / QUESTIONS.length) * 100);
    }, [answers]);

    const handlePick = (id, letter) => {
        setAnswers((prev) => ({ ...prev, [id]: letter }));
    };

    


    const handleSubmit = async () => {
        const code = computeMbti(answers);
        const meta = getPersonalityMeta(code);
        setResult( {code: meta.code, name: meta.name, emoji: meta.emoji, blurb: meta.blurb}, `${meta.code}  ${meta.name}  ${meta.emoji}\n\n${meta.blurb}`);

        try {
            setSubmitting(true);
        
            await fetch("/api/quiz/personality/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ 
                    personalityType: code, 
                    details: { vibe: meta.name } 
                }),
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setAnswers(INITIAL_ANS);
        setResult(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
        <Navbar3 />
        <div className="min-h-screen bg-lavender p-6">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-violet-50 via-indigo-50 to-pink-50 rounded-xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Personality Quiz</h1>
            <p className="text-gray-600 mt-1">
                K-pop & Anime-flavored questions that map to your MBTI — then we style it to your vibe.
            </p>

            {/* progress */}
            <div className="mt-4">
                <div className="h-2 w-full bg-white rounded-full ring-1 ring-gray-200 overflow-hidden">
                <div
                    className="h-full bg-indigo-500 transition-all"
                    style={{ width: `${progress}%` }}/>
                </div>
                <div className="mt-1 text-xs text-gray-600">{progress}% answered</div>
            </div>


            {/* questions */}
            <div className="mt-6 space-y-4">
                {QUESTIONS.map((q, idx) => {
                    const selected = answers[q.id];
                    return (
                        <div key={q.id}
                            className="rounded-2xl border bg-white/80 backdrop-blur p-4 ring-1 ring-gray-100">
                            <div className="font-semibold mb-3">
                                {idx + 1}. {q.text}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button onClick={() => handlePick(q.id, q.A.letter)}
                                    className={`px-4 py-3 rounded-xl border text-left ${
                                        selected === q.A.letter
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-white hover:bg-indigo-50"}`}>
                                    {q.A.label}
                                </button>
                                <button onClick={() => handlePick(q.id, q.B.letter)}
                                    className={`px-4 py-3 rounded-xl border text-left ${
                                        selected === q.B.letter
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-white hover:bg-indigo-50"}`}>
                                    {q.B.label}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex items-center gap-3">
                <button onClick={handleSubmit} disabled={submitting || progress < 50}
                    className="px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                    title={progress < 50 ? "Answer a few more to get a solid read" : "Submit"}>
                    {submitting ? "Saving…" : "See My Type"}
                </button>
                <button onClick={handleReset} className="px-5 py-3 rounded-xl bg-white border">
                    Reset
                </button>
            </div>

            {result && (
                <div className="mt-8 relative overflow-hidden rounded-2xl p-6 border bg-gradient-to-br
                        from-pink-50 via-rose-50 to-amber-50 ring-1 ring-inset ring-rose-100 shadow-md">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full bg-pink-200/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-amber-200/30 blur-3xl" />
                    <div className="relative">
                        <div className="text-2xl font-extrabold">
                            {result.emoji} {result.code} · {result.name}
                        </div>
                        <div className="mt-2 text-gray-700">{result.blurb}</div>

                        <div className="mt-4 flex items-center gap-3">
                            <Link to="/results"
                                className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                                View My Results
                            </Link>
                            <button onClick={handleReset} className="px-4 py-2 rounded-xl bg-white border">
                                Take Again
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
        <Footer />
        </>
    );
}