/* korpa */ 

//  korpa
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Otvori korpu
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Zatvori korpu
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Rad korpe JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Funkcija izrade
function ready() {
  // Ukloni artikle iz korpe
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  
  // Promene količine
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  
  // Dodaj u korpu
  let addCartButtons = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCartButtons.length; i++) {
    let button = addCartButtons[i];
    button.addEventListener("click", addCartClicked);
  }
  
  // Poruči dugme radi
  document.querySelector(".btn-buy").addEventListener("click", buyButtonClicked);
}

// Poruči dugme
function buyButtonClicked() {
  alert("Vaša porudžbina je naručena!");
  let cartContent = document.querySelector(".cart-content");
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

// Ukloni artikle iz korpe
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

// Promene količine
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

// Dodaj u korpu
function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.querySelector(".naziv-proizvoda").innerText;
  let price = shopProducts.querySelector(".price").innerText;
  let productImg = shopProducts.querySelector(".proizvod-img").src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.querySelector(".cart-content");
  let cartItemsNames = cartItems.querySelectorAll(".cart-naziv-proizvoda");
  
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("Već ste dodali ovaj proizvod u korpu.");
      return;
    }
  }
  
  let cartBoxContent = "<img src='" + productImg + "' alt='' class='cart-img'>" +
    "<div class='detail-box'>" +
    "<div class='cart-naziv-proizvoda'>" + title + "</div>" +
    "<div class='cart-price'>" + price + "</div>" +
    "<input type='number' value='1' class='cart-quantity'>" +
    "</div>" +
    "<!-- Remove Cart -->" +
    "<i class='bx bxs-trash-alt cart-remove'></i>";

  
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.appendChild(cartShopBox);
  
  cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
  cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
}

// Update Total
function updatetotal() {
  let cartContent = document.querySelector(".cart-content");
  let cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;
  
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.querySelector(".cart-price");
    let quantityElement = cartBox.querySelector(".cart-quantity");
    let price = parseFloat(priceElement.innerText);
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  
  // Ako cena sadrži decimalne vrednosti
  total = Math.round(total * 100) / 100;
  document.querySelector(".total-price").innerText = total + " din";
}
