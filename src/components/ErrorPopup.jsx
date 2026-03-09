function ErrorPopup({ message, onClose }) {

  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="bg-white p-6 rounded-xl shadow-xl w-96">

        {/* Title */}
        <h2 className="text-xl font-bold text-red-600 mb-3">
          ❌ Validation Error
        </h2>

        {/* Message */}
        <p className="text-gray-700 mb-6">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg cursor-pointer"
        >
          OK
        </button>

      </div>

    </div>
  );
}

export default ErrorPopup;
