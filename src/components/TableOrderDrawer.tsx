import React, { useState } from 'react';
import { OrderItem, calculateOrderSummary } from '../utils/menuLogic';
import { X, Plus, Minus, Trash2, ShoppingBag, Utensils, CheckCircle } from 'lucide-react';

interface TableOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onUpdateQuantity: (dishId: number, delta: number) => void;
  onRemoveItem: (dishId: number) => void;
  onClearOrder: () => void;
}

export const TableOrderDrawer: React.FC<TableOrderDrawerProps> = ({
  isOpen,
  onClose,
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
}) => {
  const [tableNumber, setTableNumber] = useState('Masa 3');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const { totalAmount, totalItemCount, tax, grandTotal } = calculateOrderSummary(orderItems);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  const handleCloseSuccess = () => {
    setOrderPlaced(false);
    onClearOrder();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#191512] border-l border-[#2e261f] text-[#fdfbf7] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#2e261f] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#b82e2e]/20 border border-[#b82e2e]/40 flex items-center justify-center text-[#e63946]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-brand text-lg font-bold">Masa Siparişi</h2>
                <p className="text-xs text-[#9c8e82]">
                  {totalItemCount > 0 ? `${totalItemCount} adet ürün seçildi` : 'Sipariş listeniz boş'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9c8e82] hover:text-white hover:bg-[#28221c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderPlaced ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-[#1a3826] border border-[#2f633d] text-[#48bb78] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-brand text-xl font-bold text-[#fdfbf7]">
                  Siparişiniz Mutfağa İletildi!
                </h3>
                <p className="text-xs text-[#b8a99c] max-w-xs mx-auto leading-relaxed">
                  <strong>{tableNumber}</strong> için şeflerimiz hazırlıklara başladı. Sıcak ve taze Uzak Doğu lezzetleri kısa süre içinde masanızda olacak.
                </p>

                {/* Receipt Preview */}
                <div className="bg-[#201a16] border border-[#382e25] rounded-xl p-4 text-left text-xs space-y-2 mt-4">
                  <div className="flex justify-between text-[#9c8e82] border-b border-[#2e261f] pb-2">
                    <span>Masa / Konum</span>
                    <span className="font-semibold text-[#fdfbf7]">{tableNumber}</span>
                  </div>
                  <div className="flex justify-between text-[#9c8e82]">
                    <span>Ara Toplam (reduce)</span>
                    <span>{totalAmount.toFixed(2)} ₺</span>
                  </div>
                  <div className="flex justify-between text-[#9c8e82]">
                    <span>KDV (%10)</span>
                    <span>{tax.toFixed(2)} ₺</span>
                  </div>
                  <div className="flex justify-between text-[#c8924b] font-bold border-t border-[#2e261f] pt-2 text-sm">
                    <span>Genel Toplam</span>
                    <span>{grandTotal.toFixed(2)} ₺</span>
                  </div>
                </div>

                <button
                  onClick={handleCloseSuccess}
                  className="w-full py-2.5 bg-[#b82e2e] hover:bg-[#a12525] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Menüye Dön & Yeni Sipariş
                </button>
              </div>
            ) : orderItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 bg-[#251f1a] text-[#807266] rounded-full flex items-center justify-center mx-auto">
                  <Utensils className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-[#c9b9ad]">Henüz sipariş eklenmedi</p>
                <p className="text-xs text-[#807266] max-w-xs mx-auto">
                  Menüden dilediğiniz Uzak Doğu lezzetini <strong>Siparişe Ekle</strong> butonuna tıklayarak masanıza sipariş edebilirsiniz.
                </p>
              </div>
            ) : (
              <>
                {/* Table selector */}
                <div className="bg-[#221c17] border border-[#352b22] rounded-xl p-3 flex items-center justify-between text-xs">
                  <span className="text-[#9c8e82]">Masa Seçimi:</span>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="bg-[#191512] border border-[#382e25] text-[#fdfbf7] rounded-lg px-2.5 py-1 outline-none font-semibold"
                  >
                    <option value="Masa 1 (Giriş)">Masa 1 (Giriş Salonu)</option>
                    <option value="Masa 2 (Bambu Bahçe)">Masa 2 (Bambu Bahçe)</option>
                    <option value="Masa 3 (Şef Tezgahı)">Masa 3 (Şef Tezgahı)</option>
                    <option value="Masa 4 (Tatami Odası)">Masa 4 (Tatami Odası)</option>
                    <option value="Masa 5 (Teras)">Masa 5 (Teras)</option>
                    <option value="Paket Servis">Paket Servis / Gel-Al</option>
                  </select>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.dish.id}
                      className="bg-[#201b17] border border-[#322921] rounded-xl p-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.dish.img}
                          alt={item.dish.title}
                          className="w-12 h-12 rounded-lg object-cover bg-[#2e261f] shrink-0 border border-[#40352a]"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-[#fdfbf7] truncate">
                            {item.dish.title}
                          </h4>
                          <span className="text-[11px] text-[#c8924b] font-mono">
                            {item.dish.price.toFixed(2)} ₺ / adet
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, -1)}
                          className="w-6 h-6 rounded bg-[#2b231d] hover:bg-[#382e26] border border-[#40352b] flex items-center justify-center text-[#c9b9ad] text-xs transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, 1)}
                          className="w-6 h-6 rounded bg-[#2b231d] hover:bg-[#382e26] border border-[#40352b] flex items-center justify-center text-[#c9b9ad] text-xs transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.dish.id)}
                          className="ml-1 text-[#807266] hover:text-[#e63946] p-1 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Special Instructions Note */}
                <div>
                  <label className="block text-xs font-medium text-[#9c8e82] mb-1.5">
                    Şefe Not / Alerjen Uyarısı (Opsiyonel):
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Örn: Ramen yumurtası çok pişmiş olsun, acısı az olsun..."
                    className="w-full bg-[#201b17] border border-[#352c23] rounded-lg p-2.5 text-xs text-[#fdfbf7] placeholder-[#706459] outline-none focus:border-[#c8924b]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer calculation using reduce */}
          {orderItems.length > 0 && !orderPlaced && (
            <div className="p-6 border-t border-[#2e261f] bg-[#1a1613] space-y-3">
              <div className="space-y-1.5 text-xs text-[#9c8e82]">
                <div className="flex justify-between">
                  <span>Ara Toplam ({totalItemCount} adet)</span>
                  <span className="font-mono text-[#fdfbf7]">{totalAmount.toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span>KDV (%10 Dahil)</span>
                  <span className="font-mono text-[#fdfbf7]">{tax.toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#fdfbf7] border-t border-[#2d251f] pt-2">
                  <span className="font-brand text-base">Toplam Tutar:</span>
                  <span className="font-brand text-base text-[#c8924b] font-mono">
                    {grandTotal.toFixed(2)} ₺
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onClearOrder}
                  className="px-3 py-2.5 bg-[#251e18] hover:bg-[#2f2720] border border-[#3d3329] text-[#9c8e82] hover:text-white rounded-xl text-xs font-medium transition-colors"
                >
                  Temizle
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 py-2.5 bg-[#b82e2e] hover:bg-[#a12525] text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-[#b82e2e]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Siparişi Onayla ({grandTotal.toFixed(2)} ₺)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
