document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Sticky Header & Scroll Styling
       ========================================================================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
            header.style.background = 'rgba(5, 4, 10, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(5, 4, 10, 0.8)';
        }
    });

    /* ==========================================================================
       Mobile Navigation Menu
       ========================================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    };

    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when resizing screen past tablet breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    /* ==========================================================================
       Active Link Highlighting on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');

    const highlightNavLink = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);

    /* ==========================================================================
       Intersection Observer for Scroll Reveal Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       Contact Form Modal Toggle & Handling
       ========================================================================== */
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');
    const formSuccessMsg = document.getElementById('formSuccessMsg');
    
    // Find all contact action triggers (Get In Touch buttons & Footer email link)
    const contactTriggers = [
        document.querySelector('.hero-actions .btn-dark'),
        document.querySelector('.cta-right .btn-cta')
    ];

    const openModal = (e) => {
        if (e) e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    };

    const closeModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = ''; // Resume background scrolling
        
        // Reset form and success state after animation completes
        setTimeout(() => {
            contactForm.reset();
            formSuccessMsg.classList.remove('active');
        }, 300);
    };

    contactTriggers.forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', openModal);
        }
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking on backdrop
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==========================================================================
       Contact Form Submission Handling (Web3Forms)
       ========================================================================== */
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Disable button & show spinner/loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';
        
        const formData = new FormData(contactForm);
        
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Show Success Message modal page
                formSuccessMsg.classList.add('active');
            } else {
                console.error(json);
                alert(json.message || "Something went wrong! Please try again.");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Form submission failed. Please check your internet connection.");
        })
        .then(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
    });

    /* ==========================================================================
       Preloader Counter Animation
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const preloaderPercent = document.getElementById('preloaderPercent');
    const preloaderBgFill = document.querySelector('.preloader-bg-fill');
    let percent = 0;
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
        percent += Math.floor(Math.random() * 8) + 2; // Random increment
        if (percent >= 100) {
            percent = 100;
            clearInterval(progressInterval);
            
            // Wait briefly at 100% then slide out preloader
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.style.overflow = ''; // Resume scroll
            }, 600);
        }
        preloaderPercent.textContent = `${percent}%`;
        preloaderBgFill.style.height = `${percent}%`;
    }, 50);

    // Ensure scrolling is disabled while preloader is active
    document.body.style.overflow = 'hidden';

    /* ==========================================================================
       Custom Cursor physics (with delay/lag)
       ========================================================================== */
    const customCursor = document.getElementById('customCursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    // Coordinates
    let mouse = { x: 0, y: 0 };
    let dot = { x: 0, y: 0 };
    let ring = { x: 0, y: 0 };
    
    // Lerp factors
    const dotLerp = 0.25;
    const ringLerp = 0.12;
    
    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // Main cursor render loop
    function updateCursor() {
        // Apply linear interpolation (lerp) for smooth lag
        dot.x += (mouse.x - dot.x) * dotLerp;
        dot.y += (mouse.y - dot.y) * dotLerp;
        
        ring.x += (mouse.x - ring.x) * ringLerp;
        ring.y += (mouse.y - ring.y) * ringLerp;
        
        // Update DOM element positions
        if (cursorDot) {
            cursorDot.style.left = `${dot.x}px`;
            cursorDot.style.top = `${dot.y}px`;
        }
        if (cursorRing) {
            cursorRing.style.left = `${ring.x}px`;
            cursorRing.style.top = `${ring.y}px`;
        }
        
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
    
    // Hover States on interactive items
    const hoverables = document.querySelectorAll('a, button, .social-icon, .tech-card, .project-card, .choose-card');
    
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            customCursor.classList.add('hovered');
        });
        item.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hovered');
        });
    });

    /* ==========================================================================
       Magnetic Hover Effect for buttons & links
       ========================================================================== */
    const magneticItems = document.querySelectorAll('.nav-link, .social-icon, .logo, .btn');
    
    magneticItems.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            
            // Calculate hover delta from element center
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            
            // Move item slightly towards the mouse (35% pull strength)
            el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            // Snap back to origin center
            el.style.transform = 'translate(0px, 0px)';
        });
    });

    /* ==========================================================================
       Dark / Light Theme Toggler
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggle');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.documentElement.classList.add('light-mode');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        document.documentElement.classList.remove('light-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        if (isLight) {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    });

    /* ==========================================================================
       Floating Project Hover Preview Physics & Tracking
       ========================================================================== */
    const projectHoverPreview = document.getElementById('projectHoverPreview');
    const projectHoverPreviewImg = document.getElementById('projectHoverPreviewImg');
    const projectCards = document.querySelectorAll('.project-card');
    
    let previewTarget = { x: 0, y: 0 };
    let previewCurrent = { x: 0, y: 0 };
    let isHoveringProject = false;
    
    // Track mouse coordinates for floating preview
    window.addEventListener('mousemove', (e) => {
        if (isHoveringProject) {
            // Position tooltip slightly offset to the top-right of cursor
            previewTarget.x = e.clientX + 30;
            previewTarget.y = e.clientY - 90;
        }
    });
    
    // Project hover render loop
    function updatePreviewPosition() {
        if (isHoveringProject) {
            previewCurrent.x += (previewTarget.x - previewCurrent.x) * 0.15;
            previewCurrent.y += (previewTarget.y - previewCurrent.y) * 0.15;
            
            projectHoverPreview.style.left = `${previewCurrent.x}px`;
            projectHoverPreview.style.top = `${previewCurrent.y}px`;
        }
        requestAnimationFrame(updatePreviewPosition);
    }
    requestAnimationFrame(updatePreviewPosition);
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const previewImgSrc = card.getAttribute('data-image');
            if (previewImgSrc) {
                projectHoverPreviewImg.src = previewImgSrc;
                isHoveringProject = true;
                projectHoverPreview.classList.add('active');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            isHoveringProject = false;
            projectHoverPreview.classList.remove('active');
        });
    });

    /* ==========================================================================
       Project Detailed Modal Controller
       ========================================================================== */
    const projectDetailModal = document.getElementById('projectDetailModal');
    const closeProjectModalBtn = document.getElementById('closeProjectModal');
    
    const modalImage = document.getElementById('modalProjectImage');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalDesc = document.getElementById('modalProjectDesc');
    const modalFeaturesList = document.getElementById('modalProjectFeatures');
    const modalTagsContainer = document.getElementById('modalProjectTags');
    const modalRole = document.getElementById('modalProjectRole');
    const modalLink = document.getElementById('modalProjectLink');
    
    // Open project details in modal
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent navigating if user clicks the overlay elements directly
            e.preventDefault();
            
            // Extract attributes
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            const img = card.getAttribute('data-image');
            const features = card.getAttribute('data-features').split(';');
            const tags = card.getAttribute('data-tags').split(',');
            const url = card.getAttribute('data-url');
            const role = card.getAttribute('data-role');
            
            // Populate modal content
            modalImage.src = img;
            modalImage.alt = `${title} Preview`;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalRole.textContent = role;
            modalLink.href = url;
            
            // Rebuild features checklist
            modalFeaturesList.innerHTML = '';
            features.forEach(feat => {
                if (feat.trim()) {
                    const li = document.createElement('li');
                    li.textContent = feat.trim();
                    modalFeaturesList.appendChild(li);
                }
            });
            
            // Rebuild tags list
            modalTagsContainer.innerHTML = '';
            tags.forEach(tag => {
                if (tag.trim()) {
                    const span = document.createElement('span');
                    span.textContent = tag.trim();
                    modalTagsContainer.appendChild(span);
                }
            });
            
            // Open modal
            projectDetailModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock main scroll
        });
    });
    
    // Close modal function
    function closeProjectModal() {
        projectDetailModal.classList.remove('active');
        document.body.style.overflow = ''; // Resume scroll
    }
    
    closeProjectModalBtn.addEventListener('click', closeProjectModal);
    
    // Close on overlay backdrop click
    projectDetailModal.addEventListener('click', (e) => {
        if (e.target === projectDetailModal) {
            closeProjectModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectDetailModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
});
