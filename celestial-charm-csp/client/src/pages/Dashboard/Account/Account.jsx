import { useState, useEffect } from "react";
import "./Account.css";
import Navbar3 from "../../../components/NavBars/Navbar3";
import Footer from "../../../components/Footer/Footer";
import { useNavigate, Link } from "react-router-dom";
import { getPersonalityMeta } from "../../../utils/personalityMeta";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../lib/api";

export default function Account() {
    const navigate = useNavigate();
    const { logout, setUser, user, status  } = useAuth();
    if (status !== "authenticated") return <div className="p-6">Please log in.</div>;

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        birthday: "",
        password: "",
        profilePicture: "",
    });
    const [originalData, setOriginalData] = useState(null);
    const [saving, setSaving] = useState(false);
    const meta = user?.personalityType ? getPersonalityMeta(user.personalityType) : null;

    // Block render until auth finishes
    

    // Seed form from current user
    useEffect(() => {
        if (!user) return;
        setFormData({
            name: user.name || "",
            username: user.username || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            birthday: user.birthday || "",
            password: "",
            profilePicture: user.profilePicture || "",
        });
    }, [user]);

    // Fetch fresh user from API (uses cookie session)
    useEffect(() => {
        let ignore = false;
        const run = async () => {
            try {
                const data = await api(`/users/${user._id}`); // returns parsed JSON
                if (ignore) return;
                setFormData((prev) => ({
                    ...prev,
                    name: data.name || "",
                    username: data.username || "",
                    email: data.email || "",
                    phoneNumber: data.phoneNumber || "",
                    birthday: data.birthday || "",
                    profilePicture: data.profilePicture || "",
                }));
                setOriginalData(data);
            } catch (err) {
                console.error("Error fetching user:", err);
                alert("Your session looks invalid. Please log in again.");
                logout();
                navigate("/login");
            }
        };
        if (user?._id) run();
        return () => {
            ignore = true;
        };
    }, [user?._id, logout, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePicture" && files?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () =>
                setFormData((p) => ({ ...p, profilePicture: reader.result }));
            reader.readAsDataURL(files[0]);
            return;
        }
            setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?._id) {
            alert("User session invalid. Please log in again.");
            logout();
            navigate("/login");
            return;
        }
        try {
            setSaving(true);

            // Send only changed fields (keeps payload lean)
            const payload = {};
            for (const k of Object.keys(formData)) {
                if (k === "password" && !formData.password) continue; // optional
                if (!originalData || formData[k] !== originalData[k]) payload[k] = formData[k];
            }

            await api(`/users/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            // Refresh /auth/me to update context
            const me = await api(`/auth/me`);
            setUser(me.user);
            alert("Account updated successfully!");
            navigate("/dashboard");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update account. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (originalData) {
        setFormData({
            name: originalData.name || "",
            username: originalData.username || "",
            email: originalData.email || "",
            phoneNumber: originalData.phoneNumber || "",
            birthday: originalData.birthday || "",
            password: "",
            profilePicture: originalData.profilePicture || "",
        });
        }
        navigate("/dashboard");
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;
        try {
            await api(`/users/${user._id}`, { method: "DELETE" });
            logout();
            alert("Account deleted. We're sorry to see you go.");
            navigate("/");
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Could not delete account.");
        }
    };

    return (
        <>
            <Navbar3 />
            <div className="account-container">
                <h1>Account Settings</h1>

                <h2 className="text-xl text-center font-medium mb-1.5">
                Personality Type:&nbsp;
                {meta ? (
                    <Link to="/personality" className="inline-flex items-center gap-2">
                    <span className="text-pinkish">{meta.emoji}</span>
                    <span className="font-semibold">
                        {meta.code} · {meta.name}
                    </span>
                    </Link>
                ) : (
                    <Link to="/personality" className="inline-flex items-center gap-2">
                    <i className="bi bi-person-hearts text-pinkish" />
                    <span className="font-semibold">Not Set — Take the Quiz</span>
                    </Link>
                )}
                </h2>

                {meta && (
                <div className="relative overflow-hidden rounded-2xl p-5 border bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 shadow-sm ring-1 ring-inset ring-rose-100 mb-4">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full bg-pink-200/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-amber-200/30 blur-3xl" />
                    <div className="relative">
                    <div className="text-lg font-extrabold">
                        {meta.emoji} {meta.code} · {meta.name}
                    </div>
                    <div className="mt-1 text-gray-700">{meta.blurb}</div>
                    <div className="mt-3 flex items-center gap-3">
                        <Link to="/results" className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                            View All Results
                        </Link>
                        <Link to="/personality" className="px-3 py-2 rounded-xl bg-white border hover:bg-gray-50">
                            Retake Quiz
                        </Link>
                    </div>
                    </div>
                </div>
                )}

                <h3 className="text-base text-center font-medium mb-1.5">
                <Link to="/gem-shop">
                    <i className="bi bi-gem text-blueish"></i> {user?.gems || 0}
                </Link>
                </h3>

                <form onSubmit={handleSubmit} className="account-form">
                <label htmlFor="pfp-upload" className="account-label">
                    Profile Picture
                </label>
                <div className="pfp-section">
                    <img
                    src={formData.profilePicture ? formData.profilePicture : "/assets/default-pfp.jpg"}
                    alt="Profile"
                    className="account-pfp"
                    />
                    <input id="pfp-upload" type="file" accept="image/*" name="profilePicture" onChange={handleChange} />
                    <button
                    type="button"
                    className="clear-pfp-btn"
                    onClick={() => setFormData((p) => ({ ...p, profilePicture: "" }))}
                    >
                    <i className="bi bi-x-lg" />
                    </button>
                </div>

                <label className="account-label">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label className="account-label">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />

                <label className="account-label">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label className="account-label">Phone Number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    inputMode="tel"
                    placeholder="123-456-7890"
                    value={formData.phoneNumber}
                    onChange={handleChange}/>

                <label className="account-label">Birthday</label>
                <input type="date" name="birthday" value={formData.birthday || ""} onChange={handleChange} />

                <label className="account-label">New Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="New Password (optional)"/>

                <div className="account-buttons">
                    <button type="submit" className="save-changes" disabled={saving}>
                    {saving ? "Saving…" : "Save Changes"}
                    </button>
                    <button type="button" onClick={handleCancel} className="cancel" disabled={saving}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleDeleteAccount} className="delete-account" disabled={saving}>
                        Delete Account
                    </button>
                </div>
                </form>
            </div>
            <Footer />
        </>
    );
}
