const headerButton = document.querySelector(".header__button");
const cart = document.querySelector(".cart");
const btnCloseCart = document.querySelector(".btn__close__cart");
const products = document.querySelector(".products");
const productTemplate = document.querySelector(".product__template");

function renderProducts(arr) {
  arr.forEach((el) => {
    const clone = productTemplate.content.cloneNode(true);
    const cloneImg = clone.querySelector(".product__img");
    const cloneTitle = clone.querySelector(".product__title");
    const cloneDescription = clone.querySelector(".product__description");
    const clonePrice = clone.querySelector(".product__price");
    const cloneBtn = clone.querySelector(".product__btn");
  });
}

function openCart() {
  cart.classList.add("cart__open");
}

function closeCart() {
  cart.classList.remove("cart__open");
}

headerButton.addEventListener("click", () => {
  openCart();
});

btnCloseCart.addEventListener("click", () => {
  closeCart();
});
