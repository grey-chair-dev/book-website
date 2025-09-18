import React from 'react';

interface EditHistoryProps {
  history: any[];
  onUndoEdit: (editId: number) => void;
}

const EditHistory: React.FC<EditHistoryProps> = ({ history, onUndoEdit }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Edit History</h3>
      {history.length === 0 ? (
        <p className="text-gray-500">No edit history available.</p>
      ) : (
        <div className="space-y-2">
          {history.map((edit) => (
            <div key={edit.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{edit.action}</p>
                  <p className="text-sm text-gray-600">{edit.description}</p>
                  <p className="text-xs text-gray-500">{edit.timestamp}</p>
                </div>
                <button
                  onClick={() => onUndoEdit(edit.id)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Undo
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditHistory;