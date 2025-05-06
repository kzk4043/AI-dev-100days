// Assuming 'uuid' library is installed via npm (e.g., npm install uuid)
// import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a UUID (v4 format) using the uuid library
 * @returns {string} A UUID v4 string
 */
function generateUUID() {
  // return uuidv4();
  // Fallback to simple implementation if uuid library is not used
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
