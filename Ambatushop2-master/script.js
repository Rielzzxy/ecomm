// Data Produk
const products = [
    { id: 1, name: "Iphone 14", price: 12000000, image: "assets/images/IPhone14.png" },
    { id: 2, name: "Iphone 15", price: 14199000, image: "assets/images/Iphone15.png" },
    { id: 3, name: "VivoX80", price: 8999000, image: "assets/images/VivoX80.png" },
    { id: 4, name: "Samsung Galaxy S24", price: 11999000, image: "assets/images/SamsungS24.png" },
    { id: 5, name: "Xiaomi 14T", price: 6799000, image: "assets/images/Xiaomi14T.png" },
    { id: 6, name: "Samsung A55", price: 6199000, image: "assets/images/SamsungA55.png" },
    { id: 7, name: "Samsung S24FE", price: 10000000, image: "assets/images/S24FE.png" },
    { id: 8, name: "Vivo T1 5G", price: 2999999, image: "assets/images/VivoT15G.png" }
];

// Fungsi untuk menyimpan keranjang ke localStorage
function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Fungsi untuk mengambil keranjang dari localStorage
function getCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Menambahkan produk ke keranjang
function addToCart(name, price) {
    let cart = getCartFromLocalStorage();
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCartToLocalStorage(cart);
    alert(`${name} telah ditambahkan ke keranjang!`);
}

// Mengupdate tampilan keranjang
function updateCart() {
    const cart = getCartFromLocalStorage();
    const cartItems = document.querySelector('.cart-items');
    const totalPrice = document.getElementById('total-price');
    if (cartItems && totalPrice) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
                <button onclick="removeFromCart('${item.name}')">-</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        totalPrice.textContent = total.toLocaleString();
    }
}

// Menghapus produk dari keranjang
function removeFromCart(name) {
    let cart = getCartFromLocalStorage();
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    saveCartToLocalStorage(cart);
    updateCart();
}

// Menampilkan semua produk
function displayProducts() {
    const productsContainer = document.querySelector('.products-container');
    if (productsContainer) {
        productsContainer.innerHTML = ''; // Bersihkan kontainer sebelum menambahkan produk
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Rp ${product.price.toLocaleString()}</p>
                <button onclick="addToCart('${product.name}', ${product.price})">Tambah ke Keranjang</button>
            `;
            productsContainer.appendChild(productCard);
        });
    }
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});