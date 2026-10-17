import React from 'react';
import { ShoppingBag, Code2, UtensilsCrossed, PlusCircle, Search } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenCodeInspector: () => void;
  onOpenAddDish: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenCodeInspector,
  onOpenAddDish,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#161311]/95 backdrop-blur-md border-b border-[#2d251f]">
      {/* Top Bar (Strict 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-[#b82e2e] flex items-center justify-center text-white shadow-md border border-[#df4343]">
            <UtensilsCrossed className="w-5 h-5 text-[#fdfbf7]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-brand text-xl sm:text-2xl font-bold tracking-tight text-[#fdfbf7]">
                Asian Kitchen
              </span>
              <span className="hidden sm:inline-block text-xs font-medium text-[#c8924b] border border-[#c8924b]/40 px-1.5 py-0.5 rounded">
                亞洲廚房
              </span>
            </div>
            <div className="text-[11px] text-[#9c8e82]">
              Enes Öztürk <span className="text-[#c8924b]">·</span> Kodluyoruz / Patika.dev
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation / Quick Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#9c8e82] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Yemek, malzeme veya lezzet ara (örn: Ramen, Tofu, Acı)..."
              className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-sm text-[#fdfbf7] placeholder-[#7d7166] rounded-lg pl-9 pr-4 py-2 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#9c8e82] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenCodeInspector}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#e8ded5] bg-[#241e1a] border border-[#3a3028] hover:border-[#c8924b] hover:text-[#c8924b] rounded-lg transition-colors whitespace-nowrap"
            title="Ödev Kod Analizi (Map & Reduce Mantığı)"
          >
            <Code2 className="w-4 h-4 text-[#c8924b]" />
            <span className="hidden sm:inline">Ödev Kod Analizi</span>
            <span className="sm:hidden">Kod</span>
          </button>

          <button
            onClick={onOpenAddDish}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#e8ded5] bg-[#241e1a] border border-[#3a3028] hover:border-[#524439] rounded-lg transition-colors whitespace-nowrap"
            title="Yeni Yemek Ekle (Dinamik Kategori Testi)"
          >
            <PlusCircle className="w-4 h-4 text-[#9c8e82]" />
            <span>Yemek Ekle</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#b82e2e] hover:bg-[#a12525] rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Masa Siparişi</span>
            <span className="sm:hidden">Sipariş</span>
            {cartItemCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-white text-[#b82e2e] text-[11px] font-bold rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="md:hidden px-4 pb-3 pt-1">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#9c8e82] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Yemek veya malzeme ara..."
            className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-sm text-[#fdfbf7] placeholder-[#7d7166] rounded-lg pl-9 pr-4 py-1.5 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#9c8e82] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
