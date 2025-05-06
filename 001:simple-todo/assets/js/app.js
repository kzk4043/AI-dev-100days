/**
 * Main application file that initializes the Todo app
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the application
  const initApp = async () => {
    try {
      // Create instances of managers and event bus
      const eventBus = new EventBus();
      const storageManager = new StorageManager();
      const taskManager = new TaskManager(storageManager, eventBus);
      
      // Get DOM elements
      const taskForm = document.getElementById('task-form');
      const taskInput = document.getElementById('task-input');
      const taskList = document.getElementById('task-list');
      const errorMessage = document.getElementById('error-message');

      const uiManager = new UIManager(taskManager, eventBus, {
        taskForm,
        taskInput,
        taskList,
        errorMessage
      });
      
      // Check if localStorage is available
      if (!storageManager.isStorageAvailable()) {
        alert('お使いのブラウザはローカルストレージをサポートしていません。タスクは保存されません。');
      }
      
      // Load initial tasks
      await taskManager.loadTasks();
      
      // Log for debugging purposes
      console.log('Todo Application initialized successfully');
    } catch (error) {
      console.error('Error initializing Todo Application:', error);
      alert('アプリケーションの初期化中にエラーが発生しました。ページを再読み込みしてください。');
    }
  };

  // Start the app
  initApp();
});
