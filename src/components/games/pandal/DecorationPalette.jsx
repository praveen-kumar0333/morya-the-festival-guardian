import React from 'react';
import DraggableDecoration from './DraggableDecoration.jsx';
import { PANDAL_ITEMS } from './pandalItems.js';

export default function DecorationPalette({
  placedItems = {},
  selectedItemId = null,
  onPointerStart,
  onItemSelect,
  className = '',
  id,
}) {
  const placedCount = Object.keys(placedItems).filter((k) => placedItems[k]).length;
  const totalCount = PANDAL_ITEMS.length;

  return (
    <div
      id={id || 'decoration-palette'}
      className={`w-full max-w-3xl mx-auto rounded-2xl bg-stone-950/80 border border-amber-500/30 p-3 sm:p-4 backdrop-blur-md shadow-xl ${className}`}
    >
      {/* Palette Header */}
      <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <h3 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-amber-200">
            Decoration Tray
          </h3>
          <span className="text-[10px] sm:text-xs text-amber-300/70 hidden xs:inline">
            (Drag item or Tap to select)
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-400/30 text-amber-300 text-xs font-semibold tabular-nums">
          <span>Placed:</span>
          <span className="text-amber-100 font-bold">
            {placedCount} / {totalCount}
          </span>
        </div>
      </div>

      {/* Grid of Draggable Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
        {PANDAL_ITEMS.map((item) => (
          <DraggableDecoration
            key={item.id}
            item={item}
            isPlaced={Boolean(placedItems[item.id])}
            isSelected={selectedItemId === item.id}
            onPointerStart={onPointerStart}
            onItemSelect={onItemSelect}
          />
        ))}
      </div>
    </div>
  );
}
