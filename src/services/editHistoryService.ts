import { supabaseAdmin } from '../lib/supabase';

export interface EditRecord {
  id: number;
  table_name: string;
  record_id: string;
  action: 'create' | 'update' | 'delete';
  old_data: any;
  new_data: any;
  user_id?: string;
  created_at: string;
  description?: string;
}

export class EditHistoryService {
  // Log an edit action
  async logEdit(
    tableName: string,
    recordId: string,
    action: 'create' | 'update' | 'delete',
    oldData: any,
    newData: any,
    description?: string
  ): Promise<void> {
    try {
      await supabaseAdmin.from('edit_history').insert({
        table_name: tableName,
        record_id: recordId,
        action,
        old_data: oldData,
        new_data: newData,
        description: description || `${action} ${tableName} record ${recordId}`,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error logging edit:', error);
    }
  }

  // Get edit history for a specific record
  async getRecordHistory(tableName: string, recordId: string): Promise<EditRecord[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from('edit_history')
        .select('*')
        .eq('table_name', tableName)
        .eq('record_id', recordId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching record history:', error);
      return [];
    }
  }

  // Get recent edit history
  async getRecentHistory(limit: number = 50): Promise<EditRecord[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from('edit_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching recent history:', error);
      return [];
    }
  }

  // Undo the last edit for a record
  async undoLastEdit(tableName: string, recordId: string): Promise<boolean> {
    try {
      const history = await this.getRecordHistory(tableName, recordId);
      if (history.length === 0) return false;

      const lastEdit = history[0];
      
      if (lastEdit.action === 'create') {
        // If last action was create, delete the record
        await supabaseAdmin.from(tableName).delete().eq('id', recordId);
      } else if (lastEdit.action === 'update' && lastEdit.old_data) {
        // If last action was update, restore old data
        await supabaseAdmin
          .from(tableName)
          .update({ ...lastEdit.old_data, updated_at: new Date().toISOString() })
          .eq('id', recordId);
      } else if (lastEdit.action === 'delete' && lastEdit.old_data) {
        // If last action was delete, restore the record
        await supabaseAdmin.from(tableName).insert(lastEdit.old_data);
      }

      // Log the undo action
      await this.logEdit(
        tableName,
        recordId,
        'update',
        lastEdit.new_data,
        lastEdit.old_data,
        `Undo: ${lastEdit.description}`
      );

      return true;
    } catch (error) {
      console.error('Error undoing edit:', error);
      return false;
    }
  }

  // Clear history for a record
  async clearRecordHistory(tableName: string, recordId: string): Promise<void> {
    try {
      await supabaseAdmin
        .from('edit_history')
        .delete()
        .eq('table_name', tableName)
        .eq('record_id', recordId);
    } catch (error) {
      console.error('Error clearing record history:', error);
    }
  }
}

export const editHistoryService = new EditHistoryService();
export default editHistoryService;
