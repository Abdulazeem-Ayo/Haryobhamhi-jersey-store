const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuButton.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

});


// ======================================
// CLOSE MOBILE MENU AFTER CLICKING LINK
// ======================================

const navigationLinks =
    document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// ======================================
// ACTIVE NAVIGATION LINK
// ======================================

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigationLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});

/* =================================
   HARYOBHAMHI STORE CART
================================= */

let cart = JSON.parse(localStorage.getItem("haryobhamhiCart")) || [];

/* =================================
   CART ELEMENTS
================================= */

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");


/* =================================
   PRODUCT DATA
================================= */

const products = [
  {
    id: 1,
    name: "Real Madrid Home Jersey",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    image: "images/real-madrid.png"
  },

  {
    id: 2,
    name: "Chelsea Home Jersey",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    image: "images/chelsea.png"
  },

  {
    id: 3,
    name: "Manchester United Jersey",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    image: "images/man-united.png"
  },

  {
    id: 4,
    name: "Arsenal Home Jersey",
    version: "Player Version • 2025/26",
    price: 27000,
    oldPrice: 30000,
    image: "images/arsenal.png"
  }
];


/* =================================
   ADD TO CART
================================= */

function addToCart(productId) {
  const product = products.find(item => item.id === productId);

  if (!product) return;

  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();

  showCartMessage(`${product.name} added to cart ✓`);
}


/* =================================
   UPDATE CART COUNT
================================= */

function updateCartCount() {

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (cartCount) {
    cartCount.textContent = totalItems;
  }

}

function saveCart() {
  localStorage.setItem("haryobhamhiCart", JSON.stringify(cart));
}


/* =================================
   CART MESSAGE
================================= */

function showCartMessage(message) {

  let notification =
    document.querySelector(".cart-notification");


  if (!notification) {

    notification = document.createElement("div");

    notification.className = "cart-notification";

    document.body.appendChild(notification);

  }


  notification.textContent = message;

  notification.classList.add("show");


  setTimeout(() => {

    notification.classList.remove("show");

  }, 2000);

}


/* =================================
   CONNECT PRODUCT BUTTONS
================================= */

const productButtons =
  document.querySelectorAll(".quick-add");


productButtons.forEach((button, index) => {

  button.addEventListener("click", () => {

    const productId = index + 1;

    addToCart(productId);

    const originalText = button.textContent;

    button.textContent = "Added ✓";

    setTimeout(() => {

      button.textContent = originalText;

    }, 1500);

  });

});

// ======================================
// HERO SHOP BUTTON
// ======================================

const heroButton =
    document.querySelector(".hero-button");

if (heroButton) {

    heroButton.addEventListener("click", function (event) {

        event.preventDefault();

        const shopSection =
            document.querySelector("#shop");

        if (shopSection) {

            shopSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}

/* =================================
   NEWSLETTER
================================= */

const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterForm) {

  newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!email) {
      newsletterMessage.textContent = "Please enter your email address.";
      return;
    }

    newsletterMessage.textContent =
      "You're in! We'll keep you updated on new drops and promos.";

    newsletterMessage.style.color = "#031c16";

    newsletterForm.reset();

  });

}

/* =================================
   FOOTER YEAR
================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =================================
   CART DRAWER
================================= */

const cartDrawer =
  document.getElementById("cartDrawer");

const cartOverlay =
  document.getElementById("cartOverlay");

const closeCart =
  document.getElementById("closeCart");

const cartItemsContainer =
  document.getElementById("cartItems");

const cartTotal =
  document.getElementById("cartTotal");

const startShopping =
  document.getElementById("startShopping");


/* Open Cart */

function openCart() {

  cartDrawer.classList.add("active");

  cartOverlay.classList.add("active");

  document.body.style.overflow = "hidden";

  renderCart();

}


/* Close Cart */

function closeCartDrawer() {

  cartDrawer.classList.remove("active");

  cartOverlay.classList.remove("active");

  document.body.style.overflow = "";

}


/* Cart Button */

if (cartButton) {

  cartButton.addEventListener("click", () => {

    openCart();

  });

}


/* Close Button */

if (closeCart) {

  closeCart.addEventListener("click", () => {

    closeCartDrawer();

  });

}


/* Overlay */

if (cartOverlay) {

  cartOverlay.addEventListener("click", () => {

    closeCartDrawer();

  });

}


/* Escape Key */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeCartDrawer();

  }

});


/* Start Shopping */

if (startShopping) {

  startShopping.addEventListener("click", () => {

    closeCartDrawer();

    document
      .getElementById("shop")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  });

}


/* =================================
   RENDER CART
================================= */

function renderCart() {

  if (!cartItemsContainer) return;


  if (cart.length === 0) {

    cartItemsContainer.innerHTML = `

      <div class="empty-cart">

        <div class="empty-cart-icon">
          🛒
        </div>

        <h3>Your cart is empty</h3>

        <p>
          Add your favourite jerseys and
          they'll appear here.
        </p>

        <button id="startShopping">
          Start Shopping
        </button>

      </div>

    `;


    const newStartShopping =
      document.getElementById("startShopping");


    newStartShopping.addEventListener("click", () => {

      closeCartDrawer();

      document
        .getElementById("shop")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    });


    updateCartTotal();

    return;

  }


  cartItemsContainer.innerHTML = cart.map(item => `

    <div class="cart-product">

      <div class="cart-product-image">

        <img
          src="${item.image}"
          alt="${item.name}"
        >

      </div>


      <div class="cart-product-info">

        <h3>
          ${item.name}
        </h3>

        <p>
          ${item.version}
        </p>

        <div class="cart-product-price">
          ₦${item.price.toLocaleString()}
        </div>


        <div class="quantity-controls">

          <button
            onclick="changeQuantity(${item.id}, -1)"
          >
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            onclick="changeQuantity(${item.id}, 1)"
          >
            +
          </button>

        </div>

      </div>


      <button
        class="remove-product"
        onclick="removeFromCart(${item.id})"
        aria-label="Remove product"
      >
        ×
      </button>

    </div>

  `).join("");


  updateCartTotal();

}


/* =================================
   CHANGE QUANTITY
================================= */

function changeQuantity(productId, change) {
  const product = cart.find(item => item.id === productId);

  if (!product) return;

  product.quantity += change;

  if (product.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }

  saveCart();
  updateCartCount();
  renderCart();
}


/* =================================
   REMOVE FROM CART
================================= */

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);

  saveCart();
  updateCartCount();
  renderCart();
}


/* =================================
   CART TOTAL
================================= */

function updateCartTotal() {

  if (!cartTotal) return;


  const total =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );


  cartTotal.textContent =
    `₦${total.toLocaleString()}`;

}

updateCartCount();