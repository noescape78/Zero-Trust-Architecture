/**
 * Utility Functions - File Helpers
 */

import { FILE_ICONS, FILE_COLORS } from '../constants';

/**
 * Get file extension from filename
 * @param {string} filename - The filename
 * @returns {string} File extension
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop().toLowerCase() || '';
};

/**
 * Get file type category from extension
 * @param {string} filename - The filename
 * @returns {string} File type category
 */
export const getFileType = (filename) => {
  const ext = getFileExtension(filename);
  
  for (const [type, extensions] of Object.entries(FILE_ICONS)) {
    if (extensions.includes(ext)) {
      return type;
    }
  }
  
  return 'default';
};

/**
 * Get color class for file type
 * @param {string} filename - The filename
 * @returns {string} Color class
 */
export const getFileColor = (filename) => {
  const type = getFileType(filename);
  return FILE_COLORS[type] || FILE_COLORS.default;
};

/**
 * Check if file is an image
 * @param {string} filename - The filename
 * @returns {boolean} Is image
 */
export const isImageFile = (filename) => {
  return getFileType(filename) === 'image';
};

/**
 * Check if file is a document
 * @param {string} filename - The filename
 * @returns {boolean} Is document
 */
export const isDocumentFile = (filename) => {
  const type = getFileType(filename);
  return type === 'document' || type === 'spreadsheet';
};

/**
 * Get MIME type from extension
 * @param {string} filename - The filename
 * @returns {string} MIME type
 */
export const getMimeType = (filename) => {
  const ext = getFileExtension(filename);
  const mimeTypes = {
    // Images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    // Documents
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain',
    rtf: 'application/rtf',
    // Spreadsheets
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    csv: 'text/csv',
    // Archives
    zip: 'application/zip',
    rar: 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    tar: 'application/x-tar',
    gz: 'application/gzip',
    // Video
    mp4: 'video/mp4',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',
    webm: 'video/webm',
    // Audio
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    flac: 'audio/flac',
    // Code
    js: 'text/javascript',
    jsx: 'text/javascript',
    ts: 'text/typescript',
    tsx: 'text/typescript',
    py: 'text/x-python',
    java: 'text/x-java-source',
    cpp: 'text/x-c++src',
    html: 'text/html',
    css: 'text/css',
    json: 'application/json'
  };
  
  return mimeTypes[ext] || 'application/octet-stream';
};

/**
 * Validate file size
 * @param {File} file - The file object
 * @param {number} maxSize - Max size in bytes
 * @returns {object} Validation result
 */
export const validateFileSize = (file, maxSize = 50 * 1024 * 1024) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit` 
    };
  }
  
  return { valid: true };
};

/**
 * Get filename without extension
 * @param {string} filename - The filename
 * @returns {string} Filename without extension
 */
export const getFilenameWithoutExtension = (filename) => {
  if (!filename) return '';
  return filename.replace(/\.[^/.]+$/, '');
};

/**
 * Generate unique filename if exists
 * @param {string} filename - Original filename
 * @param {Array} existingFiles - List of existing filenames
 * @returns {string} Unique filename
 */
export const generateUniqueFilename = (filename, existingFiles = []) => {
  if (!existingFiles.includes(filename)) {
    return filename;
  }
  
  const ext = getFileExtension(filename);
  const name = getFilenameWithoutExtension(filename);
  let counter = 1;
  let newFilename = `${name} (${counter}).${ext}`;
  
  while (existingFiles.includes(newFilename)) {
    counter++;
    newFilename = `${name} (${counter}).${ext}`;
  }
  
  return newFilename;
};

