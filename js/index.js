document.addEventListener("DOMContentLoaded", () => {
    let products = [];

    function getCategories() {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => addCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }

    function addCategories(categories) {
        let productRow = document.getElementById('product-row');
        let html = "";

        const images = [
            "./images/electronics.jpg",
            "./images/ring.jpg",
            "./images/men.jpg",
            "./images/product-06.jpg"
        ];

        
        categories.forEach((category, index) => {
            let imagePath = images[index % images.length];
            html += `
                <div class="rw1 col-lg-3 col-md-12 col-12 p-0">
                    <img src="${imagePath}" class="img-fluid" alt="${category}">
                    <div class="name">
                        <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                        <button class="text-uppercase"><a href="./pages/products.html" class="text-white">SHOP NOW</a></button>
                    </div>
                </div>
            `;
        });

        productRow.innerHTML = html;
    }

    function getProductsByCategory(category) {
        fetch(`https://fakestoreapi.com/products/category/${category}?limit=1`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    products.push(data[0]); // Save the product in the array
                    addProduct(data[0]);
                }
            })
            .catch(error => console.error(`Error fetching products for category ${category}:`, error));
    }

    function addProduct(product) {
        let categoriesRow = document.getElementById('categories-row');
        let html = categoriesRow.innerHTML;

        html += `
            <div class="product text-center col-lg-3 col-md-3 col-12">
                <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}" data-product-id='${product.id}'>
                <div class="star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <h5 class="p-name">${product.title}</h5>
                <h4 class="p-price">$${product.price}</h4>
                <button class="buy-btn" data-product-id='${product.id}'>Buy Now</button>
            </div>
        `;

        categoriesRow.innerHTML = html;
    }

    function getProducts() {
        const categories = ['women\'s clothing', 'men\'s clothing', 'jewelery', 'electronics'];
        categories.forEach(category => getProductsByCategory(category));
    }

    function clothesProducts() {
        const categories = ['women\'s clothing'];
        const limit = 4;

        categories.forEach(category => {
            fetch(`https://fakestoreapi.com/products/category/${category}?limit=${limit}`)
                .then(res => res.json())
                .then(data => {
                    products.push(...data); // Save the products in the array
                    addClothesProducts(data);
                })
                .catch(error => console.error(`Error fetching clothes for category ${category}:`, error));
        });
    }

    function addClothesProducts(products) {
        let clothesRow = document.getElementById('clothes-row');
        let html = clothesRow.innerHTML;

        products.forEach(product => {
            html += `
                <div class="product text-center col-lg-3 col-md-3 col-12">
                    <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}" data-product-id='${product.id}'>
                    <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h5 class="p-name">${product.title}</h5>
                    <h4 class="p-price">$${product.price}</h4>
                    <button class="buy-btn" data-product-id='${product.id}'>Buy Now</button>
                </div>
            `;
        });

        clothesRow.innerHTML = html;
    }

    function getMenClothes() {
        const category = 'men\'s clothing';
        const limit = 4;

        fetch(`https://fakestoreapi.com/products/category/${category}?limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                products.push(...data); // Save the products in the array
                addMenClothes(data);
            })
            .catch(error => console.error(`Error fetching men's clothes:`, error));
    }

    function addMenClothes(products) {
        let menClothesRow = document.getElementById('men-clothes-row');
        let html = menClothesRow.innerHTML;

        products.forEach(product => {
            html += `
                <div class="product text-center col-lg-3 col-md-3 col-12">
                    <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}" data-product-id='${product.id}'>
                    <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h5 class="p-name">${product.title}</h5>
                    <h4 class="p-price">$${product.price}</h4>
                    <button class="buy-btn" data-product-id='${product.id}'>Buy Now</button>
                </div>
            `;
        });

        menClothesRow.innerHTML = html;
    }

    function jewelryProducts() {
        const category = 'jewelery';
        const limit = 4;

        fetch(`https://fakestoreapi.com/products/category/${category}?limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                products.push(...data); // Save the products in the array
                addJewelryProducts(data);
            })
            .catch(error => console.error(`Error fetching jewelry products:`, error));
    }

    function addJewelryProducts(products) {
        let jewelryRow = document.getElementById('jewelery-row');
        let html = jewelryRow.innerHTML;

        products.forEach(product => {
            html += `
                <div class="product text-center col-lg-3 col-md-3 col-12">
                    <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}" data-product-id='${product.id}'>
                    <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h5 class="p-name">${product.title}</h5>
                    <h4 class="p-price">$${product.price}</h4>
                    <button class="buy-btn" data-product-id='${product.id}'>Buy Now</button>
                </div>
            `;
        });

        jewelryRow.innerHTML = html;
    }

    function electronicProducts() {
        const category = 'electronics';
        const limit = 4;

        fetch(`https://fakestoreapi.com/products/category/${category}?limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                products.push(...data); // Save the products in the array
                addElectronicProducts(data);
            })
            .catch(error => console.error(`Error fetching electronic products:`, error));
    }

    function addElectronicProducts(products) {
        let electronicsRow = document.getElementById('electronics-row');
        let html = electronicsRow.innerHTML;

        products.forEach(product => {
            html += `
                <div class="product text-center col-lg-3 col-md-3 col-12">
                    <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}" data-product-id='${product.id}'>
                    <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h5 class="p-name">${product.title}</h5>
                    <h4 class="p-price">$${product.price}</h4>
                    <button class="buy-btn" data-product-id='${product.id}'>Buy Now</button>
                </div>
            `;
        });

        electronicsRow.innerHTML = html;
    }

    function handleProductClick(event) {
        const target = event.target;
        if (target.classList.contains('buy-btn') || target.tagName === 'IMG') {
            const productId = target.getAttribute('data-product-id');
            const selectedProduct = products.find(product => product.id == productId);
            if (selectedProduct) {
                localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
                // Navigate to the correct path
                window.location.href = './pages/product_details.html';
            }
        }
    }

    // Call functions to load products
    getCategories();
    getProducts();
    clothesProducts();
    getMenClothes(); 
    jewelryProducts();
    electronicProducts();

    // Add event listener to handle product clicks
    document.addEventListener('click', handleProductClick);
});
