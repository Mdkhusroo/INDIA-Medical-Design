// JavaScript for Carousel functionality
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".carousel-button-prev");
const nextBtn = document.querySelector(".carousel-button-next");
const dotsNav = document.querySelector(".carousel-dots");
const dots = Array.from(dotsNav.children);

let currentSlide = 0;

function updateCarousel(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    slides.forEach((slide, i) => {
        slide.setAttribute("aria-hidden", i !== index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        dot.setAttribute("aria-selected", i === index);
        dot.tabIndex = i === index ? 0 : -1;
    });
}

nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel(currentSlide);
});

prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel(currentSlide);
});

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        currentSlide = i;
        updateCarousel(currentSlide);
    });
});

// Auto-advance every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel(currentSlide);
}, 5000);

// Initialize carousel on load
window.addEventListener("load", () => updateCarousel(currentSlide));


// JavaScript for Mobile Menu functionality (from header)
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuToggle && mobileMenu && menuIcon && closeIcon) {
        mobileMenuToggle.addEventListener('click', () => {
            // Toggle the 'open' class on the mobile menu to show/hide it
            mobileMenu.classList.toggle('open');

            // Toggle visibility of hamburger and close icons
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');

            // Update aria-expanded attribute for accessibility
            const isMenuOpen = mobileMenu.classList.contains('open');
            mobileMenuToggle.setAttribute('aria-expanded', isMenuOpen);
        });

        // Optional: Close the mobile menu when clicking outside of it
        document.addEventListener('click', (event) => {
            const isClickInsideHeader = mobileMenu.contains(event.target) || mobileMenuToggle.contains(event.target);
            if (!isClickInsideHeader && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    } else {
        console.error("One or more mobile menu elements not found. Mobile menu functionality might be impaired.");
    }
});

