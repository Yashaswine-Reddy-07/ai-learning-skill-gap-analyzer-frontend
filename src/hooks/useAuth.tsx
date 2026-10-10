import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authApi } from '../services/authApi';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateUserGoal: (careerGoal: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'skill_analyzer_user';

/**
 * Authentication Provider component wrapping the application to supply auth state.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.token) {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error('useAuth: Failed to parse user from localStorage', err);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logs student in and updates context and localStorage.
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const res = await authApi.login(credentials);
      if (res.success && res.data) {
        const authUser: User = {
          studentId: res.data.studentId,
          name: res.data.name,
          email: res.data.email,
          careerGoal: res.data.careerGoal,
          token: res.data.token,
        };
        setUser(authUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      }
    } catch (err) {
      console.error('useAuth: Login operation failed', err);
      throw err;
    }
  };

  /**
   * Registers a new student and authenticates immediately.
   */
  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      const res = await authApi.register(credentials);
      if (res.success && res.data) {
        const authUser: User = {
          studentId: res.data.studentId,
          name: res.data.name,
          email: res.data.email,
          careerGoal: res.data.careerGoal,
          token: res.data.token,
        };
        setUser(authUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      }
    } catch (err) {
      console.error('useAuth: Registration operation failed', err);
      throw err;
    }
  };

  /**
   * Logs out student and removes token.
   */
  const logout = (): void => {
    try {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('useAuth: Logout cleanup error', err);
    }
  };

  /**
   * Updates user's career goal in active session.
   */
  const updateUserGoal = (careerGoal: string): void => {
    try {
      if (user) {
        const updated = { ...user, careerGoal };
        setUser(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch (err) {
      console.error('useAuth: Error updating user goal state', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserGoal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
