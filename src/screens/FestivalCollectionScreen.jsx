import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  Lock,
  CheckCircle2,
  Sliders,
  Award,
  Info,
  Palette,
} from 'lucide-react';
import { useGame } from '../context/GameContext.jsx';
import {
  FESTIVAL_COLLECTION_ITEMS,
  COLLECTION_CATEGORIES,
  CATEGORY_INFO,
  RARITY_CONFIG,
} from '../constants/collectionData.js';
import FestiveButton from '../components/ui/FestiveButton.jsx';
import FestiveCard from '../components/ui/FestiveCard.jsx';
import MarigoldGarland from '../components/festive/MarigoldGarland.jsx';
import Diya from '../components/festive/Diya.jsx';
import { soundManager } from '../services/soundManager.js';

export default function FestivalCollectionScreen({ onBackToMainMenu }) {
  const {
    collectionState,
    activeSelections,
    setActiveSelection,
    checkCollectionUnlocks,
  } = useGame();

  const [activeCategory, setActiveCategory] = useState(COLLECTION_CATEGORIES.ALL);
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Trigger safe check on mount to ensure any newly qualified items unlock
  React.useEffect(() => {
    checkCollectionUnlocks();
  }, [checkCollectionUnlocks]);

  const unlockedIds = collectionState?.unlockedItemIds || [];
  const totalCount = FESTIVAL_COLLECTION_ITEMS.length;
  const unlockedCount = unlockedIds.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  // Filter items by selected category
  const displayedItems = FESTIVAL_COLLECTION_ITEMS.filter((item) => {
    if (activeCategory === COLLECTION_CATEGORIES.ALL) return true;
    return item.category === activeCategory;
  });

  const handleCategoryChange = (cat) => {
    soundManager.playButton();
    setActiveCategory(cat);
  };

  const handleSelectDecoration = (category, itemId) => {
    soundManager.playCorrect();
    setActiveSelection(category, itemId);
  };

  return (
    <div
      id="festival-collection-screen"
      className="w-full min-h-screen flex flex-col items-center px-3 sm:px-6 py-4 sm:py-8 max-w-5xl mx-auto z-10 space-y-5 animate-fade-in"
    >
      {/* Top Auspicious Garland */}
      <MarigoldGarland className="max-w-2xl" />

      {/* Header Bar with Back Button */}
      <header className="w-full flex items-center justify-between gap-3">
        <FestiveButton
          variant="outline"
          size="sm"
          icon={ArrowLeft}
          onClick={() => {
            soundManager.playButton();
            onBackToMainMenu();
          }}
          className="text-xs sm:text-sm bg-stone-900/80 border-amber-500/40 hover:border-amber-400"
          id="collection-back-button"
        >
          Main Menu
        </FestiveButton>

        <button
          onClick={() => {
            soundManager.playButton();
            setShowCustomizer(!showCustomizer);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all shadow-md ${
            showCustomizer
              ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-amber-500/30'
              : 'bg-stone-900/80 text-amber-200 border-amber-500/40 hover:border-amber-300'
          }`}
          id="toggle-customizer-btn"
        >
          <Sliders className="w-4 h-4" />
          <span>{showCustomizer ? 'Hide Customizer' : 'Customize Grand Morya'}</span>
        </button>
      </header>

      {/* Main Title Section */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>SACRED TREASURES & REWARDS</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 drop-shadow-md">
          FESTIVAL COLLECTION
        </h1>

        <p className="text-xs sm:text-base text-amber-200/90 italic max-w-xl mx-auto">
          "Every celebration leaves a little more color behind."
        </p>
      </div>

      {/* Progress Card */}
      <FestiveCard
        highlight
        className="w-full p-4 sm:p-5 border-amber-400/40 bg-gradient-to-r from-stone-950/90 via-amber-950/40 to-stone-950/90 shadow-xl space-y-3"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block">
              Treasures Discovered
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-black text-2xl sm:text-3xl text-amber-100">
                {unlockedCount}
              </span>
              <span className="text-sm font-semibold text-amber-400/80">
                / {totalCount} Unlocked
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-black text-amber-300">
              {progressPercent}% Complete
            </span>
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300">
              <Diya size={24} />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden border border-amber-500/30 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-[11px] sm:text-xs text-amber-300/80 text-center font-medium">
          {unlockedCount < totalCount
            ? '✨ Play Festival stages, score milestones, and complete Challenge trials to unlock more festival treasures!'
            : '🌟 Magnificent! All festival treasures unlocked! Your devotion shines eternally!'}
        </p>
      </FestiveCard>

      {/* GRAND MORYA CUSTOMIZER PANEL (Toggled or inline) */}
      {showCustomizer && (
        <section
          aria-label="Grand Morya customization panel"
          className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-950/60 via-stone-900/90 to-stone-950/90 border-2 border-amber-400/60 shadow-2xl space-y-4 animate-slide-in"
        >
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-heading font-black text-lg text-amber-100">
                  Customize Grand Morya
                </h3>
                <p className="text-xs text-amber-200/80">
                  Select your active decoration for each category. These adorn Bappa's shrine in the finale!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {Object.values(COLLECTION_CATEGORIES).map((catKey) => {
              if (catKey === COLLECTION_CATEGORIES.ALL) return null;
              const catMeta = CATEGORY_INFO[catKey];
              const selectedId = activeSelections[catKey];
              const selectedItem = FESTIVAL_COLLECTION_ITEMS.find((i) => i.id === selectedId);

              return (
                <div
                  key={catKey}
                  className="p-3 rounded-xl bg-stone-950/80 border border-amber-500/40 flex flex-col items-center text-center space-y-1.5 shadow-inner"
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    {catMeta.label}
                  </span>
                  <div className="text-3xl my-1 filter drop-shadow">
                    {selectedItem?.emoji || catMeta.emoji}
                  </div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-100 truncate w-full">
                    {selectedItem?.name || 'Standard'}
                  </h4>
                  <span className="text-[10px] text-amber-400/70">
                    Active for Finale
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Category Filter Pills */}
      <nav
        aria-label="Filter collection items by category"
        className="w-full flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar"
      >
        <button
          onClick={() => handleCategoryChange(COLLECTION_CATEGORIES.ALL)}
          className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
            activeCategory === COLLECTION_CATEGORIES.ALL
              ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md shadow-amber-500/30'
              : 'bg-stone-900/80 text-amber-300 border-amber-500/30 hover:border-amber-400'
          }`}
        >
          🌟 All ({totalCount})
        </button>

        {Object.values(COLLECTION_CATEGORIES).map((cat) => {
          if (cat === COLLECTION_CATEGORIES.ALL) return null;
          const info = CATEGORY_INFO[cat];
          const isSelected = activeCategory === cat;
          const categoryItems = FESTIVAL_COLLECTION_ITEMS.filter((i) => i.category === cat);
          const catUnlocked = categoryItems.filter((i) => unlockedIds.includes(i.id)).length;

          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md shadow-amber-500/30'
                  : 'bg-stone-900/80 text-amber-300 border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <span>{info.emoji}</span>
              <span>{info.label}</span>
              <span className="text-[10px] opacity-75">
                ({catUnlocked}/{categoryItems.length})
              </span>
            </button>
          );
        })}
      </nav>

      {/* Collection Grid */}
      <main
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-1"
        aria-label="Collectible festival items"
      >
        {displayedItems.length === 0 ? (
          <div className="col-span-full py-12 text-center text-amber-300/70 space-y-2">
            <Sparkles className="w-10 h-10 mx-auto text-amber-500/50" />
            <p className="text-sm font-heading font-medium">No items found in this category.</p>
          </div>
        ) : (
          displayedItems.map((item) => {
          const isUnlocked = unlockedIds.includes(item.id);
          const isActive = activeSelections[item.category] === item.id;
          const rarity = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.Common;

          return (
            <div
              key={item.id}
              id={`collection-item-${item.id}`}
              className={`relative rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between border-2 ${
                isUnlocked
                  ? `bg-gradient-to-b ${rarity.color} ${rarity.border} ${rarity.glow} hover:scale-[1.02]`
                  : 'bg-stone-950/70 border-stone-800/80 opacity-60 hover:opacity-80'
              }`}
            >
              {/* Card Header: Rarity Badge & Status */}
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                    isUnlocked ? rarity.badge : 'bg-stone-900 text-stone-400 border-stone-700'
                  }`}
                >
                  {item.rarity}
                </span>

                {isUnlocked ? (
                  isActive ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-300/80 font-semibold bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/20">
                      Unlocked
                    </span>
                  )
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-stone-400 bg-stone-900/90 px-2 py-0.5 rounded-full border border-stone-700">
                    <Lock className="w-3 h-3 text-stone-400" />
                    Locked
                  </span>
                )}
              </div>

              {/* Item Avatar & Visual Motif */}
              <div className="flex flex-col items-center my-2 text-center">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shadow-inner border transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-amber-400/50 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      : 'bg-stone-900/60 border-stone-800 grayscale'
                  }`}
                >
                  {isUnlocked ? item.emoji : <Lock className="w-8 h-8 text-stone-600" />}
                </div>

                <h3
                  className={`font-heading font-black text-base sm:text-lg mt-3 ${
                    isUnlocked ? 'text-amber-100' : 'text-stone-400'
                  }`}
                >
                  {item.name}
                </h3>

                <span className="text-[11px] font-semibold text-amber-400/80 uppercase tracking-wider mt-0.5">
                  {CATEGORY_INFO[item.category]?.label}
                </span>

                <p className="text-xs text-amber-200/80 line-clamp-2 mt-1.5 px-1 leading-snug">
                  {isUnlocked ? item.description : 'Unlock this festive treasure to adorn Grand Morya.'}
                </p>
              </div>

              {/* Card Footer: Selection or Unlock Requirement */}
              <div className="mt-3 pt-3 border-t border-amber-500/20 w-full">
                {isUnlocked ? (
                  isActive ? (
                    <button
                      disabled
                      className="w-full py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-default"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Adorning Grand Morya
                    </button>
                  ) : (
                    <FestiveButton
                      variant="secondary"
                      size="sm"
                      className="w-full text-xs font-bold py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-amber-50 border-amber-400/50 shadow-md"
                      onClick={() => handleSelectDecoration(item.category, item.id)}
                      id={`select-decor-${item.id}`}
                    >
                      Set as Active Decor
                    </FestiveButton>
                  )
                ) : (
                  <div className="flex items-start gap-1.5 text-[11px] text-stone-400 bg-stone-950/60 p-2 rounded-xl border border-stone-800">
                    <Info className="w-3.5 h-3.5 text-amber-400/70 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">
                      <strong className="text-amber-300/90 font-semibold block text-[10px] uppercase">
                        How to Unlock:
                      </strong>
                      {item.unlockRequirement}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        }))}
      </main>

      {/* Devotional Footer Banner */}
      <footer className="w-full text-center py-4 border-t border-amber-500/20 text-xs text-amber-400/60">
        Ganpati Bappa Morya • "Build the celebration. Protect the spirit. Make Morya shine."
      </footer>
    </div>
  );
}
