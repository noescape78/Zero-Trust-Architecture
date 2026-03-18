import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Reusable Modal Component - Redesigned for Dark Premium Theme
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = ''
}) {
  // Handle escape key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]'
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop with motion blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/60"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`
              relative w-full ${sizes[size]} bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] ${className}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.02]">
                {title && (
                  <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
                    {title}
                  </h2>
                )}
                
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 text-zinc-600 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Content Body */}
            <div className="p-10 overflow-y-auto custom-scrollbar flex-1 relative z-10">
              {children}
            </div>

            {/* Background Glow Decorations */}
            <div className="absolute inset-0 pointer-events-none z-0">
               <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-500/[0.03] blur-[100px] rounded-full" />
               <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-500/[0.03] blur-[100px] rounded-full" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
