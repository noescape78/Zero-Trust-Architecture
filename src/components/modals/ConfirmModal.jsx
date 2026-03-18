import { motion } from 'framer-motion';
import { AlertTriangle, Check, AlertCircle, Shield } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

/**
 * ConfirmModal - Redesigned for Dark Premium Theme
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'AUTHORIZE_ACTION',
  message,
  confirmText = 'AUTHORIZE',
  cancelText = 'DISCARD',
  variant = 'danger',
  loading = false
}) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  // Modal styling variations based on variant
  const styles = {
    danger: {
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-500',
      Icon: AlertTriangle,
      buttonVariant: 'danger',
      glowClass: 'shadow-[0_0_80px_rgba(239,68,68,0.05)]',
      borderColor: 'border-red-500/20'
    },
    primary: {
      iconBg: 'bg-indigo-500/10',
      iconColor: 'text-indigo-500',
      Icon: AlertCircle,
      buttonVariant: 'primary',
      glowClass: 'shadow-[0_0_80px_rgba(139,92,246,0.05)]',
      borderColor: 'border-indigo-500/20'
    },
    success: {
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
      Icon: Check,
      buttonVariant: 'primary',
      glowClass: 'shadow-[0_0_80px_rgba(16,185,129,0.05)]',
      borderColor: 'border-emerald-500/20'
    }
  };

  const currentStyles = styles[variant] || styles.primary;
  const CurrentIcon = currentStyles.Icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnOverlayClick={!loading}
      className={currentStyles.glowClass}
    >
      <div className="space-y-10 py-2">
        <div className="flex flex-col items-center text-center px-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-24 h-24 rounded-[2rem] bg-black flex items-center justify-center mb-8 shadow-2xl border ${currentStyles.borderColor} ${currentStyles.iconBg}`}
          >
            <CurrentIcon size={40} className={currentStyles.iconColor} />
          </motion.div>
          
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">{title}</h3>
          
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] leading-relaxed max-w-xs">
            {message}
          </p>
        </div>

        <div className="flex gap-4 pt-6 border-t border-white/5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`
              flex-1 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl
              ${variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-white text-black hover:bg-zinc-200'}
            `}
          >
            {loading ? 'PROCESSING...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
