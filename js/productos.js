fetch('./../json/productos.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        createProductCard(data);
    })
    .catch(error => console.error('Error al cargar los productos:', error));

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
    addToCartButton(productsArray);  
}

function addToCartButton(productsArray) {
    const addButton = document.querySelectorAll(".productoAgregar");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id;
            const selectedProduct = productsArray.find(producto => producto.id == productId);
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







