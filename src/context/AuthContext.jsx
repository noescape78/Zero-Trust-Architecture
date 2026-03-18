import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authAPI, getErrorMessage } from '../services/api';
import { STORAGE_KEYS } from '../constants';

const AuthContext = createContext(null);

/**
 * Auth Provider - Manages global authentication state
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth status on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

      if (storedToken) {
        try {
          // In a real app, you would validate the token with the server
          // For now, we'll just set the user as authenticated
          setUser({ token: storedToken });
        } catch (err) {
          console.error('Auth initialization failed:', err);
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          setToken(null);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * Login user
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<object>} Login result
   */
  const login = useCallback(async (username, password) => {
    setError(null);
    setLoading(true);

    try {
      const { data } = await authAPI.login({ username, password });
      const { tokens, user: userData } = data;

      // Access token is nested in tokens.access.token
      const accessToken = tokens.access.token;

      // Store token
      localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
      setToken(accessToken);
      setUser({ ...userData, token: accessToken });

      return { success: true, data };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Register new user
   * @param {string} username - Username
   * @param {string} password - Password
   * @param {string} email - Email (optional)
   * @returns {Promise<object>} Register result
   */
  const register = useCallback(async (username, password, email) => {
    setError(null);
    setLoading(true);

    try {
      const { data } = await authAPI.register({ username, password, email });
      // Registration also returns tokens in the same structure if auto-login is desired
      // but for now we'll just return success and let the user log in, 
      // or handle auto-login if the backend provides it.
      return { success: true, data };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setToken(null);
    setUser(null);
    setError(null);

    // Redirect to home
    window.location.href = '/';
  }, []);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!token;

  const value = useMemo(() => ({
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError: () => setError(null)
  }), [user, token, loading, error, isAuthenticated, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 * @returns {object} Auth context value
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default AuthContext;

