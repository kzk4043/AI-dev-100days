/**
 * UIManager handles all DOM interactions and UI updates
 */
class UIManager {
  /**
   * Initialize UIManager with TaskManager
   * @param {TaskManager} taskManager - Instance of TaskManager
   */
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.domElements = {
      taskForm: document.getElementById('task-form'),
      taskInput: document.getElementById('task-input'),
      taskList: document.getElementById('task-list')
    };
    
    this.bindEvents();
    this.taskManager.setOnTasksUpdated(tasks => this.renderTasks(tasks));
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
    
    if (updatedTask) {
      const checkbox = taskElement.querySelector('.task-checkbox');
      const taskText = taskElement.querySelector('.task-text');
      
      if (updatedTask.completed) {
        checkbox.classList.add('checked');
        taskText.classList.add('strikethrough');
      } else {
        checkbox.classList.remove('checked');
        taskText.classList.remove('strikethrough');
      }
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
