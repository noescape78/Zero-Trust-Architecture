/**
 * Application Constants
 */

export const APP_NAME = 'CloudVault';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const API_TIMEOUT = 30000;

// File Configuration
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf', 'text/plain', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed'
];

// Share Options
export const EXPIRATION_OPTIONS = [
  { value: '', label: 'Never' },
  { value: 1, label: '1 Hour' },
  { value: 24, label: '24 Hours' },
  { value: 168, label: '1 Week' },
  { value: 720, label: '1 Month' },
  { value: 8760, label: '1 Year' }
];

export const DOWNLOAD_LIMIT_OPTIONS = [
  { value: 1, label: '1 download' },
  { value: 5, label: '5 downloads' },
  { value: 10, label: '10 downloads' },
  { value: 25, label: '25 downloads' },
  { value: 100, label: '100 downloads' },
  { value: '', label: 'Unlimited' }
];

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  VIEW_MODE: 'viewMode'
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  UPLOAD: '/upload',
  RECEIVE: '/receive'
};

// Animation Durations
export const ANIMATION = {
  FAST: 0.15,
  NORMAL: 0.3,
  SLOW: 0.5
};

// Toast Durations
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  INFO: 3000
};

// File Type Icons mapping
export const FILE_ICONS = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  document: ['doc', 'docx', 'pdf', 'txt', 'rtf', 'odt'],
  spreadsheet: ['xls', 'xlsx', 'csv', 'ods'],
  archive: ['zip', 'rar', '7z', 'tar', 'gz'],
  video: ['mp4', 'avi', 'mov', 'mkv', 'webm'],
  audio: ['mp3', 'wav', 'ogg', 'flac', 'aac'],
  code: ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'html', 'css', 'json']
};

// Colors for file types
export const FILE_COLORS = {
  image: 'text-pink-500',
  document: 'text-blue-500',
  spreadsheet: 'text-green-500',
  archive: 'text-yellow-500',
  video: 'text-purple-500',
  audio: 'text-orange-500',
  code: 'text-surface-500',
  default: 'text-surface-400'
};

