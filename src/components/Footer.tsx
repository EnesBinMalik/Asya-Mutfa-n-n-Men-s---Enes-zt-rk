import React from 'react';
import { UtensilsCrossed, Heart, ExternalLink, Code2 } from 'lucide-react';

interface FooterProps {
  onOpenCodeInspector: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCodeInspector }) => {
  return (
    <footer className="mt-20 border-t border-[#2e261f] bg-[#120f0d] text-[#9c8e82] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand & Signature Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#b82e2e] flex items-center justify-center text-white">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="font-brand text-lg font-bold text-[#fdfbf7]">Asian Kitchen</span>
            </div>
            <p className="text-[#807266] leading-relaxed text-xs">
              Uzak Doğu mutfağının seçkin lezzetlerini modern JavaScript (ES6+) standartlarıyla buluşturan interaktif menü uygulaması.
            </p>
            <div className="pt-2 border-t border-[#251f1a]">
              <div className="text-xs font-semibold text-[#fdfbf7] flex items-center gap-1.5">
                <span>Geliştirici & Proje Sahibi:</span>
                <span className="text-[#c8924b] font-brand tracking-wide">Enes Öztürk</span>
              </div>
              <p className="text-[11px] text-[#807266] mt-0.5">
                El emeğiyle özenle hazırlanmış Kodluyoruz / Patika.dev JavaScript ödev teslimi.
              </p>
            </div>
          </div>

          {/* Assignment Heritage Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#fdfbf7] text-xs uppercase tracking-wider text-[#c8924b]">
              Proje Künyesi & Teşekkür
            </h4>
            <p className="text-[#807266] leading-relaxed text-xs">
              Bu proje, Patika.dev & Kodluyoruz Frontend Web Geliştirme Patikası kapsamında mezunumuz <strong className="text-[#c9b9ad]">Aycan Aleyna Yerdelen</strong> tarafından tasarlanmış orijinal şablon referans alınarak geliştirilmiştir.
            </p>
            <ul className="space-y-1.5 text-xs text-[#807266]">
              <li>· Dizi & Obje Mimarisi: <span className="text-[#c9b9ad]">id, title, category, price, img, desc</span></li>
              <li>· Dinamik Kategori & Buton: <span className="text-[#c9b9ad]">Array.prototype.reduce & map</span></li>
              <li>· Sepet Hesaplamaları: <span className="text-[#c9b9ad]">Array.prototype.reduce</span></li>
            </ul>
          </div>

          {/* Quick Links & Inspector Trigger */}
          <div className="space-y-3 md:text-right">
            <h4 className="font-semibold text-[#fdfbf7] text-xs uppercase tracking-wider text-[#c8924b]">
              Dokümantasyon & İnceleme
            </h4>
            <div className="flex flex-col md:items-end gap-2 text-xs">
              <button
                onClick={onOpenCodeInspector}
                className="inline-flex items-center gap-1.5 text-[#c9b9ad] hover:text-[#c8924b] transition-colors cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Ödev Kod ve Mantık Analizi</span>
              </button>
              <a
                href="https://www.patika.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#807266] hover:text-[#c9b9ad] transition-colors"
              >
                <span>Patika.dev Eğitim Platformu</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/kodluyoruz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#807266] hover:text-[#c9b9ad] transition-colors"
              >
                <span>Kodluyoruz GitHub Topluluğu</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="mt-10 pt-6 border-t border-[#201b17] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#706459]">
          <div>
            © {new Date().getFullYear()} Asian Kitchen's Menu · Enes Öztürk İmzasıyla El Emeği Kodlanmıştır.
          </div>
          <div className="flex items-center gap-1">
            <span>JavaScript ES6+ & React ile hazırlandı</span>
            <Heart className="w-3 h-3 text-[#b82e2e] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
