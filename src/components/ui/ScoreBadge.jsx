import React from 'react';
import { Trophy, Flame, Award } from 'lucide-react';

export default function ScoreBadge({
  score = 0,
  label = 'Score',
  combo = 0,
  size = 'md',
  showIcon = true,
  className = '',
  variant = 'gold',
  id,
}) {
  const formattedScore = Number(score).toLocaleString();

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-base sm:text-lg px-5 py-2.5 gap-3',
    xl: 'text-xl sm:text-2xl px-6 py-4 gap-3',
  };

  const scoreTextSizes = {
    sm: 'text-sm font-bold',
    md: 'text-base sm:text-lg font-bold',
    lg: 'text-xl sm:text-2xl font-extrabold',
    xl: 'text-3xl sm:text-4xl font-black font-heading',
  };

  const variantClasses = {
    gold: 'bg-gradient-to-r from-amber-950/80 to-amber-900/60 border border-amber-400/40 text-amber-200 shadow-amber-950/50',
    emerald: 'bg-gradient-to-r from-emerald-950/80 to-teal-900/60 border border-emerald-400/40 text-emerald-200',
    saffron: 'bg-gradient-to-r from-orange-950/80 to-red-900/60 border border-orange-400/40 text-orange-200',
  };

  return (
    <div
      id={id}
      className={`inline-flex items-center rounded-xl backdrop-blur-md shadow-md ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {showIcon && (
        <div className="text-amber-400 flex-shrink-0">
          {combo > 1 ? (
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
          ) : size === 'xl' ? (
            <Award className="w-8 h-8 text-amber-400" />
          ) : (
            <Trophy className="w-4 h-4 text-amber-400" />
          )}
        </div>
      )}

      <div className="flex flex-col">
        {label && (
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-300/70 font-semibold leading-tight">
            {label}
          </span>
        )}
        <div className="flex items-center gap-2">
          <span className={`${scoreTextSizes[size]} text-amber-100 tabular-nums`}>
            {formattedScore}
          </span>
          {combo > 1 && (
            <span className={`text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded-full border transition-all duration-300 animate-pulse ${
              combo >= 5
                ? 'bg-gradient-to-r from-red-600/50 to-orange-500/50 border-orange-300 text-yellow-200 shadow-[0_0_12px_rgba(239,68,68,0.7)]'
                : 'bg-orange-500/30 border-orange-400/50 text-orange-200 shadow-[0_0_8px_rgba(245,158,11,0.4)]'
            }`}>
              {combo}x COMBO
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
