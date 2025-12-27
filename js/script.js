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
