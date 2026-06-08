import Modal from "./Modal";

const DeleteModal = ({ lead, onConfirm, onCancel, loading }) => {
  return (
    <Modal open={!!lead} title="Delete Lead" onClose={onCancel} size="sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Delete <span className="font-semibold">{lead?.name}</span>?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            This action cannot be undone. The lead record will be permanently removed.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 w-full pt-2 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
