import React from 'react'
import api from '../api/axios.js'

function LibraryCard({ library, fetchLibraries }) {
	const handleDelete = async () => {
		try{
			const res = await api.delete(`/admin/library/delete/${library._id}`);
			if(res.status === 200){
				fetchLibraries();
			}
		}
		catch(err){
			console.log(err);
		}
	}
  return (
        <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow">

            <h2 className="text-lg font-semibold">
                {library.name}
            </h2>

            <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
                Remove
            </button>

        </div>
    );
}

export default LibraryCard
