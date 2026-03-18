import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ui/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import {  } from 'lucide-react';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Upload = lazy(() => import('./pages/Upload'));
const Receive = lazy(() => import('./pages/Receive'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Security = lazy(() => import('./pages/Security'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Overview = lazy(() => import('./pages/Overview'));
const Infrastructure = lazy(() => import('./pages/Infrastructure'));
const Settings = lazy(() => import('./pages/Settings'));
const Protocol = lazy(() => import('./pages/Protocol'));
const Uptime = lazy(() => import('./pages/Uptime'));
const Advisory = lazy(() => import('./pages/Advisory'));

/**
 * Loading Fallback Component - Modern SaaS Style
 */
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-surface-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

/**
 * App Routes Component
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Suspense fallback={<LoadingFallback />}><Home /></Suspense>} />
      <Route path="/login" element={<Suspense fallback={<LoadingFallback />}><Login /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<LoadingFallback />}><Register /></Suspense>} />
      <Route path="/receive" element={<Suspense fallback={<LoadingFallback />}><Receive /></Suspense>} />
      <Route path="/pricing" element={<Suspense fallback={<LoadingFallback />}><Pricing /></Suspense>} />
      <Route path="/security" element={<Suspense fallback={<LoadingFallback />}><Security /></Suspense>} />
      <Route path="/how-it-works" element={<Suspense fallback={<LoadingFallback />}><HowItWorks /></Suspense>} />
      <Route path="/overview" element={<Suspense fallback={<LoadingFallback />}><Overview /></Suspense>} />
      <Route path="/infrastructure" element={<Suspense fallback={<LoadingFallback />}><Infrastructure /></Suspense>} />
      <Route path="/protocol" element={<Suspense fallback={<LoadingFallback />}><Protocol /></Suspense>} />
      <Route path="/uptime" element={<Suspense fallback={<LoadingFallback />}><Uptime /></Suspense>} />
      <Route path="/advisory" element={<Suspense fallback={<LoadingFallback />}><Advisory /></Suspense>} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingFallback />}><Dashboard /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/upload" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingFallback />}><Upload /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingFallback />}><Settings /></Suspense>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

/**
 * Main App Component
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

