import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { TOAST_DURATION } from '../constants';

const ToastStateContext = createContext(null);
const ToastActionsContext = createContext(null);

/**
 * Toast Provider - Manages global toast notifications
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  /**
   * Remove a toast by ID
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Add a new toast
   */
  const addToast = useCallback((message, type = 'info', duration) => {
    const id = Date.now() + Math.random().toString(36).substring(7);
    const toastDuration = duration || TOAST_DURATION[type.toUpperCase()] || TOAST_DURATION.INFO;

    const newToast = { id, message, type, duration: toastDuration };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, toastDuration);

    return id;
  }, [removeToast]);

  const success = useCallback((msg, dur) => addToast(msg, 'success', dur), [addToast]);
  const error = useCallback((msg, dur) => addToast(msg, 'error', dur), [addToast]);
  const info = useCallback((msg, dur) => addToast(msg, 'info', dur), [addToast]);
  const warning = useCallback((msg, dur) => addToast(msg, 'warning', dur), [addToast]);
  const clearAll = useCallback(() => setToasts([]), []);

  const actions = useMemo(() => ({
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
    clearAll
  }), [addToast, removeToast, success, error, info, warning, clearAll]);

  return (
    <ToastStateContext.Provider value={toasts}>
      <ToastActionsContext.Provider value={actions}>
        {children}
      </ToastActionsContext.Provider>
    </ToastStateContext.Provider>
  );
}

/**
 * Custom hook to use toast actions (success, error, etc) - Stable
 */
export function useToast() {
  const context = useContext(ToastActionsContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}

/**
 * Custom hook to use toast state (toasts list) - Unstable (triggers re-render)
 */
export function useToastState() {
  const context = useContext(ToastStateContext);
  if (context === undefined) throw new Error('useToastState must be used within a ToastProvider');
  return context;
}

export default ToastActionsContext;

