'use strict'

///////////////////////////////// Make navbar transparent when it is on the top + Show "arrow up" bittpm wjem scrp;;omg dpwm
const navbar = document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height
const topElem = document.querySelector('.top-arrow')
const btt = document.querySelector('#back-to-top')
let scrollPos
console.log(window.scrollY)
console.log(navbarHeight)

document.addEventListener('scroll', () => {
    // console.log(`navbarHeight :${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark')
        topElem.classList.add('visible')
    } else {
        navbar.classList.remove('navbar--dark')
        topElem.classList.remove('visible')
    }
})
// End// End// End// End// End// End// End// End

// Common Functions
function scroll(selector) {
    const scrollTo = document.querySelector(selector)
    scrollTo.scrollIntoView({ behavior: 'smooth' })
}
// End// End// End// End// End// End// End// End

///////////////////////////////// Handle click on the "arrow up" button
btt.addEventListener('click', (e) => {
    e.preventDefault()
    scroll('#home')
    // scrollTop();
})
// End// End// End// End// End// End// End// End

///////////////////////////////// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu')
navbarMenu.addEventListener('click', (event) => {
    const target = event.target
    const link = target.dataset.link // 먼저 html에서 data-link로 연결해준다

    if (link == null) {
        // link가 null이면 아무것도 하지않고 리턴해서 더이상 밑에 있는 코드가 실행되지 않도록 한다
        return
    }
    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView({ behavior: "smooth" });
    navbarMenu.classList.remove('open') // 네브바 클릭시 항상 창이 닫힐수있도록(반응형에서)
    scroll(link)
})
// End// End// End// End// End// End// End// End

///////////////////////////////// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn')
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open')
})

// End// End// End// End// End// End// End// End

///////////////////////////////// Home-Img Mouseover
function zoomIn(event) {
    event.target.style.transform = 'scale(1.2)'
    event.target.style.zIndex = 1
    event.target.style.transition = 'all 0.5s'
}
function zoomOut(event) {
    event.target.style.transform = 'scale(1)'
    event.target.style.zIndex = 0
    event.target.style.transition = 'all 0.5s'
}
// End// End// End// End// End// End// End// End

///////////////////////////////// Handle click on :contact me: button on home
// const homeContactBtn = document.querySelector(".home__contact");
// homeContactBtn.addEventListener("click", () => {
//     scrollIntoView("#contact");
// });
// End// End// End// End// End// End// End// End

///////////////////////////////// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container')
const homeHeight = home.getBoundingClientRect().height

document.addEventListener('scroll', () => {
    // 공식만든거임: 내려가는 스크롤 값에 따라 opacity값에 반영되도록. 예) 1- 400/800 = opacity 0.5
    home.style.opacity = 1 - window.scrollY / homeHeight
})
// End// End// End// End// End// End// End// End

// ????????????????????????????????????Skills (make a bar with span tag)
// const skillV = document.querySelectorAll('.skill_value')
// const dataElem = skillV.forEach((e) => {
//     let dataDisplay = e.target.dataset.graph
//     console.log(dataDisplay)

//     e.target.style.width = dataDisplay
// })
// for (let i = 0; i < skillV.length; i++) {
//     // const dataElem = skillV[i].dataset.graph
//     console.log(skillV)
//     // skillV[i].style.witdh = dataElem
// }

///////////////////////////////// Projects
const workBtnContainer = document.querySelector('.work__categories') //project 버튼 전체
const projectContainer = document.querySelector('.work__projects') //컨텐츠 전체
const proejects = document.querySelectorAll('.project') //컨텐츠 각각 data-type
workBtnContainer.addEventListener('click', (e) => {
    const filter =
        // button에는 data-filter값이 있지만 그 안에 span태그에는 없어서
        // p태그는 btn클릭 범주안에 들어가있어서 된다.
        // 클릭한곳이 즉, e값이 span이라면 span의 부모 즉 button에 data-filter값을 가져온다
        e.target.dataset.filter || e.target.parentNode.dataset.filter
    if (filter == null) {
        // 혹시 몰라서 filter가 null 이면 아무것도 하지않기
        return
    }

    // Remove selection from the previous item and select the new one
    const selectElem = document.querySelector('.category__btn.selected')
    if (selectElem != null) {
        selectElem.classList.remove('selected')
    }
    e.target.classList.add('selected')

    // 필터링해서 걸려진것들에 anim-out을 준다 (먼저 anim이 된다음에 아래 0.3초후에 효과가 사라진다)
    projectContainer.classList.add('anim-out')
    setTimeout(() => {
        // foreach 는 quersysleectorAll에 있는 값들을 배열형태로 가져온다
        proejects.forEach((project) => {
            // 만약 위에서 선택한 filter가 * 이거나 선택한 data-type과 똑같으면 (즉 같은 필터값을 나오게)
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible') //타입이 동일한 클래스에 invisible 제거해서 보이게하기
            } else {
                project.classList.add('invisible')
            }
        })
        // 클릭시 0.3초후에 anim-out 이 사라지고 본 내용이 돌아오게한다. 그래서 효과가 보이게 한다
        projectContainer.classList.remove('anim-out')
    }, 300)
})

