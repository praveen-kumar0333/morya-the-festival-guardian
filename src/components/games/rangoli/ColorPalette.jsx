import React from 'react';
import { Eraser, Sparkles } from 'lucide-react';
import { POWDER_COLORS } from './RangoliPattern.js';
import { PowderGlyph } from './RangoliTile.jsx';

export default function ColorPalette({
  availableColors = [],
  selectedColor = null,
  onSelectColor,
  onClearGrid,
  className = '',
  id,
}) {
  return (
    <div
      id={id || 'rangoli-color-palette'}
      className={`w-full max-w-xl mx-auto rounded-2xl bg-stone-950/80 border border-amber-500/30 p-2.5 sm:p-3.5 backdrop-blur-md shadow-xl ${className}`}
    >
      {/* Palette Header */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-amber-500/20">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-amber-200">
            Rangoli Powders
          </h3>
          <span className="text-[10px] text-amber-400/70 hidden xs:inline">
            (Select powder, then tap cells)
          </span>
        </div>

        {onClearGrid && (
          <button
            type="button"
            onClick={onClearGrid}
            className="text-[11px] text-amber-300/80 hover:text-amber-100 flex items-center gap-1 px-2 py-0.5 rounded-lg border border-amber-500/30 hover:border-amber-400/60 bg-amber-950/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            title="Clear all painted cells on grid"
          >
            <Eraser className="w-3 h-3 text-amber-400" />
            <span>Reset Grid</span>
          </button>
        )}
      </div>

      {/* Row of Traditional Brass Powder Bowls */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {availableColors.map((colorKey, idx) => {
          const powder = POWDER_COLORS[colorKey];
          if (!powder) return null;
          const isSelected = selectedColor === colorKey;

          return (
            <button
              key={powder.id}
              id={`powder-btn-${powder.id}`}
              type="button"
              onClick={() => onSelectColor(powder.id)}
              aria-label={`Select ${powder.name} powder`}
              aria-pressed={isSelected}
              className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-all duration-200 select-none min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                isSelected
                  ? 'bg-amber-950/90 border-2 border-amber-300 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/40 scale-105'
                  : 'bg-stone-900/80 hover:bg-stone-800 border-amber-500/20 hover:border-amber-400/50'
              }`}
            >
              {/* Powder mound circular preview */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center p-1 border flex-shrink-0 relative overflow-hidden bg-gradient-to-br ${powder.bgGradient} ${powder.borderClass}`}
                style={{
                  boxShadow: isSelected
                    ? `0 0 10px ${powder.glowColor}`
                    : 'inset 0 1px 2px rgba(0,0,0,0.4)',
                }}
              >
                <div className="w-4 h-4 flex items-center justify-center pointer-events-none">
                  <PowderGlyph colorId={powder.id} />
                </div>
              </div>

              {/* Label & Number Shortcut */}
              <div className="flex flex-col text-left">
                <span
                  className={`text-xs font-bold leading-tight ${
                    isSelected ? 'text-amber-100' : 'text-stone-300 group-hover:text-amber-200'
                  }`}
                >
                  {powder.name}
                </span>
                <span className="text-[9px] text-amber-400/60 font-mono hidden sm:inline">
                  [{idx + 1}]
                </span>
              </div>

              {isSelected && (
                <div className="text-amber-300 animate-pulse pl-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}

        {/* Clear / Empty tool button */}
        <button
          id="powder-btn-empty"
          type="button"
          onClick={() => onSelectColor('empty')}
          aria-label="Eraser: clear cell powder"
          aria-pressed={selectedColor === 'empty'}
          className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 sm:py-2 rounded-xl border transition-all duration-200 select-none min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
            selectedColor === 'empty'
              ? 'bg-stone-800 border-2 border-amber-300 shadow-md ring-2 ring-amber-400/40 scale-105'
              : 'bg-stone-900/60 hover:bg-stone-800 border-amber-500/20 hover:border-amber-400/40 text-stone-400'
          }`}
        >
          <div className="w-6 h-6 rounded-full border border-dashed border-stone-600 flex items-center justify-center bg-stone-950">
            <Eraser className="w-3 h-3 text-stone-400" />
          </div>
          <span className="text-xs font-medium text-stone-300">Clear</span>
        </button>
      </div>
    </div>
  );
}
