import LibraryCard from "./LibraryCard.jsx";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../zustand/AdminStore.js";

function LibraryList() {
  const { setLibrary, setComputerData } = useAdminStore();
  const { libraries, setLibraries } = useAdminStore();
  const navigate = useNavigate();
  const handleOnClick = async (library) => {
    console.log("Fetching computers for library:", library._id);
    try {
      const res = await api.get(`/admin/computer/${library._id}/fetch`);
      if (!res.data.computers) {
        setComputerData([]);
      } else {
        setComputerData(res.data.computers);
      }
      setLibrary(library);
      navigate("/admin/computer");
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
