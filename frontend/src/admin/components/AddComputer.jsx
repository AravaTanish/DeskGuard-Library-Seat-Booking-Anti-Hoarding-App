import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios.js";
import useAdminStore from "../../zustand/AdminStore.js";
import { X } from "lucide-react";

function AddComputer({ closeForm }) {
  const [name, setName] = useState("");
  const { computerData, library, setComputerData } = useAdminStore();

  const handleAddComputer = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(`/admin/computer/${library._id}/add`, {
        name,
      });

      if (res.data.success) {
        toast.success("Computer added successfully");

        const newComputerData = [...computerData, res.data.computer];

        setComputerData(newComputerData);

        setName("");
        closeForm(); // Close the modal after adding
      }
    } catch (err) {
      console.error("Error adding computer:", err);
      toast.error("Failed to add computer");
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-none">
      {/* Close Button */}
      <button
        type="button"
        onClick={closeForm}
        className="absolute top-4 right-4 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
      >
        <X size={22} />
      </button>

      <form onSubmit={handleAddComputer}>
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Add Computer
        </h2>

        <div className="mb-5">
          <label className="mb-2 block font-medium">Computer Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter computer name"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Add Computer
        </button>
      </form>
    </div>
  );
}

export default AddComputer;
