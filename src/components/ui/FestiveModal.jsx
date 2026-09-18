import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { soundManager } from '../../services/soundManager.js';

export default function FestiveModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl',
  id,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        soundManager.playButton();
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id={id || 'festive-modal'}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Dimmed festive backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity duration-300"
        onClick={() => {
          soundManager.playButton();
          onClose();
        }}
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative w-full ${maxWidth} bg-gradient-to-b from-amber-950/95 via-stone-900/95 to-amber-950/95 border-2 border-amber-400/40 rounded-2xl shadow-2xl shadow-black/80 z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col`}
      >
        {/* Top Auspicious Floral Border Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-amber-500/20 flex items-center justify-between gap-4 flex-shrink-0">
          <div>
            {title && (
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-amber-100 tracking-wide flex items-center gap-2">
                <span>{title}</span>
              </h2>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-amber-300/80 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              soundManager.playButton();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-amber-900/40 hover:bg-amber-800/60 border border-amber-500/30 text-amber-300 hover:text-amber-100 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-amber-100/90 text-sm sm:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
