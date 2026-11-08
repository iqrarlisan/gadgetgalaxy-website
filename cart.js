const cartContainer = document.getElementById("cartContainer");

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

function getCart() {
  try {
    const cart = JSON.parse(
      localStorage.getItem("gadgetGalaxyCart") || "[]"
    );

    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(
    "gadgetGalaxyCart",
    JSON.stringify(cart)
  );
}

function renderCart() {
  let cart = getCart();

  // Remove invalid or unavailable products
  cart = cart.filter(item =>
    products.some(product => product.id === item.id) &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );

  saveCart(cart);

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>You haven't added any products yet.</p>

        <a href="index.html#products"
           class="cart-button continue-button">
          Browse Products
        </a>
      </div>
    `;

    return;
  }

  let subtotal = 0;

  const cartItemsHTML = cart.map(item => {
    const product = products.find(
      product => product.id === item.id
    );

    const price = Number(product.price);
    const itemTotal = price * item.quantity;

    subtotal += itemTotal;

    return `
      <div class="cart-item">

        <img
          src="${product.image}"
          alt="${product.name}"
          onerror="this.style.display='none'"
        >

        <div class="item-info">
          <h3>${product.name}</h3>

          <div class="item-price">
            ৳${price.toLocaleString("en-BD")} each
          </div>

          <div class="item-controls">
            <button
              type="button"
              onclick="changeQuantity('${product.id}', -1)"
            >−</button>

            <span>${item.quantity}</span>

            <button
              type="button"
              onclick="changeQuantity('${product.id}', 1)"
            >+</button>
          </div>
        </div>

        <div class="item-actions">
          <div class="item-price">
            ৳${itemTotal.toLocaleString("en-BD")}
          </div>

          <button
            type="button"
            class="remove-button"
            onclick="removeItem('${product.id}')"
          >
            Remove
          </button>
        </div>

      </div>
    `;
  }).join("");

  cartContainer.innerHTML = `
    <div class="cart-items">
      ${cartItemsHTML}
    </div>

    <div class="cart-summary">

      <div class="summary-row">
        <span>Subtotal</span>
        <span>৳${subtotal.toLocaleString("en-BD")}</span>
      </div>

      <div class="summary-row">
        <span>Delivery</span>
        <span>Calculated at checkout</span>
      </div>

      <div class="summary-row total-row">
        <span>Total</span>
        <span>৳${subtotal.toLocaleString("en-BD")}</span>
      </div>

      <button
        type="button"
        class="cart-button checkout-button"
        onclick="goToCheckout()"
      >
        Proceed to Checkout
      </button>

      <a
        href="index.html#products"
        class="cart-button continue-button"
      >
        Continue Shopping
      </a>

    </div>
  `;
}

function changeQuantity(productId, change) {
  const cart = getCart();

  const item = cart.find(
    item => item.id === productId
  );

  if (!item) return;

  item.quantity += change;

  if (item.quantity < 1) {
    return;
  }

  saveCart(cart);
  renderCart();
}

function removeItem(productId) {
  const cart = getCart().filter(
    item => item.id !== productId
  );

  saveCart(cart);
  renderCart();
}

function goToCheckout() {
  window.location.href = "checkout.html";
}

// Display the cart when the page loads
renderCart();