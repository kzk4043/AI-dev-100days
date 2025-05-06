/**
 * Generates a unique ID for todo items
 * Uses crypto.randomUUID if available, otherwise falls back to Date.now()
 * @returns {string} A unique identifier
 */
export const generateId = () => {
  // Use crypto.randomUUID() if available (modern browsers)
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  
  // Fallback to Date.now() + random number
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
