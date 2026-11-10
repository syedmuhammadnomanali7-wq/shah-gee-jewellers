/* =========================================================
   MAIN — navbar, footer, page logic, animations
   ========================================================= */

const PROJECTS = [
  { name: 'Watch Deals', label: 'Watches Store', url: 'https://watch-deals-ruddy.vercel.app/' },
  { name: 'Bilal Sidra AI', label: 'AI Studio', url: 'https://bilal.sidra-ai-creation.workers.dev/' },
  { name: 'SciCalcPro', label: 'Calculator', url: 'https://scicalcpro.vercel.app/' },
  { name: 'Gold Calculator', label: 'Live Rates', url: 'https://scicalcpro.vercel.app/gold-silver-calculator.html' },
  { name: 'Akbar Jewellers', label: 'Jewellery Store', url: 'https://akbarjewellersfaizehussaini-beep.github.io/akbar-jewellers/' },
  { name: 'Shah Rehan Jewellers', label: 'Jewellery Store', url: 'https://bilalmarghoobboutique-cmyk.github.io/shah-rehan-jewellers/index.html' },
  { name: 'PDF Master', label: 'PDF Tools', url: 'https://pdfmaster-delta.vercel.app/' },
  { name: 'Compress Videos', label: 'Video Tools', url: 'https://compressvideos.apijani001.workers.dev/' }
];

document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ duration: 1000, once: true, offset: 100 });

  initNavbar();
  renderFooter();
  updateCartBadge();

  const path = window.location.pathname.split('/').pop() || 'index.html';
  if (path === 'index.html' || path === '') initHome();
  if (path === 'shop.html') initShop();
  if (path === 'product.html') initProduct();
  if (path === 'cart.html') initCartPage();
  if (path === 'about.html') initAbout();
  if (path === 'contact.html') initContact();
});

function initNavbar() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
  if (toggle) toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

function renderFooter() {
  const container = document.getElementById('site-footer');
  if (!container) return;
  
  const quickLinks = ['index.html|Home', 'shop.html|Shop', 'about.html|About Us', 'contact.html|Contact Us', 'cart.html|Cart', 'admin.html|Admin']
    .map(l => { const [u, t] = l.split('|'); return `<li><a href="${u}">${t}</a></li>`; }).join('');
  
  const cats = Object.entries(CATEGORY_LABELS).slice(0, 6)
    .map(([k, v]) => `<li><a href="shop.html?cat=${k}">${v}</a></li>`).join('');

  // Portfolio Projects Generation
  const projectsHtml = PROJECTS.map(p => `
    <a href="${p.url}" target="_blank" rel="noopener" class="project-card">
      <img src="https://image.thum.io/get/width/600/crop/800/${p.url}" alt="${p.name} preview" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=60'"/>
      <div class="project-overlay">
        <h4>${p.name}</h4>
        <p>${p.label}</p>
      </div>
      <span class="project-visit">Visit →</span>
    </a>`).join('');

  const marqueeItems = PROJECTS.map(p => `<a href="${p.url}" target="_blank" rel="noopener">✦ ${p.name}</a>`).join('');
  const marquee = marqueeItems + marqueeItems;

  container.innerHTML = `
    <footer class="site-footer">
      <div class="footer-top">
        <div class="footer-col">
          <a href="index.html" class="footer-logo">Shah Gee <span>Jewellers</span></a>
          <p>Exquisite Gold & Silver Jewellery — Lahore Cantt. Family trust since generations, crafting memories that sparkle forever.</p>
          <a href="https://wa.me/923266501314" style="display:inline-block; margin-top:15px; color:#25D366; font-weight:700; font-size:1.1rem;">💬 Chat on WhatsApp</a>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>${quickLinks}</ul>
        </div>
        <div class="footer-col">
          <h4>Categories</h4>
          <ul>${cats}</ul>
        </div>
        <div class="footer-col">
          <h4>Contact Us</h4>
          <p>📍 Opposite Purana Thana, Market Ghaziabad, Lahore Cantt</p>
          <p>📞 <a href="tel:+923266501314" style="color:var(--rich-gold);">0326 6501314</a></p>
          <p>🕒 11:00 AM – 10:00 PM (Daily)</p>
        </div>
      </div>
      
      <div class="footer-projects">
        <h3>Our Other Projects</h3>
        <div class="projects-grid">${projectsHtml}</div>
      </div>
      
      <div class="footer-marquee">
        <div class="marquee-track">${marquee}</div>
      </div>
      
      <div class="footer-credit">
        <p>A Project of <a href="https://wa.me/923274002704" target="_blank">Bilal Marghoob Creations</a> • WhatsApp: <a href="https://wa.me/923266501314" target="_blank">03266501314</a></p>
        <p style="margin-top:8px; font-size:0.8rem; color:#666;">Crafted with 💛 in Pakistan</p>
      </div>
    </footer>`;
}

