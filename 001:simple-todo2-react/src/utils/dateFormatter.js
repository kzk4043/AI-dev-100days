/**
 * Formats a date string to a more readable format
 * @param {string} dateString - Date string in ISO format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Format as: May 6, 2025, 10:30 AM
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

/**
 * Returns a relative time string (e.g., "2 hours ago", "yesterday")
 * @param {string} dateString - Date string in ISO format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Unknown time';
  }
  
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  }
  
  // Default to formatted date for older dates
  return formatDate(dateString);
};
