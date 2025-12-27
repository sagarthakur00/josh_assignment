document.addEventListener('DOMContentLoaded', () => {
    // Modal logic
    const modal = document.getElementById('customModal');
    const contactModal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtns = document.querySelectorAll('[data-close-modal]');

    const toggleScroll = (disable) => {
        document.body.style.overflow = disable ? 'hidden' : '';
    };

    const openModal = () => {
        modal.style.display = 'flex';
        toggleScroll(true);
    };

    const closeModal = () => {
        modal.style.display = 'none';
        contactModal.style.display = 'none';
        toggleScroll(false);
    };

    openModalBtn.addEventListener('click', openModal);
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close modal on outside click
    [modal, contactModal].forEach(m => {
        m.addEventListener('click', (event) => {
            if (event.target === m) {
                closeModal();
            }
        });
    });

    // Close modal on ESC key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Video player logic
    const video = document.getElementById('productVideo');
    const videoToggle = document.getElementById('videoToggle');

    if (video && videoToggle) {
        videoToggle.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                videoToggle.classList.add('is-playing');
            } else {
                video.pause();
                videoToggle.classList.remove('is-playing');
            }
        });

        // Update button when video ends
        video.addEventListener('ended', () => {
            videoToggle.classList.remove('is-playing');
        });

        // Hide button while playing, show when paused
        video.addEventListener('play', () => {
            videoToggle.style.opacity = '0';
            videoToggle.style.pointerEvents = 'none';
        });

        video.addEventListener('pause', () => {
            videoToggle.style.opacity = '1';
            videoToggle.style.pointerEvents = 'auto';
        });
    }

    // Carousel/Testimonial slider logic
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

    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Show success modal
            contactModal.style.display = 'flex';
            toggleScroll(true);
            
            // Reset form
            contactForm.reset();
        });
    }
});
