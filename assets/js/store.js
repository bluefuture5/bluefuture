fetch("data/store-products.json")
    .then(res => res.json())
    .then(data => showProducts(data.slice(0, 8)))
    .catch(err => console.error('Failed to load products:', err));

function showProducts(products) {
    const container = document.getElementById("productsGrid");
    products.forEach(item => {
        // include data attributes so cart code can read product details from the DOM
        container.innerHTML += `
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="product-card">

          <img class="product-image" src="${item.image || ''}" alt="${item.name}">

          <div class="product-content">

            <h3 class="product-title">${item.name}</h3>

            <p class="product-description">
              ${item.description}
            </p>

            <div class="product-water-savings">
              <p>
                Saves <span class="water-saved-amount">
                ${item.waterSaved.toLocaleString()} L
                </span> per year
              </p>
              <div class="product-source">
                Source: ${item.source}
              </div>
            </div>

            <div class="product-footer">
              <div class="product-price">$${item.price}</div>
              <button class="add-to-cart-btn" 
                data-id="${item.id}"
                data-name="${escapeHtml(item.name)}"
                data-price="${item.price}"
                data-water="${item.waterSaved}">
                Add To Cart
              </button>
            </div>

          </div>

        </div>
      </div>
    `;
    });
}

/* Simple helper to escape quotes in attribute values */
function escapeHtml(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// --- Simple cart logic (in-memory) ---
const Cart = {
    items: {}, // id -> {id,name,price,water,qty}
    add(product) {
        const id = product.id;
        if (!this.items[id]) this.items[id] = { ...product, qty: 0 };
        this.items[id].qty += 1;
        this.render();
    },
    remove(id) {
        delete this.items[id];
        this.render();
    },
    changeQty(id, delta) {
        if (!this.items[id]) return;
        this.items[id].qty += delta;
        if (this.items[id].qty <= 0) delete this.items[id];
        this.render();
    },
    clear() { this.items = {}; this.render(); },
    get totals() {
        let count = 0, water = 0;
        Object.values(this.items).forEach(it => { count += it.qty; water += (it.water || 0) * it.qty; });
        return { count, water };
    },
    render() {
        const container = document.getElementById('cartItems');
        container.innerHTML = '';
        Object.values(this.items).forEach(it => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div style="flex:1">
                  <div class="cart-item-title">${escapeHtml(it.name)}</div>
                  <div class="cart-item-price">$${it.price} × ${it.qty}</div>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px">
                  <button class="qty-btn" data-action="inc" data-id="${it.id}">+</button>
                  <button class="qty-btn" data-action="dec" data-id="${it.id}">-</button>
                </div>
            `;
            container.appendChild(div);
        });

        // update counters
        const cartCount = Object.values(this.items).reduce((s, i) => s + i.qty, 0);
        document.getElementById('cartCount').textContent = cartCount;
        document.getElementById('totalItems').textContent = cartCount;
        document.getElementById('totalWaterSaved').textContent = this.totals.water.toLocaleString();
    }
};

// Event delegation for Add to Cart and quantity buttons
document.addEventListener('click', function (e) {
    const add = e.target.closest('.add-to-cart-btn');
    if (add) {
        const id = add.getAttribute('data-id');
        Cart.add({ id, name: add.getAttribute('data-name'), price: Number(add.getAttribute('data-price')), water: Number(add.getAttribute('data-water')) });
        // open cart on add
        openCart();
        return;
    }

    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
        const action = qtyBtn.getAttribute('data-action');
        const id = qtyBtn.getAttribute('data-id');
        if (action === 'inc') Cart.changeQty(id, 1);
        else Cart.changeQty(id, -1);
        return;
    }
});

// Cart sidebar toggles
const cartToggle = document.getElementById('cartToggleBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.querySelector('.close-cart');

function openCart() { cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); }
function closeCart() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); }

if (cartToggle) cartToggle.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

// expose Cart for debugging
window.Cart = Cart;
fetch("data/store-products.json")
    .then(res => res.json())
    .then(data => showFeatures(data.slice(8, 11)))
    .catch(err => console.error('Failed to load products:', err));

function showFeatures(products) {
    const container = document.getElementById("FeatureGrid");

    products.forEach(item => {
        container.innerHTML += `
      <div class="col-xl-4 ol-md-6 col-sm-12 mb-4">
        <div class="product-card">

        <img class="product-image" src="${item.image}" alt="${item.name}">


          <div class="product-content">

            <h3 class="product-title">${item.name}</h3>

            <p class="product-description">
              ${item.description}
            </p>

            <div class="product-water-savings">
              <p>
                Saves <span class="water-saved-amount">
                ${item.waterSaved.toLocaleString()} L
                </span> per year
              </p>
              <div class="product-source">
                Source: ${item.source}
              </div>
            </div>

            <div class="product-footer">
              <div class="product-price">$${item.price}</div>
              <button class="add-to-cart-btn">
                Add To Cart
              </button>
            </div>

          </div>

        </div>
      </div>
    `;
    });
}
