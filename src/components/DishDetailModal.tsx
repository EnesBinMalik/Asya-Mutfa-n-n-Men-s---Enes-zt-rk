import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { X, Flame, Clock, Award, ShieldAlert, Plus, Check } from 'lucide-react';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#1c1714] border border-[#382f26] rounded-2xl max-w-xl w-full overflow-hidden text-[#fdfbf7] shadow-2xl z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image */}
        <div className="relative h-60 w-full overflow-hidden bg-[#2a221b]">
          <img
            src={item.img}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1714] via-[#1c1714]/30 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider bg-[#b82e2e] text-white uppercase inline-block mb-1">
              {item.category} Mutfağı
            </span>
            <h2 className="font-brand text-2xl sm:text-3xl font-extrabold text-white">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Price & Specs Strip */}
          <div className="flex items-center justify-between border-b border-[#2d251f] pb-4">
            <div>
              <span className="text-xs text-[#9c8e82]">Porsiyon Fiyatı</span>
              <div className="font-brand text-2xl font-bold text-[#c8924b] font-mono">
                {item.price.toFixed(2)} ₺
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#c9b9ad]">
              <div className="text-center">
                <span className="text-[#9c8e82] block text-[10px]">Hazırlık</span>
                <span className="font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#c8924b]" /> {item.prepTime}
                </span>
              </div>
              <div className="text-center">
                <span className="text-[#9c8e82] block text-[10px]">Kalori</span>
                <span className="font-semibold">{item.calories} kcal</span>
              </div>
              <div className="text-center">
                <span className="text-[#9c8e82] block text-[10px]">Acılık</span>
                <span className="font-semibold flex items-center justify-center text-[#e63946]">
                  {item.spiceLevel === 0 ? 'Acısız' : '🌶️'.repeat(item.spiceLevel)}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Descriptions */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold text-[#c8924b] tracking-wider uppercase mb-1">
                Lezzet Hikayesi & Tanımı
              </h4>
              <p className="text-xs sm:text-sm text-[#d4c7bc] leading-relaxed">
                {item.descTr}
              </p>
              <p className="text-xs text-[#85776c] italic mt-1 font-mono">
                Orijinal Ödev Metni: "{item.desc}"
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#c8924b] tracking-wider uppercase mb-2">
                Geleneksel Malzemeler
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ingredient, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#27201a] border border-[#3b3127] rounded-lg text-xs text-[#c9b9ad]"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#231d17] border border-[#352c22] rounded-xl p-3 flex items-center gap-3 text-xs text-[#9c8e82]">
              <Award className="w-4 h-4 text-[#c8924b] shrink-0" />
              <span>
                Menşe: <strong className="text-[#fdfbf7]">{item.origin}</strong> geleneksel tarifine sadık kalınarak hazırlanmıştır.
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#2d251f]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#c9b9ad] hover:text-white transition-colors"
            >
              Kapat
            </button>
            <button
              onClick={handleAdd}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer ${
                justAdded
                  ? 'bg-[#276749] text-white border border-[#38a169]'
                  : 'bg-[#b82e2e] hover:bg-[#a12525] text-white border border-[#df4343]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Siparişe Eklendi</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Siparişe Ekle ({item.price.toFixed(2)} ₺)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
