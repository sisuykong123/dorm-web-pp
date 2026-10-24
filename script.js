const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line") 
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

ScrollReveal().reveal(".header_img img", {
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

const swiper = new Swiper(".swiper", {
    loop: true,
});