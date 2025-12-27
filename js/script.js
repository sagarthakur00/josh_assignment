document.addEventListener('DOMContentLoaded', () => {
    // Modal logic
    const modal = document.getElementById('customModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.querySelector('.close-btn');

    const toggleScroll = (disable) => {
        document.body.style.overflow = disable ? 'hidden' : '';
    };

    const openModal = () => {
        modal.style.display = 'flex';
        toggleScroll(true);
    };

    const closeModal = () => {
        modal.style.display = 'none';
        toggleScroll(false);
    };

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Carousel logic
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let rotationTimer;

    const activateSlide = (index) => {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
        currentSlide = index;
    };

    const showNextSlide = () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        activateSlide(nextIndex);
    };

    const showPrevSlide = () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        activateSlide(prevIndex);
    };

    const startRotation = () => {
        rotationTimer = setInterval(showNextSlide, 5000);
    };

    const resetRotation = () => {
        clearInterval(rotationTimer);
        startRotation();
    };

    if (slides.length > 0) {
        startRotation();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showPrevSlide();
            resetRotation();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showNextSlide();
            resetRotation();
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', (event) => {
            const index = Number(event.currentTarget.dataset.index);
            activateSlide(index);
            resetRotation();
        });
    });

    // Simple contact form handler for demo purposes
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Thanks for reaching out! We will get back to you soon.');
            contactForm.reset();
        });
    }
});
