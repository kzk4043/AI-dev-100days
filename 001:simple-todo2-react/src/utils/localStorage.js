import { ERROR_MESSAGES } from '../constants';

/**
 * Checks if localStorage is available in the browser
 * @returns {boolean} True if localStorage is available, false otherwise
 */
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Gets an item from localStorage
 * @param {string} key - The key to retrieve
 * @returns {any} The parsed value from localStorage or null if not found
 * @throws {Error} If localStorage is not available or parsing fails
 */
export const getStorageItem = (key) => {
  if (!isLocalStorageAvailable()) {
    throw new Error(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
  }
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.PARSE_ERROR);
  }
};

/**
 * Sets an item in localStorage
 * @param {string} key - The key to set
 * @param {any} value - The value to store (will be JSON stringified)
 * @throws {Error} If localStorage is not available or storage quota is exceeded
 */
export const setStorageItem = (key, value) => {
  if (!isLocalStorageAvailable()) {
    throw new Error(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Check if error is due to storage quota exceeded
    if (error instanceof DOMException && 
        (error.code === 22 || // Chrome quota exceeded error
         error.code === 1014 || // Firefox quota exceeded error
         error.name === 'QuotaExceededError')) {
      throw new Error(ERROR_MESSAGES.STORAGE_FULL);
    }
    throw error;
  }
};

/**
 * Removes an item from localStorage
 * @param {string} key - The key to remove
 * @throws {Error} If localStorage is not available
 */
export const removeStorageItem = (key) => {
  if (!isLocalStorageAvailable()) {
    throw new Error(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
  }
  
  localStorage.removeItem(key);
};

/**
 * Clears all items from localStorage
 * @throws {Error} If localStorage is not available
 */
export const clearStorage = () => {
  if (!isLocalStorageAvailable()) {
    throw new Error(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
  }
  
  localStorage.clear();
};
