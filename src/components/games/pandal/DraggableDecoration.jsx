import React from 'react';
import { Check, Sparkles, Move } from 'lucide-react';
import {
  ToranVisual,
  DraperyVisual,
  FlowersVisual,
  DiyasVisual,
  OfferingPlateVisual,
  RangoliVisual,
} from './PandalItemVisuals.jsx';

export default function DraggableDecoration({
  item,
  isPlaced,
  isSelected,
  onPointerStart,
  onItemSelect,
  id,
}) {
  const renderItemPreview = () => {
    switch (item.id) {
      case 'toran':
        return <ToranVisual className="transform scale-90" />;
      case 'drapery':
        return <DraperyVisual className="transform scale-75" />;
      case 'flowers':
        return <FlowersVisual className="transform scale-80" />;
      case 'diyas':
        return <DiyasVisual className="transform scale-75" />;
      case 'offeringPlate':
        return <OfferingPlateVisual className="transform scale-80" />;
      case 'rangoli':
        return <RangoliVisual className="transform scale-75" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-300" />;
    }
  };

  const handlePointerDown = (e) => {
    if (isPlaced) return;
    if (onPointerStart) {
      onPointerStart(e, item);
    }
  };

  const handleClick = () => {
    if (isPlaced) return;
    if (onItemSelect) {
      onItemSelect(item.id);
    }
  };

  return (
    <button
      id={id || `item-palette-${item.id}`}
      type="button"
      disabled={isPlaced}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      style={{ touchAction: 'none' }}
      aria-label={`${item.title} - ${isPlaced ? 'Placed' : item.hint}`}
      className={`group relative flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 select-none min-h-[52px] cursor-grab active:cursor-grabbing text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
        isPlaced
          ? 'bg-stone-900/40 border-stone-800 opacity-40 cursor-not-allowed pointer-events-none'
          : isSelected
          ? 'bg-gradient-to-r from-amber-900/90 to-amber-950/90 border-2 border-amber-300 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/40 scale-102'
          : 'bg-stone-900/80 hover:bg-amber-950/70 border-amber-500/30 hover:border-amber-400/60 shadow-md'
      }`}
    >
      {/* Visual Thumbnail Box */}
      <div
        className={`w-11 h-11 sm:w-13 sm:h-13 rounded-lg flex items-center justify-center p-1 border flex-shrink-0 relative overflow-hidden transition-all ${
          isPlaced
            ? 'bg-stone-800 border-stone-700'
            : isSelected
            ? 'bg-amber-400/20 border-amber-300'
            : 'bg-amber-950/50 border-amber-500/30 group-hover:border-amber-400/60'
        }`}
      >
        {isPlaced ? (
          <Check className="w-6 h-6 text-emerald-400" />
        ) : (
          renderItemPreview()
        )}
      </div>

      {/* Label and Hint */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-heading font-bold text-xs sm:text-sm truncate ${
              isPlaced ? 'text-stone-500' : 'text-amber-100 group-hover:text-amber-200'
            }`}
          >
            {item.title}
          </span>
          {isPlaced && (
            <span className="text-[10px] text-emerald-400 font-bold uppercase">
              Placed
            </span>
          )}
        </div>
        <span className="text-[10px] sm:text-xs text-amber-300/70 truncate">
          {item.hint}
        </span>
      </div>

      {/* Drag Indicator Icon */}
      {!isPlaced && (
        <div className="text-amber-400/40 group-hover:text-amber-400 pr-1 flex-shrink-0">
          <Move className="w-4 h-4" />
        </div>
      )}
    </button>
  );
}
