// Configuration and Data
const CONFIG = {
    typingSpeed: 100,
    typingPause: 2000,
    fadeInThreshold: 0.1,
    videoLoadTimeout: 5000,
    videoPreviewTime: 1, // seconds
    // videoPlaybackRate: 1.5 // speed multiplier
};

// Then in initializeVideos function:
// video.playbackRate = CONFIG.videoPlaybackRate;

// Typing Animation Text
const typingTexts = [
    'Software Engineer',
    'Distributed Systems',
    'Machine Learning',
    'Quantitative Finance',
    'High-Performance Computing',
    'Full Stack',
    'MLOps',
    'Y Combinator Alumni',
    'Systematic Trading'
];
// Skills Data
const skills = {
    languages: [
        { name: "C++", icon: "cpp.svg" },
        { name: "Python", icon: "python.svg" },
        { name: "JavaScript/TypeScript", icon: "typescript.svg" },
        { name: "SQL", icon: "sql.svg" }
    ],
    technologies: [
        { name: "PyTorch", icon: "pytorch.svg" },
        { name: "React", icon: "react.svg" },
        { name: "Docker", icon: "docker.svg" },
        { name: "Kubernetes", icon: "kubernetes.svg" },
        { name: "AWS", icon: "aws.svg" },
        { name: "Redis", icon: "redis.svg" },
        { name: "Kafka", icon: "kafka.svg" },
        { name: "MongoDB", icon: "mongodb.svg" },
        { name: "PostgreSQL", icon: "postgresql.svg" }
    ],
    tools: [
        { name: "Git", icon: "git.svg" },
        { name: "Jenkins", icon: "jenkins.svg" },
        { name: "CircleCI", icon: "circleci.svg" },
        { name: "Prometheus", icon: "prometheus.svg" },
        { name: "Grafana", icon: "grafana.svg" }
    ]
};

// Publications Data
const publications = [
    {
        title: "An Empirical Framework for Detecting Overfitting in Trading Strategies",
        status: "Under Review",
        authors: ["K. Goyle"],
        year: "2024"
    },
    {
        title: "Comparative Analysis of Stochastic Models for Simulating Leveraged ETF Price Paths",
        journal: "Journal of Mathematics and Modelling in Finance",
        year: "2025",
        authors: ["K. Goyle"]
    },
    {
        title: "DataAssist: A Machine Learning Approach to Data Cleaning and Preparation",
        journal: "Lecture Notes in Networks and Systems, Springer",
        year: "2024",
        authors: ["K. Goyle", "Q. Xie", "V. Goyle"],
        doi: "10.1007/978-3-031-66431-1_33"
    },
    {
        title: "Neural Machine Translation For Low Resource Languages",
        journal: "arXiv preprint",
        year: "2023",
        authors: ["V. Goyle", "P. Krishnaswamy", "K. Ravikumar", "U. Chattopadhyay", "K. Goyle"],
        arxiv: "2304.07869"
    }
];

// Performance Monitoring Utility
const Performance = {
    marks: {},
    start(name) {
        this.marks[name] = performance.now();
    },
    end(name) {
        if (this.marks[name]) {
            const duration = performance.now() - this.marks[name];
            console.debug(`${name} took ${duration.toFixed(2)}ms`);
            delete this.marks[name];
            return duration;
        }
        return 0;
    }
};

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    Performance.start('initialization');
    


    // Initial call
    setTimeout(matchYaarHeights, 100);

    // Call again when videos load
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('loadeddata', function() {
            matchYaarHeights();
        });
    });

    // Call on window resize
    window.addEventListener('resize', matchYaarHeights);
    
    // initializeTheme();
    initializeNavigation();
    initializeTypingAnimation();
    initializeVideos();
    // loadPublications();
    // loadSkills();
    initializeAnimations();
    setupScrollEffects();
    
    Performance.end('initialization');
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', toggleTheme);
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) document.body.classList.add('dark-theme');
            else document.body.classList.remove('dark-theme');
        }
    });
}

// Navigation
function initializeNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }
}


