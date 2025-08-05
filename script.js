// Music Player Functionality
let isPlaying = false;
let audio = null;

// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize audio
    audio = document.getElementById('backgroundMusic');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    
    // Play/Pause functionality with background animation
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playIcon.className = 'fas fa-play';
            playBtn.classList.remove('playing');
            isPlaying = false;
            
            // Stop background animation
            document.body.style.animation = 'none';
            document.body.style.transform = 'scale(1) translate(0, 0)';
        } else {
            audio.play();
            playIcon.className = 'fas fa-pause';
            playBtn.classList.add('playing');
            isPlaying = true;
            
            // Start background animation
            document.body.style.animation = 'droneShot 25s ease-in-out infinite';
            document.body.style.animationTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
    
    // Volume control
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });
    
    // Set initial volume
    audio.volume = volumeSlider.value / 100;
    
    // Add smooth transition for background
    document.body.style.transition = 'background-size 0.5s ease, background-position 0.5s ease';
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.discord-card, .project-card, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects for links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add typing effect for tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing effect after initial animation
        setTimeout(typeWriter, 1000);
    }

    // Add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body');
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });

    // Add smooth reveal for project status indicators
    const statusIndicators = document.querySelectorAll('.project-status');
    statusIndicators.forEach((indicator, index) => {
        setTimeout(() => {
            indicator.style.opacity = '1';
            indicator.style.transform = 'scale(1)';
        }, 800 + (index * 200));
    });

    // Add pulse animation to online status
    const onlineStatus = document.querySelector('.status-indicator.online');
    if (onlineStatus) {
        setInterval(() => {
            onlineStatus.style.animation = 'pulse 2s ease-in-out';
            setTimeout(() => {
                onlineStatus.style.animation = '';
            }, 2000);
        }, 4000);
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .project-card {
        position: relative;
        overflow: hidden;
    }

    .project-status {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    const links = document.querySelectorAll('a[href]');
    const currentIndex = Array.from(links).findIndex(link => link === document.activeElement);
    
    if (e.key === 'Tab') {
        // Let default tab behavior work
        return;
    }
    
    if (e.key === 'Enter' && document.activeElement.tagName === 'A') {
        document.activeElement.click();
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 