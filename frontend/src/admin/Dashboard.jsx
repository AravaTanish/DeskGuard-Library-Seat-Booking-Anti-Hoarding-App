import { useState, useEffect } from "react";
import api from "../api/axios.js";
import AddLibrary from "../components/AddLibrary.jsx";
import LibraryList from "../components/LibraryList.jsx";

function Dashboard() {
  const [libraries, setLibraries] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Library Dashboard</h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            + Add Library
          </button>
        </div>

        {showForm && (
          <AddLibrary
            setLibraries={setLibraries}
            closeForm={() => setShowForm(false)}
          />
        )}

        <LibraryList libraries={libraries} setLibraries={setLibraries} />
      </div>
    </div>
  );
}

export default Dashboard;
