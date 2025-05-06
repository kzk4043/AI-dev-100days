import React from 'react';
import { useTodoContext } from '../../context';
import TodoItem from '../TodoItem';
import styles from './TodoList.module.css';

/**
 * TodoList component that renders the list of tasks
 */
const TodoList = () => {
  const { tasks, error } = useTodoContext();

  // Display error message if there's an error
  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
      </div>
    );
  }

  // Display empty state if there are no tasks
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No tasks yet. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {tasks.map(task => (
          <TodoItem key={task.id} task={task} />
        ))}
      </ul>
      <div className={styles.stats}>
        <p>{tasks.length} task{tasks.length !== 1 ? 's' : ''} total</p>
        <p>
          {tasks.filter(task => task.completed).length} completed, 
          {' '}
          {tasks.filter(task => !task.completed).length} remaining
        </p>
      </div>
    </div>
  );
};

export default TodoList;
