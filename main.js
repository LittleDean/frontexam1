const navMenuToggle = document.querySelector('#nav-toggle')

const aboutItems = document.querySelectorAll('.about__item')
const services = document.querySelector('#services')
const servicesItems = document.querySelectorAll('.services__item')
const product = document.querySelector('#product')

$(document).ready(function () {
    // Handle Show/Hide Nav Mobile Menu
    function handleShowNav() {
        const isChecked = navMenuToggle.checked
        $('.nav-show').click(() => {
            if (!isChecked) {
                $('.overlay').css('display', 'block')
                $('.nav__mb').css('transform', 'translateX(0)')
                $('.nav__mb').css('transition', 'transform linear 0.2s')
                $(document.body).css('overflow', 'hidden')
            }
        })
        function hideNavMobile() {
            $('.overlay').css('display', 'none')
            $('.nav__mb').css('transform', 'translateX(100%)')
            $(document.body).css('overflow', 'initial')
        }
        $('.nav-close').click(() => {
            hideNavMobile()
        })

        $('.overlay').click(() => {
            hideNavMobile()
        })
    }
    handleShowNav();

    // Handle Window On Scroll
    $(window).scroll(function () {
        // Hanlde Content Slide In
        // About Slide
        aboutItems.forEach((item) => {
            if (window.scrollY.toFixed() >= item.offsetTop - 600) {
                item.firstElementChild.style.transform = 'translateX(0)'
                item.firstElementChild.style.animation = '1.5s cubic-bezier(0, 0, 0.16, 0.68) 0s 1 normal none running slideInFromLeft'
                item.lastElementChild.style.transform = 'translateX(0)'
                item.lastElementChild.style.animation = '1.5s cubic-bezier(0, 0, 0.16, 0.68) 0s 1 normal none running slideInFromRight'
            }
        })
        // Handle Content Slide To Top
        function slideToTop(element) {
            element.style.transform = 'translateY(0)'
            element.style.visibility = 'visible'
            element.style.animation = '1.5s cubic-bezier(0, 0, 0.16, 0.68) 0s 1 normal none running slideToTop'
        }
        // Services Slide
        if (window.scrollY.toFixed() >= services.offsetTop - 600) {
            slideToTop(services)
        }
        // Product Slide
        if (window.scrollY.toFixed() >= product.offsetTop - 600) {
            // slideToTop(product)
            product.style.visibility = 'visible'
            product.style.animation = '1s cubic-bezier(0, 0, 0.16, 0.68) 0s 1 normal none running visible'
        }
    })

    // Handle Services Item Active
    servicesItems.forEach(item => {
        item.onmouseover = () => {
            servicesItems.forEach(item => {
                item.classList.remove('active')
            })
            item.classList.add('active')
        }
    })

    // Handle Product Auto Scroll
    function handleProductScroll() {
        const slide = document.querySelector('#product')
        let slides = document.querySelectorAll('.product__item')
        const interval = 3000;
        let index = 0;
        let slideId;


        const firstClone = slides[0].cloneNode(true)
        firstClone.id = 'first-clone'
        slide.append(firstClone)

        slides.forEach((item, index) => {
            if (index != 0) {
                slide.append(item.cloneNode(true))
            }
        })

        const slideWidth = slides[index].clientWidth

        const startSlide = () => {
            slideId = setInterval(() => {
                slide.style.transform = `translateX(${-slideWidth * (index + 1)}px)`
                index++;
                slide.style.transition = '2s'
            }, interval)
        }
        startSlide();

        slide.addEventListener('transitionend', () => {
            slides = document.querySelectorAll('.product__item')
            if (slides[index].id === firstClone.id) {
                slide.style.transition = 'none'
                index = 0
                slide.style.transform = `translateX(0)`
            }
        })

        slide.addEventListener('mouseenter', () => {
            clearInterval(slideId)
        })
        slide.addEventListener('mouseleave', startSlide)

    }
    handleProductScroll();
});
