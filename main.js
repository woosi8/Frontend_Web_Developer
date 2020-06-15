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
    navbarMenu.classList.remove("open"); // 네브바 클릭시 항상 창이 닫힐수있도록
    scrollIntoView(link);
});
// End// End// End// End// End// End// End// End

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("open");
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
const workBtnContainer = document.querySelector(".work__categories"); //project 버튼 전체
const projectContainer = document.querySelector(".work__projects"); //컨텐츠 전체
const proejects = document.querySelectorAll(".project"); //컨텐츠 각각
workBtnContainer.addEventListener("click", (e) => {
    const filter =
        // button에는 data-filter값이 있지만 그 안에 span태그에는 없어서
        // p태그는 btn클릭 범주안에 들어가있어서 된다.
        // 클릭한곳이 즉, e값이 span이라면 span의 부모 즉 button에 data-filter값을 가져온다
        e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        // 혹시 몰라서 filter가 null 이면 아무것도 하지않기
        return;
    }

    // Remove selection from the previous item and select the new one
    const selectElem = document.querySelector(".category__btn.selected");
    if (selectElem != null) {
        selectElem.classList.remove("selected");
    }
    e.target.classList.add("selected");

    // 필터링해서 걸려진것들에 anim-out을 준다 (먼저 anim이 된다음에 아래 0.3초후에 효과가 사라진다)
    projectContainer.classList.add("anim-out");
    setTimeout(() => {
        // foreach 는 quersysleectorAll에 있는 값들을 배열형태로 가져온다
        proejects.forEach((project) => {
            // 만약 위에서 선택한 filter가 * 이거나 선택한 data-type과 똑같으면 (즉 같은 필터값을 나오게)
            if (filter === "*" || filter === project.dataset.type) {
                project.classList.remove("invisible"); //타입이 동일한 클래스에 invisible 제거해서 보이게하기
            } else {
                project.classList.add("invisible");
            }
        });
        // 클릭시 0.3초후에 anim-out 이 사라지고 본 내용이 돌아오게한다. 그래서 효과가 보이게 한다
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


