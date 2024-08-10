// product.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            const productRow = document.getElementById('product-row');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product', 'text-center', 'col-lg-3', 'col-md-3', 'col-12');
                
                productDiv.innerHTML = `
                    <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}" onclick="viewProductDetails(${product.id})">
                    <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h5 class="p-name">${product.title}</h5>
                    <h4 class="p-price">$${product.price}</h4>
                    <button class="buy-btn" onclick="viewProductDetails(${product.id})">Buy Now</button>
                `;

                productRow.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

function viewProductDetails(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            // Store the product details in localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            // Redirect to product details page
            window.location.href = './product_details.html';
        })
        .catch(error => console.error('Error fetching product details:', error));
}
