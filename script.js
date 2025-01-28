// MOVIE LIST PAGE
function displayMovies() {
    const movies = [
        { id: 1, name: "Movie A", price: 10 },
        { id: 2, name: "Movie B", price: 15 },
        // Add more movies here
    ];
    const movieList = document.getElementById('movie-list');
    movies.forEach(movie => {
        const movieCard = `
            <div class="movie-card">
                <h3>${movie.name}</h3>
                <p>Price: $${movie.price}</p>
                <button onclick="addToCart(${movie.id}, '${movie.name}', ${movie.price})">Add to Cart</button>
            </div>
        `;
        movieList.innerHTML += movieCard; // Corrected dynamic content injection
    });
}

function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`); // Corrected alert syntax with backticks
}

// CART PAGE
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear the cart before displaying items
    cart.forEach((item, index) => {
        cartList.innerHTML += `
            <li>${item.name} - $${item.price}
                <button onclick="removeFromCart(${index})">Remove</button>
            </li>
        `;
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total').innerText = `Total: $${total}`; // Corrected template literal
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Re-render cart after removal
}

function checkout() {
    window.location.href = 'order-confirmation.html'; // Redirect to the confirmation page
}

// ORDER CONFIRMATION PAGE
function displayOrderDetails() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderDetails = document.getElementById('order-details');
    cart.forEach(item => {
        orderDetails.innerHTML += `<li>${item.name} - $${item.price}</li>`; // Corrected template literal
    });
}

function confirmOrder() {
    const orderId = Math.floor(Math.random() * 1000000);
    localStorage.setItem('orderId', orderId);
    window.location.href = 'payment.html'; // Redirect to payment page
}

// PAYMENT PAGE
function processPayment() {
    setTimeout(() => {
        window.location.href = 'order-success.html'; // Redirect to success page after payment
    }, 2000); // Simulate payment delay
}

// ORDER SUCCESS PAGE
function displayOrderSuccess() {
    const orderId = localStorage.getItem('orderId');
    document.getElementById('order-id').innerText = `Order ID: ${orderId}`; // Corrected template literal
    localStorage.clear(); // Clear cart after successful order
}
