export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <p className="mb-4 text-black">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
