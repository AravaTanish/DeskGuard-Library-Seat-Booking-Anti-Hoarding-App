function DisplayComputer({ computers }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {computers.map((computer) => (
                <div
                    key={computer._id}
                    className="bg-white border rounded-lg shadow-sm p-5"
                >
                    <h2 className="text-lg font-semibold">
                        Computer Name: {computer.name}
                    </h2>

                    <div className="mt-3">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                computer.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {computer.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>

                    <div className="flex justify-between mt-5">
                        <button
                            className={`px-4 py-2 rounded-md text-white ${
                                computer.isActive
                                    ? "bg-yellow-500 hover:bg-yellow-600"
                                    : "bg-green-600 hover:bg-green-700"
                            }`}
                        >
                            {computer.isActive ? "Deactivate" : "Activate"}
                        </button>

                        <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DisplayComputer;
