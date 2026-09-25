/* =========================================
   HARYOBHAMHI STORE - SHOP PAGE
========================================= */


/* =========================================
   PRODUCTS
========================================= */

const shopProducts = [
  {
    id: 1,
    name: "Real Madrid Home Jersey",
    category: "club",
    categoryName: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    rating: 5,
    reviews: 12,
    badge: "-10%",
    image: "images/real-madrid.png"
  },

  {
    id: 2,
    name: "Chelsea Home Jersey",
    category: "club",
    categoryName: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    rating: 5,
    reviews: 18,
    badge: "-10%",
    image: "images/chelsea.png"
  },

  {
    id: 3,
    name: "Manchester United Jersey",
    category: "club",
    categoryName: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    rating: 5,
    reviews: 15,
    badge: "-10%",
    image: "images/man-united.png"
  },

  {
    id: 4,
    name: "Arsenal Home Jersey",
    category: "club",
    categoryName: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    rating: 5,
    reviews: 9,
    badge: "NEW",
    image: "images/arsenal.png"
  },

  {
    id: 5,
    name: "Barcelona Home Jersey",
    category: "club",
    categoryName: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    rating: 5,
    reviews: 11,
    badge: "NEW",
    image: "images/barcelona.png"
  },

  {
    id: 6,
    name: "PSG Home Jersey",
    category: "club",
    categoryName: "CLUB JERSEY",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    rating: 5,
    reviews: 8,
    badge: "-10%",
    image: "images/psg.png"
  }
];


/* =========================================
   ELEMENTS
========================================= */

const shopGrid =
  document.getElementById("shopProductGrid");

const shopSearch =
  document.getElementById("shopSearch");

const filterButtons =
  document.querySelectorAll(".filter-button");

const noResults =
  document.getElementById("noResults");


/* =========================================
   CURRENT FILTER
========================================= */

let selectedCategory = "all";


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayShopProducts(productsToDisplay) {

  if (!shopGrid) return;


  /* NO PRODUCTS */

  if (productsToDisplay.length === 0) {

    shopGrid.innerHTML = "";

    if (noResults) {
      noResults.style.display = "block";
    }

    return;
  }


  /* HIDE NO RESULTS */

  if (noResults) {
    noResults.style.display = "none";
  }


  /* CREATE PRODUCT CARDS */

  shopGrid.innerHTML = productsToDisplay.map(product => {

    return `
      <article class="shop-product-card">

        <!-- PRODUCT IMAGE -->

        <div class="shop-product-image">

          <span class="shop-badge">
            ${product.badge}
          </span>


          <!-- WISHLIST -->

          <button
            class="shop-wishlist"
            aria-label="Add to wishlist"
          >
            ♡
          </button>


          <!-- PRODUCT DETAILS LINK -->

          <a
            href="product.html?id=${product.id}"
            class="product-view-link"
          >

            <img
              src="${product.image}"
              alt="${product.name}"
            >

          </a>


          <!-- ADD TO CART -->

          <button
            class="shop-add-cart"
            data-product-id="${product.id}"
          >
            Add to Cart
          </button>

        </div>


        <!-- PRODUCT INFORMATION -->

        <div class="shop-product-info">

          <div class="shop-product-category">
            ${product.categoryName}
          </div>


          <h3>
            ${product.name}
          </h3>


          <p class="shop-product-version">
            ${product.version}
          </p>


          <div class="shop-rating">

            ★★★★★

            <small>
              (${product.reviews})
            </small>

          </div>


          <div class="shop-price">

            <span class="shop-current-price">
              ₦${product.price.toLocaleString()}
            </span>

            <span class="shop-old-price">
              ₦${product.oldPrice.toLocaleString()}
            </span>

          </div>

        </div>

      </article>
    `;

  }).join("");


  /* =========================================
     CONNECT ADD TO CART BUTTONS
  ========================================= */

  const addButtons =
    document.querySelectorAll(".shop-add-cart");


  addButtons.forEach(button => {

    button.addEventListener("click", () => {

      const productId =
        Number(button.dataset.productId);


      addShopProductToCart(productId);


      /* BUTTON FEEDBACK */

      const originalText =
        button.textContent;


      button.textContent =
        "Added ✓";


      setTimeout(() => {

        button.textContent =
          originalText;

      }, 1500);

    });

  });


  /* =========================================
     WISHLIST BUTTONS
  ========================================= */

  const wishlistButtons =
    document.querySelectorAll(".shop-wishlist");


  wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

      if (button.textContent.trim() === "♡") {

        button.textContent = "♥";

        button.style.color = "#e63946";

      } else {

        button.textContent = "♡";

        button.style.color = "";

      }

    });

  });

}


/* =========================================
   ADD PRODUCT TO CART
========================================= */

function addShopProductToCart(productId) {

  const product =
    shopProducts.find(
      item => item.id === productId
    );


  if (!product) return;


  /*
    Products added directly from the shop
    use a unique cart ID.
  */

  const cartId =
    `${product.id}-default`;


  const existingProduct =
    cart.find(
      item => item.cartId === cartId
    );


  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({

      cartId: cartId,

      id: product.id,

      name: product.name,

      version: product.version,

      price: product.price,

      image: product.image,

      quantity: 1,

      size: "M",

      customName: "None",

      customNumber: "None",

      customized: false

    });

  }


  /* SAVE */

  saveCart();


  /* UPDATE CART NUMBER */

  updateCartCount();


  /* NOTIFICATION */

  showCartMessage(
    `${product.name} added to cart ✓`
  );

}


/* =========================================
   CATEGORY FILTER
========================================= */

filterButtons.forEach(button => {

  button.addEventListener("click", () => {


    /* REMOVE ACTIVE FROM ALL */

    filterButtons.forEach(item => {

      item.classList.remove("active");

    });


    /* ADD ACTIVE TO CLICKED BUTTON */

    button.classList.add("active");


    /* GET CATEGORY */

    selectedCategory =
      button.dataset.category;


    /* FILTER */

    filterShopProducts();

  });

});


/* =========================================
   SEARCH + FILTER
========================================= */

function filterShopProducts() {

  const searchTerm =
    shopSearch
      ? shopSearch.value.toLowerCase().trim()
      : "";


  const filteredProducts =
    shopProducts.filter(product => {


      /* CATEGORY */

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;


      /* SEARCH */

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchTerm);


      return (
        matchesCategory &&
        matchesSearch
      );

    });


  displayShopProducts(filteredProducts);

}


/* =========================================
   SEARCH INPUT
========================================= */

if (shopSearch) {

  shopSearch.addEventListener(
    "input",
    filterShopProducts
  );

}


/* =========================================
   INITIAL DISPLAY
========================================= */

displayShopProducts(shopProducts);


/* =========================================
   UPDATE CART COUNT
========================================= */

if (typeof updateCartCount === "function") {

  updateCartCount();

}