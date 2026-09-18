import React from 'react';
import { Sparkles, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';

export default function FestiveToast() {
  const { toasts } = useGame();

  if (!toasts || toasts.length === 0) return null;

  const iconMap = {
    festive: Sparkles,
    success: CheckCircle,
    warning: AlertCircle,
    info: Info,
  };

  const styleMap = {
    festive:
      'bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-amber-400 text-amber-200 shadow-amber-500/20',
    success:
      'bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border-emerald-400 text-emerald-200 shadow-emerald-500/20',
    warning:
      'bg-gradient-to-r from-orange-950 via-stone-900 to-orange-950 border-orange-400 text-orange-200 shadow-orange-500/20',
    info:
      'bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border-amber-500/40 text-amber-200 shadow-black/40',
  };

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4"
    >
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type] || Sparkles;
        const style = styleMap[toast.type] || styleMap.festive;
        const isRecord =
          toast.message?.includes('Personal Best') ||
          toast.message?.includes('High Score') ||
          toast.type === 'festive';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 overflow-hidden ${
              isRecord
                ? 'bg-gradient-to-r from-amber-950/95 via-stone-900/95 to-amber-950/95 border-amber-300 text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.45)] animate-celebration-pop'
                : `shadow-xl animate-gentle-pulse ${style}`
            }`}
          >
            {isRecord && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 animate-pulse" />
            )}
            <Icon className={`w-5 h-5 flex-shrink-0 ${isRecord ? 'text-yellow-300 animate-spin-slow' : 'text-amber-400'}`} />
            <p className="text-xs sm:text-sm font-medium tracking-wide">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
}