// Video Handling
// Video Handling
// Video Handling
function initializeVideos() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        if (!video.dataset.src) return;

        // Show loading state
        video.classList.add('loading');
        
        // Set video source
        video.src = video.dataset.src;

        // Once video can play
        video.addEventListener('canplay', () => {
            try {
                // Set custom playback speed if specified, otherwise default to 2.0
                const requestedSpeed = video.dataset.playbackSpeed 
                    ? parseFloat(video.dataset.playbackSpeed) 
                    : 2.0;
                
                // Try to set the speed
                video.playbackRate = requestedSpeed;
                
                // Verify if the speed was actually set (some browsers might cap it)
                if (video.playbackRate !== requestedSpeed) {
                    console.warn(`Requested speed ${requestedSpeed}x not supported. Using ${video.playbackRate}x instead.`);
                }
                
                // Remove loading state
                video.classList.remove('loading');
                
                // Start playing
                video.play().catch(error => {
                    console.warn('Auto-play failed:', error);
                    handleVideoPlaybackError(video);
                });
            } catch (error) {
                console.error('Error setting playback speed:', error);
                // Fallback to a more conservative speed
                video.playbackRate = 4.0;
                console.log('Falling back to 4x speed');
            }
        }, { once: true });

        // Handle errors
        video.addEventListener('error', () => {
            console.error('Video loading error:', video.src);
            handleVideoError(video);
        });

        // Add a speed check on play
        video.addEventListener('play', () => {
            console.log(`Video playing at ${video.playbackRate}x speed`);
        });
    });
}

function handleVideoError(video) {
    video.classList.remove('loading');
    video.classList.add('error');
    
    const container = video.closest('.video-container');
    if (container) {
        container.innerHTML = `
            <div class="media-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load video</p>
            </div>
        `;
    }
}

function handleVideoPlaybackError(video) {
    const container = video.closest('.video-container');
    if (container) {
        const playButton = document.createElement('button');
        playButton.className = 'play-button';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.addEventListener('click', () => {
            video.play().catch(console.error);
            playButton.remove();
        });
        container.appendChild(playButton);
    }
}

function loadVideoWithTimeout(video) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Video loading timeout')), CONFIG.videoLoadTimeout);
    });

    const loadPromise = new Promise((resolve, reject) => {
        video.addEventListener('loadeddata', resolve, { once: true });
        video.addEventListener('error', reject, { once: true });
        video.src = video.dataset.src;
    });

    Promise.race([loadPromise, timeoutPromise])
        .catch(error => {
            console.error('Video loading error:', error);
            handleVideoError(video);
        });
}

function handleVideoError(video) {
    video.classList.remove('loading');
    video.classList.add('error');
    
    const container = video.closest('.video-container');
    if (container) {
        container.innerHTML = `
            <div class="media-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load video</p>
            </div>
        `;
    }
}

function handleVideoPlaybackError(video) {
    // Add play button overlay
    const container = video.closest('.video-container');
    if (container) {
        const playButton = document.createElement('button');
        playButton.className = 'play-button';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.addEventListener('click', () => {
            video.play().catch(console.error);
            playButton.remove();
        });
        container.appendChild(playButton);
    }
}

// Typing Animation
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingElement.textContent = currentText.substring(0, charIndex);

        let typingSpeed = CONFIG.typingSpeed;

        if (isDeleting) {
            typingSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = CONFIG.typingPause;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// Skills Loading
function loadSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    Performance.start('skills-loading');

    Object.entries(skills).forEach(([category, items]) => {
        const section = document.createElement('div');
        section.className = 'skill-category';
        
        const title = document.createElement('h3');
        title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        
        const grid = document.createElement('div');
        grid.className = 'skill-grid';

        items.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'skill-item fade-in';
            item.innerHTML = `
                <img src="assets/icons/tech/${skill.icon}" 
                     alt="${skill.name}" 
                     loading="lazy">
                <p>${skill.name}</p>
            `;
            grid.appendChild(item);
        });

        section.appendChild(title);
        section.appendChild(grid);
        skillsContainer.appendChild(section);
    });

    Performance.end('skills-loading');
}

