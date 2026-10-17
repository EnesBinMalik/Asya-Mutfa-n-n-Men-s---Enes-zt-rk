import React from 'react';
import { Sparkles, CheckCircle2, BookmarkCheck } from 'lucide-react';

interface HeroSectionProps {
  totalDishes: number;
  totalCategories: number;
  onOpenCodeInspector: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalDishes,
  totalCategories,
  onOpenCodeInspector,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-[#2d251f] bg-gradient-to-b from-[#1b1714] via-[#161310] to-[#120f0d]">
      {/* Subtle oriental background pattern / glow */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#c8924b 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c8924b]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#b82e2e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        <div className="max-w-3xl">
          {/* Handcrafted signature kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#251e18] border border-[#3d3228] rounded-full text-xs text-[#c8924b] font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#e8a34d]" />
            <span>Enes Öztürk İmzasıyla · El Emeği Proje Ödevi</span>
          </div>

          <h1 className="font-brand text-3xl sm:text-5xl font-extrabold text-[#fdfbf7] tracking-tight leading-tight">
            Asian Kitchen'ın Menüsü
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#b8a99c] leading-relaxed max-w-2xl">
            Süper yetenekli mezunlarımızdan <strong className="text-[#fdfbf7] font-semibold">Aycan Aleyna Yerdelen</strong>'in geliştirdiği klasik Uzak Doğu restoran menüsü. JavaScript <code className="px-1.5 py-0.5 bg-[#251e18] border border-[#3b3026] text-[#e8a34d] rounded text-sm font-mono">map</code> ve <code className="px-1.5 py-0.5 bg-[#251e18] border border-[#3b3026] text-[#e8a34d] rounded text-sm font-mono">reduce</code> metodlarıyla dinamik butonlar ve interaktif süzme mimarisi.
          </p>

          {/* Quick Stats & Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-[#9c8e82]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#48bb78]" />
              <span><strong className="text-[#fdfbf7]">{totalDishes}</strong> Orijinal Lezzet</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#48bb78]" />
              <span><strong className="text-[#fdfbf7]">{totalCategories}</strong> Dinamik Bölge Kategorisi</span>
            </div>
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-[#c8924b]" />
              <span>Patika.dev / Kodluyoruz JavaScript Bootcamp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
