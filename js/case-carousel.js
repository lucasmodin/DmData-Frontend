
    document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slideWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(slides[0]).marginRight)*2;
    let currentIndex = 0;

    // Placér slides ved siden af hinanden
    slides.forEach((slide, index) => {
    slide.style.left = (slideWidth * index) + 'px';
});

    const moveToSlide = (index) => {
    track.style.transform = 'translateX(-' + (slideWidth * index) + 'px)';
    currentIndex = index;
};

    prevButton.addEventListener('click', () => {
    if (currentIndex > 0) moveToSlide(currentIndex - 1);
});

    nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
});

    // Auto-slide hver 4. sekund
    const autoInterval = 4000; // ms
    let autoSlide = setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
}, autoInterval);

    // Pause auto-slide ved hover
    const carousel = document.querySelector('.case-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
}, autoInterval);
});
});

