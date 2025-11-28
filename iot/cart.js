// Shared cart system (works across pages)
// Structure: cart = [{ name, price, quantity }]
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = count;
}
updateCartCount();

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  // optional: small toast or alert
  // alert(name + " added to cart!");
}

// Remove item by index
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCheckoutItems();
}

// Compute subtotal
function getSubtotal() {
  return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
}

// Render checkout items (if on checkout page)
function renderCheckoutItems() {
  const itemsContainer = document.getElementById("order-items");
  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, i) => {
    const totalItemPrice = item.price * item.quantity;
    subtotal += totalItemPrice;

    const div = document.createElement("div");
    div.className = "checkout-item";

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${totalItemPrice.toFixed(2)}</p>
      </div>
      <div style="text-align:right">
        <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
      </div>
    `;
    itemsContainer.appendChild(div);
  });

  const subtotalEl = document.getElementById("subtotal-price");
  const totalEl = document.getElementById("total-price");
  const shippingEl = document.getElementById("shipping-price");

  if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
  if (shippingEl) shippingEl.textContent = "$0.00";
  if (totalEl) totalEl.textContent = "$" + subtotal.toFixed(2);
}

// Simple cart preview / modal replacement
function openCart() {
  const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (!currentCart || currentCart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  let message = "Your cart:\n\n";
  currentCart.forEach(item => {
    message += `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}\n`;
  });
  message += "\nGo to checkout to complete the order.";
  alert(message);
}

// Initialize rendering when page loads (for checkout page)
document.addEventListener('DOMContentLoaded', function(){
  // reload cart from storage (in case changed in another tab)
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
  renderCheckoutItems();
});
