// Info Cards Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.info-cards-container');
    if (!carouselContainer) return;

    const cards = carouselContainer.querySelectorAll('.info-card');
    const dots = carouselContainer.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let autoplayInterval;

    // Function to show a specific card
    function showCard(index) {
        // Remove all active and prev classes
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev');
            if (i < index) {
                card.classList.add('prev');
            }
        });

        // Add active class to current card
        cards[index].classList.add('active');

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    // Function to go to next card
    function nextCard() {
        const nextIndex = (currentIndex + 1) % cards.length;
        showCard(nextIndex);
    }

    // Function to go to previous card
    function prevCard() {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(prevIndex);
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showCard(index);
            resetAutoplay();
        });
    });

    // Add keyboard navigation
    carouselContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevCard();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextCard();
            resetAutoplay();
        }
    });

    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(nextCard, 4000); // Change card every 4 seconds
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);

    // Start autoplay
    startAutoplay();

    // Handle visibility change (pause when tab is hidden)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    // Initialize first card
    showCard(0);
});
