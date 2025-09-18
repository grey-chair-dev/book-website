import React, { useState, useEffect, useCallback } from 'react';
import { History, Undo, Trash2, Eye, Clock, User, Database } from 'lucide-react';
import { editHistoryService, EditRecord } from '../services/editHistoryService';

interface EditHistoryProps {
  tableName?: string;
  recordId?: string;
  onUndo?: () => void;
}

const EditHistory: React.FC<EditHistoryProps> = ({ tableName, recordId, onUndo }) => {
  const [history, setHistory] = useState<EditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      let data: EditRecord[];
      if (tableName && recordId) {
        data = await editHistoryService.getRecordHistory(tableName, recordId);
      } else {
        data = await editHistoryService.getRecentHistory(50);
      }
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  }, [tableName, recordId]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleUndo = async (edit: EditRecord) => {
    if (window.confirm(`Are you sure you want to undo "${edit.description}"?`)) {
      const success = await editHistoryService.undoLastEdit(edit.table_name, edit.record_id);
      if (success) {
        await loadHistory();
        onUndo?.();
      } else {
        alert('Failed to undo edit. Please try again.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <Database className="h-4 w-4 text-green-600" />;
      case 'update':
        return <History className="h-4 w-4 text-blue-600" />;
      case 'delete':
        return <Trash2 className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Edit History</h3>
        </div>
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {tableName && recordId ? 'Record History' : 'Recent Edits'}
          </h3>
        </div>
        <button
          onClick={loadHistory}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Refresh
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8">
          <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No edit history found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((edit) => (
            <div key={edit.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getActionIcon(edit.action)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(edit.action)}`}>
                        {edit.action.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">
                        {edit.table_name}.{edit.record_id}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {edit.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(edit.created_at)}
                      </div>
                      {edit.user_id && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {edit.user_id}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDetails(showDetails === edit.id ? null : edit.id)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {edit.action !== 'create' && (
                    <button
                      onClick={() => handleUndo(edit)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Undo this edit"
                    >
                      <Undo className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {showDetails === edit.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {edit.old_data && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Before:</h4>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-32">
                          {JSON.stringify(edit.old_data, null, 2)}
                        </pre>
                      </div>
                    )}
                    {edit.new_data && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">After:</h4>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-32">
                          {JSON.stringify(edit.new_data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditHistory;
