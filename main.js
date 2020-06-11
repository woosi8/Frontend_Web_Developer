"use strict";

// Make navbar transparent when it is on the top + Show "arrow up" bittpm wjem scrp;;omg dpwm
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const topElem = document.querySelector(".top-arrow");
const btt = document.querySelector("#back-to-top");
let scrollPos;

document.addEventListener("scroll", () => {
    // console.log(`navbarHeight :${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add("navbar--dark");
        topElem.classList.add("visible");
    } else {
        navbar.classList.remove("navbar--dark");
        topElem.classList.remove("visible");
    }
});
// End// End// End// End// End// End// End// End

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
// End// End// End// End// End// End// End// End

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
    const target = event.target;
    const link = target.dataset.link; // 먼저 html에서 data-link로 연결해준다
    if (link == null) {
        return;
    }
    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView({ behavior: "smooth" });
    scrollIntoView(link);
});
// End// End// End// End// End// End// End// End

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
// End// End// End// End// End// End// End// End

// Handle click on :contact me: button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
    scrollIntoView("#contact");
});
// End// End// End// End// End// End// End// End

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});
// End// End// End// End// End// End// End// End

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const proejects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
    const filter =
        e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }
    projectContainer.classList.add("anim-out");
    setTimeout(() => {
        proejects.forEach((project) => {
            if (filter === "*" || filter === project.dataset.type) {
                project.classList.remove("invisible");
            } else {
                project.classList.add("invisible");
            }
        });
        projectContainer.classList.remove("anim-out");
    }, 300);
});
// End// End// End// End// End// End// End// End

// Common Functions
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}
// End// End// End// End// End// End// End// End
