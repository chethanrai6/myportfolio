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
});
