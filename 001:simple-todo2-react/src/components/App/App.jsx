import React from 'react';
import { TodoProvider } from '../../context';
import { TodoHeader, TodoForm, TodoList, ErrorBoundary } from '../';
import styles from './App.module.css';

/**
 * App component - the root component of the application
 */
const App = () => {
  return (
    <ErrorBoundary>
      <TodoProvider>
        <div className={styles.container}>
          <TodoHeader title="TODO APPLICATION" />
          <TodoForm />
          <TodoList />
        </div>
      </TodoProvider>
    </ErrorBoundary>
  );
};

export default App;
