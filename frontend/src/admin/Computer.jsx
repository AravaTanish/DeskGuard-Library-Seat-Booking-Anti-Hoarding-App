import { HiArrowLeft, HiPlus, HiSearch } from "react-icons/hi";
import { FaDesktop } from "react-icons/fa";
import { useState } from "react";
import AddComputer from "../components/AddComputer.jsx";
import useAdminStore from "../zustand/AdminStore.js";
import { useEffect } from "react";
import api from "../api/axios.js";
import DisplayComputer from "../components/DisplayComputer.jsx";

function Computer() {
    const {library, computerData, setComputerData } = useAdminStore();
    const activeCount = computerData.filter((c) => c.isActivated).length;
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        try{
            const fetchComputers = async () => {
                const res = await api.get(`/admin/computer/${library._id}/fetch`);
                if (res.data.success) {
                    setComputerData(res.data.computers);
                }
            };
            fetchComputers();
        } catch (err) {
            console.error("Error fetching computers:", err);
        }
    },[library._id, setComputerData]);

    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <button className="mb-3 flex items-center gap-2 text-gray-600 hover:text-black">
                        <HiArrowLeft size={22} />
                        {/* Back */}
                    </button>

                    <h1 className="text-3xl font-bold text-gray-800">
                        {library.name}
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage all computers in this library.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow hover:bg-green-700"
                >
                    <HiPlus size={20} />
                    Add Computer
                </button>
            </div>
            {showForm && (
                <AddComputer
                    libraryId={library._id}
                    setComputerData={setComputerData}
                    closeForm={() => setShowForm(false)}
                />
            )}

            {/* Stats */}
            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="rounded-xl bg-white p-5 shadow">
                    <p className="text-gray-500">Total Computers</p>
                    <h2 className="mt-2 text-3xl font-bold">
                        {computerData.length}
                    </h2>
                </div>

                <div className="rounded-xl bg-white p-5 shadow">
                    <p className="text-gray-500">Activated</p>
                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                        {activeCount}
                    </h2>
                </div>

                <div className="rounded-xl bg-white p-5 shadow">
                    <p className="text-gray-500">Not Activated</p>
                    <h2 className="mt-2 text-3xl font-bold text-red-600">
                        {computerData.length - activeCount}
                    </h2>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <HiSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                />

                <input
                    type="text"
                    placeholder="Search computers..."
                    className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Empty State */}
            {computerData.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl bg-white py-20 shadow">
                    <FaDesktop className="text-6xl text-gray-300" />

                    <h2 className="mt-6 text-2xl font-bold text-gray-700">
                        No Computers Added
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Add your first computer to this library.
                    </p>
                </div>
            ) : (

                <DisplayComputer computers={computerData} />
            )}
        </div>
    );
}

export default Computer;
