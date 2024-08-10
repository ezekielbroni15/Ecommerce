document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    const successMessage = document.getElementById('success-message');
    const orderSummaryItems = document.getElementById('order-summary-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const sameAddressCheckbox = document.getElementById('same-address');
    const shippingInfo = document.getElementById('shipping-info');

    function renderOrderSummary() {
      if (cart.length === 0) {
        orderSummaryItems.innerHTML = '<p>Your cart is empty.</p>';
      } else {
        orderSummaryItems.innerHTML = '';
        cart.forEach((item) => {
          orderSummaryItems.innerHTML += `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.title}" class="order-summary-img" />
              <div class="cart-item-details">
                <h5>${item.title}</h5>
                <p>Size: ${item.selectedSize}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          `;
        });
      }
    }

    function clearCart() {
      localStorage.removeItem('cart');
      renderOrderSummary(); // Clear the order summary on the page
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      
      // Billing Information
      const billingFullName = document.getElementById('billing-full-name').value;
      const billingEmail = document.getElementById('billing-email').value;
      const billingAddress = document.getElementById('billing-address').value;
      const billingPhone = document.getElementById('billing-phone').value;

      // Shipping Information
      const shippingFullName = document.getElementById('shipping-full-name').value;
      const shippingAddress = document.getElementById('shipping-address').value;

      // Payment Method
      const paymentMethod = document.getElementById('payment-method').value;

      // Validate Billing Information
      if (!billingFullName || !billingEmail || !billingAddress || !billingPhone || !paymentMethod) {
        alert('Please fill out all required fields.');
        return;
      }

      // If shipping address is different, validate Shipping Information
      if (!sameAddressCheckbox.checked) {
        if (!shippingFullName || !shippingAddress) {
          alert('Please fill out all required shipping fields.');
          return;
        }
      }

      // Clear cart and show success message
      clearCart();
      successMessage.style.display = 'block';

      // Clear form fields
      form.reset();
      document.getElementById('shipping-info').style.display = 'none'; // Hide shipping info section if same address

      // Hide success message after a few seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    }

    sameAddressCheckbox.addEventListener('change', () => {
      if (sameAddressCheckbox.checked) {
        shippingInfo.style.display = 'none';
      } else {
        shippingInfo.style.display = 'block';
      }
    });

    form.addEventListener('submit', handleFormSubmit);

    // Initial render of order summary
    renderOrderSummary();
  });
