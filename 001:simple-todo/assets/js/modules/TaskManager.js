/**
 * TaskManager is responsible for task data operations
 * including creating, updating, and deleting tasks
 */
class TaskManager {
  /**
   * Initialize TaskManager with StorageManager for persistence
   * @param {StorageManager} storageManager - Instance of StorageManager
   */
  constructor(storageManager) {
    this.tasks = [];
    this.storageManager = storageManager;
    this.callbacks = {
      onTasksUpdated: null
    };
  }

  /**
   * Set callback function for when tasks are updated
   * @param {Function} callback - Function to call when tasks change
   */
  setOnTasksUpdated(callback) {
    this.callbacks.onTasksUpdated = callback;
  }

  /**
   * Call onTasksUpdated callback if it exists
   */
  notifyTasksUpdated() {
    if (typeof this.callbacks.onTasksUpdated === 'function') {
      this.callbacks.onTasksUpdated(this.tasks);
    }
  }

  /**
   * Load tasks from storage
   */
  loadTasks() {
    this.tasks = this.storageManager.loadTasks();
    this.notifyTasksUpdated();
    return this.tasks;
  }

  /**
   * Save tasks to storage
   */
  saveTasks() {
    this.storageManager.saveTasks(this.tasks);
  }

  /**
   * Add a new task
   * @param {string} text - Task description
   * @returns {Object} - The newly created task
   */
  addTask(text) {
    if (!text || typeof text !== 'string' || !text.trim()) {
      return null;
    }

    const newTask = {
      id: generateUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(newTask);
    this.saveTasks();
    this.notifyTasksUpdated();

    return newTask;
  }

  /**
   * Toggle task completion status
   * @param {string} id - Task ID
   * @returns {Object|null} - Updated task or null if not found
   */
  toggleTaskCompletion(id) {
    const task = this.tasks.find(task => task.id === id);
    
    if (!task) {
      return null;
    }

    task.completed = !task.completed;
    this.saveTasks();
    this.notifyTasksUpdated();

    return task;
  }

  /**
   * Delete a task
   * @param {string} id - Task ID
   * @returns {boolean} - Whether the task was deleted
   */
  deleteTask(id) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    
    if (this.tasks.length !== initialLength) {
      this.saveTasks();
      this.notifyTasksUpdated();
      return true;
    }
    
    return false;
  }

  /**
   * Get all tasks
   * @returns {Array} - Array of all tasks
   */
  getAllTasks() {
    return [...this.tasks];
  }

  /**
   * Get completed tasks
   * @returns {Array} - Array of completed tasks
   */
  getCompletedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  /**
   * Get incomplete tasks
   * @returns {Array} - Array of incomplete tasks
   */
  getIncompleteTasks() {
    return this.tasks.filter(task => !task.completed);
  }
}
