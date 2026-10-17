import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { Plus, Info, Check, Utensils } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
  isInCart: boolean;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onAddToCart,
  onViewDetails,
  isInCart,
}) => {
  const [imageError, setImageError] = useState(false);
  const [showTurkish, setShowTurkish] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const getSpiceBadges = (level: number) => {
    if (level === 0) return null;
    return (
      <span
        className="text-xs text-[#e63946] flex items-center"
        title={`${level === 1 ? 'Hafif Acı' : level === 2 ? 'Orta Acı' : 'Yoğun Acı'}`}
      >
        {'🌶️'.repeat(level)}
      </span>
    );
  };

  return (
    <div className="group bg-[#1e1915] border border-[#342b23] hover:border-[#c8924b]/60 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 flex flex-col sm:flex-row gap-4 items-stretch relative">
      {/* Dish Thumbnail with Zero-Broken-Image Fallback */}
      <div className="sm:w-36 sm:h-36 w-full h-44 shrink-0 rounded-xl overflow-hidden relative bg-[#2a221b] border-2 border-[#3d3227] group-hover:border-[#c8924b]/50 transition-colors">
        {!imageError ? (
          <img
            src={item.img}
            alt={item.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2a221b] via-[#33281f] to-[#1e1915] text-[#c8924b] p-3 text-center">
            <Utensils className="w-8 h-8 mb-1.5 opacity-80" />
            <span className="text-xs font-semibold text-[#e8ded5]">{item.title}</span>
            <span className="text-[10px] text-[#9c8e82]">{item.category}</span>
          </div>
        )}

        {/* Category Pill Tag */}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#141210]/90 backdrop-blur-sm rounded text-[10px] font-semibold tracking-wider text-[#e8ded5] border border-white/10 uppercase">
          {item.category}
        </div>
      </div>

      {/* Dish Information (Faithful to Kodluyoruz structure with title, price, divider line, description) */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Title & Price */}
          <div className="flex items-start justify-between gap-3 border-b-2 border-[#b82e2e]/70 pb-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                onClick={() => onViewDetails(item)}
                className="font-brand text-lg sm:text-xl font-bold text-[#fdfbf7] group-hover:text-[#c8924b] transition-colors cursor-pointer"
              >
                {item.title}
              </h3>
              {getSpiceBadges(item.spiceLevel)}
              {item.isVegetarian && (
                <span className="text-[10px] bg-[#1a3826] text-[#48bb78] border border-[#2f633d] px-1.5 py-0.2 rounded font-medium">
                  Vejetaryen
                </span>
              )}
            </div>

            <div className="text-right shrink-0">
              <span className="font-brand text-lg font-bold text-[#c8924b] tabular-nums">
                {item.price.toFixed(2)} ₺
              </span>
            </div>
          </div>

          {/* Description (Kodluyoruz assignment original text + Turkish toggle) */}
          <div className="mt-2.5 text-xs sm:text-sm text-[#b8a99c] leading-relaxed">
            {showTurkish ? item.descTr : item.desc}
          </div>

          {/* Origin & Prep Time metadata */}
          <div className="mt-2 flex items-center gap-2 text-[11px] text-[#807266]">
            <span>{item.origin}</span>
            <span>·</span>
            <span>{item.prepTime}</span>
            <span>·</span>
            <span>{item.calories} kcal</span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-4 pt-2.5 flex items-center justify-between gap-2 border-t border-[#2e261f]">
          <button
            onClick={() => setShowTurkish(!showTurkish)}
            className="text-[11px] text-[#9c8e82] hover:text-[#c8924b] transition-colors underline underline-offset-2"
          >
            {showTurkish ? '🇬🇧 Orijinal Metin' : '🇹🇷 Türkçe Açıklama'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(item)}
              className="p-1.5 text-xs text-[#c9b9ad] hover:text-white bg-[#251e18] hover:bg-[#2e251e] border border-[#3b3127] rounded-lg transition-colors flex items-center gap-1"
              title="Detaylı Malzemeler ve Hikayesi"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Detay</span>
            </button>

            <button
              onClick={handleAdd}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                justAdded
                  ? 'bg-[#276749] text-white border border-[#38a169]'
                  : 'bg-[#b82e2e] hover:bg-[#a12525] text-white border border-[#df4343]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Eklendi</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Siparişe Ekle</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
