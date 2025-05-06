import { useState, useCallback } from 'react';
import { getStorageItem, setStorageItem } from '../utils/localStorage';

/**
 * Custom hook for managing localStorage with automatic serialization/deserialization
 * @returns {Object} Methods and state for localStorage management
 */
export const useLocalStorage = () => {
  const [error, setError] = useState(null);

  /**
   * Get an item from localStorage with error handling
   * @param {string} key - The key to retrieve
   * @returns {any} The parsed value from localStorage or null if not found
   */
  const getItem = useCallback((key) => {
    try {
      return getStorageItem(key);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  /**
   * Set an item in localStorage with error handling
   * @param {string} key - The key to set
   * @param {any} value - The value to store
   * @returns {boolean} True if the operation succeeded, false otherwise
   */
  const setItem = useCallback((key, value) => {
    try {
      setStorageItem(key, value);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  /**
   * Remove an item from localStorage with error handling
   * @param {string} key - The key to remove
   */
  const removeItem = useCallback((key) => {
    try {
      localStorage.removeItem(key);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  /**
   * Clear all items from localStorage with error handling
   */
  const clear = useCallback(() => {
    try {
      localStorage.clear();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    error
  };
};
