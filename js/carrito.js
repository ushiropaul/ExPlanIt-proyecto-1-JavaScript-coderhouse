





let cartStorage = JSON.parse(localStorage.getItem("cartProducts")) || [];
let cartContainer = document.getElementById("cart-section");
let cardsContainer = document.createElement('div');
cardsContainer.classList.add('cardsContainer'); 

function displayCarrito(cartItems) {
    cartContainer.innerHTML = ""; 
    cardsContainer.innerHTML = ""; 
    let total = 0;

    cartItems.forEach(producto => {

        const card = document.createElement("div");
        card.classList.add("cart-item");

        card.innerHTML = `
            <h3>${producto.name}</h3>
            <p>Precio: $${producto.price}</p>
            <p>Cantidad: <button class="decrease" data-id="${producto.id}">-</button>
            ${producto.quantity}
            <button class="increase" data-id="${producto.id}">+</button></p>
            <p>Subtotal: $${producto.price * producto.quantity}</p>
            <button class="remove" data-id="${producto.id}">Eliminar</button>
        `;

        cardsContainer.appendChild(card);
        total += producto.price * producto.quantity;
    });

    cartContainer.appendChild(cardsContainer);





    const divContainerBuyClearCart = document.createElement("div");
    divContainerBuyClearCart.classList.add("button-container");




    const totalElement = document.createElement("div");
    totalElement.classList.add("total");
    totalElement.innerHTML = `<h2>Total: $${total}</h2>`;
    divContainerBuyClearCart.appendChild(totalElement);




    const clearCartButton = document.createElement("button");
    clearCartButton.id = "clear-cart";
    clearCartButton.textContent = "Vaciar Carrito";
    divContainerBuyClearCart.appendChild(clearCartButton);




    const buyCartButton = document.createElement("button");
    buyCartButton.id = "buy-cart";
    buyCartButton.textContent = "Comprar Carrito";
    divContainerBuyClearCart.appendChild(buyCartButton);


    cartContainer.appendChild(divContainerBuyClearCart);
}




function updateCartStorage() {
    localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
}




const actions = {
    increase(e) {
        const productId = e.target.dataset.id;
        const product = cartStorage.find(p => p.id == productId);
        product.quantity += 1;
        updateCartStorage();
        displayCarrito(cartStorage);
    },
    decrease(e) {
        const productId = e.target.dataset.id;
        const product = cartStorage.find(p => p.id == productId);
        product.quantity = Math.max(product.quantity - 1, 1);
        updateCartStorage();
        displayCarrito(cartStorage);
    },
    remove(e) {
        const productId = e.target.dataset.id;
        cartStorage = cartStorage.filter(p => p.id != productId);
        updateCartStorage();
        displayCarrito(cartStorage);
    },
    "clear-cart"(e) {
        cartStorage = [];
        updateCartStorage();
        displayCarrito(cartStorage);
    },
    "buy-cart"(e) {
        if (cartStorage.length > 0) {
            showSuccessMessage("Compra exitosa");
            cartStorage = [];
            updateCartStorage();
            displayCarrito(cartStorage);
        } else {
            showSuccessMessage("El carrito está vacío");
        }
    }
};




cartContainer.addEventListener("click", (e) => {
    const action = e.target.classList[0] || e.target.id;
    actions[action]?.(e);
});




function showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = message;
    document.body.appendChild(successMessage);

    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 900); 
}

displayCarrito(cartStorage);