function productCardHTML(p) {
  return `<div class="product-card" data-aos="fade-up">
    <a href="product.html?id=${p.id}" class="product-img-wrap">
      <img src="${p.image}" alt="${p.name}" loading="lazy" />
    </a>
    <div class="product-info">
      <span class="product-cat">${CATEGORY_LABELS[p.category] || p.category}</span>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <p class="product-price">${formatPKR(p.price)}</p>
      <div class="product-actions">
        <a href="product.html?id=${p.id}" class="btn-ghost">View</a>
        <button class="btn-gold add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    </div>
  </div>`;
}

function bindAddToCart() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      addToCart(Number(btn.dataset.id));
    });
  });
}

function initHome() {
  const products = getProducts();
  const catsGrid = document.getElementById('categoriesGrid');
  if (catsGrid) {
    catsGrid.innerHTML = Object.entries(CATEGORY_LABELS).map(([k, v]) => `
      <a href="shop.html?cat=${k}" class="cat-card" data-aos="zoom-in">
        <img src="${CATEGORY_IMAGES[k]}" alt="${v}" loading="lazy" />
        <div class="cat-card-overlay"><h3>${v}</h3></div>
      </a>`).join('');
  }
  const bestGrid = document.getElementById('bestsellersGrid');
  if (bestGrid) {
    bestGrid.innerHTML = products.filter(p => p.featured).slice(0, 8).map(productCardHTML).join('');
    bindAddToCart();
  }
}

function initShop() {
  const products = getProducts();
  const grid = document.getElementById('shopGrid');
  const catFilter = document.getElementById('categoryFilter');
  const sortSel = document.getElementById('sortSelect');
  const search = document.getElementById('searchInput');
  const priceRange = document.getElementById('priceRange');
  const priceLabel = document.getElementById('priceLabel');
  const resultsCount = document.getElementById('resultsCount');
  const noRes = document.getElementById('noResults');

  Object.entries(CATEGORY_LABELS).forEach(([k, v]) => {
    const o = document.createElement('option'); o.value = k; o.textContent = v; catFilter.appendChild(o);
  });

  const urlCat = new URLSearchParams(window.location.search).get('cat');
  if (urlCat) catFilter.value = urlCat;

  function render() {
    let list = products.slice();
    const cat = catFilter.value;
    const q = search.value.trim().toLowerCase();
    const sort = sortSel.value;
    const maxP = Number(priceRange.value);

    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    list = list.filter(p => p.price <= maxP);
    if (sort === 'low-high') list.sort((a, b) => a.price - b.price);
    else if (sort === 'high-low') list.sort((a, b) => b.price - a.price);

    resultsCount.textContent = `Showing ${list.length} products`;
    if (!list.length) { grid.innerHTML = ''; noRes.style.display = 'block'; return; }
    noRes.style.display = 'none';
    grid.innerHTML = list.map(productCardHTML).join('');
    bindAddToCart();
    if (window.AOS) AOS.refresh();
  }

  catFilter.addEventListener('change', render);
  sortSel.addEventListener('change', render);
  search.addEventListener('input', render);
  priceRange.addEventListener('input', () => { priceLabel.textContent = formatPKR(priceRange.value); render(); });
  priceLabel.textContent = formatPKR(priceRange.value);
  render();
}

function initProduct() {
  const id = new URLSearchParams(window.location.search).get('id');
  const p = getProduct(id);
  const wrap = document.getElementById('productDetail');
  const notFound = document.getElementById('notFound');
  const relatedSection = document.getElementById('relatedSection');

  if (!p) {
    if (wrap) wrap.style.display = 'none';
    if (notFound) notFound.style.display = 'block';
    if (relatedSection) relatedSection.style.display = 'none';
    return;
  }

  document.title = `${p.name} — Shah Gee Jewellers`;
  document.getElementById('breadcrumbName').textContent = p.name;
  
  wrap.innerHTML = `
    <div class="pd-image" data-aos="fade-right">
      <img src="${p.image}" alt="${p.name}" />
    </div>
    <div class="pd-info" data-aos="fade-left">
      <span class="pd-cat">${CATEGORY_LABELS[p.category] || p.category}</span>
      <h1>${p.name}</h1>
      <p class="pd-price">${formatPKR(p.price)}</p>
      <div class="pd-meta">
        ${p.purity ? `<span>✨ ${p.purity}</span>` : ''}
        ${p.weight ? `<span>⚖️ ${p.weight}</span>` : ''}
      </div>
      <p class="pd-desc">${p.description}</p>
      <div class="qty-row">
        <label>Quantity</label>
        <input type="number" id="pdQty" value="1" min="1" />
      </div>
      <div class="pd-actions">
        <button class="btn-gold" id="pdAdd">Add to Cart</button>
        <button class="btn-ghost" id="pdWA">Buy on WhatsApp</button>
      </div>
    </div>`;

  document.getElementById('pdAdd').addEventListener('click', () => {
    const qty = Number(document.getElementById('pdQty').value) || 1;
    addToCart(p.id, qty);
  });
  document.getElementById('pdWA').addEventListener('click', () => {
    const qty = Number(document.getElementById('pdQty').value) || 1;
    const msg = `Assalam-o-Alaikum Shah Gee Jewellers!\nI'm interested in:\n\n${p.name} (Qty ${qty}) — ${formatPKR(p.price * qty)}\n\nPlease share more details. Shukriya!`;
    window.open('https://wa.me/923266501314?text=' + encodeURIComponent(msg), '_blank');
  });

  const related = getProducts().filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const relGrid = document.getElementById('relatedGrid');
  if (relGrid && related.length) relGrid.innerHTML = related.map(productCardHTML).join('');
  else if (relatedSection) relatedSection.style.display = 'none';
  bindAddToCart();
}

