import React, { useState } from 'react';
import { useTodoContext } from '../../context';
import styles from './TodoForm.module.css';

/**
 * TodoForm component for adding new tasks
 */
const TodoForm = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTask } = useTodoContext();

  /**
   * Handle form submission
   * @param {React.FormEvent} event - Form submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue('');
    }
  };

  /**
   * Handle input change
   * @param {React.ChangeEvent<HTMLInputElement>} event - Input change event
   */
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={handleChange}
          placeholder="Add a new task..."
          aria-label="New task"
        />
        <button 
          type="submit" 
          className={styles.addButton}
          aria-label="Add task"
          disabled={!inputValue.trim()}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
