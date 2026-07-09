import { useState, useEffect } from "react";
import api from "../api/axios.js";
import AddLibrary from "../components/AddLibrary.jsx";
import useAdminStore from "../zustand/AdminStore.js";
import LibraryList from "../components/LibraryList.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [showForm, setShowForm] = useState(false);
    const { setLibraries, setIsLoggedIn, setEmail } = useAdminStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLibraries = async () => {
            try {
                const res = await api.get("/admin/library/fetch");
                if (!res.data.libraries) {
                    setLibraries([]);
                } else setLibraries(res.data.libraries);
            } catch (err) {
                console.log(err);
            }
        };
        fetchLibraries();
    }, [setLibraries]);

    const handleLogout = async () => {
        try {
            const res = await api.get("/admin/auth/logout");
            if (res.data.success) {
                setIsLoggedIn(false);
                setEmail("");
                toast.success("Logged out successfully");
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
            console.log(err.response);
            console.log(err.response?.data);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Library Dashboard</h1>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                        >
                            + Add Library
                        </button>

                        <button
                            onClick={handleLogout}
                            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {showForm && (
                    <AddLibrary
                        setLibraries={setLibraries}
                        closeForm={() => setShowForm(false)}
                    />
                )}

                <LibraryList />
            </div>
        </div>
    );
}

export default Dashboard;
