import React from 'react';
import {
  Leaf,
  Sparkles,
  CheckCircle,
  Recycle,
  Flower2,
  Package,
  Trash2,
  Shirt,
  Utensils,
  Palette,
  Users,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function EcoChoiceCard({
  choice,
  index,
  onSelect,
  isSelected = false,
  isOtherSelected = false,
  disabled = false,
  feedbackState = null, // 'correct' | 'wrong' | null
  earnedScore = null,
  id,
}) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'fabric':
      case 'fabric_art':
        return Shirt;
      case 'flower':
        return Flower2;
      case 'natural_powder':
      case 'chemical':
        return Palette;
      case 'brass_plate':
      case 'banana_leaf':
      case 'plastic_wrap':
        return Utensils;
      case 'recycle_bin':
        return Recycle;
      case 'storage_box':
        return Package;
      case 'community_hands':
      case 'clean_mandap':
        return Users;
      case 'dumpster':
      case 'mixed_trash':
      case 'scattered_trash':
      case 'untidy_ground':
      case 'plastic':
        return Trash2;
      default:
        return Leaf;
    }
  };

  const IconComponent = getCategoryIcon(choice.category);
  const isEco = choice.isEco;

  // Keypress handler for keyboard accessibility
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(choice);
    }
  };

  return (
    <button
      id={id || `eco-choice-${choice.id}`}
      type="button"
      onClick={() => !disabled && onSelect(choice)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={`Option ${index + 1}: ${choice.title}. ${choice.description}.`}
      aria-pressed={isSelected}
      className={`group relative w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 min-h-[110px] sm:min-h-[120px] flex flex-col justify-between select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-[0.98] ${
        isSelected
          ? isEco
            ? 'bg-emerald-950/90 border-emerald-400 shadow-xl shadow-emerald-500/25 scale-[1.02] ring-1 ring-emerald-400'
            : 'bg-amber-950/90 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.01]'
          : isOtherSelected
          ? 'opacity-45 bg-stone-950/60 border-stone-800'
          : 'bg-stone-900/80 hover:bg-stone-850/90 border-amber-500/25 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10'
      } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {/* Floating Consequence Points Badge on Selection */}
      {isSelected && (
        <div className="absolute -top-3 right-4 z-20 flex items-center gap-1.5 animate-bounce">
          <span
            className={`px-2.5 py-0.5 rounded-full font-bold text-xs shadow-md border ${
              isEco
                ? 'bg-emerald-500 border-emerald-300 text-stone-950'
                : 'bg-amber-500 border-amber-300 text-stone-950'
            }`}
          >
            +{earnedScore || choice.score} pts
          </span>
          <span
            className={`px-2 py-0.5 rounded-full font-bold text-xs shadow-md border ${
              isEco
                ? 'bg-teal-900 border-teal-400 text-teal-200'
                : 'bg-stone-900 border-orange-500 text-orange-300'
            }`}
          >
            {choice.ecoDelta > 0 ? `+${choice.ecoDelta}` : choice.ecoDelta} Eco
          </span>
        </div>
      )}

      {/* Top row: Category tag & Icon indicator */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isSelected
                ? isEco
                  ? 'bg-emerald-500 text-stone-950'
                  : 'bg-amber-500 text-stone-950'
                : isEco
                ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 group-hover:border-emerald-400'
                : 'bg-stone-800/80 border border-stone-700 text-stone-300'
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400/80 block">
              Option {index + 1}
            </span>
            <h3 className="font-heading font-bold text-base sm:text-lg text-amber-100 group-hover:text-amber-200 leading-snug">
              {choice.title}
            </h3>
          </div>
        </div>

        {/* Choice indicator check / status */}
        <div className="flex items-center">
          {isSelected ? (
            isEco ? (
              <CheckCircle className="w-6 h-6 text-emerald-300 animate-pulse" />
            ) : (
              <Check className="w-5 h-5 text-amber-300" />
            )
          ) : (
            <div className="w-5 h-5 rounded-full border border-stone-700 group-hover:border-amber-400/50 flex items-center justify-center transition-colors">
              <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-amber-400/40" />
            </div>
          )}
        </div>
      </div>

      {/* Middle: Description */}
      <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed line-clamp-2">
        {choice.description}
      </p>

      {/* Bottom Subtle Indicator */}
      <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400">
        <span className="flex items-center gap-1 font-medium">
          {isEco ? (
            <>
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300/90">Eco-Friendly Tradition</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-400/70" />
              <span className="text-amber-400/80">Standard Choice</span>
            </>
          )}
        </span>

        <span className="text-amber-400/90 font-semibold">
          Base: +{choice.score}
        </span>
      </div>
    </button>
  );
}
