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
            element.style.transform = 'translateX(0)'
            element.style.visibility = 'visible'
            element.style.animation = '1.5s cubic-bezier(0, 0, 0.16, 0.68) 0s 1 normal none running slideToTop'
        }
        // Services Slide
        if (window.scrollY.toFixed() >= services.offsetTop - 600) {
            slideToTop(services)
        }
        // Product Slide
        if (window.scrollY.toFixed() >= product.offsetTop - 600) {
            slideToTop(product)
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

});
