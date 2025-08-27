import { useState, useEffect } from "react";
import './Account.css';
import { useUser } from "../../../context/UserContext";
import Navbar3 from "../../../components/NavBars/Navbar3";
import Footer from "../../../components/Footer/Footer";
import { useNavigate, Link } from "react-router-dom";
import fetchWithRefresh from "../../../utils/fetchWithRefresh";
import { getPersonalityMeta } from "../../../utils/personalityMeta";


export default function Account() {
    const { user, updateUserContext, logout, loading, refreshUser } = useUser();
    const BASE_URL = import.meta.env.VITE_API_URL || '';
    console.log("Base URL:", BASE_URL); // Debugging line
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        birthday: '',
        password: '',
        profilePicture: ''
    });
    const navigate = useNavigate();
    const [originalData, setOriginalData] = useState(null);
    const meta = user?.personalityType ? getPersonalityMeta(user.personalityType) : null;

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                username: user.username || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                birthday: user.birthday || '',
                password: '',
                profilePicture: user.profilePicture || ''
            });
        }
    }, [user]);

    useEffect(() => {
        if (loading || !user || !user._id) return;
        const fetchUserData = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/users/${user._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Fetch failed: ${res.status} - ${text}`);
                }
                const data = await res.json();
                setFormData(data);
                setOriginalData(data);
                console.log("Using user ID:", user?._id);
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('User session invalid. Please log in again.');
                logout();
                navigate('/login');
            }
        };
        fetchUserData();
    }, [user, loading]);

    useEffect(() => {
        refreshUser();
    }, []);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if(name === 'profilePicture'){
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData((prevData) => ({
                        ...prevData,
                        profilePicture: reader.result
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("DEBUG USER:", user);
        console.log("DEBUG user._id:", user?._id);

        if (loading || !user || !user._id) {
            console.error('User ID is missing or invalid');
            alert('User session invalid. Please log in again.');
            logout();
            navigate('/login');
            return;
        }
        try {
            const response = await fetchWithRefresh(`${BASE_URL}/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to update account');
            
            const updatedUser = await response.json();
            updateUserContext(updatedUser);
            alert('Account updated successfully!');
            navigate('/dashboard');
            console.log('Account updated successfully:', updatedUser);
        } catch (error) {
            console.error('Error updating account:', error);
            alert('Failed to update account. Please try again later.');
        }
    };

    const handleCancel = () => {
        setFormData(originalData);
        navigate('/dashboard');
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            try {
                await fetch(`${BASE_URL}/api/users/${user._id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                logout();
                navigate('/');
            } catch (err) {
                console.error('Delete failed:', err);
                alert('Could not delete account.');
            }
        }
    };
    const handlePfpUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
                setFormData((prev) => ({
                ...prev,
                profilePicture: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };


    if (loading || !formData) return <div className="account-container">Loading...</div>;
    return (
        <>
        <Navbar3 />
            <div className="account-container">
                <h1>Account Settings</h1>
                {/* <h2 className="text-xl text-center font-medium mb-1.5">Personality Type: <Link to='/personality'><i className="bi bi-person-heart text-pinkish"></i> {user?.personalityType || 'Not Set'} <i className="bi bi-person-hearts text-pinkish"></i></Link></h2> */}
                <h2 className="text-xl text-center font-medium mb-1.5">
                    Personality Type:&nbsp;
                    {meta ? (
                        <Link to="/personality" className="inline-flex items-center gap-2">
                        <span className="text-pinkish">{meta.emoji}</span>
                        <span className="font-semibold">{meta.code} · {meta.name}</span>
                        </Link>
                    ) : (
                        <Link to="/personality" className="inline-flex items-center gap-2">
                        <i className="bi bi-person-hearts text-pinkish" />
                        <span className="font-semibold">Not Set — Take the Quiz</span>
                        </Link>
                    )}
                    </h2>

                    {/* 💫 Vibe photocard */}
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
                <h3 className="text-base text-center font-medium mb-1.5"><Link to='/gem-shop'><i className="bi bi-gem text-blueish"></i> {user?.gems || 0}</Link></h3>
                <form onSubmit={handleSubmit} className="account-form">
                    <label htmlFor="pfp-upload" className="account-label">Profile Picture</label>
                    <div className="pfp-section">
                    <img
                        src={
                        formData.profilePicture
                            ? formData.profilePicture
                            : '/assets/default-pfp.jpg'
                        }
                        alt="Profile Picture"
                        className="account-pfp"
                    />
                    
                    <input
                        id="pfp-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePfpUpload}
                    />
                    <button
                        type="button"
                        className="clear-pfp-btn"
                        onClick={() => setFormData(prev => ({ ...prev, profilePicture: "" }))}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                    </div>

                    <label htmlFor="name" className="account-label">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    <label htmlFor="username" className="account-label">Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                    <label htmlFor="email" className="account-label">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <label htmlFor="phoneNumber" className="account-label">Phone Number</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                    <label htmlFor="birthday" className="account-label">Birthday</label>
                    <input type="string" name="birthday" value={formData.birthday} onChange={handleChange} />
                    <label htmlFor="password" className="account-label">New Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New Password (optional)" />

                    <div className="account-buttons">
                        <button type="submit" className="save-changes">Save Changes</button>
                        <button type="button" onClick={handleCancel} className="cancel">Cancel</button>
                        <button type="button" onClick={handleDeleteAccount} className="delete-account">Delete Account</button>
                    </div>
                </form>
            </div>
        <Footer />
        </>
    );
};