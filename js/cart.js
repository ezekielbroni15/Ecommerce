document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const shippingElement = document.getElementById('shipping');
  const totalElement = document.getElementById('total');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      subtotalElement.textContent = '0.00';
      shippingElement.textContent = '0.00';
      totalElement.textContent = '0.00';
    } else {
      let subtotal = 0;
      cartItemsContainer.innerHTML = '';
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        cartItemsContainer.innerHTML += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="img-fluid" />
            <div class="cart-item-details">
              <h5>${item.title}</h5>
              <p>Size: ${item.selectedSize}</p>
              <p>Quantity: ${item.quantity}</p>
              <p>Price: $${item.price}</p>
              <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
            <button class="btn btn-delete" data-index="${index}">Delete</button>
          </div>
        `;
      });

      // Calculate subtotal, shipping, and total
      const shipping = 5.00; // Example shipping cost
      const total = subtotal + shipping;

      // Update values
      subtotalElement.textContent = subtotal.toFixed(2);
      shippingElement.textContent = shipping.toFixed(2);
      totalElement.textContent = total.toFixed(2);
    }
    updateCartCount();
  }

  function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
  }

  function updateCartItem(product, quantity, selectedSize) {
    const existingItemIndex = cart.findIndex(item => item.id === product.id && item.selectedSize === selectedSize);
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity: quantity,
        selectedSize: selectedSize,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  function deleteItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  function addToCart(product, quantity, selectedSize) {
    if (quantity > 0) {
      updateCartItem(product, parseInt(quantity), selectedSize);
      alert("Product added to cart!");
    } else {
      alert("Quantity must be greater than zero.");
    }
  }

  cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
      const index = event.target.getAttribute('data-index');
      deleteItem(index);
    }
  });

  // Initial render of cart items and total
  renderCart();
});
