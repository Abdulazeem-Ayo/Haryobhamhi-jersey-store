/* ================================
   HARYOBHAMHI PRODUCT DETAILS
================================ */

const productDetails = [
  {
    id: 1,
    name: "Real Madrid Home Jersey",
    category: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    reviews: 12,
    badge: "-10%",
    image: "images/real-madrid.png",
    description:
      "Rep Real Madrid in style with this premium football jersey. Designed for comfort, quality and everyday football culture."
  },

  {
    id: 2,
    name: "Chelsea Home Jersey",
    category: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    reviews: 18,
    badge: "-10%",
    image: "images/chelsea.png",
    description:
      "Show your Chelsea pride with this premium jersey, made for fans who want comfort and style on and off the pitch."
  },

  {
    id: 3,
    name: "Manchester United Jersey",
    category: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    reviews: 15,
    badge: "-10%",
    image: "images/man-united.png",
    description:
      "Rep Manchester United with this quality football jersey. Perfect for matchday, everyday wear and football lovers."
  },

  {
    id: 4,
    name: "Arsenal Home Jersey",
    category: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    reviews: 9,
    badge: "NEW",
    image: "images/arsenal.png",
    description:
      "Represent Arsenal with this premium jersey built for comfort, style and true football fans."
  },

  {
    id: 5,
    name: "Barcelona Home Jersey",
    category: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    reviews: 11,
    badge: "NEW",
    image: "images/barcelona.png",
    description:
      "Rep Barcelona in style with this premium football jersey designed for fans and football lovers."
  },

  {
    id: 6,
    name: "PSG Home Jersey",
    category: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    reviews: 8,
    badge: "-10%",
    image: "images/psg.png",
    description:
      "Show your PSG colours with this stylish premium football jersey."
  }
];


/* ================================
   GET PRODUCT FROM URL
================================ */

const urlParams =
  new URLSearchParams(window.location.search);

const productId =
  Number(urlParams.get("id")) || 1;


const product =
  productDetails.find(item => item.id === productId);


if (!product) {
  window.location.href = "shop.html";
}


/* ================================
   PRODUCT ELEMENTS
================================ */

const productImage =
  document.getElementById("productImage");

const productName =
  document.getElementById("productName");

const productCategory =
  document.getElementById("productCategory");

const productPrice =
  document.getElementById("productPrice");

const productOldPrice =
  document.getElementById("productOldPrice");

const productReviews =
  document.getElementById("productReviews");

const productBadge =
  document.getElementById("productBadge");

const productDescription =
  document.getElementById("productDescription");

const breadcrumbProduct =
  document.getElementById("breadcrumbProduct");


/* ================================
   LOAD PRODUCT
================================ */

productImage.src = product.image;

productImage.alt = product.name;

productName.textContent = product.name;

productCategory.textContent =
  product.category;

productPrice.textContent =
  `₦${product.price.toLocaleString()}`;

productOldPrice.textContent =
  `₦${product.oldPrice.toLocaleString()}`;

productReviews.textContent =
  `(${product.reviews} Reviews)`;

productBadge.textContent =
  product.badge;

productDescription.textContent =
  product.description;

breadcrumbProduct.textContent =
  product.name;

document.title =
  `${product.name} | HARYOBHAMHI STORE`;


/* ================================
   SIZE
================================ */

let selectedSize = "M";

const sizeButtons =
  document.querySelectorAll(".size-button");

const sizeError =
  document.getElementById("sizeError");


sizeButtons.forEach(button => {

  button.addEventListener("click", () => {

    sizeButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    selectedSize = button.textContent.trim();

    sizeError.textContent = "";

  });

});


/* ================================
   QUANTITY
================================ */

let productQuantity = 1;

const quantityDisplay =
  document.getElementById("productQuantity");

const quantityMinus =
  document.getElementById("quantityMinus");

const quantityPlus =
  document.getElementById("quantityPlus");


quantityMinus.addEventListener("click", () => {

  if (productQuantity > 1) {

    productQuantity--;

    quantityDisplay.textContent =
      productQuantity;

  }

});


quantityPlus.addEventListener("click", () => {

  productQuantity++;

  quantityDisplay.textContent =
    productQuantity;

});


/* ================================
   ADD TO CART
================================ */

const productAddButton =
  document.getElementById("productAddButton");

const productSuccess =
  document.getElementById("productSuccess");


productAddButton.addEventListener("click", () => {

  if (!selectedSize) {

    sizeError.textContent =
      "Please select a size.";

    return;

  }


  const customName =
    document
      .getElementById("customName")
      .value
      .trim()
      .toUpperCase();


  const customNumber =
    document
      .getElementById("customNumber")
      .value
      .trim();


  /*
    Customization costs ₦2,000
    only when name or number is entered.
  */

  const isCustomized =
    customName || customNumber;

  const customizationPrice =
    isCustomized ? 2000 : 0;


  const finalPrice =
    product.price + customizationPrice;


  /*
    Give each variation a unique cart ID.
  */

  const cartId =
    `${product.id}-${selectedSize}-${customName}-${customNumber}`;


  const existingItem =
    cart.find(item => item.cartId === cartId);


  if (existingItem) {

    existingItem.quantity +=
      productQuantity;

  } else {

    cart.push({

      cartId,

      id: product.id,

      name: product.name,

      version: product.version,

      price: finalPrice,

      image: product.image,

      quantity: productQuantity,

      size: selectedSize,

      customName:
        customName || "None",

      customNumber:
        customNumber || "None",

      customized:
        Boolean(isCustomized)

    });

  }


  saveCart();

  updateCartCount();


  productSuccess.textContent =
    `${product.name} added to your cart ✓`;


  productAddButton.querySelector("span")
    .textContent = "Added to Cart ✓";


  setTimeout(() => {

    productAddButton.querySelector("span")
      .textContent = "Add to Cart";

  }, 1500);

});