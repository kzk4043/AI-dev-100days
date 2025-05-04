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
   * @returns {boolean} - Whether the save was successful
   */
  saveTasks(tasks) {
    try {
      const tasksJSON = JSON.stringify(tasks);
      localStorage.setItem(this.storageKey, tasksJSON);
      return true;
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      return false;
    }
  }

  /**
   * Load tasks from localStorage
   * @returns {Array} - Array of task objects, or empty array if none found
   */
  loadTasks() {
    try {
      const tasksJSON = localStorage.getItem(this.storageKey);
      if (!tasksJSON) {
        return [];
      }
      return JSON.parse(tasksJSON);
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
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
   * @returns {boolean} - Whether the operation was successful
   */
  clearTasks() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing tasks from localStorage:', error);
      return false;
    }
  }
}
