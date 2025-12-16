const headerButton = document.querySelector(".header__button");
const cart = document.querySelector(".cart");
const btnCloseCart = document.querySelector(".btn__close__cart");
const products = document.querySelector(".products");
const productTemplate = document.querySelector(".product__template");
const cartTemplate = document.querySelector(".cart__template");
const cartProducts = document.querySelector(".cart__products");
let cartArray = [];

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderProducts(data.products);
  });

function renderProducts(arr) {
  products.innerHTML = null;
  arr.forEach((el) => {
    const clone = productTemplate.content.cloneNode(true);
    const cloneImg = clone.querySelector(".product__img");
    const cloneTitle = clone.querySelector(".product__title");
    const cloneDescription = clone.querySelector(".product__description");
    const clonePrice = clone.querySelector(".product__price");
    const cloneBtn = clone.querySelector(".product__btn");
    cloneImg.src = el.thumbnail;
    cloneTitle.innerText = el.title;
    cloneDescription.innerText = el.description;
    clonePrice.innerText = `$ ${el.price}`;
    products.append(clone);
    cloneBtn.addEventListener("click", () => {
      addProductToCart(el);
    });
  });
}

function addProductToCart(el) {
  const currentProduct = cartArray.find((product) => product.id === el.id);
  if (currentProduct) {
    currentProduct.count++;
  } else {
    cartArray.push({ ...el, count: 1 });
  }

  renderCart();
}

function renderCart() {
  cartProducts.innerHTML = null;
  cartArray.forEach((el) => {
    const clone = cartTemplate.content.cloneNode(true);
    const cloneImg = clone.querySelector(".photo__cart");
    const cloneTitle = clone.querySelector(".title__cart");
    const cloneDescription = clone.querySelector(".description__cart");
    const clonePrice = clone.querySelector(".price");
    const cloneBtnLess = clone.querySelector(".less");
    const cloneQuantity = clone.querySelector(".quantity");
    const cloneBtnMore = clone.querySelector(".more");
    cloneImg.src = el.thumbnail;
    cloneTitle.innerText = el.title;
    cloneDescription.innerText = el.description;
    clonePrice.innerText = `$ ${el.price}`;
    cloneQuantity.innerText = el.count;
    cloneBtnMore.addEventListener("click", () => {
      addProductToCart(el);
    });
    cartProducts.append(clone);
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