// Publications Loading
function loadPublications() {
    const publicationsGrid = document.querySelector('.publications-grid');
    if (!publicationsGrid) return;

    Performance.start('publications-loading');

    publications.forEach(pub => {
        const card = createPublicationCard(pub);
        publicationsGrid.appendChild(card);
    });

    Performance.end('publications-loading');
}

function createPublicationCard(pub) {
    const card = document.createElement('div');
    card.className = 'publication-card fade-in';
    
    let links = '';
    if (pub.doi) {
        links += `
            <a href="https://doi.org/${pub.doi}" 
               class="paper-link" 
               target="_blank" 
               rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> View Paper
            </a>`;
    }
    if (pub.arxiv) {
        links += `
            <a href="https://arxiv.org/abs/${pub.arxiv}" 
               class="paper-link" 
               target="_blank" 
               rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> arXiv
            </a>`;
    }

    card.innerHTML = `
        <div class="publication-content">
            <h3>${pub.title}</h3>
            <p class="publication-meta">${pub.journal || pub.status}, ${pub.year}</p>
            <p class="authors">${pub.authors.join(', ')}</p>
            <div class="publication-links">${links}</div>
        </div>
    `;
    
    return card;
}

// Animations
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: CONFIG.fadeInThreshold,
        rootMargin: '50px'
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Scroll Effects
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            // Navbar hide/show on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error Handling
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        console.error('Resource loading error:', e.target.src);
        if (e.target.tagName === 'VIDEO') {
            handleVideoError(e.target);
        } else {
            handleImageError(e.target);
        }
    }
});

function handleImageError(img) {
    img.classList.add('error');
    img.src = 'assets/icons/image-error.svg'; // Fallback image
    img.alt = 'Failed to load image';
}

// Cleanup
window.addEventListener('unload', () => {
    // Stop all videos
    document.querySelectorAll('video').forEach(video => {
        video.pause();
        video.src = '';
        video.load();
    });

    // Clear any running animations or timeouts
    if (window.animationFrameId) {
        cancelAnimationFrame(window.animationFrameId);
    }
});

// Add basic analytics
function logEvent(category, action, label) {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.debug(`Event: ${category} - ${action} - ${label}`);
}

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    const videos = document.querySelectorAll('video');
    if (document.hidden) {
        videos.forEach(video => video.pause());
    } else {
        videos.forEach(video => {
            if (video.classList.contains('visible')) {
                video.play().catch(() => {});
            }
        });
    }
});

// Handle network status
window.addEventListener('online', () => {
    document.querySelectorAll('.error').forEach(element => {
        if (element.dataset.src) {
            // Retry loading failed media
            element.src = element.dataset.src;
            element.classList.remove('error');
        }
    });
});



// Add to main.js
function optimizeForMobile() {
    if (window.innerWidth < 768) {
        // Defer non-critical video loading
        document.querySelectorAll('video').forEach(video => {
            video.setAttribute('preload', 'none');
            video.setAttribute('loading', 'lazy');
        });
    }
}

window.addEventListener('load', optimizeForMobile);

// Export utilities for console debugging
window.portfolioUtils = {
    Performance,
    logEvent,
    reloadMedia: () => initializeVideos(),
    toggleTheme: () => document.querySelector('.theme-toggle').click()
};


// Function to match iPhone height to desktop height
function matchYaarHeights() {
    const desktopFrame = document.querySelector('.desktop-frame');
    const iphoneMockup = document.querySelector('.iphone-mockup');
    
    if (desktopFrame && iphoneMockup && window.innerWidth > 768) {
        // Get the height of the desktop frame
        const desktopHeight = desktopFrame.offsetHeight;
        
        // Set the iPhone mockup height to match
        iphoneMockup.style.height = `${desktopHeight}px`;
        
        // Calculate appropriate width based on aspect ratio
        const aspectRatio = 9/19;
        iphoneMockup.style.width = `${desktopHeight * aspectRatio}px`;
    } else if (iphoneMockup && window.innerWidth <= 768) {
        // Reset on mobile
        iphoneMockup.style.height = '';
        iphoneMockup.style.width = '180px';
    }
}