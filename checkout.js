const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

function formatPrice(amount) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

function loadCheckoutSummary() {
  let cart;

  try {
    cart = JSON.parse(
      localStorage.getItem("gadgetGalaxyCart") || "[]"
    );
  } catch (error) {
    cart = [];
  }

  if (!Array.isArray(cart)) {
    cart = [];
  }

  let subtotal = 0;
  let validItems = [];

  cart.forEach(item => {
    const product = products.find(
      product => product.id === item.id
    );

    if (
      !product ||
      !product.price ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      return;
    }

    const price = Number(product.price);

    if (!Number.isFinite(price) || price <= 0) {
      return;
    }

    const itemTotal = price * item.quantity;

    subtotal += itemTotal;

    validItems.push({
      name: product.name,
      quantity: item.quantity,
      total: itemTotal
    });
  });

  if (validItems.length === 0) {
    checkoutItems.innerHTML = `
      <p>Your cart is empty.</p>
      <a href="index.html#products">
        Browse Products
      </a>
    `;

    checkoutSubtotal.textContent = formatPrice(0);
    checkoutTotal.textContent = formatPrice(0);

    checkoutForm.querySelector(
      'button[type="submit"]'
    ).disabled = true;

    return;
  }

  checkoutItems.innerHTML = validItems.map(item => `
    <div class="summary-item">
      <span>
        ${item.name} × ${item.quantity}
      </span>

      <strong>
        ${formatPrice(item.total)}
      </strong>
    </div>
  `).join("");

  checkoutSubtotal.textContent = formatPrice(subtotal);
  checkoutTotal.textContent = formatPrice(subtotal);
}

// Handle checkout form submission
checkoutForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (!checkoutForm.reportValidity()) {
    return;
  }

  const customerName =
    document.getElementById("customerName").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const area =
    document.getElementById("area").value.trim();

  const address =
    document.getElementById("address").value.trim();

  const landmark =
    document.getElementById("landmark").value.trim();

  const paymentMethod =
    checkoutForm.querySelector(
      'input[name="paymentMethod"]:checked'
    ).value;

  console.log("Checkout details:", {
    customerName,
    phone,
    area,
    address,
    landmark,
    paymentMethod
  });

  alert(
    "Your checkout form is working!\n\n" +
    "Customer details and payment method have been validated.\n\n" +
    "Order submission is not connected yet. No order has been placed."
  );
});

// Load the order summary when the page opens
loadCheckoutSummary();
// Update payment instructions when payment method changes
const paymentInstructions =
  document.getElementById("paymentInstructions");

const paymentOptions =
  document.querySelectorAll('input[name="paymentMethod"]');

function updatePaymentInstructions() {
  const selectedPayment =
    document.querySelector(
      'input[name="paymentMethod"]:checked'
    ).value;

  if (selectedPayment === "Cash on Delivery") {
    paymentInstructions.textContent =
      "You can pay in cash when your order is delivered.";
  }

  else if (selectedPayment === "bKash") {
    paymentInstructions.textContent =
      "bKash payment instructions and the payment number will be provided after your order details are submitted.";
  }

  else if (selectedPayment === "Nagad") {
    paymentInstructions.textContent =
      "Nagad payment instructions and the payment number will be provided after your order details are submitted.";
  }
}

paymentOptions.forEach(option => {
  option.addEventListener("change", updatePaymentInstructions);
});

// Show the instructions for the initially selected method
updatePaymentInstructions();