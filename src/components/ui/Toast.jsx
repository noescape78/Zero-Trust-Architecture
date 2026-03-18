import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, X,
  CheckCircle, AlertCircle, Info
} from 'lucide-react';
import { useToast, useToastState } from '../../context/ToastContext';

/**
 * Toast Container Component - Modern SaaS Style
 */
export default function ToastContainer() {
  const toasts = useToastState();
  const { removeToast } = useToast();

  const config = {
    success: {
      icon: <CheckCircle size={20} className="text-green-500" />,
      style: 'bg-white border-green-200 text-green-700',
      accent: 'bg-green-500',
    },
    error: {
      icon: <AlertCircle size={20} className="text-red-500" />,
      style: 'bg-white border-red-200 text-red-700',
      accent: 'bg-red-500',
    },
    warning: {
      icon: <AlertTriangle size={20} className="text-amber-500" />,
      style: 'bg-white border-amber-200 text-amber-700',
      accent: 'bg-amber-500',
    },
    info: {
      icon: <Info size={20} className="text-blue-500" />,
      style: 'bg-white border-blue-200 text-blue-700',
      accent: 'bg-blue-500',
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-sm">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const cfg = config[toast.type] || config.info;
          return (
            <motion.div
              layout
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`
                flex items-center gap-3 p-4 rounded-xl border shadow-lg
                ${cfg.style}
              `}
            >
              <div className="flex-shrink-0">
                {cfg.icon}
              </div>

              <p className="flex-1 text-sm font-medium">{toast.message}</p>

              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

