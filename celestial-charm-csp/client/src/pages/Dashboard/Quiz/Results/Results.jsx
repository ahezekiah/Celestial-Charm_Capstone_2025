import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPersonalityMeta } from "../../../../utils/personalityMeta";

export default function Results() {
    const [tab, setTab] = useState("knowledge"); // 'knowledge' | 'personality'
    const [knowledgeRows, setKnowledgeRows] = useState(/** @type {Array<any>} */([]));
    const [personalityRows, setPersonalityRows] = useState(/** @type {Array<any>} */([]));
    const [rows, setRows] = useState(/** @type {Array<any>} */([]));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [difficulty, setDifficulty] = useState("all");

    const fetchKnowledge = async (d = difficulty) => {
        setLoading(true); setError("");
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/quiz/knowledge/results?difficulty=${d}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok || data.ok === false) throw new Error(data.error || "Failed to load knowledge results");
            setKnowledgeRows(Array.isArray(data.results) ? data.results : []);
        } catch (e) {
            setError(String(e.message || e)); setKnowledgeRows([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchPersonality = async () => {
        setLoading(true); setError("");
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/quiz/personality/results`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok || data.ok === false) throw new Error(data.error || "Failed to load personality results");
            setPersonalityRows(Array.isArray(data.results) ? data.results : []);
        } catch (e) {
            setError(String(e.message || e)); setPersonalityRows([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchKnowledge(); fetchPersonality(); }, []);
    useEffect(() => { if (tab === "knowledge") fetchKnowledge(difficulty); }, [tab, difficulty]);
    useEffect(() => { if (tab === "personality") fetchPersonality(); }, [tab]);


    
    return (
        <>
        <Navbar3 />
            <div className="min-h-screen bg-lavender p-6">
                <div className="max-w-4xl mx-auto p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">Your Quiz Results</h1>

                        {/* Tabs */}
                        <div className="inline-flex rounded-xl border overflow-hidden">
                        <button
                            className={`px-4 py-2 text-sm ${tab === "knowledge" ? "bg-indigo-600 text-white" : "bg-white"}`}
                            onClick={() => setTab("knowledge")}
                        >
                            Knowledge
                        </button>
                        <button
                            className={`px-4 py-2 text-sm ${tab === "personality" ? "bg-indigo-600 text-white" : "bg-white"}`}
                            onClick={() => setTab("personality")}
                        >
                            Personality
                        </button>
                        </div>
                    </div>

                {tab === "knowledge" && (
                    <div className="mb-4 flex items-center gap-3">
                    <span className="text-sm text-gray-600">Filter:</span>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="border rounded-xl px-3 py-2"
                    >
                        <option value="all">All</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    </div>
                )}

                {loading && <div>Loading…</div>}
                {error && <div className="text-rose-600">{error}</div>}

                {/* Knowledge list */}
                {tab === "knowledge" && !loading && (
                    <>
                    {knowledgeRows.length === 0 && !error && <div>No knowledge results yet.</div>}
                        <div className="space-y-3">
                            {knowledgeRows.map((r, i) => (
                                <div key={i}
                                    className="rounded-2xl p-5 border bg-gradient-to-br from-violet-50 to-indigo-50 shadow-sm
                                            hover:shadow-md transition ring-1 ring-inset ring-violet-100">
                                <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm uppercase tracking-wide text-indigo-600 font-semibold">
                                        {r.difficulty} quiz
                                    </div>
                                    <div className="text-lg font-bold mt-1">
                                        Score: {r.score} / {r.total}
                                    </div>
                                </div>
                                <div className="text-2xl font-extrabold text-indigo-700">{r.earnedGems} 💎</div>
                                </div>
                                    <div className="mt-2 text-xs text-gray-500">
                                        {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Personality list */}
                {tab === "personality" && !loading && (
                    <>
                    {personalityRows.length === 0 && !error && <div>No personality results yet.</div>}
                        <div className="space-y-3">
                            {personalityRows.map((r, i) => {
                                const typeRaw =
                                    r.personalityType ||
                                    r?.details?.type ||
                                    r?.details?.mbti ||
                                    r?.type ||
                                    r?.result ||
                                    "";

                                const meta = getPersonalityMeta(typeRaw);

                                return (
                                    <div key={i}
                                        className="relative overflow-hidden rounded-2xl p-5 border bg-gradient-to-br
                                            from-pink-50 via-rose-50 to-amber-50 shadow-sm hover:shadow-md transition
                                            ring-1 ring-inset ring-rose-100">
                                        {/* subtle glow */}
                                        <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-pink-200/30 blur-3xl" />
                                        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl" />

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="text-xl font-extrabold">
                                                    {meta.emoji} {meta.code} · {meta.name}
                                                </div>
                                                <div className="mt-1 text-sm text-gray-700 max-w-prose">{meta.blurb}</div>

                                                {r.details && Object.keys(r.details).length > 0 && (
                                                    <div className="mt-2 text-xs text-gray-600 flex flex-wrap gap-2">
                                                        {Object.entries(r.details).slice(0, 4).map(([k, v]) => (
                                                            <span key={k} className="px-2 py-0.5 rounded-full bg-white/70 ring-1 ring-gray-200">
                                                            {k}: <b>{String(v)}</b>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
                </div>
            </div>
        <Footer />
        </>
    );
}