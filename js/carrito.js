let userName = localStorage.getItem("userName");
let userDirection = localStorage.getItem('userDirection');
console.log(userName);

let cartStorage;
try {
    cartStorage = JSON.parse(localStorage.getItem("cartProducts")) || [];
} catch (error) {
    console.error('Error al leer los productos del carrito:', error);
    cartStorage = [];
}

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
            <p>Cantidad: 
                <button class="decrease" data-id="${producto.id}">-</button>
                ${producto.quantity}
                <button class="increase" data-id="${producto.id}">+</button>
            </p>
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
    try {
        localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
    } catch (error) {
        console.error('Error al guardar los productos en el carrito:', error);
    }
}

const actions = {
    increase(e) {
        try {
            const productId = e.target.dataset.id;
            const product = cartStorage.find(p => p.id == productId);
            if (product) {
                product.quantity += 1;
                updateCartStorage();
                displayCarrito(cartStorage);
            }
        } catch (error) {
            console.error('Error al aumentar la cantidad del producto:', error);
        }
    },
    decrease(e) {
        try {
            const productId = e.target.dataset.id;
            const product = cartStorage.find(p => p.id == productId);
            if (product) {
                product.quantity = Math.max(product.quantity - 1, 1);
                updateCartStorage();
                displayCarrito(cartStorage);
            }
        } catch (error) {
            console.error('Error al disminuir la cantidad del producto:', error);
        }
    },
    remove(e) {
        try {
            const productId = e.target.dataset.id;
            cartStorage = cartStorage.filter(p => p.id != productId);
            updateCartStorage();
            displayCarrito(cartStorage);
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    },
    "clear-cart"(e) {
        try {
            cartStorage = [];
            updateCartStorage();
            displayCarrito(cartStorage);
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
        }
    },
    "buy-cart"(e) {
        try {
            if (cartStorage.length > 0) {
                Swal.fire({
                    title: `${userName}, confirma la compra`,
                    showDenyButton: true,
                    confirmButtonText: "Confirmar",
                    denyButtonText: `Cancelar`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(`Compra exitosa, productos enviados a ${userDirection}`, "", "success");
                        cartStorage = [];
                        updateCartStorage();
                        displayCarrito(cartStorage);
                    } else if (result.isDenied) {
                        Swal.fire("Compra cancelada", "", "info");
                    }
                });
            } else {
                Swal.fire({
                    title: "VACIO",
                    text: `${userName}, no tenés productos en tu carrito`,
                    icon: "question"
                });
            }
        } catch (error) {
            console.error('Error al procesar la compra:', error);
        }
    }
};

cartContainer.addEventListener("click", (e) => {
    try {
        const action = e.target.classList[0] || e.target.id;
        if (actions[action]) {
            actions[action](e);
        }
    } catch (error) {
        console.error('Error al realizar una acción en el carrito:', error);
    }
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




