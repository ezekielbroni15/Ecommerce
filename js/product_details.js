document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (product) {
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-price").textContent = `$${product.price}`;
    document.getElementById("product-category").textContent = product.category;
    document.getElementById("product-description").textContent = product.description;

    document.querySelector(".btn-buy").addEventListener("click", () => {
      const quantityInput = document.querySelector(".input-number");
      const selectedSize = document.querySelector(".input-size").value;
      const quantity = parseInt(quantityInput.value);

      if (selectedSize === "Select Size") {
        alert("Please select a size.");
        return;
      }

      if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        quantityInput.value = 1;  // Reset the quantity to 1
        return;
      }

      addToCart(product, quantity, selectedSize);
    });
  } else {
    console.error("No product details found in localStorage.");
  }

  function addToCart(product, quantity, selectedSize) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      ...product,
      quantity: quantity,
      selectedSize: selectedSize,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product added to cart!");
  }

  function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCountElement.textContent = cart.length;
  }

  function getProductsByCategory(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}?limit=4`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          data.forEach(addProduct);
        }
      })
      .catch((error) =>
        console.error(
          `Error fetching products for category ${category}:`,
          error
        )
      );
  }

  function addProduct(product) {
    let categoriesRow = document.getElementById("categories-row");
    let html = categoriesRow.innerHTML;

    html += `
      <div class="product text-center col-lg-3 col-md-3 col-12">
        <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}" data-product-id="${product.id}">
        <div class="star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <h5 class="p-name">${product.title}</h5>
        <h4 class="p-price">$${product.price}</h4>
        <button class="buy-btn" data-product-id="${product.id}">Buy Now</button>
      </div>
    `;

    categoriesRow.innerHTML = html;
  }

  function handleRelatedProductClick(event) {
    const target = event.target;
    if (target.classList.contains('buy-btn') || target.tagName === 'IMG') {
      const productId = target.getAttribute('data-product-id');
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((selectedProduct) => {
          localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
          window.location.href = './product_details.html'; 
        })
        .catch(error => console.error('Error fetching product details:', error));
    }
  }

  getProductsByCategory(product.category);
  document.addEventListener('click', handleRelatedProductClick);
  updateCartCount();
});
