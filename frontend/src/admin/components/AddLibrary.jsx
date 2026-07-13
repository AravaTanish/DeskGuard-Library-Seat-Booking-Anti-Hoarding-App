import toast from "react-hot-toast";
import { useState } from "react";
import api from "../../api/axios.js";
import useAdminStore from "../../zustand/AdminStore.js";

function AddLibrary({ closeForm }) {
  const { libraries, setLibraries } = useAdminStore();
  const [libraryName, setLibraryName] = useState("");
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("admin/library/create", {
        name: libraryName,
      });
      if (res.data.success) {
        toast.success("Library created successfully!");
        const updatedLibraries = [...libraries, res.data.library];

        setLibraries(updatedLibraries);
        closeForm();
      }
      setLibraryName("");
    } catch (err) {
      console.log(err);
      toast.error("Error creating library. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="mb-8 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="mb-5 text-xl font-semibold">Add New Library</h2>

      <input
        type="text"
        placeholder="Library Name"
        value={libraryName}
        onChange={(e) => setLibraryName(e.target.value)}
        className="mb-5 w-full rounded-lg border p-3 outline-none focus:border-green-600"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-green-600 px-6 py-2 text-white"
        >
          Create
        </button>

        <button
          type="button"
          onClick={closeForm}
          className="rounded-lg bg-gray-300 px-6 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddLibrary;
