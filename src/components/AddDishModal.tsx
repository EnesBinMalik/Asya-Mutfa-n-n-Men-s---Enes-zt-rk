import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { X, Plus, Sparkles } from 'lucide-react';

interface AddDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDish: (newDish: MenuItem) => void;
  existingCategories: string[];
}

export const AddDishModal: React.FC<AddDishModalProps> = ({
  isOpen,
  onClose,
  onAddDish,
  existingCategories,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Korea');
  const [customCategory, setCustomCategory] = useState('');
  const [price, setPrice] = useState('11.99');
  const [desc, setDesc] = useState('');
  const [descTr, setDescTr] = useState('');
  const [img, setImg] = useState('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80');
  const [spiceLevel, setSpiceLevel] = useState<0 | 1 | 2 | 3>(1);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [origin, setOrigin] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    const finalCategory = category === 'Yeni' ? customCategory.trim() || 'Special' : category;

    const newDish: MenuItem = {
      id: Date.now(),
      title: title.trim(),
      category: finalCategory,
      price: parseFloat(price) || 9.99,
      img: img.trim() || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      desc: desc.trim(),
      descTr: descTr.trim() || desc.trim(),
      spiceLevel,
      isVegetarian,
      prepTime: '10-15 dk',
      calories: 450,
      origin: origin.trim() || `${finalCategory} Geleneksel Mutfağı`,
      ingredients: ['Taze Malzemeler', 'Uzak Doğu Baharatları', 'Özel Şef Sosu']
    };

    onAddDish(newDish);
    onClose();
  };

  const filteredCategories = existingCategories.filter((c) => c !== 'All');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#191512] border border-[#3b3026] rounded-2xl max-w-lg w-full overflow-hidden text-[#fdfbf7] shadow-2xl z-10">
        <div className="px-6 py-4 border-b border-[#2e261f] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c8924b]" />
            <h2 className="font-brand text-lg font-bold">Yeni Lezzet Ekle</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9c8e82] hover:text-white hover:bg-[#28221c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-[#9c8e82] mb-1 font-medium">Yemek Başlığı (title):</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Kimchi Jjigae, Gyoza, Peking Duck..."
              className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-[#fdfbf7] rounded-lg p-2.5 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#9c8e82] mb-1 font-medium">Kategori (category):</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-[#fdfbf7] rounded-lg p-2.5 outline-none"
              >
                {filteredCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="Yeni">+ Yeni Kategori Ekle...</option>
              </select>
            </div>

            <div>
              <label className="block text-[#9c8e82] mb-1 font-medium">Fiyat (price ₺):</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-[#fdfbf7] rounded-lg p-2.5 outline-none font-mono"
              />
            </div>
          </div>

          {category === 'Yeni' && (
            <div>
              <label className="block text-[#9c8e82] mb-1 font-medium">Yeni Kategori İsmi:</label>
              <input
                type="text"
                required
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Örn: Vietnam, Thailand, Tatlılar..."
                className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-[#fdfbf7] rounded-lg p-2.5 outline-none"
              />
              <span className="text-[10px] text-[#c8924b] mt-1 block">
                * reduce() fonksiyonu bu yeni kategoriyi otomatik yakalayacak ve buton oluşturacaktır!
              </span>
            </div>
          )}

          <div>
            <label className="block text-[#9c8e82] mb-1 font-medium">İngilizce Açıklama (desc - Ödev standardı):</label>
            <input
              type="text"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Örn: Spicy soup with kimchi and tofu, serving with hot rice."
              className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-[#fdfbf7] rounded-lg p-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9c8e82] mb-1 font-medium">Türkçe Açıklama (descTr):</label>
            <input
              type="text"
              value={descTr}
              onChange={(e) => setDescTr(e.target.value)}
              placeholder="Örn: Kimchi, tofu ve taze soğanla pişirilen geleneksel baharatlı çorba."
              className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-[#fdfbf7] rounded-lg p-2.5 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#9c8e82] mb-1 font-medium">Acılık Seviyesi:</label>
              <select
                value={spiceLevel}
                onChange={(e) => setSpiceLevel(Number(e.target.value) as any)}
                className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-[#fdfbf7] rounded-lg p-2.5 outline-none"
              >
                <option value={0}>0 - Acısız</option>
                <option value={1}>1 - Hafif Acı 🌶️</option>
                <option value={2}>2 - Orta Acı 🌶️🌶️</option>
                <option value={3}>3 - Yoğun Acı 🌶️🌶️🌶️</option>
              </select>
            </div>

            <div>
              <label className="block text-[#9c8e82] mb-1 font-medium">Menşe Şehir/Bölge:</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Örn: Busan, Güney Kore"
                className="w-full bg-[#201b17] border border-[#382f27] focus:border-[#c8924b] text-[#fdfbf7] rounded-lg p-2.5 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#2e261f]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#9c8e82] hover:text-white"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#b82e2e] hover:bg-[#a12525] text-white font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Menüye Ekle</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
