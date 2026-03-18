/**
 * Custom Hooks - Reusable logic for the application
 */

import { useState, useEffect, useCallback } from 'react';
import { filesAPI, getErrorMessage } from '../services/api';
import { useToast } from '../context/ToastContext';

/**
 * Hook for file operations (load, delete, share)
 */
export function useFileOperations() {
  const [files, setFiles] = useState([]);
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const toast = useToast();

  // Load all files
  const loadFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await filesAPI.getFiles();
      setFiles(data.files || []);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Load all shares
  const loadShares = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await filesAPI.getShares();
      setShares(data.shares || []);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Load both files and shares
  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [filesRes, sharesRes] = await Promise.all([
        filesAPI.getFiles(),
        filesAPI.getShares()
      ]);
      setFiles(filesRes.data.files || []);
      setShares(sharesRes.data.shares || []);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Delete a file
  const deleteFile = useCallback(async (fileId) => {
    try {
      await filesAPI.deleteFile(fileId);
      setFiles(prev => prev.filter(f => f.id !== fileId));
      toast.success('File deleted successfully!');
      return true;
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      return false;
    }
  }, [toast]);

  // Revoke a share
  const revokeShare = useCallback(async (shareId) => {
    try {
      await filesAPI.revokeShare(shareId);
      setShares(prev => prev.filter(s => s.id !== shareId));
      toast.success('Share link revoked!');
      return true;
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      return false;
    }
  }, [toast]);

  return {
    files,
    shares,
    loading,
    error,
    loadFiles,
    loadShares,
    loadAll,
    deleteFile,
    revokeShare,
    setFiles,
    setShares
  };
}

/**
 * Hook for handling drag and drop file uploads
 */
export function useDragAndDrop(onFileDrop) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      onFileDrop?.(files[0]);
    }
  }, [onFileDrop]);

  return {
    isDragging,
    dragProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop
    }
  };
}

/**
 * Hook for debounced search
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for local storage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

/**
 * Hook for window size
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

