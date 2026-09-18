import React from 'react';

export default function FestiveCard({
  children,
  title,
  subtitle,
  icon: Icon = null,
  headerAction = null,
  className = '',
  innerClassName = '',
  highlight = false,
  id,
}) {
  return (
    <div
      id={id}
      className={`relative rounded-2xl transition-all duration-300 motion-reduce:transition-none ${
        highlight
          ? 'bg-gradient-to-b from-amber-900/80 via-amber-950/90 to-stone-950/95 border-2 border-amber-400/50 shadow-xl shadow-amber-950/50'
          : 'bg-amber-950/60 border border-amber-500/20 backdrop-blur-md shadow-lg shadow-black/40'
      } ${className}`}
    >
      {/* Decorative corner motifs (subtle Indian architectural/mandala accent) */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-400/40 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-400/40 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-400/40 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-400/40 rounded-br-sm pointer-events-none" />

      {/* Optional Card Header */}
      {(title || subtitle || Icon || headerAction) && (
        <div className="px-5 pt-5 pb-3 border-b border-amber-500/15 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              {title && (
                <h3 className="font-heading font-bold text-lg text-amber-100 tracking-wide">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-amber-300/80 font-normal">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Content */}
      <div className={`p-5 ${innerClassName}`}>{children}</div>
    </div>
  );
}
