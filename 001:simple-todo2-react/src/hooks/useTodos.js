import { useReducer, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TODO_STORAGE_KEY, CONFIRM_MESSAGES } from '../constants';
import { generateId } from '../utils/idGenerator';

// Initial state
const initialState = {
  tasks: [],
  error: null
};

// Reducer for state management
function todoReducer(state, action) {
  switch (action.type) {
    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

/**
 * Custom hook for managing todos
 * @returns {Object} Tasks, error state, and CRUD operations
 */
export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { getItem, setItem, error: storageError } = useLocalStorage();

  // Load tasks from localStorage on initialization
  useEffect(() => {
    try {
      const storedTasks = getItem(TODO_STORAGE_KEY);
      if (storedTasks) {
        dispatch({ type: 'LOAD_TASKS', payload: storedTasks });
      }
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }, [getItem]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      setItem(TODO_STORAGE_KEY, state.tasks);
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }, [state.tasks, setItem]);

  // Handle localStorage errors
  useEffect(() => {
    if (storageError) {
      dispatch({ type: 'SET_ERROR', payload: storageError });
    }
  }, [storageError]);

  // Function to add a new task
  const addTask = (text) => {
    if (!text.trim()) return;
    
    const newTask = {
      id: generateId(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  // Function to toggle task completion status
  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  // Function to delete a task
  const deleteTask = (id) => {
    // Optional: confirm deletion for incomplete tasks
    const taskToDelete = state.tasks.find(task => task.id === id);
    
    if (taskToDelete && !taskToDelete.completed) {
      const confirmed = window.confirm(CONFIRM_MESSAGES.DELETE_INCOMPLETE);
      if (!confirmed) return;
    }
    
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return {
    tasks: state.tasks,
    error: state.error || storageError,
    addTask,
    toggleTask,
    deleteTask
  };
}
