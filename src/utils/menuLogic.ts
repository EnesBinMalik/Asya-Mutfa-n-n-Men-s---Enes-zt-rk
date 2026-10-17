import { MenuItem } from '../data/menuData';

export interface OrderItem {
  dish: MenuItem;
  quantity: number;
}

/**
 * Patika / Kodluyoruz JavaScript Ödevi Temel Metodu:
 * reduce() ile menüdeki benzersiz kategorileri çıkarma ve başına 'All' ekleme.
 *
 * const categories = menu.reduce(
 *   (values, item) => {
 *     if (!values.includes(item.category)) {
 *       values.push(item.category);
 *     }
 *     return values;
 *   },
 *   ["All"]
 * );
 */
export function getCategoriesWithReduce(items: MenuItem[]): string[] {
  return items.reduce<string[]>(
    (acc, currentItem) => {
      if (!acc.includes(currentItem.category)) {
        acc.push(currentItem.category);
      }
      return acc;
    },
    ['All']
  );
}

/**
 * Kategorilere göre ürün adedi dağılımı (yine reduce ile hesaplanır)
 */
export function getCategoryCountsWithReduce(items: MenuItem[]): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    acc['All'] = (acc['All'] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Menü listesini kategori, arama terimi, fiyat ve acılık filtresine göre süzme
 */
export function filterMenuItems(
  items: MenuItem[],
  selectedCategory: string,
  searchQuery: string = '',
  spiceFilter: number | 'all' = 'all',
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'name' = 'default'
): MenuItem[] {
  // 1. Kategori filtreleme
  let filtered = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // 2. Arama filtresi (başlık, açıklama veya malzeme bazında)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.descTr.toLowerCase().includes(query) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query))
    );
  }

  // 3. Acılık filtresi
  if (spiceFilter !== 'all') {
    filtered = filtered.filter((item) => item.spiceLevel === spiceFilter);
  }

  // 4. Sıralama
  if (sortBy === 'price-asc') {
    return [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    return [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }

  return filtered;
}

/**
 * Sipariş toplam tutarını hesaplama (reduce kullanımı)
 */
export function calculateOrderSummary(orderItems: OrderItem[]) {
  const totalAmount = orderItems.reduce((total, item) => {
    return total + item.dish.price * item.quantity;
  }, 0);

  const totalItemCount = orderItems.reduce((count, item) => {
    return count + item.quantity;
  }, 0);

  const tax = totalAmount * 0.10; // %10 KDV
  const grandTotal = totalAmount + tax;

  return {
    totalAmount,
    totalItemCount,
    tax,
    grandTotal,
  };
}

/**
 * Ödevde istenen JavaScript kod bloklarının dokümante edilmiş metinleri
 */
export const assignmentCodeSnippets = {
  reduceCategories: `// 1. Adım: Menü dizisinden reduce() ile tekil kategorileri oluşturma
const categories = menu.reduce(
  (values, item) => {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  },
  ["All"]
);
console.log(categories); // ["All", "Korea", "Japan", "China"]`,

  mapButtons: `// 2. Adım: categories dizisinden map() ile butonları oluşturma
const buttonContainer = document.querySelector(".btn-container");

const categoryButtons = categories
  .map((category) => {
    return \`<button class="btn-item" data-id="\${category}">\${category}</button>\`;
  })
  .join("");

buttonContainer.innerHTML = categoryButtons;`,

  mapCards: `// 3. Adım: menu dizisini map() ile HTML kartlarına dönüştürme
const sectionCenter = document.querySelector(".section-center");

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map((item) => {
    return \`<div class="menu-items col-lg-6 col-sm-12">
      <img src="\${item.img}" alt="\${item.title}" class="photo" />
      <div class="menu-info">
        <div class="menu-title">
          <h4>\${item.title}</h4>
          <h4 class="price">\${item.price}₺</h4>
        </div>
        <div class="menu-text">
          \${item.desc}
        </div>
      </div>
    </div>\`;
  });
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
}`,

  reduceOrderTotal: `// 4. Adım (Bonus): Sepet / Masa sipariş toplamının reduce() ile hesabı
const orderTotal = cartItems.reduce((accumulator, current) => {
  return accumulator + (current.price * current.quantity);
}, 0);`
};
