import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable Input Component - Multi-variant for SaaS and Vault themes
 */
const Input = forwardRef(({
  label,
  type = 'text',
  error,
  variant = 'standard', // 'standard' or 'vault'
  icon: Icon,
  iconPosition = 'left',
  rightIcon: RightIcon,
  rightIconAction,
  showPasswordToggle = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const isVault = variant === 'vault';

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label className={`block font-black uppercase tracking-[0.3em] mb-1 px-1 ${
          isVault ? 'text-[10px] text-zinc-500' : 'text-[11px] text-surface-700'
        }`}>
          {label}
        </label>
      )}
      
      <div className="relative group">
        {/* Glow backdrop behind input */}
        <div className={`absolute inset-0 bg-primary-500/10 rounded-2xl blur-xl transition-opacity duration-300 ${isFocused && !error ? 'opacity-100' : 'opacity-0'}`} />

        {Icon && iconPosition === 'left' && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 ${
            isFocused ? 'text-primary-500' : 'text-surface-400'
          }`}>
            <Icon size={18} />
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          className={`
            relative z-0 w-full border transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isVault 
              ? 'bg-black text-white border-white/5 placeholder-zinc-800 rounded-2xl py-4' 
              : 'bg-white/80 backdrop-blur-sm text-surface-800 border-surface-200 placeholder-surface-400 rounded-xl py-3 shadow-sm'
            }
            ${Icon && iconPosition === 'left' ? 'pl-11 pr-4' : 'px-4'}
            ${(RightIcon || showPasswordToggle || isPassword) && iconPosition !== 'left' ? 'pr-12' : 'pr-4'}
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/10' 
              : isVault ? 'hover:border-white/10' : 'hover:border-primary-300'
            }
            text-sm font-medium tracking-wide
            ${className}
          `}
          {...props}
        />
        
        {(RightIcon || showPasswordToggle || isPassword) && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2">
            {RightIcon && (
              <button
                type="button"
                onClick={rightIconAction}
                className="p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
              >
                <RightIcon size={18} />
              </button>
            )}
            
            {showPasswordToggle && isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1.5 px-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
