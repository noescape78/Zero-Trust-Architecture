/**
 * Utility Functions - Formatters
 */

/**
 * Format file size to human readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size string
 */
export const formatSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + units[i];
};

/**
 * Format timestamp to human readable date
 * @param {number} timestamp - Unix timestamp (seconds)
 * @param {object} options - Format options
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp, options = {}) => {
  if (!timestamp) return 'N/A';
  
  const date = new Date(timestamp * 1000);
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {number} timestamp - Unix timestamp (seconds)
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const now = Date.now();
  const date = new Date(timestamp * 1000);
  const diff = now - date.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

/**
 * Get expiration status
 * @param {number} expiresAt - Unix timestamp
 * @returns {object} Status object with text and color
 */
export const getExpiryStatus = (expiresAt) => {
  if (!expiresAt) return { text: 'Never', color: 'text-emerald-400', expired: false };
  
  const now = Date.now();
  const expiry = expiresAt;
  
  if (now > expiry) {
    return { text: 'Expired', color: 'text-red-400', expired: true };
  }
  
  const hoursLeft = Math.floor((expiry - now) / (1000 * 60 * 60));
  
  if (hoursLeft < 1) {
    const minutesLeft = Math.floor((expiry - now) / (1000 * 60));
    return { text: `< ${minutesLeft} min`, color: 'text-orange-400', expired: false };
  }
  
  if (hoursLeft < 24) {
    return { text: `${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`, color: 'text-yellow-400', expired: false };
  }
  
  const daysLeft = Math.floor(hoursLeft / 24);
  if (daysLeft < 30) {
    return { text: `${daysLeft} day${daysLeft > 1 ? 's' : ''}`, color: 'text-emerald-400', expired: false };
  }
  
  const monthsLeft = Math.floor(daysLeft / 30);
  return { text: `${monthsLeft} month${monthsLeft > 1 ? 's' : ''}`, color: 'text-emerald-400', expired: false };
};

/**
 * Truncate filename with ellipsis
 * @param {string} filename - Original filename
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated filename
 */
export const truncateFilename = (filename, maxLength = 30) => {
  if (!filename || filename.length <= maxLength) return filename;
  
  const ext = filename.split('.').pop();
  const nameLength = maxLength - ext.length - 4; // 3 for "..." and 1 for "."
  
  return `${filename.slice(0, nameLength)}...${ext}`;
};

/**
 * Generate a short ID from token
 * @param {string} token - Full token
 * @param {number} length - Shortened length
 * @returns {string} Shortened token
 */
export const shortenToken = (token, length = 8) => {
  if (!token) return '';
  return token.length > length ? `${token.slice(0, length)}...` : token;
};

