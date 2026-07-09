import { FaCheck } from "react-icons/fa6";

export default function StudentSuccess() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-5">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-6xl text-green-600">
            <FaCheck />
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-green-600">
          Login Successful
        </h1>

        <p className="mt-3 text-gray-600">
          Your presence has been recorded successfully.
        </p>

        <div className="mt-8 bg-gray-50 rounded-2xl p-5 space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-semibold">John Doe</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Roll No</span>
            <span className="font-semibold">22CS101</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Computer</span>
            <span className="font-semibold">Lab-05</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Time</span>
            <span className="font-semibold">10:42 AM</span>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          You may now use the assigned computer.
        </p>

        <button className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl font-semibold active:scale-95 transition">
          Done
        </button>
      </div>
    </div>
  );
}
