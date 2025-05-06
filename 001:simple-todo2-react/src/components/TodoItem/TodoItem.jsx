import React from 'react';
import { useTodoContext } from '../../context';
import styles from './TodoItem.module.css';

/**
 * TodoItem component for individual task items
 * @param {Object} props - Component props
 * @param {Object} props.task - Task data
 */
const TodoItem = ({ task }) => {
  const { toggleTask, deleteTask } = useTodoContext();

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <label className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className={styles.checkbox}
          />
          <span className={styles.checkmark}></span>
          <span className={`${styles.text} ${task.completed ? styles.completed : ''}`}>
            {task.text}
          </span>
        </label>
      </div>
      <button
        className={styles.deleteButton}
        onClick={handleDelete}
        aria-label="Delete task"
      >
        &times;
      </button>
    </li>
  );
};

export default TodoItem;
