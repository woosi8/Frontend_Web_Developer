"use strict";

///////////////////////////////// Make navbar transparent when it is on the top + Show "arrow up" bittpm wjem scrp;;omg dpwm
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

///////////////////////////////// Common Functions
function scroll(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({ behavior: "smooth" });
}
// End// End// End// End// End// End// End// End

///////////////////////////////// Handle click on the "arrow up" button
btt.addEventListener("click", (e) => {
	e.preventDefault();
	scroll("#home");
	// scrollTop();
});
// End// End// End// End// End// End// End// End

///////////////////////////////// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
	const target = event.target;
	const link = target.dataset.link; // 먼저 html에서 data-link로 연결해준다
	if (link == null) {
		// link가 null이면 아무것도 하지않고 리턴해서 더이상 밑에 있는 코드가 실행되지 않도록 한다
		return;
	}
	// const scrollTo = document.querySelector(link);
	// scrollTo.scrollIntoView({ behavior: "smooth" });
	navbarMenu.classList.remove("open"); // 네브바 클릭시 항상 창이 닫힐수있도록(반응형에서)
	scroll(link);
});
// End// End// End// End// End// End// End// End

///////////////////////////////// Navbar toggle button for responsive screen (small screen)
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
	navbarMenu.classList.toggle("open");
});

// End// End// End// End// End// End// End// End

///////////////////////////////// Home-Img Mouseover
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

///////////////////////////////// Handle click on :contact me: button on home
// const homeContactBtn = document.querySelector(".home__contact");
// homeContactBtn.addEventListener("click", () => {
//     scrollIntoView("#contact");
// });
// End// End// End// End// End// End// End// End

///////////////////////////////// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelectorAll(".home__container");

home.forEach((target) => {
	const homeHeight = target.getBoundingClientRect().height;
	document.addEventListener("scroll", () => {
		// 공식만든거임: 내려가는 스크롤 값에 따라 opacity값에 반영되도록. 예) 1- 400/800 = opacity 0.5
		target.style.opacity = 1 - window.scrollY / homeHeight;
	});
});
// End// End// End// End// End// End// End// End

///////////////////////////////Make Sliders for home section

const sliderWrapper = document.querySelector("#home");
const sliderContainer = document.querySelector(".slide"); //ul
const slides = document.querySelectorAll(".slides"); // li

let navPrev = document.querySelector("#prev");
let navNext = document.querySelector("#next");
const slideCount = slides.length; //슬라이드 갯수를 정의
let currentIndex = 0;
let topHeight = 0;

// slides 마다 높이가 다르면 그 중 가장 높은 슬라이드의 높이를 기준(topHeight)으로 해놓기 위한 함수
function calculateTallestSlide() {
	for (let i = 0; i < slideCount; i++) {
		if (slides[i].offsetHeight > topHeight) {
			topHeight = slides[i].offsetHeight;
		}
	}
	sliderContainer.style.height = topHeight + "px";
	sliderWrapper.style.height = topHeight + "px";
}
calculateTallestSlide();

// slide마다 left값을 인덱스 순서대로 100, 200, 300  나열해주기 위한 함수
function slideLeft() {
	for (let j = 0; j < slideCount; j++) {
		slides[j].style.left = j * 100 + "%";
	}
}
slideLeft();

// next,prev와 페이저 작동을 만들어주는 함수
function goToSlide(idx) {
	//부모 ul 입장에서는 left값을 -100 씩 땡겨줘야 오른쪽 화면 100,200 으로 보여지게 된다
	sliderContainer.style.left = idx * -100 + "%"; //첫번째 페이지에서 이전 버튼을 누르면 맨 마지막 페이지가 나올수 있게 -100을 곱해준다
	currentIndex = idx; //초기에는 2가 된다
	sliderContainer.classList.add("animated");

	// 슬라이드가 이동될때마다 Pager 현재상태표시 동기화 시키기
	const pagerAct = document.querySelector(".dot.dot_active");
	// 기존의 active가 설정된 점을 정의
	// 지금 이동한 인덱스의 점을 찾고
	const dot = document.querySelector(`.dot[data-index="${idx}"]`);
	pagerAct.classList.remove("dot_active"); //전에 점에 붙은 active를 지우고
	dot.classList.add("dot_active"); //현재 index에 맞는 index에 active를 붙여준다
}

