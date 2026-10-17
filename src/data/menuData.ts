export interface MenuItem {
  id: number;
  title: string;
  category: 'Korea' | 'Japan' | 'China' | string;
  price: number;
  img: string;
  desc: string;
  descTr: string;
  spiceLevel: 0 | 1 | 2 | 3; // 0: Acısız, 1: Hafif, 2: Orta, 3: Yoğun Acı
  isVegetarian?: boolean;
  prepTime: string;
  calories: number;
  origin: string;
  ingredients: string[];
}

export const initialMenu: MenuItem[] = [
  {
    id: 1,
    title: "Tteokbokki",
    category: "Korea",
    price: 10.99,
    img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
    desc: "Spicy rice cakes, serving with fish cake.",
    descTr: "Kore'nin meşhur acılı pirinç keki (tteok) ve balık keki; koyu kıvamlı gochujang sosu, taze soğan ve susam ile sıcak servis edilir.",
    spiceLevel: 3,
    isVegetarian: false,
    prepTime: "12-15 dk",
    calories: 420,
    origin: "Seoul, Güney Kore",
    ingredients: ["Pirinç Keki (Garaetteok)", "Kore Balık Keki (Eomuk)", "Gochujang Biber Ezmesi", "Gochugaru Pul Biberi", "Taze Soğan", "Kavrulmuş Susam", "Haşlanmış Yumurta"]
  },
  {
    id: 2,
    title: "Chicken Ramen",
    category: "Japan",
    price: 7.99,
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    desc: "Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg.",
    descTr: "Özenle 8 saat demlenmiş tavuk suyu eşliğinde el yapımı ramen erişteleri, taze soya filizi, taze soğan ve marine edilmiş akışkan yumurta.",
    spiceLevel: 1,
    isVegetarian: false,
    prepTime: "15-18 dk",
    calories: 550,
    origin: "Tokyo, Japonya",
    ingredients: ["El Yapımı Ramen Eriştesi", "Zengin Tavuk Kemik Suyu", "Marine Ajitsuke Yumurta", "Soya Filizi", "Taze Yeşil Soğan", "Nori Yosunu", "Susam Yağı"]
  },
  {
    id: 3,
    title: "Bibimbap",
    category: "Korea",
    price: 8.99,
    img: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80",
    desc: "Boiling vegetables, serving with special hot sauce",
    descTr: "Kızgın taş kasede pişirilen pirinç üzerine mevsim sebzeleri, şitake mantarı, kabak, havuç, kızarmış yumurta ve özel aromatik Kore sosu.",
    spiceLevel: 2,
    isVegetarian: true,
    prepTime: "14-16 dk",
    calories: 490,
    origin: "Jeonju, Güney Kore",
    ingredients: ["Kısa Taneli Pirinç", "Sote Ispanak & Havuç", "Şitake Mantarı", "Kabak Dilimleri", "Kızarmış Gezen Tavuk Yumurtası", "Özel Bibimbap Sosu", "Kavrulmuş Susam"]
  },
  {
    id: 4,
    title: "Dan Dan Mian",
    category: "China",
    price: 5.99,
    img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    desc: "Dan dan noodle, serving with green onion and ground beef or pork.",
    descTr: "Otantik Sichuan mutfağının başyapıtı; baharatlı kıyma sosu, ezilmiş fıstık, taze soğan ve Sichuan biberli acı aromatik yağ ile harmanlanmış erişte.",
    spiceLevel: 3,
    isVegetarian: false,
    prepTime: "10-12 dk",
    calories: 580,
    origin: "Sichuan, Çin",
    ingredients: ["Çin Buğday Eriştesi", "Kavrulan Baharatlı Dana Kıyma", "Sichuan Kırmızı Yağı", "Kavrulmuş Yer Fıstığı", "Kore Taze Soğanı", "Susam Ezmesi (Zhimajiang)"]
  },
  {
    id: 5,
    title: "Yangzhou Fried Rice",
    category: "China",
    price: 12.99,
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    desc: "Yangzhou style fried rice, serving with bean and pickles",
    descTr: "Wok tavada yüksek ateşte çevrilen Yangzhou usulü altın sarısı pirinç, tatlı bezelye, ince doğranmış sebzeler ve geleneksel Çin turşusu.",
    spiceLevel: 0,
    isVegetarian: true,
    prepTime: "8-10 dk",
    calories: 460,
    origin: "Jiangsu, Çin",
    ingredients: ["Buharda Pişmiş Yasemin Pirinci", "Çırpılmış Altın Yumurta", "Tatlı Bezelye & Mısır", "Taze Yeşil Soğan", "Soya Sosu", "Geleneksel Çin Turşusu"]
  },
  {
    id: 6,
    title: "Onigiri",
    category: "Japan",
    price: 9.99,
    img: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=800&q=80",
    desc: "Rice Sandwich, serving with soy sauce",
    descTr: "Üçgen formda el yapımı geleneksel Japon pirinç sandviçi; gevrek nori yosununa sarılı, fumi baharatı ve yanında doğal fermantasyon soya sosuyla.",
    spiceLevel: 0,
    isVegetarian: true,
    prepTime: "5-8 dk",
    calories: 310,
    origin: "Kyoto, Japonya",
    ingredients: ["Koshihikari Suşi Pirinci", "Çıtır Nori Yosun Yaprağı", "Furikake Baharat Karışımı", "Umeboshi veya Somon İçi (Opsiyonel)", "Doğal Japon Soya Sosu"]
  },
  {
    id: 7,
    title: "Jajangmyeon",
    category: "Korea",
    price: 15.99,
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    desc: "Black bean sauce noodle, serving with green onion",
    descTr: "Kore-Çin füzyon klasiği; fermente siyah fasulye (chunjang) sosunda karamelize edilmiş soğan, sebze parçaları ve doyurucu taze el yapımı noodle.",
    spiceLevel: 0,
    isVegetarian: true,
    prepTime: "15-18 dk",
    calories: 620,
    origin: "Incheon, Güney Kore",
    ingredients: ["El Yapımı Kalın Noodle", "Karamelize Chunjang (Siyah Fasulye Ezmesi)", "Küp Doğranmış Soğan & Kabak", "Salatalık Jülyen", "Sarı Turp (Danmuji)"]
  },
  {
    id: 8,
    title: "Ma Po Tofu",
    category: "China",
    price: 12.99,
    img: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    desc: "Hot pepper sauce noodle, serving with tofu and minced meat",
    descTr: "Sichuan'ın ünlü 'málà' (uyuşturucu acı) klasiği; yumuşacık ipeksi tofu küpleri, fermente fasulye ezmesi (doubanjiang) ve aromatik Sichuan biberli sos.",
    spiceLevel: 3,
    isVegetarian: false,
    prepTime: "12-14 dk",
    calories: 410,
    origin: "Chengdu, Çin",
    ingredients: ["Taze İpeksi Tofu", "Sichuan Doubanjiang (Acı Fasulye Salçası)", "Kavrulmuş Dana Kıyma", "Sichuan Dağ Biberi Tozu", "Taze Sarımsak & Zencefil", "Taze Soğan"]
  },
  {
    id: 9,
    title: "Dorayaki",
    category: "Japan",
    price: 3.99,
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    desc: "Red bean paste pancake, serving with honey.",
    descTr: "Geleneksel Japon tatlısı; bal ve mirin aromalı iki pofuduk castella keki arasında tatlı anko (kırmızı azuki fasulyesi) ezmesi ve organik bal eşliğinde.",
    spiceLevel: 0,
    isVegetarian: true,
    prepTime: "5-7 dk",
    calories: 280,
    origin: "Osaka, Japonya",
    ingredients: ["Japon Castella Pancake Hamuru", "Organik Kırmızı Azuki Fasulye Ezmesi (Anko)", "Çiçek Balı", "Vanilya Özütü"]
  }
];
