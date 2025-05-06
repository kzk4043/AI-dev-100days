import React from 'react';
import styles from './TodoHeader.module.css';

/**
 * TodoHeader component to display the application title
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display in the header
 */
const TodoHeader = ({ title = 'TODO APPLICATION' }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default TodoHeader;
