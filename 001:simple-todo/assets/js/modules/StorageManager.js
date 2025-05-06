/**
 * StorageManager is responsible for persisting data to localStorage
 * and retrieving it when the application loads
 */
class StorageManager {
  constructor() {
    this.storageKey = 'todo-app-tasks';
  }

  /**
   * Save tasks to localStorage
   * @param {Array} tasks - Array of task objects
   * @returns {Promise<object>} - Promise resolving with success status and message
   */
  async saveTasks(tasks) {
    try {
      const tasksJSON = JSON.stringify(tasks);
      localStorage.setItem(this.storageKey, tasksJSON);
      return { success: true };
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      return { success: false, message: 'Failed to save tasks to local storage.' };
    }
  }

  /**
   * Load tasks from localStorage
   * @returns {Promise<object>} - Promise resolving with success status and data or error message
   */
  async loadTasks() {
    try {
      const tasksJSON = localStorage.getItem(this.storageKey);
      if (!tasksJSON) {
        return { success: true, data: [] };
      }
      const tasks = JSON.parse(tasksJSON);
      return { success: true, data: tasks };
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return { success: false, message: 'Failed to load tasks from local storage.' };
    }
  }

  /**
   * Check if localStorage is available in the browser
   * @returns {boolean} - Whether localStorage is available
   */
  isStorageAvailable() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clear all tasks from localStorage
    * @returns {Promise<object>} - Promise resolving with success status and message
   */
  async clearTasks() {
    try {
      localStorage.removeItem(this.storageKey);
      return { success: true };
    } catch (error) {
      console.error('Error clearing tasks from localStorage:', error);
      return { success: false, message: 'Failed to clear tasks from local storage.' };
    }
  }
}
