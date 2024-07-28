import { productos } from "./arrays/productos.js";

const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
const containerProducts = document.getElementById('containerProducts');

function createProductCard(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add('card');
        card.innerHTML = `  
            <img src="${producto.img}" alt="${producto.name}" />
            <h3>${producto.name}</h3>
            <p>Precio: $${producto.price}</p>
            <button class="productoAgregar" id="${producto.id}"> Agregar </button>
        `;
        containerProducts.appendChild(card);
    });
    addToCartButton();
}

function addToCartButton() {
    const addButton = document.querySelectorAll(".productoAgregar");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id;
            const selectedProduct = productos.find(producto => producto.id == productId);
            const existingProduct = cartProducts.find(p => p.id == productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                selectedProduct.quantity = 1;
                cartProducts.push(selectedProduct);
            }
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            showSuccessMessage("Producto agregado al carrito");
        };
    });
}

function showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = message;
    document.body.appendChild(successMessage);

    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 1000);
}

createProductCard(productos);












