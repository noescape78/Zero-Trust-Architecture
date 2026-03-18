/**
 * Utility Functions - Clipboard Operations
 */

/**
 * Securely copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  if (!text) return false;

  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    return new Promise((resolve) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        resolve(successful);
      } catch (err) {
        document.body.removeChild(textArea);
        resolve(false);
      }
    });
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Read text from clipboard
 * @returns {Promise<string|null>} Clipboard text or null
 */
export const readFromClipboard = async () => {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      return await navigator.clipboard.readText();
    }
    return null;
  } catch (error) {
    console.error('Failed to read from clipboard:', error);
    return null;
  }
};

/**
 * Copy with visual feedback
 * @param {string} text - Text to copy
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 * @returns {Promise<void>}
 */
export const copyWithFeedback = async (text, onSuccess, onError) => {
  const success = await copyToClipboard(text);
  if (success && onSuccess) {
    onSuccess();
  } else if (!success && onError) {
    onError();
  }
};

