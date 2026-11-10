/* global getProducts, formatPKR */
/* =========================================================
   CART LOGIC + TOAST + WHATSAPP ORDER
   ========================================================= */

const CART_KEY = 'shahgee_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => Number(i.id) === Number(productId));
  if (existing) existing.qty += qty;
  else cart.push({ id: Number(productId), qty });
  saveCart(cart);
  showToast('✔ Added to cart');
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => Number(i.id) !== Number(productId)));
}

function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => Number(i.id) === Number(productId));
  if (!item) return;
  item.qty = Math.max(1, Number(qty));
  saveCart(cart);
}

function clearCart() { saveCart([]); }

function cartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}

function cartTotal() {
  const products = getProducts();
  return getCart().reduce((sum, item) => {
    const p = products.find(x => Number(x.id) === Number(item.id));
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function updateCartBadge() {
  const badges = document.querySelectorAll('#cartBadge');
  const count = cartCount();
  badges.forEach(b => {
    b.textContent = count;
    b.classList.add('bounce');
    setTimeout(() => b.classList.remove('bounce'), 500);
  });
}

/* TOAST */
function showToast(msg) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 2200);
  setTimeout(() => t.remove(), 2600);
}

/* WHATSAPP ORDER */
function buildWhatsAppOrderMessage(customer = {}) {
  const products = getProducts();
  const cart = getCart();
  if (!cart.length) return '';

  let msg = 'Assalam-o-Alaikum Shah Gee Jewellers!\nI want to place an order:\n\n';
  cart.forEach((item, i) => {
    const p = products.find(x => Number(x.id) === Number(item.id));
    if (!p) return;
    msg += `${i + 1}. ${p.name} (Qty ${item.qty}) — ${formatPKR(p.price * item.qty)}\n`;
  });
  msg += `\nTotal: ${formatPKR(cartTotal())}\n`;
  if (customer.name) msg += `Name: ${customer.name}\n`;
  if (customer.phone) msg += `Phone: ${customer.phone}\n`;
  if (customer.address) msg += `Address: ${customer.address}\n`;
  if (customer.city) msg += `City: ${customer.city}\n`;
  if (customer.note) msg += `Note: ${customer.note}\n`;
  msg += '\nPlease confirm availability. Shukriya!';
  return msg;
}

function sendOrderOnWhatsApp(customer = {}) {
  const msg = buildWhatsAppOrderMessage(customer);
  if (!msg) { showToast('Cart is empty'); return; }
  window.open('https://wa.me/923266501314?text=' + encodeURIComponent(msg), '_blank');
}