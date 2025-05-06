/**
 * UIManager handles all DOM interactions and UI updates
 */
class UIManager {
  /**
   * Initialize UIManager with TaskManager, EventBus, and DOM elements
   * @param {TaskManager} taskManager - Instance of TaskManager
   * @param {EventBus} eventBus - Instance of EventBus
   * @param {object} domElements - Object containing references to DOM elements
   */
  constructor(taskManager, eventBus, domElements) {
    this.taskManager = taskManager;
    this.eventBus = eventBus;
    this.domElements = domElements;
    
    this.bindEvents();
    this.eventBus.subscribe('tasksUpdated', tasks => this.renderTasks(tasks));
    this.eventBus.subscribe('error', message => this.displayError(message));
  }

  /**
   * Bind event listeners to DOM elements
   */
  bindEvents() {
    // Form submission to add new task
    this.domElements.taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addTask();
    });

    // Event delegation for task list (completed toggle and delete)
    this.domElements.taskList.addEventListener('click', (event) => {
      const taskItem = event.target.closest('.task-item');
      if (!taskItem) return;

      const taskId = taskItem.dataset.id;
      
      // Handle task checkbox click
      if (event.target.closest('.task-checkbox')) {
        this.toggleTaskCompletion(taskId, taskItem);
      }
      
      // Handle delete button click
      if (event.target.closest('.task-delete')) {
        this.deleteTask(taskId, taskItem);
      }
    });
  }

  /**
   * Add a new task from the input field
   */
  addTask() {
    const taskText = this.domElements.taskInput.value.trim();
    
    if (!taskText) {
      return;
    }
    
    this.taskManager.addTask(taskText);
    this.domElements.taskInput.value = '';
    this.domElements.taskInput.focus();
  }

  /**
   * Toggle task completion status
   * @param {string} taskId - Task ID
   * @param {HTMLElement} taskElement - Task DOM element
   */
  toggleTaskCompletion(taskId, taskElement) {
    const updatedTask = this.taskManager.toggleTaskCompletion(taskId);
    
    if (!updatedTask) {
      return;
    }

    const checkbox = taskElement.querySelector('.task-checkbox');
    const taskText = taskElement.querySelector('.task-text');

    this.updateTaskItemClasses(taskElement, updatedTask.completed);
  }

  /**
   * Update CSS classes for a task item based on completion status
   * @param {HTMLElement} taskElement - Task DOM element
   * @param {boolean} isCompleted - Completion status of the task
   */
  updateTaskItemClasses(taskElement, isCompleted) {
    const checkbox = taskElement.querySelector('.task-checkbox');
    const taskText = taskElement.querySelector('.task-text');

    if (isCompleted) {
      checkbox.classList.add('checked');
      taskText.classList.add('strikethrough');
    } else {
      checkbox.classList.remove('checked');
      taskText.classList.remove('strikethrough');
    }
  }

  /**
   * Delete a task
   * @param {string} taskId - Task ID
   * @param {HTMLElement} taskElement - Task DOM element
   */
  deleteTask(taskId, taskElement) {
    taskElement.classList.add('removing');
    
    // Wait for animation to complete before actually removing
    setTimeout(() => {
      this.taskManager.deleteTask(taskId);
    }, 300);
  }

  /**
   * Display an error message
   * @param {string} message - The error message to display
   */
  displayError(message) {
    if (this.domElements.errorMessage) {
      this.domElements.errorMessage.textContent = message;
      this.domElements.errorMessage.style.display = 'block';
      // Optionally hide the message after a few seconds
      setTimeout(() => {
        this.hideError();
      }, 5000);
    }
  }

  /**
   * Hide the error message
   */
  hideError() {
    if (this.domElements.errorMessage) {
      this.domElements.errorMessage.textContent = '';
      this.domElements.errorMessage.style.display = 'none';
    }
  }

  /**
   * Render all tasks to the task list
   * @param {Array} tasks - Array of task objects
   */
  renderTasks(tasks) {
    this.domElements.taskList.innerHTML = '';
    
    if (tasks.length === 0) {
      this.renderEmptyState();
      return;
    }
    
    tasks.forEach(task => {
      const taskElement = this.createTaskElement(task);
      this.domElements.taskList.appendChild(taskElement);
    });
  }

  /**
   * Create a task list item element
   * @param {Object} task - Task object
   * @returns {HTMLElement} - Task list item element
   */
  createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    
    const checkbox = document.createElement('div');
    checkbox.className = `task-checkbox ${task.completed ? 'checked' : ''}`;
    
    const taskText = document.createElement('div');
    taskText.className = `task-text ${task.completed ? 'strikethrough' : ''}`;
    taskText.textContent = task.text;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-delete';
    deleteButton.setAttribute('aria-label', 'タスクを削除');
    
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    
    return li;
  }

  /**
   * Render empty state message when no tasks
   */
  renderEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-list';
    emptyState.textContent = 'タスクがありません。新しいタスクを追加してください。';
    this.domElements.taskList.appendChild(emptyState);
  }
}
