import { PRODUCTS_FOR_GYM, PRODUCTS_FOR_CALISTENIA } from "./arrays/productos.js";

const listProductsForGym = PRODUCTS_FOR_GYM;
const listProductsForCalistenia = PRODUCTS_FOR_CALISTENIA;

let buttonsCategory = document.getElementsByClassName('categoryProductItem');

for (let button of buttonsCategory) {
    button.onclick = () => selectCategory(button.id);
}

function selectCategory(categoryId) {
    let products = [];
    switch (categoryId) {
        case 'categoryGymButton':
            products = flattenProducts(listProductsForGym);
            break;
        case 'categoryCalisteniaButton':
            products = flattenProducts(listProductsForCalistenia);
            break;
        default:
            products = [];
    }

    displayProducts(products);
}

function flattenProducts(nestedProducts) {
    let flattened = [];
    nestedProducts.forEach(category => {
        Object.values(category).forEach(product => {
            flattened.push(product);
        });
    });
    return flattened;
}

function displayProducts(products) {
    const containerProducts = document.getElementById('containerProducts');
    containerProducts.innerHTML = ''; // Limpiar productos anteriores (no eliminar esto)

    if (Array.isArray(products)) {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'productDiv';
            productElement.innerHTML = `
                <div>
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <p>Precio: $${product.price}</p>
                <button id="cartButton">Agregar al carrito</button>
            `;
            containerProducts.appendChild(productElement);
        });
    } else {
        console.error('Products is not an array:', products);
    }
}
