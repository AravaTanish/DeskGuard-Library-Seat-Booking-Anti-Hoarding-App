import LibraryCard from "./LibraryCard.jsx";
import api from "../api/axios.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LibraryList({ libraries, setLibraries }) {
    const [computerData, setComputerData] = useState([]);
    const navigate = useNavigate();
    const handleOnClick = async (library) => {
        try {
            const res = await api.get(`/admin/computer/fetch`, {
                libraryId: library._id,
            });
            if (!res.data.computers) {
                setComputerData([]);
            } else {
                setComputerData(res.data.computers);
            }
            navigate("/admin/computer", { state: { computerData, library } });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="space-y-4">
            {libraries.map((library) => (
                <LibraryCard
                    onClick={() => handleOnClick(library)}
                    key={library._id}
                    library={library}
                    setLibraries={setLibraries}
                />
            ))}
        </div>
    );
}

export default LibraryList;
