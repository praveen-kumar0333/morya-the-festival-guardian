import React from 'react';
import { soundManager } from '../../services/soundManager.js';

export default function FestiveButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  playSound = true,
  id,
  type = 'button',
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (playSound) {
      soundManager.playButton();
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold tracking-wide rounded-xl transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-950 active:scale-98 motion-reduce:transition-none motion-reduce:transform-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 min-h-[44px] gap-1.5',
    md: 'text-sm sm:text-base px-5 py-2.5 min-h-[46px] gap-2 shadow-md',
    lg: 'text-base sm:text-lg px-7 py-3.5 min-h-[54px] gap-2.5 shadow-lg',
    icon: 'p-2.5 min-h-[44px] min-w-[44px] rounded-full',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-amber-950 hover:brightness-105 border border-amber-300/60 shadow-amber-900/30 hover:shadow-amber-500/20 active:translate-y-0.5',
    saffron:
      'bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white hover:brightness-110 border border-orange-400/50 shadow-orange-950/40',
    secondary:
      'bg-amber-900/40 hover:bg-amber-900/60 text-amber-100 border border-amber-500/30 hover:border-amber-400/60 backdrop-blur-sm',
    outline:
      'bg-transparent hover:bg-amber-500/10 text-amber-300 border border-amber-500/40 hover:border-amber-400',
    ghost:
      'bg-transparent hover:bg-amber-500/15 text-amber-200 hover:text-amber-100',
    danger:
      'bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-500/40 hover:border-red-400',
  };

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      )}
      {children && <span>{children}</span>}
      {Icon && iconPosition === 'right' && (
        <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      )}
    </button>
  );
}
