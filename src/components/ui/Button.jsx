import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Button Component - Premium SaaS Style
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed group';

  const variants = {
    primary: 'bg-primary-600 text-white shadow-md hover:bg-primary-500 hover:shadow-glow',
    secondary: 'bg-white text-surface-800 border border-surface-200 shadow-sm hover:shadow-md hover:border-primary-200 hover:text-primary-600',
    glass: 'bg-white/20 backdrop-blur-md border border-white/40 text-surface-800 hover:bg-white/30 shadow-glass',
    ghost: 'text-surface-600 hover:text-primary-600 hover:bg-primary-50/50',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:shadow-glow',
    danger: 'bg-red-500 text-white shadow-md hover:bg-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    subtle: 'bg-surface-100/50 text-surface-700 hover:bg-surface-200/80',
    vault: 'bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/5 font-black text-[10px] uppercase tracking-[0.2em]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 tracking-wide',
    md: 'px-4 py-2.5 text-sm gap-2 tracking-wide',
    lg: 'px-6 py-3 text-base gap-2 tracking-wide',
    xl: 'px-8 py-4 text-lg gap-3 tracking-wide',
  };

  const variantsStyles = variants[variant] || variants.primary;
  const sizesStyles = sizes[size] || sizes.md;

  return (
    <motion.button
      ref={ref}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variantsStyles} ${sizesStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shine effect overlay for primary/danger buttons */}
      {(variant === 'primary' || variant === 'danger') && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      )}

      {loading ? (
        <svg className="animate-spin-slow h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <span className="relative z-10 flex items-center justify-center gap-[inherit]">
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} className="transition-transform group-hover:-translate-x-0.5" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} className="transition-transform group-hover:translate-x-0.5" />}
        </span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
