import { HiArrowLeft, HiPlus, HiSearch } from "react-icons/hi";
import { FaDesktop } from "react-icons/fa";
import { useLocation } from "react-router-dom";
function Computer() {
  const {state} = useLocation();
  const computerData = state.computerData;
  const library = state.library;
  const activeCount = computerData.filter((c) => c.isActivated).length;
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <button className="mb-3 flex items-center gap-2 text-gray-600 hover:text-black">
                        <HiArrowLeft size={22} />
                        {/* Back */}
                    </button>

                    <h1 className="text-3xl font-bold text-gray-800">
                        {library.name}
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage all computers in this library.
                    </p>
                </div>

                <button className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow hover:bg-green-700">
                    <HiPlus size={20} />
                    Add Computer
                </button>
            </div>

            {/* Stats */}
            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="rounded-xl bg-white p-5 shadow">
                    <p className="text-gray-500">Total Computers</p>
                    <h2 className="mt-2 text-3xl font-bold">
                        {computerData.length}
                    </h2>
                </div>

                <div className="rounded-xl bg-white p-5 shadow">
                    <p className="text-gray-500">Activated</p>
                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                        {activeCount}
                    </h2>
                </div>

                <div className="rounded-xl bg-white p-5 shadow">
                    <p className="text-gray-500">Not Activated</p>
                    <h2 className="mt-2 text-3xl font-bold text-red-600">
                        {computerData.length - activeCount}
                    </h2>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <HiSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                />

                <input
                    type="text"
                    placeholder="Search computers..."
                    className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Empty State */}
            {computerData.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl bg-white py-20 shadow">
                    <FaDesktop className="text-6xl text-gray-300" />

                    <h2 className="mt-6 text-2xl font-bold text-gray-700">
                        No Computers Added
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Add your first computer to this library.
                    </p>

                    {/* <button className="mt-8 flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
                        <HiPlus size={20} />
                        Add Computer
                    </button> */}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {computerData.map((computer) => (
                        <div
                            key={computer._id}
                            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div className="rounded-full bg-green-100 p-3">
                                    <FaDesktop
                                        size={24}
                                        className="text-green-600"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold">
                                        {computer.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {computer.createdAt}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm text-gray-500">Status</p>

                                {computer.isActivated ? (
                                    <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                        Activated
                                    </span>
                                ) : (
                                    <span className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                                        Not Activated
                                    </span>
                                )}
                            </div>

                            {computer.isActivated ? (
                                <button className="w-full rounded-lg bg-gray-900 py-3 font-semibold text-white hover:bg-black">
                                    View Details
                                </button>
                            ) : (
                                <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
                                    Activate
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Computer;


