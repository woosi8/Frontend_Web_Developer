"use strict";


// Make navbar transparent when it is on the top
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
