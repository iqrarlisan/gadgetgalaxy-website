
const productDetails = document.getElementById("productDetails");

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const product = products.find(item => item.id === productId);

if (!product) {
  productDetails.innerHTML = `
    <div class="not-found">
      <h1>Product Not Found</h1>
      <p>Sorry, this product could not be found.</p>
      <a href="index.html#products" class="contact-button">
        Browse Products
      </a>
    </div>
  `;
} else {
  const price = product.price
    ? `৳${Number(product.price).toLocaleString("en-BD")}`
    : "Message for price";

  const specifications =
    product.specifications && product.specifications.length > 0
      ? `
        <h2>Specifications</h2>
        <ul class="specifications">
          ${product.specifications.map(spec => `<li>${spec}</li>`).join("")}
        </ul>
      `
      : "";

  const whatsappMessage = encodeURIComponent(
    `Hello GadgetGalaxy, I am interested in ${product.brand} ${product.name}.`
  );

  const whatsappLink =
    `https://wa.me/8801684240084?text=${whatsappMessage}`;

  productDetails.innerHTML = `
    <div class="product-container">

      <img
        src="${product.image}"
        alt="${product.brand} ${product.name}"
        class="product-image"
        onerror="this.style.display='none'"
      >

      <div class="product-info">

        <div class="category">
          ${product.category || "Gadget"}
        </div>

        <h1>${product.name}</h1>

        <div class="brand">
          Brand: ${product.brand}
        </div>

        <div class="price">
          ${price}
        </div>

        <p class="description">
          ${product.description || ""}
        </p>

        ${specifications}

        <div class="cart-actions">
          <label for="productQuantity">Quantity:</label>

         <div class="quantity-selector">
  <button type="button" id="decreaseQuantity">−</button>

  <input
    type="number"
    id="productQuantity"
    min="1"
    step="1"
    value="1"
  >

  <button type="button" id="increaseQuantity">+</button>
</div>

          <button
            id="addToCartButton"
            class="add-to-cart-button"
            ${product.price ? "" : "disabled"}
          >
            Add to Cart
          </button>
        </div>

        ${product.price ? "" : `
          <p class="cart-note">
            Please contact us for the price before ordering.
          </p>
        `}

        <a
          href="${whatsappLink}"
          class="contact-button"
          target="_blank"
          rel="noopener"
        >
          Ask about this product on WhatsApp
        </a>

      </div>
    </div>
  `;
  
// Quantity selector controls
const quantityInput = document.getElementById("productQuantity");

document.getElementById("decreaseQuantity").addEventListener("click", () => {
  const currentQuantity = parseInt(quantityInput.value, 10) || 1;
  quantityInput.value = Math.max(1, currentQuantity - 1);
});

document.getElementById("increaseQuantity").addEventListener("click", () => {
  const currentQuantity = parseInt(quantityInput.value, 10) || 1;
  quantityInput.value = currentQuantity + 1;
});


  // Add product to the browser's shopping cart
  const addToCartButton =
    document.getElementById("addToCartButton");

  if (product.price) {
    addToCartButton.addEventListener("click", () => {
      const quantityInput =
        document.getElementById("productQuantity");

      const quantity = Math.max(
        1,
        parseInt(quantityInput.value, 10) || 1
      );

      try {
        let cart = JSON.parse(
          localStorage.getItem("gadgetGalaxyCart") || "[]"
        );

        if (!Array.isArray(cart)) {
          cart = [];
        }

        const existingItem = cart.find(
          item => item.id === product.id
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({
            id: product.id,
            quantity: quantity
          });
        }

        localStorage.setItem(
          "gadgetGalaxyCart",
          JSON.stringify(cart)
        );

        alert(`${product.name} added to your cart!`);

      } catch (error) {
        alert("Unable to save your cart. Please try again.");
      }
    });
  }
}
