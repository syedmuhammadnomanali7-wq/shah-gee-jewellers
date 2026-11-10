/* =========================================================
   PRODUCTS DATA + STORAGE
   ========================================================= */

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Royal Gold Bridal Set', category: 'bridal', price: 285000, purity: '22K Gold', weight: '45g', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600&q=80&auto=format&fit=crop', description: 'A magnificent bridal set crafted in 22K gold with intricate Pakistani karigari. Includes necklace, earrings, tikka and jhumar — perfect for your special day.', featured: true },
  { id: 2, name: 'Kundan Choker Necklace', category: 'kundan', price: 95000, purity: '22K Gold / Kundan', weight: '32g', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&auto=format&fit=crop', description: 'Traditional kundan choker with uncut stones and pearl drops — a timeless Pakistani favourite.', featured: true },
  { id: 3, name: 'Silver Oxidized Bangles', category: 'bangles', price: 8500, purity: '925 Silver', weight: '58g', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80&auto=format&fit=crop', description: 'Handcrafted oxidized silver bangles with traditional motifs.', featured: true },
  { id: 4, name: '22K Gold Bangles (Pair)', category: 'bangles', price: 175000, purity: '22K Gold', weight: '28g', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80&auto=format&fit=crop', description: 'Classic pair of 22K gold bangles with delicate filigree work.', featured: false },
  { id: 5, name: 'Diamond Cut Gold Ring', category: 'rings', price: 45000, purity: '18K Gold', weight: '4.5g', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80&auto=format&fit=crop', description: 'Elegant diamond-cut gold ring — perfect for engagements and daily wear.', featured: true },
  { id: 6, name: 'Emerald Drop Earrings', category: 'earrings', price: 65000, purity: '18K Gold / Emerald', weight: '6g', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80&auto=format&fit=crop', description: 'Stunning emerald drop earrings set in 18K gold with a royal Pakistani finish.', featured: true },
  { id: 7, name: 'Traditional Jhumka Earrings', category: 'earrings', price: 32000, purity: '22K Gold', weight: '8g', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&auto=format&fit=crop', description: 'Iconic dome jhumkas with pearl drops — the essence of traditional elegance.', featured: false },
  { id: 8, name: 'Layered Gold Chain', category: 'chains', price: 55000, purity: '22K Gold', weight: '5g', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80&auto=format&fit=crop', description: 'Modern layered gold chain for a contemporary look.', featured: false },
  { id: 9, name: 'Pearl Nose Pin', category: 'nose-pins', price: 4500, purity: '22K Gold / Pearl', weight: '1g', image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80&auto=format&fit=crop', description: 'Delicate pearl nose pin in 22K gold — subtle, chic, forever.', featured: false },
  { id: 10, name: 'Silver Anklet Pair', category: 'anklets', price: 6800, purity: '925 Silver', weight: '42g', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80&auto=format&fit=crop', description: 'Classic silver anklet pair with ghungroo detail.', featured: true },
  { id: 11, name: 'Antique Gold Locket Set', category: 'lockets', price: 88000, purity: '22K Gold', weight: '12g', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80&auto=format&fit=crop', description: 'Antique-finish gold locket with matching earrings — a heritage piece.', featured: false },
  { id: 12, name: 'Temple Jewellery Set', category: 'kundan', price: 125000, purity: '22K Gold', weight: '28g', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80&auto=format&fit=crop', description: 'South-Indian style temple jewellery set with goddess motifs and ruby accents.', featured: true },
  { id: 13, name: 'Gold Kada (Men)', category: 'mens', price: 195000, purity: '22K Gold', weight: '22g', image: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=600&q=80&auto=format&fit=crop', description: 'Bold men\'s gold kada with intricate engraving — a statement piece.', featured: false },
  { id: 14, name: 'Men\'s Silver Chain', category: 'mens', price: 12000, purity: '925 Silver', weight: '35g', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80&auto=format&fit=crop', description: 'Heavy silver chain for men — durable, stylish, everyday wear.', featured: false },
  { id: 15, name: 'Kids Gold Bangle Set', category: 'kids', price: 38000, purity: '22K Gold', weight: '6g', image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80&auto=format&fit=crop', description: 'Adorable pair of baby gold bangles — lightweight and safe.', featured: true },
  { id: 16, name: 'American Diamond Necklace', category: 'artificial', price: 15000, purity: 'AD / CZ', weight: '45g', image: 'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=600&q=80&auto=format&fit=crop', description: 'Sparkling American diamond necklace set — elegant, affordable, gift-ready.', featured: false },
  { id: 17, name: 'Polki Bridal Set', category: 'bridal', price: 350000, purity: 'Polki / 22K Gold', weight: '65g', image: 'https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?w=600&q=80&auto=format&fit=crop', description: 'Grand polki bridal set with uncut diamonds and meenakari work — for the royal bride.', featured: true },
  { id: 18, name: 'Silver Payal', category: 'anklets', price: 7200, purity: '925 Silver', weight: '40g', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80&auto=format&fit=crop', description: 'Delicate silver payal with small bells — traditional & elegant.', featured: false },
  { id: 19, name: 'Gold Hoop Earrings', category: 'earrings', price: 28000, purity: '22K Gold', weight: '5g', image: 'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=600&q=80&auto=format&fit=crop', description: 'Minimalist gold hoops — wear them every day or dress them up.', featured: false },
  { id: 20, name: 'Ruby Statement Ring', category: 'rings', price: 72000, purity: '22K Gold / Ruby', weight: '6g', image: 'https://images.unsplash.com/photo-1600721391689-2564bb8055de?w=600&q=80&auto=format&fit=crop', description: 'Statement ruby ring in ornate gold setting — conversation starter.', featured: false },
  { id: 21, name: 'Gold Coin Locket', category: 'lockets', price: 42000, purity: '22K Gold', weight: '4g', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80&auto=format&fit=crop', description: 'Traditional gold coin locket — auspicious, elegant, timeless.', featured: false },
  { id: 22, name: 'Navratan Necklace Set', category: 'necklaces', price: 165000, purity: '22K Gold / Gemstones', weight: '35g', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80&auto=format&fit=crop', description: 'Nine-gemstone Navratan necklace — a royal traditional Pakistani masterpiece.', featured: false }
];

const STORAGE_KEY = 'shahgee_products';

function getProducts() {
  try { 
    const stored = localStorage.getItem(STORAGE_KEY); 
    if (stored) { 
      const arr = JSON.parse(stored); 
      if (Array.isArray(arr) && arr.length) return arr; 
    } 
  } catch (e) { console.error(e); }
  return DEFAULT_PRODUCTS.slice();
}

function saveProducts(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    return true;
  } catch (e) {
    console.error('Save failed:', e);
    alert('❌ Product save nahi ho saka! Iski wajah image ka size bohot zyada hona hai.\n\nMehrbani karke choti image use karein ya "Image URL" wale box mein direct link daalein.');
    return false;
  }
}

function getProduct(id) { return getProducts().find(p => Number(p.id) === Number(id)); }
function resetProducts() { localStorage.removeItem(STORAGE_KEY); }

const CATEGORY_LABELS = {
  gold: 'Gold', silver: 'Silver', bridal: 'Bridal Sets', bangles: 'Bangles',
  rings: 'Rings', earrings: 'Earrings', necklaces: 'Necklaces', chains: 'Chains',
  'nose-pins': 'Nose Pins', anklets: 'Anklets', lockets: 'Lockets',
  kundan: 'Kundan / Temple', artificial: 'Artificial', kids: 'Kids', mens: "Men's"
};

const CATEGORY_IMAGES = {
  gold: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop',
  silver: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80&auto=format&fit=crop',
  bridal: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=400&q=80&auto=format&fit=crop',
  bangles: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&auto=format&fit=crop',
  rings: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80&auto=format&fit=crop',
  earrings: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&auto=format&fit=crop',
  necklaces: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&auto=format&fit=crop',
  chains: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80&auto=format&fit=crop',
  'nose-pins': 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&q=80&auto=format&fit=crop',
  anklets: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&auto=format&fit=crop',
  lockets: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&auto=format&fit=crop',
  kundan: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop',
  artificial: 'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=400&q=80&auto=format&fit=crop',
  kids: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&q=80&auto=format&fit=crop',
  mens: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=400&q=80&auto=format&fit=crop'
};

function formatPKR(n) { return 'Rs. ' + Number(n).toLocaleString('en-PK'); }