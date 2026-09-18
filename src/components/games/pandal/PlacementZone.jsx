import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import {
  ToranVisual,
  DraperyVisual,
  FlowersVisual,
  DiyasVisual,
  OfferingPlateVisual,
  RangoliVisual,
} from './PandalItemVisuals.jsx';

export default function PlacementZone({
  zoneId,
  title,
  isPlaced,
  isHighlighted,
  isSelectedTarget,
  onZoneClick,
  className = '',
  id,
}) {
  const renderPlacedVisual = () => {
    switch (zoneId) {
      case 'zone-toran':
        return <ToranVisual className="animate-gentle-pulse" />;
      case 'zone-drapery':
        return <DraperyVisual />;
      case 'zone-flowers':
        return <FlowersVisual />;
      case 'zone-diyas':
        return <DiyasVisual />;
      case 'zone-offering':
        return <OfferingPlateVisual />;
      case 'zone-rangoli':
        return <RangoliVisual className="animate-gentle-pulse" />;
      default:
        return null;
    }
  };

  return (
    <div
      id={id || zoneId}
      data-zone-id={zoneId}
      onClick={() => onZoneClick && onZoneClick(zoneId)}
      className={`relative transition-all duration-300 select-none flex items-center justify-center ${
        isPlaced
          ? 'pointer-events-none'
          : 'cursor-pointer hover:border-amber-400/60'
      } ${
        isHighlighted || isSelectedTarget
          ? 'border-2 border-amber-300 bg-amber-400/20 shadow-[0_0_25px_rgba(245,158,11,0.8)] ring-4 ring-amber-400/30 scale-102 rounded-xl z-30'
          : !isPlaced
          ? 'border border-dashed border-amber-500/30 bg-amber-950/20 hover:bg-amber-900/30 rounded-xl'
          : ''
      } ${className}`}
    >
      {isPlaced ? (
        // Placed item visual
        <div className="w-full h-full relative flex items-center justify-center">
          {renderPlacedVisual()}
        </div>
      ) : (
        // Empty target hint placeholder
        <div className="flex flex-col items-center justify-center p-2 text-center pointer-events-none">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 transition-all ${
              isHighlighted || isSelectedTarget
                ? 'bg-amber-400 text-stone-950 scale-115'
                : 'bg-amber-500/15 text-amber-300/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span
            className={`text-[10px] sm:text-xs font-semibold tracking-wide transition-colors ${
              isHighlighted || isSelectedTarget
                ? 'text-amber-200 font-bold'
                : 'text-amber-400/60'
            }`}
          >
            {title}
          </span>
          {isSelectedTarget && (
            <span className="text-[9px] text-amber-300 mt-0.5 animate-pulse font-medium">
              Tap to place
            </span>
          )}
        </div>
      )}
    </div>
  );
}
