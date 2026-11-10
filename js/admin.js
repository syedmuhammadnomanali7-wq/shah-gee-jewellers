/* =========================================================
   ADMIN PANEL
   ========================================================= */

const ADMIN_HASH = 'U2hhaEdlZUAyMDI0'; // btoa('ShahGee@2024')

document.addEventListener('DOMContentLoaded', () => {
  const loginBox = document.getElementById('loginBox');
  const dashBox = document.getElementById('dashBox');
  const loginBtn = document.getElementById('loginBtn');
  const passInput = document.getElementById('adminPass');
  const togglePass = document.getElementById('togglePass');
  const loginError = document.getElementById('loginError');
  const logoutBtn = document.getElementById('logoutBtn');

  if (sessionStorage.getItem('shahgee_admin') === '1') {
    loginBox.style.display = 'none';
    dashBox.style.display = 'block';
    initDash();
  }

  togglePass?.addEventListener('click', () => {
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
  });

  function tryLogin() {
    const p = passInput.value;
    if (btoa(p) === ADMIN_HASH) {
      sessionStorage.setItem('shahgee_admin', '1');
      loginBox.style.display = 'none';
      dashBox.style.display = 'block';
      loginError.textContent = '';
      initDash();
    } else {
      loginError.textContent = 'Incorrect password';
      passInput.value = '';
    }
  }
  loginBtn?.addEventListener('click', tryLogin);
  passInput?.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

  logoutBtn?.addEventListener('click', () => {
    sessionStorage.removeItem('shahgee_admin');
    location.reload();
  });
});

function initDash() {
  const form = document.getElementById('productForm');
  const fileInput = document.getElementById('pFile');
  let uploadedImage = '';

  fileInput?.addEventListener('change', e => {
    const f = e.target.files[0];
    if (!f) { uploadedImage = ''; return; }
    
    // Image Size Check (Max 500KB)
    if (f.size > 500000) {
      alert('⚠️ Image ka size 500KB se zyada hai. Browser memory full ho jayegi.\n\nMehrbani karke choti image select karein ya Image URL use karein.');
      fileInput.value = '';
      uploadedImage = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => { uploadedImage = ev.target.result; };
    reader.readAsDataURL(f);
  });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const editId = document.getElementById('editId').value;
    const name = document.getElementById('pName').value.trim();
    const category = document.getElementById('pCategory').value;
    const price = Number(document.getElementById('pPrice').value);
    const purity = document.getElementById('pPurity').value.trim();
    const weight = document.getElementById('pWeight').value.trim();
    const imageUrl = document.getElementById('pImage').value.trim();
    const desc = document.getElementById('pDesc').value.trim();
    const featured = document.getElementById('pFeatured').checked;

    const image = uploadedImage || imageUrl || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80';

    const products = getProducts();
    
    if (editId) {
      const idx = products.findIndex(p => p.id === Number(editId));
      if (idx > -1) products[idx] = { ...products[idx], name, category, price, purity, weight, image, description: desc, featured };
    } else {
      const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      products.push({ id: newId, name, category, price, purity, weight, image, description: desc, featured });
    }
    
    // Save & Check
    const isSaved = saveProducts(products);
    
    if (isSaved) {
      alert(editId ? '✔ Product update ho gaya!' : '✔ Naya Product add ho gaya!');
      form.reset();
      document.getElementById('editId').value = '';
      document.getElementById('formTitle').textContent = 'Add New Product';
      document.getElementById('cancelEdit').style.display = 'none';
      uploadedImage = '';
      renderTable();
    }
  });

  document.getElementById('cancelEdit')?.addEventListener('click', () => {
    form.reset();
    document.getElementById('editId').value = '';
    document.getElementById('formTitle').textContent = 'Add New Product';
    document.getElementById('cancelEdit').style.display = 'none';
    uploadedImage = '';
  });

  renderTable();
}

function renderTable() {
  const wrap = document.getElementById('productsTableWrap');
  const products = getProducts();
  let html = `<div class="table-wrap"><table class="products-table">
    <thead><tr><th>Img</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead><tbody>`;
  
  if (products.length === 0) {
    html += `<tr><td colspan="5" style="text-align:center;">No products found. Add one!</td></tr>`;
  }

  products.forEach(p => {
    html += `<tr>
      <td><img src="${p.image}" alt="${p.name}" /></td>
      <td>${p.name}</td>
      <td>${CATEGORY_LABELS[p.category] || p.category}</td>
      <td>${formatPKR(p.price)}</td>
      <td>
        <button class="btn-edit" data-id="${p.id}">Edit</button>
        <button class="btn-del" data-id="${p.id}">Delete</button>
      </td>
    </tr>`;
  });
  html += '</tbody></table></div>';
  wrap.innerHTML = html;

  wrap.querySelectorAll('.btn-edit').forEach(b => b.addEventListener('click', () => {
    const p = getProduct(Number(b.dataset.id));
    if (!p) return;
    document.getElementById('editId').value = p.id;
    document.getElementById('pName').value = p.name;
    document.getElementById('pCategory').value = p.category;
    document.getElementById('pPrice').value = p.price;
    document.getElementById('pPurity').value = p.purity || '';
    document.getElementById('pWeight').value = p.weight || '';
    document.getElementById('pImage').value = p.image || '';
    document.getElementById('pDesc').value = p.description || '';
    document.getElementById('pFeatured').checked = !!p.featured;
    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('cancelEdit').style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }));

  wrap.querySelectorAll('.btn-del').forEach(b => b.addEventListener('click', () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const arr = getProducts().filter(p => p.id !== Number(b.dataset.id));
    saveProducts(arr);
    renderTable();
  }));
}