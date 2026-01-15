const headerButton = document.querySelector(".header__button");
const cart = document.querySelector(".cart");
const btnCloseCart = document.querySelector(".btn__close__cart");
const products = document.querySelector(".products");
const productTemplate = document.querySelector(".product__template");
const cartTemplate = document.querySelector(".cart__template");
const cartProducts = document.querySelector(".cart__products");
const cartQuantity = document.querySelector(".cart__quantity");
const cartSum = document.querySelector(".cart__sum");
const cartAmount = document.querySelector(".span__order__amount");
const foolCart = document.querySelector(".full__cart");
const emptyCart = document.querySelector(".empty__cart");
const headerCount = document.querySelector(".header__count");
const headerCategories = document.querySelector(".header__categories");
let category = null;

let cartArray = [];

getProducts();

function getProducts() {
  let URL = "https://dummyjson.com/products";
  if (category) {
    URL += `/category/${category}`;
  }
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderProducts(data.products);
    });
}

fetch("https://dummyjson.com/products/category-list")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderCategories(data.slice(0, 9));
  });

function renderCategories(arr) {
  headerCategories.innerHTML = null;
  arr.forEach((el) => {
    const button = document.createElement("button");
    button.classList.add("header__category");
    button.textContent = el;
    button.addEventListener("click", () => {
      category = el;
      const activeButton = document.querySelector(".header__category__active");
      if (activeButton === button) {
        button.classList.remove("header__category__active");
        category = null;
      } else if (activeButton) {
        activeButton.classList.remove("header__category__active");
        button.classList.add("header__category__active");
      } else {
        button.classList.add("header__category__active");
      }
      getProducts();
    });

    headerCategories.append(button);
  });
}

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

    cloneBtn.addEventListener("click", () => {
      addProductToCart(el);
    });
    products.append(clone);
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

function deleteProductFromCart(el) {
  cartArray = cartArray.filter((product) => product.id !== el.id);
  renderCart();
  getEmptyCart();
}

function getOrderAmount() {
  let quantity = 0;
  let sum = 0;
  cartArray.forEach((product) => {
    sum = sum + product.price * product.count;
    quantity = quantity + product.count;
  });
  sum = sum.toFixed(2);
  cartQuantity.textContent = quantity;
  headerCount.textContent = quantity;
  cartSum.textContent = sum;
  cartAmount.textContent = sum;
}
function getEmptyCart() {
  const lengthCartArray = cartArray.length;
  if (lengthCartArray) {
    foolCart.classList.remove("hide");
    emptyCart.classList.add("hide");
  } else if (lengthCartArray === 0) {
    foolCart.classList.add("hide");
    emptyCart.classList.remove("hide");
  }
}

function renderCart() {
  getEmptyCart();

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
    const cloneDelete = clone.querySelector(".cart__delete");
    cloneImg.src = el.thumbnail;
    cloneTitle.innerText = el.title;
    cloneDescription.innerText = el.description;
    clonePrice.innerText = `$ ${el.price}`;
    cloneQuantity.innerText = el.count;
    cloneBtnMore.addEventListener("click", () => {
      addProductToCart(el);
    });
    cloneBtnLess.addEventListener("click", () => {
      if (el.count > 1) {
        el.count--;
        renderCart();
      } else {
        deleteProductFromCart(el);
      }
    });
    cloneDelete.addEventListener("click", () => {
      deleteProductFromCart(el);
    });

    cartProducts.append(clone);
  });
  getOrderAmount();

  // console.log(cartArray);
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
