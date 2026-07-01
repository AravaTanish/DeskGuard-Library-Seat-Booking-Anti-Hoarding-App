import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api/axios.js'
import AddLibrary from '../components/AddLibrary.jsx'
import LibraryList from '../components/LibraryList.jsx'

function dashboard() {
  const [libraries, setLibraries] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchLibraries = async () => {
    try{
      const res = await api.get("/admin/library/fetch");
      setLibraries(res.data.libraries);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    fetchLibraries();
  }, []);

   return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-5xl">

                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        Library Dashboard
                    </h1>

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

                <LibraryList
                    libraries={libraries}
                    fetchLibraries={fetchLibraries}
                />

            </div>
        </div>
    );
}

export default dashboard
