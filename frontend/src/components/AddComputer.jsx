import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import useAdminStore from "../zustand/AdminStore.js";

function AddComputer() {
    const [name, setName] = useState("");
    const { library, setComputerData } = useAdminStore();

    const handleAddComputer = async () => {
        // console.log("Adding computer to library:", library._id);
        try {
            const res = await api.post(`/admin/computer/${library._id}/add`, {
                name,
            });
            if (res.data.success) {
                toast.success("Computer added successfully");
                setComputerData((prevData) => [...prevData, res.data.computer]);
            }
        } catch (err) {
            console.error("Error adding computer:", err);
            toast.error("Failed to add computer");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleAddComputer}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Add Computer
                </h2>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Computer Name
                    </label>
                    <input
                        type="text"
                        name="computerName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter computer name"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Add Computer
                </button>
            </form>
        </div>
    );
}

export default AddComputer;
