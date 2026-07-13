import { Monitor, Trash2 } from "lucide-react";
import api from "../../api/axios.js";
import toast from "react-hot-toast";
import useAdminStore from "../../zustand/AdminStore.js";
import { useState } from "react";
import ActivationCode from "./ActivationCode.jsx";

function DisplayComputer() {
  const [showActivationCode, setShowActivationCode] = useState(false);
  const { computerData, library, setComputerData } =
    useAdminStore();
  const [activationCode, setActivationCode] = useState("");
  const handleActivate = async (computerId) => {
    try {
      const res = await api.put(
        `/admin/computer/${library._id}/get-activation-code`,
        {
          computerId: computerId,
        },
      );
      if (res.data.success) {
        toast.success("Activation code sent successfully");
        setActivationCode(res.data.activationCode);
        setShowActivationCode(true);
      }
    } catch (err) {
      console.error("Error sending activation code:", err);
      toast.error("Failed to send activation code");
    }
  };
  const handleDelete = async (computerId) => {
    try {
      const res = await api.delete(
        `/admin/computer/${library._id}/delete/${computerId}`,
      );
      if (res.data.success) {
        toast.success("Computer deleted successfully");

        const updatedComputers = computerData.filter(
          (c) => c._id !== computerId,
        );

        setComputerData(updatedComputers);
      }
    } catch (err) {
      console.error("Error deleting computer:", err);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-4">
      {computerData.map((computer) => (
        <div
          key={computer._id}
          className="w-50 bg-white rounded-lg py-4 px-2 shadow flex flex-col items-center"
        >
          {/* Computer Name */}
          <h2 className="text-xl font-semibold mb-3 text-center">
            {computer.name}
          </h2>

          {/* Icon Box */}
          <div
            className={`w-30 h-20 rounded-xl flex items-center justify-center mb-4 ${
              computer.status === "free"
                ? "bg-green-100"
                : computer.status === "occupied"
                  ? "bg-red-100"
                  : "bg-yellow-100"
            }`}
          >
            <Monitor
              size={38}
              className={
                computer.status === "free"
                  ? "text-green-600"
                  : computer.status === "occupied"
                    ? "text-red-600"
                    : "text-yellow-600"
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex w-30 gap-1">
            <button
              onClick={() => handleActivate(computer._id)}
              className={`flex-1 py-1 text-xs rounded-md text-white transition ${
                computer.isActive
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {computer.isActive ? "Deactivate" : "Activate"}
            </button>

            <button
              onClick={() => handleDelete(computer._id)}
              className="w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 flex justify-center items-center"
            >
              <Trash2 size={16} className="text-white" />
            </button>
          </div>
          {showActivationCode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
              <ActivationCode
                code={activationCode}
                onClose={() => setShowActivationCode(false)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplayComputer;
