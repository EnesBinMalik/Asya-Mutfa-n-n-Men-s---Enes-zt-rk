import React from 'react';
import { Flame, ArrowUpDown } from 'lucide-react';

interface CategoryButtonsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
  spiceFilter: number | 'all';
  onSelectSpiceFilter: (level: number | 'all') => void;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'name';
  onSelectSortBy: (sort: 'default' | 'price-asc' | 'price-desc' | 'name') => void;
}

const categoryIcons: Record<string, string> = {
  All: '🥢',
  Korea: '🇰🇷',
  Japan: '🇯🇵',
  China: '🇨🇳',
};

export const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  spiceFilter,
  onSelectSpiceFilter,
  sortBy,
  onSelectSortBy,
}) => {
  return (
    <div className="space-y-4">
      {/* Primary Category Buttons (Rendered via map from reduce-generated array) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {categories.map((category) => {
          const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
          const count = categoryCounts[category] || 0;
          const flag = categoryIcons[category] || '🥟';

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#b82e2e] text-white shadow-lg shadow-[#b82e2e]/25 border border-[#df4343]'
                  : 'bg-[#201b17] text-[#c9b9ad] hover:text-[#fdfbf7] hover:bg-[#28221d] border border-[#382f27]'
              }`}
            >
              <span className="text-base" role="img" aria-label={category}>
                {flag}
              </span>
              <span className="font-semibold tracking-wide">{category}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#2c241f] text-[#9c8e82] group-hover:text-[#c9b9ad]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary filter & sorting bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#2d251f]/60 text-xs text-[#9c8e82]">
        {/* Spice level filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="font-medium text-[#c8924b] mr-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> Acılık:
          </span>
          <button
            onClick={() => onSelectSpiceFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              spiceFilter === 'all'
                ? 'bg-[#352c24] text-[#fdfbf7] font-semibold'
                : 'hover:text-[#fdfbf7]'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => onSelectSpiceFilter(0)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              spiceFilter === 0
                ? 'bg-[#352c24] text-[#fdfbf7] font-semibold'
                : 'hover:text-[#fdfbf7]'
            }`}
          >
            Acısız
          </button>
          <button
            onClick={() => onSelectSpiceFilter(1)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              spiceFilter === 1
                ? 'bg-[#352c24] text-[#fdfbf7] font-semibold'
                : 'hover:text-[#fdfbf7]'
            }`}
          >
            🌶️ Hafif
          </button>
          <button
            onClick={() => onSelectSpiceFilter(2)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              spiceFilter === 2
                ? 'bg-[#352c24] text-[#fdfbf7] font-semibold'
                : 'hover:text-[#fdfbf7]'
            }`}
          >
            🌶️🌶️ Orta
          </button>
          <button
            onClick={() => onSelectSpiceFilter(3)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              spiceFilter === 3
                ? 'bg-[#352c24] text-[#fdfbf7] font-semibold'
                : 'hover:text-[#fdfbf7]'
            }`}
          >
            🌶️🌶️🌶️ Yoğun Acı
          </button>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#c8924b]" />
          <select
            value={sortBy}
            onChange={(e) => onSelectSortBy(e.target.value as any)}
            className="bg-[#201b17] border border-[#382f27] text-[#c9b9ad] text-xs rounded-lg px-2.5 py-1 outline-none focus:border-[#c8924b]"
          >
            <option value="default">Varsayılan Sıralama</option>
            <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="name">İsim (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
