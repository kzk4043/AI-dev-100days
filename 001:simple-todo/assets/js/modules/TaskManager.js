/**
 * TaskManager is responsible for task data operations
 * including creating, updating, and deleting tasks
 */
class TaskManager {
  /**
   * Initialize TaskManager with StorageManager and EventBus
   * @param {StorageManager} storageManager - Instance of StorageManager
   * @param {EventBus} eventBus - Instance of EventBus
   */
  constructor(storageManager, eventBus) {
    this.tasks = [];
    this.storageManager = storageManager;
    this.eventBus = eventBus;
  }

  /**
   * Publish tasks updated event
   */
  publishTasksUpdated() {
    this.eventBus.publish('tasksUpdated', this.tasks);
  }

  /**
   * Load tasks from storage
   */
  async loadTasks() {
    const result = await this.storageManager.loadTasks();
    if (result.success) {
      this.tasks = result.data;
      this.publishTasksUpdated();
    } else {
      console.error('Failed to load tasks:', result.message);
      this.eventBus.publish('error', result.message);
      this.tasks = []; // Ensure tasks is an empty array on load failure
    }
    return this.tasks;
  }

  /**
   * Save tasks to storage
   */
  async saveTasks() {
    const result = await this.storageManager.saveTasks(this.tasks);
    if (!result.success) {
      console.error('Failed to save tasks:', result.message);
      this.eventBus.publish('error', result.message);
    }
  }

  /**
   * Add a new task
   * @param {string} text - Task description
   * @returns {Promise<Object|null>} - Promise resolving with the newly created task or null if invalid input
   */
  async addTask(text) {
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
    await this.saveTasks();
    this.publishTasksUpdated();

    return newTask;
  }

  /**
   * Toggle task completion status
   * @param {string} id - Task ID
   * @returns {Promise<Object|null>} - Promise resolving with the updated task or null if not found
   */
  async toggleTaskCompletion(id) {
    const task = this.tasks.find(task => task.id === id);
    
    if (!task) {
      return null;
    }

    task.completed = !task.completed;
    await this.saveTasks();
    this.publishTasksUpdated();

    return task;
  }

  /**
   * Delete a task
   * @param {string} id - Task ID
   * @returns {Promise<boolean>} - Promise resolving with whether the task was deleted
   */
  async deleteTask(id) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    
    if (this.tasks.length !== initialLength) {
      await this.saveTasks();
      this.publishTasksUpdated();
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
