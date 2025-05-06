import React, { createContext, useContext } from 'react';
import { useTodos } from '../hooks';

// Create the context
const TodoContext = createContext();

/**
 * Todo Provider component that wraps the application and provides todo state and methods
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 */
export const TodoProvider = ({ children }) => {
  const { 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    error 
  } = useTodos();

  return (
    <TodoContext.Provider 
      value={{ 
        tasks, 
        addTask, 
        toggleTask, 
        deleteTask, 
        error 
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

/**
 * Custom hook to use the todo context
 * @returns {Object} Todo context value
 * @throws {Error} If used outside of TodoProvider
 */
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  
  return context;
};
