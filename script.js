const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const navSearch = document.getElementById("nav-search");

navSearch.addEventListener("click", (e) => {
  navSearch.classList.toggle("open");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header_image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header_content div", {
  duration: 1000,
  delay: 500,
});
ScrollReveal().reveal(".header_content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header_content p", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".deals_card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".about_image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".about_card", {
  duration: 1000,
  interval: 500,
  delay: 500,
});

// ដាក់លីង ABA USD សម្រាប់ផលិតផលនីមួយៗ (ម្នាក់មួយលីង តាមតម្លៃរបស់វា)
const payLinks = {
  "Living Room Decorate": "https://pay.ababank.com/oRF8/ts0zcu0z",
  "Waredrop": "https://pay.ababank.com/oRF8/dohs2gr1",
  "Rent a night": "https://pay.ababank.com/oRF8/l9vpwwvk",
  "Rent Private House": "https://pay.ababank.com/oRF8/phfjr3jw",
  "Stylish Chair": "https://pay.ababank.com/oRF8/sev27792",   // $45
  "Vintage Chair": "https://pay.ababank.com/oRF8/b63rhrec",
};

function paymentUrl(title) {
  const url = payLinks[title.trim()];
  return url && url.startsWith("https://") ? url : null;
}

function usdLabel(priceText) {
  const match = priceText.replace(/,/g, "").match(/\$?([\d.]+)\s*([KkMm])?/);
  if (!match) return priceText;

  const multiplier =
    { K: 1000, M: 1000000 }[(match[2] || "").toUpperCase()] || 1;
  const amount = Number(match[1]) * multiplier;
  if (!Number.isFinite(amount)) return priceText;

  const fractionDigits = match[2]
    ? Number.isInteger(amount) ? 0 : 2
    : (match[1].split(".")[1] || "").length;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: Math.max(fractionDigits, 2),
  }).format(amount);
  return "$" + formattedAmount + " USD";
}

const cartItems = document.getElementById("cart_items");
let pendingPayment = null;

cartItems.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const link = target.closest(".pay_link");
  if (!link) return;

  const item = link.closest(".cart_item");
  const title = item?.querySelector(".cart_title")?.textContent;
  if (title) pendingPayment = title;
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible" || !pendingPayment) return;

  const product = pendingPayment;
  pendingPayment = null;

//   setTimeout(() => {
//     if (confirm(`តើអ្នកបានបង់ប្រាក់សម្រាប់ "${product}" រួចរាល់ហើយឬនៅ?`)) {
//       alert(
//         `សូមអរគុណសម្រាប់ការបង់ប្រាក់! សូមរង់ចាំប៉ុន្មានថ្ងៃ ដើម្បីទទួលបាន "${product}"។`
//       );
//     }
//   }, 300);
});

document.querySelectorAll(".buy_btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product_card");
    const img = card.querySelector("img");
    const price = card.querySelector("p").textContent;
    const displayPrice = usdLabel(price);
    const title = card.querySelector("h4").textContent;
    if (card.querySelector(".cart_badge")) return;

    const url = paymentUrl(title);
    if (!url) {
      alert("មិនទាន់មានលីងបង់ប្រាក់ USD សម្រាប់ផលិតផលនេះ");
      return;
    }

    const badge = document.createElement("span");
    badge.className = "cart_badge";
    badge.textContent = "Added · " + displayPrice;
    img.parentElement.style.position = "relative";
    img.parentElement.appendChild(badge);
    btn.textContent = "Added";
    btn.disabled = true;

    const item = document.createElement("div");
    item.className = "cart_item";

    const titleElement = document.createElement("span");
    titleElement.className = "cart_title";
    titleElement.textContent = title;

    const priceElement = document.createElement("span");
    priceElement.className = "cart_price";
    priceElement.textContent = displayPrice;

    const paymentLink = document.createElement("a");
    paymentLink.className = "pay_link";
    paymentLink.href = url;
    paymentLink.target = "_blank";
    paymentLink.rel = "noopener";
    paymentLink.textContent = "Pay now " + displayPrice;

    item.append(titleElement, priceElement, paymentLink);
    cartItems.appendChild(item);
    document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
  });
});