function initCartPage() {
  const wrap = document.getElementById('cartContainer');
  const products = getProducts();
  const cart = getCart();

  if (!cart.length) {
    wrap.innerHTML = `<div class="empty-cart" data-aos="fade-up"><h2>Your cart is empty</h2><p style="margin:20px 0;color:#666;">Add some beautiful pieces to your cart.</p><a href="shop.html" class="btn-gold">Browse Shop</a></div>`;
    return;
  }

  let rows = '';
  cart.forEach(item => {
    const p = products.find(x => Number(x.id) === Number(item.id));
    if (!p) return;
    rows += `<tr data-id="${p.id}">
      <td><img src="${p.image}" alt="${p.name}" class="cart-item-img" /></td>
      <td>${p.name}</td>
      <td>${formatPKR(p.price)}</td>
      <td>
        <div class="cart-qty">
          <button class="qty-dec" data-id="${p.id}">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-inc" data-id="${p.id}">+</button>
        </div>
      </td>
      <td><strong>${formatPKR(p.price * item.qty)}</strong></td>
      <td><button class="cart-remove" data-id="${p.id}" style="font-size:1.5rem; background:none; color:red;">×</button></td>
    </tr>`;
  });

  wrap.innerHTML = `
    <div data-aos="fade-up">
      <table class="cart-table">
        <thead><tr><th>Image</th><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead>
        <tbody>${rows}<tr class="cart-total-row"><td colspan="4" style="text-align:right;">Total:</td><td colspan="2"><strong>${formatPKR(cartTotal())}</strong></td></tr></tbody>
      </table>
    </div>
    <div class="cart-summary" data-aos="fade-up">
      <div class="checkout-form">
        <h3>Delivery Details</h3>
        <input type="text" id="cName" placeholder="Full Name *" required />
        <input type="tel" id="cPhone" placeholder="Phone (e.g. 03001234567) *" required />
        <input type="text" id="cCity" placeholder="City" />
        <textarea id="cAddress" rows="3" placeholder="Delivery Address"></textarea>
        <textarea id="cNote" rows="2" placeholder="Note (optional)"></textarea>
        <button class="btn-gold" id="orderWA" style="width:100%;">Order on WhatsApp</button>
      </div>
      <div>
        <div class="checkout-form">
          <h3>Order Summary</h3>
          <p style="display:flex;justify-content:space-between;margin-bottom:10px;"><span>Subtotal:</span><strong>${formatPKR(cartTotal())}</strong></p>
          <p style="display:flex;justify-content:space-between;margin-bottom:10px;"><span>Delivery:</span><span>Confirm on WhatsApp</span></p>
          <a href="shop.html" class="btn-ghost" style="display:block;text-align:center;margin-top:20px;">Continue Shopping</a>
        </div>
      </div>
    </div>`;

  wrap.querySelectorAll('.qty-inc').forEach(b => b.addEventListener('click', () => { const c = getCart().find(i => i.id === Number(b.dataset.id)); updateQty(b.dataset.id, c.qty + 1); initCartPage(); }));
  wrap.querySelectorAll('.qty-dec').forEach(b => b.addEventListener('click', () => { const c = getCart().find(i => i.id === Number(b.dataset.id)); if (c.qty > 1) { updateQty(b.dataset.id, c.qty - 1); initCartPage(); } }));
  wrap.querySelectorAll('.cart-remove').forEach(b => b.addEventListener('click', () => { removeFromCart(b.dataset.id); initCartPage(); }));

  document.getElementById('orderWA').addEventListener('click', () => {
    const name = document.getElementById('cName').value.trim();
    const phone = document.getElementById('cPhone').value.trim();
    if (!name || !phone) { showToast('Please enter name & phone'); return; }
    sendOrderOnWhatsApp({ name, phone, city: document.getElementById('cCity').value.trim(), address: document.getElementById('cAddress').value.trim(), note: document.getElementById('cNote').value.trim() });
  });
}

function initAbout() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      let count = 0;
      const step = target / 50;
      const timer = setInterval(() => {
        count += step;
        if (count >= target) { el.textContent = target.toLocaleString() + '+'; clearInterval(timer); }
        else el.textContent = Math.floor(count).toLocaleString();
      }, 30);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const phone = document.getElementById('cPhone').value.trim();
    const msg = document.getElementById('cMsg').value.trim();
    let text = `Assalam-o-Alaikum Shah Gee Jewellers!\n\nName: ${name}\nPhone: ${phone}\n\nMessage:\n${msg}`;
    window.open('https://wa.me/923266501314?text=' + encodeURIComponent(text), '_blank');
    form.reset();
    showToast('✔ Opening WhatsApp...');
  });
}