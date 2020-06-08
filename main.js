"use strict";


// Make navbar transparent when it is on the top + Top-arrow button
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height; 
const topElem = document.querySelector(".top-arrow");
const btt = document.querySelector("#back-to-top");
let scrollPos;

document.addEventListener('scroll', () => {
    console.log(`navbarHeight :${navbarHeight}`);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
        topElem.classList.add("visible");
    } else{
        navbar.classList.remove('navbar--dark');
        topElem.classList.remove("visible");

    }
});


  btt.addEventListener("click", function (e) {
    e.preventDefault();
    scrollTop();
  });

  function scrollTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -50);
      setTimeout(scrollTop, 0);
    }
  }


// End 

// Handle scrolling when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
    if (link == null) {
    return;
  }
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({behavior: 'smooth'});
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