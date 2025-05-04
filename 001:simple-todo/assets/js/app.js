/**
 * Main application file that initializes the Todo app
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the application
  const initApp = () => {
    try {
      // Create instances of managers
      const storageManager = new StorageManager();
      const taskManager = new TaskManager(storageManager);
      const uiManager = new UIManager(taskManager);
      
      // Check if localStorage is available
      if (!storageManager.isStorageAvailable()) {
        alert('お使いのブラウザはローカルストレージをサポートしていません。タスクは保存されません。');
      }
      
      // Load initial tasks
      taskManager.loadTasks();
      
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
