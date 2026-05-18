// ======================================
// HERO SLIDER
// ======================================
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 5000); // change slide every 5 seconds
}
if (slides.length > 0) showSlides();

// ======================================
// COUNTDOWN TIMER
// ======================================
const countdownElement = document.getElementById("countdown");

// Set countdown to 2 days from now
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 2);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    countdownElement.innerHTML = "EXPIRED";
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ======================================
// PRODUCT ADD-TO-CART FUNCTIONALITY
// ======================================
let cartCount = 0;
const cartCountElement = document.getElementById("cart-count");

document.querySelectorAll(".add-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
    btn.textContent = "Added ✅";
    btn.disabled = true;
  });
});

// ======================================
// SEARCH FUNCTIONALITY
// ======================================
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".product").forEach((product) => {
    const title = product.querySelector("h3").textContent.toLowerCase();
    if (title.includes(query)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

// ======================================
// FILTER BY CATEGORY
// ======================================
const categoryFilter = document.getElementById("categoryFilter");
categoryFilter.addEventListener("change", () => {
  const category = categoryFilter.value;
  document.querySelectorAll(".product").forEach((product) => {
    if (category === "all" || product.dataset.category === category) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

// ======================================
// SORT BY PRICE
// ======================================
const sortPrice = document.getElementById("sortPrice");
sortPrice.addEventListener("change", () => {
  const productsContainer = document.getElementById("products");
  const products = Array.from(productsContainer.querySelectorAll(".product"));

  products.sort((a, b) => {
    const priceA = parseInt(a.querySelector("p").textContent.replace(/₹|,/g, ""));
    const priceB = parseInt(b.querySelector("p").textContent.replace(/₹|,/g, ""));
    if (sortPrice.value === "low") return priceA - priceB;
    if (sortPrice.value === "high") return priceB - priceA;
    return 0;
  });

  products.forEach((product) => productsContainer.appendChild(product));
});

// ======================================
// SCROLL TO PRODUCTS FUNCTION
// ======================================
function scrollToProducts() {
  const productsSection = document.getElementById("products");
  productsSection.scrollIntoView({ behavior: "smooth" });
}