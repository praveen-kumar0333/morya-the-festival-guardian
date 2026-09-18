import React from 'react';
import { Sparkles, Trophy, Award, Crown, Heart } from 'lucide-react';

/**
 * Deterministic Festival Guardian Rank based on actual final cumulative score.
 * Ranks:
 * 1. 🌼 FESTIVAL FRIEND (< 6,500 pts)
 * 2. 🌸 MORYA GUARDIAN (6,500 – 8,999 pts)
 * 3. 🌿 FESTIVAL CHAMPION (9,000 – 11,499 pts)
 * 4. 👑 MORYA MASTER (11,500+ pts)
 */
export function getGuardianRank(totalScore = 0) {
  if (totalScore >= 11500) {
    return {
      level: 4,
      name: 'MORYA MASTER',
      badge: '👑 MORYA MASTER',
      subtitle: 'Supreme Architect of Bappa’s Divine Abode',
      description: 'Your devotion, artistry, and wisdom have crafted a festival of supreme magnificence!',
      icon: Crown,
      color: 'from-amber-300 via-yellow-400 to-amber-500',
      borderColor: 'border-yellow-400/80',
      glowColor: 'shadow-yellow-500/40',
      textColor: 'text-yellow-300',
      bgGradient: 'from-amber-950/70 via-yellow-950/50 to-stone-950/80',
    };
  }
  if (totalScore >= 9000) {
    return {
      level: 3,
      name: 'FESTIVAL CHAMPION',
      badge: '🌿 FESTIVAL CHAMPION',
      subtitle: 'Exemplary Guardian of Sacred Traditions',
      description: 'You protected the festival spirit with harmony, speed, and deep eco-consciousness.',
      icon: Trophy,
      color: 'from-emerald-300 via-teal-300 to-amber-400',
      borderColor: 'border-emerald-400/70',
      glowColor: 'shadow-emerald-500/30',
      textColor: 'text-emerald-300',
      bgGradient: 'from-emerald-950/60 via-stone-950/80 to-amber-950/60',
    };
  }
  if (totalScore >= 6500) {
    return {
      level: 2,
      name: 'MORYA GUARDIAN',
      badge: '🌸 MORYA GUARDIAN',
      subtitle: 'Honored Protector of Festival Harmony',
      description: 'Your dedication brought beauty, vibrant color, and joyful offerings to the mandap.',
      icon: Award,
      color: 'from-rose-300 via-amber-300 to-yellow-300',
      borderColor: 'border-rose-400/60',
      glowColor: 'shadow-rose-500/25',
      textColor: 'text-rose-300',
      bgGradient: 'from-rose-950/60 via-stone-950/80 to-amber-950/60',
    };
  }
  return {
    level: 1,
    name: 'FESTIVAL FRIEND',
    badge: '🌼 FESTIVAL FRIEND',
    subtitle: 'Devoted Helper of the Celebrations',
    description: 'Every flower placed and choice made brought joy to the festival celebration.',
    icon: Heart,
    color: 'from-amber-200 via-yellow-200 to-orange-300',
    borderColor: 'border-amber-400/50',
    glowColor: 'shadow-amber-500/20',
    textColor: 'text-amber-300',
    bgGradient: 'from-amber-950/50 via-stone-950/80 to-stone-950/90',
  };
}

export default function GuardianRank({ totalScore = 0, className = '' }) {
  const rank = getGuardianRank(totalScore);
  const Icon = rank.icon;

  return (
    <div
      id="guardian-rank-card"
      className={`w-full max-w-lg mx-auto p-4 sm:p-5 rounded-2xl border-2 ${rank.borderColor} bg-gradient-to-b ${rank.bgGradient} shadow-xl ${rank.glowColor} text-center space-y-2 relative overflow-hidden ${className}`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-400/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <span className="text-[11px] uppercase tracking-widest font-bold text-amber-300/80">
          YOUR TITLE
        </span>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-950/70 border border-amber-400/40 shadow-md">
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${rank.textColor}`} />
          <h2 className="font-heading font-black text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-300 tracking-wide">
            {rank.badge}
          </h2>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-amber-100/90 mt-0.5">
          {rank.subtitle}
        </p>

        <p className="text-xs text-amber-300/75 max-w-md italic">
          "{rank.description}"
        </p>
      </div>
    </div>
  );
}
