document.addEventListener('DOMContentLoaded', function() {
    const sliderHandle = document.getElementById('sliderHandle');
    const afterImage = document.getElementById('afterImage');
    const quoteForm = document.getElementById('quoteForm');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    let isDragging = false;
    const container = sliderHandle.parentElement;

    function updateSlider(clientX) {
        const rect = container.getBoundingClientRect();
        let position = ((clientX - rect.left) / rect.width) * 100;
        position = Math.max(0, Math.min(100, position));
        
        sliderHandle.style.left = position + '%';
        afterImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
    }

    sliderHandle.addEventListener('mousedown', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            updateSlider(e.clientX);
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    sliderHandle.addEventListener('touchstart', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            const touch = e.touches[0];
            updateSlider(touch.clientX);
        }
    });

    document.addEventListener('touchend', function() {
        isDragging = false;
    });

    container.addEventListener('click', function(e) {
        if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
            updateSlider(e.clientX);
        }
    });

    // FormSubmit handles form submission directly - no JavaScript needed

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .benefit-item, .review-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
