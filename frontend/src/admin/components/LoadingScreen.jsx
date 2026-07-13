function Loading({ message = "Loading..." }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

        {/* Loading Text */}
        <p className="text-base font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export default Loading;
