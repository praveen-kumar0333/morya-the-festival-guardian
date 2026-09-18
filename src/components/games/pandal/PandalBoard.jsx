import React from 'react';
import PlacementZone from './PlacementZone.jsx';
import { DevotionalCenterpiece } from './PandalItemVisuals.jsx';

export default function PandalBoard({
  placedItems = {},
  activeZoneHover = null,
  selectedItemId = null,
  onZoneClick,
  id,
}) {
  return (
    <div
      id={id || 'pandal-board-container'}
      className="relative w-full max-w-3xl aspect-[4/3] sm:aspect-[16/11] max-h-[58vh] sm:max-h-[64vh] mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-[#1f0b04] via-[#2d1206] to-[#150702] border-2 border-amber-500/40 shadow-2xl shadow-black/80 flex flex-col justify-between select-none"
    >
      {/* Background Decorative Architecture (Mandir Arch & Wall Texture) */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #f59e0b 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Warm Temple Glow Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-amber-950/80 to-transparent pointer-events-none" />

      {/* Decorative Ornate Pillars Left & Right */}
      <div className="absolute top-0 bottom-0 left-2 sm:left-4 w-6 sm:w-10 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-950 border-r border-amber-400/30 rounded-t-lg pointer-events-none shadow-lg">
        <div className="h-full w-full opacity-30 flex flex-col justify-between py-6">
          <div className="w-full h-1 bg-amber-300" />
          <div className="w-full h-1 bg-amber-300" />
          <div className="w-full h-1 bg-amber-300" />
        </div>
      </div>
      <div className="absolute top-0 bottom-0 right-2 sm:right-4 w-6 sm:w-10 bg-gradient-to-r from-amber-950 via-amber-700 to-amber-900 border-l border-amber-400/30 rounded-t-lg pointer-events-none shadow-lg">
        <div className="h-full w-full opacity-30 flex flex-col justify-between py-6">
          <div className="w-full h-1 bg-amber-300" />
          <div className="w-full h-1 bg-amber-300" />
          <div className="w-full h-1 bg-amber-300" />
        </div>
      </div>

      {/* ========================================================
          LAYER 1: TOP ARCH (Toran Placement Area)
         ======================================================== */}
      <div className="relative z-20 w-full px-8 sm:px-14 pt-1 sm:pt-2">
        <PlacementZone
          zoneId="zone-toran"
          title="Hang Marigold Toran"
          isPlaced={Boolean(placedItems.toran)}
          isHighlighted={activeZoneHover === 'zone-toran'}
          isSelectedTarget={selectedItemId === 'toran'}
          onZoneClick={onZoneClick}
          className="w-full h-12 sm:h-16"
        />
      </div>

      {/* ========================================================
          LAYER 2: MIDDLE SHRINE & PILLARS (Drapery, Flowers & Ganesha)
         ======================================================== */}
      <div className="relative z-10 flex-1 w-full grid grid-cols-12 px-3 sm:px-8 py-1 items-center">
        {/* Left Side: Flowers & Drapery Area */}
        <div className="col-span-3 flex flex-col justify-around h-full py-2 z-20">
          <PlacementZone
            zoneId="zone-flowers"
            title="Floral Bouquet"
            isPlaced={Boolean(placedItems.flowers)}
            isHighlighted={activeZoneHover === 'zone-flowers'}
            isSelectedTarget={selectedItemId === 'flowers'}
            onZoneClick={onZoneClick}
            className="w-full h-20 sm:h-28"
          />
        </div>

        {/* Center: Lord Ganesha Peaceful Devotional Throne */}
        <div className="col-span-6 relative flex flex-col items-center justify-center h-full z-10">
          {/* Drapery overlays across the top and side pillars */}
          <div className="absolute inset-x-[-15%] top-[-10px] bottom-0 pointer-events-none z-15">
            <PlacementZone
              zoneId="zone-drapery"
              title="Silk Pillar Drapery"
              isPlaced={Boolean(placedItems.drapery)}
              isHighlighted={activeZoneHover === 'zone-drapery'}
              isSelectedTarget={selectedItemId === 'drapery'}
              onZoneClick={onZoneClick}
              className="w-full h-full pointer-events-auto"
            />
          </div>

          {/* Devotional Centerpiece (Always respectful and protected) */}
          <DevotionalCenterpiece className="transform scale-90 sm:scale-100 z-10" />

          {/* Prasad Offering Table right before Lord Ganesha */}
          <div className="w-full max-w-[200px] sm:max-w-[240px] h-14 sm:h-18 -mt-6 sm:-mt-8 z-25">
            <PlacementZone
              zoneId="zone-offering"
              title="Prasad Offering Plate"
              isPlaced={Boolean(placedItems.offeringPlate)}
              isHighlighted={activeZoneHover === 'zone-offering'}
              isSelectedTarget={selectedItemId === 'offeringPlate'}
              onZoneClick={onZoneClick}
              className="w-full h-full bg-amber-950/40"
            />
          </div>
        </div>

        {/* Right Side: Twin Diya Stand or Garland Area */}
        <div className="col-span-3 flex flex-col justify-around h-full py-2 z-20">
          <PlacementZone
            zoneId="zone-diyas"
            title="Twin Brass Diyas"
            isPlaced={Boolean(placedItems.diyas)}
            isHighlighted={activeZoneHover === 'zone-diyas'}
            isSelectedTarget={selectedItemId === 'diyas'}
            onZoneClick={onZoneClick}
            className="w-full h-20 sm:h-28"
          />
        </div>
      </div>

      {/* ========================================================
          LAYER 3: FLOOR COURTYARD (Rangoli Placement Area)
         ======================================================== */}
      <div className="relative z-20 w-full px-4 sm:px-12 pb-2 sm:pb-3 flex justify-center items-center">
        <PlacementZone
          zoneId="zone-rangoli"
          title="Sacred Rangoli Mandala"
          isPlaced={Boolean(placedItems.rangoli)}
          isHighlighted={activeZoneHover === 'zone-rangoli'}
          isSelectedTarget={selectedItemId === 'rangoli'}
          onZoneClick={onZoneClick}
          className="w-28 h-20 sm:w-36 sm:h-24"
        />
      </div>

      {/* Subtle Bottom Gold Trim */}
      <div className="w-full h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />
    </div>
  );
}
