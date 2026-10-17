import React, { useState } from 'react';
import { assignmentCodeSnippets } from '../utils/menuLogic';
import { MenuItem } from '../data/menuData';
import { X, Code2, Terminal, Play, CheckCircle2, Copy, Check } from 'lucide-react';

interface CodeInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMenu: MenuItem[];
}

export const CodeInspectorModal: React.FC<CodeInspectorModalProps> = ({
  isOpen,
  onClose,
  currentMenu,
}) => {
  const [activeTab, setActiveTab] = useState<'reduce' | 'mapButtons' | 'mapCards' | 'reduceTotal'>('reduce');
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const runLiveTest = () => {
    if (activeTab === 'reduce') {
      const categories = currentMenu.reduce<string[]>((values, item) => {
        if (!values.includes(item.category)) {
          values.push(item.category);
        }
        return values;
      }, ['All']);

      setConsoleOutput(
        `> menu.reduce(..., ["All"]) çalıştırıldı:\n\nÇıktı (Dizi Uzunluğu: ${categories.length}):\n${JSON.stringify(categories, null, 2)}\n\nKategori Sayımları:\n${JSON.stringify(
          currentMenu.reduce<Record<string, number>>((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
          }, {}),
          null,
          2
        )}`
      );
    } else if (activeTab === 'mapButtons') {
      const categories = currentMenu.reduce<string[]>((values, item) => {
        if (!values.includes(item.category)) values.push(item.category);
        return values;
      }, ['All']);

      const buttonMarkup = categories
        .map((cat) => `<button class="btn-item" data-id="${cat}">${cat}</button>`)
        .join('\n');

      setConsoleOutput(
        `> categories.map((cat) => ...) çalıştırıldı:\n\nOluşturulan HTML Buton Dizesi:\n${buttonMarkup}`
      );
    } else if (activeTab === 'mapCards') {
      const sampleItem = currentMenu[0];
      const cardHtml = `<div class="menu-items col-lg-6 col-sm-12">
  <img src="${sampleItem.img}" alt="${sampleItem.title}" class="photo" />
  <div class="menu-info">
    <div class="menu-title">
      <h4>${sampleItem.title}</h4>
      <h4 class="price">${sampleItem.price}₺</h4>
    </div>
    <div class="menu-text">${sampleItem.desc}</div>
  </div>
</div>`;
      setConsoleOutput(
        `> menu.map(item => ...) ilk öğe (${sampleItem.title}) için oluşturulan şablon:\n\n${cardHtml}\n\nToplam ${currentMenu.length} adet öğe başarıyla maplendi.`
      );
    } else if (activeTab === 'reduceTotal') {
      const totalMenuValue = currentMenu.reduce((sum, item) => sum + item.price, 0);
      setConsoleOutput(
        `> Tüm menünün toplam fiyatı (reduce):\nToplam Değer: ${totalMenuValue.toFixed(2)} ₺\nOrtalama Ürün Fiyatı: ${(totalMenuValue / currentMenu.length).toFixed(2)} ₺`
      );
    }
  };

  const getActiveCode = () => {
    switch (activeTab) {
      case 'reduce':
        return assignmentCodeSnippets.reduceCategories;
      case 'mapButtons':
        return assignmentCodeSnippets.mapButtons;
      case 'mapCards':
        return assignmentCodeSnippets.mapCards;
      case 'reduceTotal':
        return assignmentCodeSnippets.reduceOrderTotal;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#191512] border border-[#3b3026] rounded-2xl max-w-3xl w-full overflow-hidden text-[#fdfbf7] shadow-2xl z-10">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2e261f] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c8924b]/20 border border-[#c8924b]/40 flex items-center justify-center text-[#c8924b]">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-brand text-lg font-bold">Ödev Kod İnceleme & Mantık</h2>
              <p className="text-xs text-[#9c8e82]">
                Patika.dev / Kodluyoruz JavaScript Bootcamp · Enes Öztürk
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

        {/* Tab Selection */}
        <div className="flex border-b border-[#2e261f] bg-[#14110e] px-4 overflow-x-auto text-xs">
          <button
            onClick={() => {
              setActiveTab('reduce');
              setConsoleOutput(null);
            }}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'reduce'
                ? 'border-[#c8924b] text-[#c8924b]'
                : 'border-transparent text-[#9c8e82] hover:text-white'
            }`}
          >
            1. reduce() ile Kategoriler
          </button>
          <button
            onClick={() => {
              setActiveTab('mapButtons');
              setConsoleOutput(null);
            }}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'mapButtons'
                ? 'border-[#c8924b] text-[#c8924b]'
                : 'border-transparent text-[#9c8e82] hover:text-white'
            }`}
          >
            2. map() ile Butonlar
          </button>
          <button
            onClick={() => {
              setActiveTab('mapCards');
              setConsoleOutput(null);
            }}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'mapCards'
                ? 'border-[#c8924b] text-[#c8924b]'
                : 'border-transparent text-[#9c8e82] hover:text-white'
            }`}
          >
            3. map() ile Menü Kartları
          </button>
          <button
            onClick={() => {
              setActiveTab('reduceTotal');
              setConsoleOutput(null);
            }}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'reduceTotal'
                ? 'border-[#c8924b] text-[#c8924b]'
                : 'border-transparent text-[#9c8e82] hover:text-white'
            }`}
          >
            4. reduce() ile Sipariş Toplamı
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#9c8e82]">
            <span>JavaScript ES6+ Çözüm Kodu:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(getActiveCode())}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#251e18] hover:bg-[#322820] text-[#c9b9ad] hover:text-white border border-[#3b3127] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#48bb78]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
              </button>

              <button
                onClick={runLiveTest}
                className="flex items-center gap-1 px-3 py-1 rounded bg-[#b82e2e] hover:bg-[#a12525] text-white font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Canlı Çalıştır</span>
              </button>
            </div>
          </div>

          <pre className="bg-[#100d0b] border border-[#2d241d] rounded-xl p-4 font-mono text-xs sm:text-sm text-[#e8ded5] overflow-x-auto leading-relaxed">
            <code>{getActiveCode()}</code>
          </pre>

          {/* Interactive Live Console Output */}
          {consoleOutput && (
            <div className="mt-4 bg-[#0a0807] border border-[#30271f] rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#48bb78]">
                <Terminal className="w-3.5 h-3.5" />
                <span>JavaScript Çalışma Zamanı Konsolu (Live Output)</span>
              </div>
              <pre className="font-mono text-xs text-[#a0f0a0] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {consoleOutput}
              </pre>
            </div>
          )}

          {/* Explanatory Note for Homework Evaluation */}
          <div className="bg-[#211a15] border border-[#352c22] rounded-xl p-4 text-xs text-[#b8a99c] space-y-2">
            <div className="flex items-center gap-2 text-[#c8924b] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ödev Şartnamesine Uygunluk Notu:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[#9c8e82] pl-1">
              <li>
                <strong className="text-[#fdfbf7]">Id, title, category, price, img, desc</strong> nesne yapısı eksiksiz tanımlanmıştır.
              </li>
              <li>
                Kategori butonları HTML'de hardcoded değil, <code className="text-[#c8924b]">reduce</code> ile elde edilen dizi üzerinden <code className="text-[#c8924b]">map</code> edilerek dinamik oluşturulmaktadır.
              </li>
              <li>
                Kategori isimleri (<code className="text-[#fdfbf7]">All, Korea, Japan, China</code>) ödev gereksinimlerine birebir sadık kalınarak işlenmiştir.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