// End// End// End// End// End// End// End// End

///////////////////////////////Make Sliders for home section

const sliderWrapper = document.querySelector('#home')
const sliderContainer = document.querySelector('.slide')
const slides = document.querySelectorAll('.slides')

let navPrev = document.querySelector('#prev')
let navNext = document.querySelector('#next')
const slideCount = slides.length

let currentIndex = 0
let topHeight = 0

function calculateTallestSlide() {
    for (let i = 0; i < slideCount; i++) {
        if (slides[i].offsetHeight > topHeight) {
            topHeight = slides[i].offsetHeight
        }
    }
    sliderContainer.style.height = topHeight + 'px'
    sliderWrapper.style.height = topHeight + 'px'
}
calculateTallestSlide()

function slideLeft() {
    for (let j = 0; j < slideCount; j++) {
        slides[j].style.left = j * 100 + '%'
    }
}

slideLeft()

function goToSlide(idx) {
    sliderContainer.style.left = idx * -100 + '%'
    currentIndex = idx
    sliderContainer.classList.add('animated')

    // 기존의 active가 설정된 점을 찾고
    const pagerAct = document.querySelector('.dot.dot_active')
    // 지금 이동한 인덱스의 점을 찾고
    const dot = document.querySelector(`.dot[data-index="${idx}"]`)
    pagerAct.classList.remove('dot_active')
    dot.classList.add('dot_active')
}

const pageDots = document.querySelectorAll('.dot')

navPrev.addEventListener('click', (event) => {
    event.preventDefault()
    if (currentIndex != 0) {
        goToSlide(currentIndex - 1)
    } else {
        goToSlide(slideCount - 1)
    }
})

navNext.addEventListener('click', (event) => {
    event.preventDefault()
    if (currentIndex < slideCount - 1) {
        goToSlide(currentIndex + 1)
    } else {
        goToSlide(0)
    }
})

goToSlide(0)

// End//

// Pager in Home
const slidePager = document.querySelector('.slide_pagination')
slidePager.addEventListener('click', (e) => {
    const pagerAct = document.querySelector('.dot.dot_active')
    if (pagerAct != null) {
        pagerAct.classList.remove('dot_active')
    }
    e.target.parentNode.classList.add('dot_active')

    const curIndex = Number(e.target.parentNode.getAttribute('data-index'))
    goToSlide(curIndex)
})

// End

// Slide Show in Testimonial
;(function () {
    const testElem = document.querySelector('#testimonials')
    function showValue() {
        const testmonials = document.querySelector('.testmonials')
        let posY = testElem.getBoundingClientRect().top
        //  posY의 현재탑높이값이 브라우저 전체높이에 3/10 보다 작을경우, 즉 엘리먼트의 탑이 전체높이에 3/10만큼 남았을때 조건발동
        if (posY < window.innerHeight * 0.3) {
            testmonials.classList.add('active')
        } else {
            testmonials.classList.remove('active')
        }
    }

    window.addEventListener('scroll', function () {
        showValue()
    })
})()

// End
// Modal in Home - 1
const homeBtn = document.querySelectorAll('.home__contact')
const testBtn = document.querySelectorAll('.testimonial__contact') //button
const modal = document.querySelectorAll('.modal')
const overlay = document.querySelectorAll('.modal__overlay')
const closeBtn = document.querySelectorAll('.closeBtn')

const openModal = () => {
    event.currentTarget.nextElementSibling.classList.add('hidden')

    // when you use node , you should be careful of line break
    // event.currentTarget.parentNode.childNodes[9].classList.add('hidden')
}
const closeModal = (event) => {
    event.currentTarget.parentNode.classList.remove('hidden')
}
overlay.forEach((event) => {
    event.addEventListener('click', closeModal)
})
closeBtn.forEach((event) => {
    event.addEventListener('click', closeModal)
})
homeBtn.forEach((event) => {
    event.addEventListener('click', openModal)
})
testBtn.forEach((event) => {
    event.addEventListener('click', openModal)
})

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