// const pageDots = document.querySelectorAll(".dot");

navPrev.addEventListener("click", (event) => {
	event.preventDefault();
	// 첫번째 화면 아니서부터는 if 조건문 발동
	if (currentIndex != 0) {
		goToSlide(currentIndex - 1);
		//currentIndex 초기값은 0으로 설정했으니 처음에는 else가 실행된다
	} else {
		goToSlide(slideCount - 1);
	}
});

navNext.addEventListener("click", (event) => {
	event.preventDefault();
	if (currentIndex < slideCount - 1) {
		goToSlide(currentIndex + 1);
	} else {
		goToSlide(0);
	}
});

goToSlide(0);

// End//

///////////////////////////////// Pager in Home
const slidePager = document.querySelector(".slide_pagination");
slidePager.addEventListener("click", (e) => {
	const pagerAct = document.querySelector(".dot.dot_active");
	if (pagerAct != null) {
		pagerAct.classList.remove("dot_active"); //페이저 클릭시 기존에 붙어있던 active는 제거해준다
	}
	e.target.parentNode.classList.add("dot_active"); //클릭한 a링크의 부모 즉 dot에게 active를 붙여 준다

	const curIndex = Number(e.target.parentNode.getAttribute("data-index")); //클릭한 dot에 있는 data-index값을 숫자로 치환해서 정의한다
	goToSlide(curIndex); // 그 인덱스값을 goToSlide에 넣어줘서 pager가 이동할때마다 slides를 index에 맞는 페이지로 이동시켜준다
});

// End

///////////////////////////////// Modal in Home - 1
const homeBtn = document.querySelectorAll(".home__contact"); //resume button
const testBtn = document.querySelectorAll(".testimonial__contact"); //certification button
const modal = document.querySelectorAll(".modal");
const overlay = document.querySelectorAll(".modal__overlay"); // black background
const closeBtn = document.querySelectorAll(".closeBtn");

const openModal = (event) => {
	event.currentTarget.nextElementSibling.classList.add("hidden"); //modal

	// when you use node , you should be careful of line break
	// event.currentTarget.parentNode.childNodes[9].classList.add('hidden')
};
const closeModal = (event) => {
	event.currentTarget.parentNode.classList.remove("hidden"); //modal
};
overlay.forEach((event) => {
	event.addEventListener("click", closeModal);
});
closeBtn.forEach((event) => {
	event.addEventListener("click", closeModal);
});
homeBtn.forEach((event) => {
	event.addEventListener("click", openModal);
});
testBtn.forEach((event) => {
	event.addEventListener("click", openModal);
});

// Modal in Home - 2
// const homeBtn = document.querySelectorAll('.home__contact')
// const modal = document.querySelectorAll('.modal')
// const overlay = document.querySelectorAll('.modal__overlay')
// const closeBtn = document.querySelectorAll('.closeBtn')

// overlay.forEach((e) => {
//     e.addEventListener('click', (event) => {
//         event.target.parentNode.parentNode.classList.remove('hidden')
//     })
// })
// closeBtn.forEach((e) => {
//     e.addEventListener('click', (event) => {
//         event.target.parentNode.parentNode.classList.remove('hidden')
//     })
// })
// homeBtn.forEach((e) => {
//     e.addEventListener('click', (event) => {
//         event.target.parentNode.classList.add('hidden')
//     })
// })
//End

///////////////////////////////// Dynamic and blink
const homeTitleElem = document.querySelector(".home__title");
const dynamicElem = document.querySelector(".dynamic");
const dynamicElem2 = document.querySelector(".dynamic2");
function blink() {
	homeTitleElem.classList.toggle("active");
}
setInterval(() => {
	blink();
}, 300);

const stringArr = [dynamicElem.textContent, dynamicElem2.textContent];

