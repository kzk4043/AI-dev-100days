# Folder Structure - Todo Application

## Overview

This document outlines the recommended folder structure for the React Todo application. The structure follows modern React application organization principles, focusing on modularity, separation of concerns, and scalability.

```
todo-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── App/
│   │   │   ├── App.jsx
│   │   │   ├── App.module.css
│   │   │   └── index.js
│   │   ├── TodoHeader/
│   │   │   ├── TodoHeader.jsx
│   │   │   ├── TodoHeader.module.css
│   │   │   └── index.js
│   │   ├── TodoForm/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoForm.module.css
│   │   │   └── index.js
│   │   ├── TodoList/
│   │   │   ├── TodoList.jsx
│   │   │   ├── TodoList.module.css
│   │   │   └── index.js
│   │   ├── TodoItem/
│   │   │   ├── TodoItem.jsx
│   │   │   ├── TodoItem.module.css
│   │   │   └── index.js
│   │   └── ErrorBoundary/
│   │       ├── ErrorBoundary.jsx
│   │       └── index.js
│   ├── context/
│   │   ├── TodoContext.jsx
│   │   └── index.js
│   ├── hooks/
│   │   ├── useTodos.js
│   │   ├── useLocalStorage.js
│   │   └── index.js
│   ├── utils/
│   │   ├── idGenerator.js
│   │   ├── dateFormatter.js
│   │   └── localStorage.js
│   ├── styles/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   └── global.css
│   ├── constants/
│   │   └── index.js
│   ├── index.jsx
│   └── index.css
├── .gitignore
├── package.json
├── README.md
└── package-lock.json
```

## Directory Explanations

### 1. `/public`

Contains static assets that don't require processing by webpack:

- `index.html`: The main HTML file
- `favicon.ico`: Application icon
- `manifest.json`: Web app manifest for PWA capabilities

### 2. `/src`

The main source code directory with the following subdirectories:

#### 2.1 `/components`

Contains all React components, each in its own directory with related files:

- **App**: Root component that orchestrates the application
- **TodoHeader**: Displays the application title
- **TodoForm**: Handles task input and submission
- **TodoList**: Renders the list of todo items
- **TodoItem**: Individual task component with toggle and delete functionality
- **ErrorBoundary**: Catches and handles rendering errors

Each component directory typically includes:
- Component file (`.jsx`)
- Component-specific styles (`.module.css`)
- Barrel export file (`index.js`)

#### 2.2 `/context`

Contains React context definitions:

- **TodoContext.jsx**: Defines the Todo application's context and provider

#### 2.3 `/hooks`

Contains custom React hooks:

- **useTodos.js**: Manages todo operations (CRUD)
- **useLocalStorage.js**: Abstracts localStorage interactions

#### 2.4 `/utils`

Contains utility functions:

- **idGenerator.js**: Functions for generating unique IDs
- **dateFormatter.js**: Date formatting utilities
- **localStorage.js**: Helper functions for localStorage operations

#### 2.5 `/styles`

Contains global styles and styling variables:

- **variables.css**: CSS variables for theming
- **reset.css**: CSS reset for consistent styling across browsers
- **global.css**: Global application styles

#### 2.6 `/constants`

Contains application constants:

- **index.js**: Local storage keys, error messages, etc.

### 3. Root Files

- **.gitignore**: Specifies files to ignore in version control
- **package.json**: Dependencies and scripts
- **README.md**: Project documentation
- **package-lock.json**: Exact dependency versions

## File Details

### Key Component Files

#### App.jsx
```jsx
import React from 'react';
import { TodoProvider } from '../../context';
import { TodoHeader, TodoForm, TodoList, ErrorBoundary } from '../';
import styles from './App.module.css';

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
```

#### TodoContext.jsx
```jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useTodos } from '../hooks';

const TodoContext = createContext();

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

export const useTodoContext = () => useContext(TodoContext);
```

#### useTodos.js
```javascript
import { useReducer, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TODO_STORAGE_KEY } from '../constants';

const initialState = {
  tasks: [],
  error: null
};

// Define reducer for state management
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

export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { getItem, setItem, error } = useLocalStorage();

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
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      setItem(TODO_STORAGE_KEY, state.tasks);
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }, [state.tasks, setItem]);

  // Function to add a new task
  const addTask = (text) => {
    if (!text.trim()) return;
    
    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
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
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return {
    tasks: state.tasks,
    error: state.error || error,
    addTask,
    toggleTask,
    deleteTask
  };
}
```

## Organization Benefits

1. **Component Isolation**: Each component is isolated with its own styles and logic
2. **Separation of Concerns**: UI components, state management, and utilities are clearly separated
3. **Reusability**: Components and hooks are structured for potential reuse
4. **Maintainability**: Clear organization makes codebase easier to maintain
5. **Scalability**: Structure allows for easy addition of new features
6. **Testing**: Organization facilitates component testing
7. **Developer Experience**: Barrel exports simplify imports