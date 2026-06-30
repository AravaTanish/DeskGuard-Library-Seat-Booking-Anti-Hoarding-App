import React from "react";
import LibraryCard from "./LibraryCard.jsx";

function LibraryList({ libraries, fetchLibraries }) {
    return (
        <div className="space-y-4">
            {libraries.map((library) => (
                <LibraryCard
                    key={library._id}
                    library={library}
                    fetchLibraries={fetchLibraries}
                />
            ))}
        </div>
    );
}

export default LibraryList;
