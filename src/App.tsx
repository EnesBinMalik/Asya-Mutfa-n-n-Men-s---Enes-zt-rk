import React, { useState, useMemo } from 'react';
import { initialMenu, MenuItem } from './data/menuData';
import {
  getCategoriesWithReduce,
  getCategoryCountsWithReduce,
  filterMenuItems,
  OrderItem,
  calculateOrderSummary,
} from './utils/menuLogic';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryButtons } from './components/CategoryButtons';
import { MenuItemCard } from './components/MenuItemCard';
import { TableOrderDrawer } from './components/TableOrderDrawer';
import { DishDetailModal } from './components/DishDetailModal';
import { CodeInspectorModal } from './components/CodeInspectorModal';
import { AddDishModal } from './components/AddDishModal';
import { Footer } from './components/Footer';
import { Utensils, RotateCcw } from 'lucide-react';

export default function App() {
  // 1. Menü Verisi (JavaScript nesnelerinden oluşan dizi)
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);

  // 2. Filtreleme ve Arama Durumları
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [spiceFilter, setSpiceFilter] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  // 3. Masa Siparişi / Sepet Durumu
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // 4. Modalların Durumları
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCodeInspectorOpen, setIsCodeInspectorOpen] = useState(false);
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [selectedDishForDetails, setSelectedDishForDetails] = useState<MenuItem | null>(null);

  // 5. reduce() ile Tekil Kategorilerin Çıkarılması (Ödevin Ana Gereksinimi)
  const categories = useMemo(() => {
    return getCategoriesWithReduce(menu);
  }, [menu]);

  // 6. reduce() ile Kategori Başına Ürün Sayımları
  const categoryCounts = useMemo(() => {
    return getCategoryCountsWithReduce(menu);
  }, [menu]);

  // 7. Süzülmüş ve Sıralanmış Menü Listesi
  const filteredDishes = useMemo(() => {
    return filterMenuItems(menu, selectedCategory, searchQuery, spiceFilter, sortBy);
  }, [menu, selectedCategory, searchQuery, spiceFilter, sortBy]);

  // 8. Sepetteki toplam ürün sayısı (reduce ile)
  const { totalItemCount } = useMemo(() => {
    return calculateOrderSummary(orderItems);
  }, [orderItems]);

  // Sipariş Yönetimi Fonksiyonları
  const handleAddToCart = (dish: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: number, delta: number) => {
    setOrderItems((prev) => {
      return prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[];
    });
  };

  const handleRemoveItem = (dishId: number) => {
    setOrderItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleAddDish = (newDish: MenuItem) => {
    setMenu((prev) => [newDish, ...prev]);
    setSelectedCategory(newDish.category);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSpiceFilter('all');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen bg-[#141210] text-[#f7f3ee] flex flex-col font-sans">
      {/* 3-Zone Header */}
      <Header
        cartItemCount={totalItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCodeInspector={() => setIsCodeInspectorOpen(true)}
        onOpenAddDish={() => setIsAddDishOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <HeroSection
        totalDishes={menu.length}
        totalCategories={categories.length - 1} // 'All' hariç
        onOpenCodeInspector={() => setIsCodeInspectorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Dynamic Category Buttons Generated via reduce() and map() */}
        <section aria-label="Kategori Seçimi">
          <CategoryButtons
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
            spiceFilter={spiceFilter}
            onSelectSpiceFilter={setSpiceFilter}
            sortBy={sortBy}
            onSelectSortBy={setSortBy}
          />
        </section>

        {/* Active Filters / Result Summary Bar */}
        <div className="flex items-center justify-between text-xs text-[#9c8e82] border-b border-[#2d251f]/60 pb-3">
          <div>
            Gösterilen: <strong className="text-[#fdfbf7]">{filteredDishes.length}</strong> lezzet
            {selectedCategory !== 'All' && (
              <span> · Kategori: <strong className="text-[#c8924b]">{selectedCategory}</strong></span>
            )}
            {searchQuery && (
              <span> · Arama: "<strong className="text-[#fdfbf7]">{searchQuery}</strong>"</span>
            )}
            {spiceFilter !== 'all' && (
              <span> · Acılık: {spiceFilter === 0 ? 'Acısız' : '🌶️'.repeat(spiceFilter)}</span>
            )}
          </div>

          {(selectedCategory !== 'All' || searchQuery || spiceFilter !== 'all' || sortBy !== 'default') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[#c8924b] hover:text-[#e8a34d] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Filtreleri Temizle</span>
            </button>
          )}
        </div>

        {/* Menu Items Grid (Mapped via map() from filteredDishes) */}
        <section aria-label="Menü Listesi">
          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {filteredDishes.map((dish) => (
                <MenuItemCard
                  key={dish.id}
                  item={dish}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedDishForDetails}
                  isInCart={orderItems.some((oi) => oi.dish.id === dish.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#1c1815] border border-[#30261f] rounded-2xl p-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#2a221b] flex items-center justify-center text-[#c8924b] mx-auto">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-brand text-lg font-bold text-[#fdfbf7]">
                Aradığınız Kriterlere Uygun Yemek Bulunamadı
              </h3>
              <p className="text-xs text-[#9c8e82] max-w-sm mx-auto leading-relaxed">
                Filtreleri sıfırlayarak veya arama teriminizi değiştirerek diğer enfes Uzak Doğu tatlarımızı inceleyebilirsiniz.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#b82e2e] hover:bg-[#a12525] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tüm Menüyü Göster</span>
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Slide-over Table Order Drawer */}
      <TableOrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        orderItems={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        item={selectedDishForDetails}
        onClose={() => setSelectedDishForDetails(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Code Inspector Modal (Detailed demonstration of map & reduce) */}
      <CodeInspectorModal
        isOpen={isCodeInspectorOpen}
        onClose={() => setIsCodeInspectorOpen(false)}
        currentMenu={menu}
      />

      {/* Add Custom Dish Modal (for dynamic category testing) */}
      <AddDishModal
        isOpen={isAddDishOpen}
        onClose={() => setIsAddDishOpen(false)}
        onAddDish={handleAddDish}
        existingCategories={categories}
      />

      {/* Footer */}
      <Footer onOpenCodeInspector={() => setIsCodeInspectorOpen(true)} />
    </div>
  );
}