function randomString() {
	// const dynamicText = stringArr[0];
	const dynamicTextArr = stringArr[0].split("");
	dynamicElem.textContent = "";
	return dynamicTextArr;
}
function randomString2() {
	// const dynamicText2 = stringArr[1];
	const dynamicTextArr2 = stringArr[1].split("");
	dynamicElem2.textContent = "";
	return dynamicTextArr2;
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dynamic(Arr) {
	dynamicElem2.textContent = "";
	if (Arr.length > 0) {
		dynamicElem.textContent += Arr.shift(); //배열 앞에서 부터 더한다
		setTimeout(() => {
			dynamic(Arr);
		}, await delay(350)); //시간차로 반복 배열에 글자가 다 소진될때까지
		// 1번줄이 다 나오고 난 후 실행
	} else {
		dynamic2(randomString2());
		setTimeout(() => {
			reset(); // 다 실행된후(5초) 초기화
		}, 5000);
	}
}
dynamic(randomString());

async function dynamic2(Arr2) {
	if (Arr2.length > 0) {
		dynamicElem2.textContent += Arr2.shift();
		setTimeout(() => {
			dynamic2(Arr2);
		}, await delay(250));
	} else {
		// setTimeout(() => {
		//     reset()
		// }, 5800);
	}
}

function reset() {
	dynamicElem.textContent = "";
	dynamicElem2.textContent = "";
	dynamic(randomString());
	// dynamic2(randomString2());
}

///////////////////////////////// Work Projects
const workBtnContainer = document.querySelector(".work__categories"); //project 버튼 전체
const projectContainer = document.querySelector(".work__projects"); //컨텐츠 전체
const proejects = document.querySelectorAll(".project"); //컨텐츠 각각 data-type
const projectsArray = [...proejects];
// const categoryCount = document.querySelectorAll(".category__count");
workBtnContainer.addEventListener("click", (event) => {
	const filter =
		// button에는 data-filter값이 있지만 그 안에 span태그에는 없어서
		// p태그는 btn클릭 범주안에 들어가있어서 된다.
		// 클릭한곳이 즉, e값이 span이라면 span의 부모 즉 button에 data-filter값을 가져온다
		event.target.dataset.filter || event.target.parentNode.dataset.filter;
	if (filter == null) {
		// 에러방지를 위해 filter가 null 이면 아무것도 하지않기
		return;
	}

	// Remove selection from the previous item and select the new one
	const selectElem = document.querySelector(".category__btn.selected");
	if (selectElem != null) {
		// 클릭 전에 있었던 곳에 selected를 없애 효과를 빼도록(옮겨가게끔)
		selectElem.classList.remove("selected");
	}
	const target =
		event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
	target.classList.add("selected");

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
		projectContainer.classList.remove("anim-out"); //anim-out은 opacity:0
	}, 300);
});

// Make category numbers automatically when the proejcts add
const categoryBtn = document.querySelectorAll(".category__btn");
let typeCss = projectsArray.filter((value) => value.dataset.type === "css");
let typeVjs = projectsArray.filter((value) => value.dataset.type === "js");
let typeNote = projectsArray.filter((value) => value.dataset.type === "react");
categoryBtn.forEach((btn) => {
	const child = btn.childNodes[3]; //btn의 childNodes의 3번째의 innerText값이 들어있다.
	switch (btn.dataset.filter) {
		case "*":
			// 버튼 숫자 표시값에
			child.innerText = projectsArray.length;
			break;
		case "css":
			child.innerText = typeCss.length;
			break;
		case "js":
			child.innerText = typeVjs.length;
			break;
		case "react":
			child.innerText = typeNote.length;
			break;
		default:
			break;
	}
	// if (btn.dataset.filter === 'css') {
	//     child.innerText = typeCss.length;
	//     console.log(child);
	// }
});

// End// End// End// End// End// End// End// End

///////////////////////////////// Slide Show in Testimonial
(function () {
	const testElem = document.querySelector("#testimonials");
	function showValue() {
		const testmonials = document.querySelector(".testimonials");
		let posY = testElem.getBoundingClientRect().top;
		//  posY의 현재탑높이값이 브라우저 전체높이에 3/10 보다 작을경우, 즉 엘리먼트의 탑이 전체높이에 3/10만큼 남았을때 조건발동
		if (posY < window.innerHeight * 0.3) {
			testmonials.classList.add("active");
		} else {
			testmonials.classList.remove("active");
		}
	}

	window.addEventListener("scroll", function () {
		showValue();
	});
})();

// End
