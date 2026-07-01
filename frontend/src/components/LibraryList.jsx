import LibraryCard from "./LibraryCard.jsx";

function LibraryList({ libraries, setLibraries }) {
    return (
        <div className="space-y-4">
            {libraries.map((library) => (
                <LibraryCard
                    key={library._id}
                    library={library}
                    setLibraries={setLibraries}
                />
            ))}
        </div>
    );
}

export default LibraryList;
