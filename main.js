"use strict";

// Make navbar transparent when it is on the top + Show "arrow up" bittpm wjem scrp;;omg dpwm
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const topElem = document.querySelector(".top-arrow");
const btt = document.querySelector("#back-to-top");
let scrollPos;

document.addEventListener("scroll", () => {
    console.log(`navbarHeight :${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add("navbar--dark");
        topElem.classList.add("visible");
    } else {
        navbar.classList.remove("navbar--dark");
        topElem.classList.remove("visible");
    }
});

// Handle click on the "arrow up" button
btt.addEventListener("click", (e) => {
    e.preventDefault();
    scrollIntoView("#home");
    // scrollTop();
});

// function scrollTop() {
//     if (window.pageYOffset > 0) {
//         window.scrollBy(0, -50);
//         setTimeout(scrollTop, 0);
//     }
// }
// End

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView({ behavior: "smooth" });
    scrollIntoView(link);
});
// End

// Home-Img Mouseover
function zoomIn(event) {
    event.target.style.transform = "scale(1.2)";
    event.target.style.zIndex = 1;
    event.target.style.transition = "all 0.5s";
}
function zoomOut(event) {
    event.target.style.transform = "scale(1)";
    event.target.style.zIndex = 0;
    event.target.style.transition = "all 0.5s";
}
// End

// Handle click on :contact me: button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
    scrollIntoView("#contact");
});
// End

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});
// End

// Common Functions
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}
// End
