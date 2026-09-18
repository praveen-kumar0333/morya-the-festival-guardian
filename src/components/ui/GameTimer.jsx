import React, { useEffect, useState, useRef } from 'react';
import { Clock } from 'lucide-react';

export default function GameTimer({
  initialSeconds = 45,
  secondsRemaining,
  isPaused = false,
  onTimeUp,
  onTick,
  className = '',
  id,
}) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const onTickRef = useRef(onTick);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTickRef.current = onTick;
    onTimeUpRef.current = onTimeUp;
  });

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    // If secondsRemaining is provided, timer is controlled externally by the stage
    if (secondsRemaining !== undefined) return;
    if (isPaused || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = Math.max(0, prev - 1);
        if (next <= 0) {
          clearInterval(timer);
        }
        setTimeout(() => {
          if (onTickRef.current) onTickRef.current(next);
          if (next <= 0 && onTimeUpRef.current) onTimeUpRef.current();
        }, 0);
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, secondsLeft, secondsRemaining]);

  const displaySeconds =
    secondsRemaining !== undefined ? Math.max(0, Math.floor(secondsRemaining)) : secondsLeft;
  const percentage = Math.max(0, Math.min(100, (displaySeconds / initialSeconds) * 100));
  const isUrgent = displaySeconds <= 10;

  return (
    <div
      id={id}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-colors ${
        isUrgent
          ? 'bg-red-950/70 border-red-500/50 text-red-200 animate-pulse'
          : 'bg-amber-950/60 border-amber-500/30 text-amber-200'
      } ${className}`}
    >
      <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-400' : 'text-amber-400'}`} />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-amber-300/70 font-semibold leading-none">
          Time
        </span>
        <span className="text-base sm:text-lg font-bold font-mono tabular-nums leading-tight">
          00:{displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
        </span>
      </div>
      {/* Micro progress bar */}
      <div className="w-10 h-1.5 bg-amber-950 rounded-full overflow-hidden border border-amber-500/20 ml-1">
        <div
          className={`h-full transition-all duration-300 ${
            isUrgent ? 'bg-red-500' : 'bg-gradient-to-r from-amber-400 to-yellow-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
