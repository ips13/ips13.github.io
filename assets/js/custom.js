;(function () {
  'use strict';

  // Mobile detection
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  // Set full height for elements
  const fullHeight = function () {
    if (!isMobile.any()) {
      const elements = document.querySelectorAll('.js-fullheight');
      const setHeight = () => {
        elements.forEach(el => {
          el.style.height = window.innerHeight + 'px';
        });
      };
      setHeight();
      window.addEventListener('resize', setHeight);
    }
  };

  // Counter animation
  const animateCounter = (element, start, end, duration) => {
    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const counter = function () {
    const counters = document.querySelectorAll('.js-counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-to')) || 0;
      const speed = parseInt(counter.getAttribute('data-speed')) || 2000;
      animateCounter(counter, 0, target, speed);
    });
  };

  // Counter waypoint using Intersection Observer
  const counterWayPoint = function () {
    const counterSection = document.getElementById('ipsingh-counter');
    if (counterSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            setTimeout(counter, 400);
            entry.target.classList.add('animated');
          }
        });
      }, { threshold: 0.1 });
      observer.observe(counterSection);
    }
  };

  // Content animations using Intersection Observer
  const contentWayPoint = function () {
    const animateBoxes = document.querySelectorAll('.animate-box');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('item-animate');
          setTimeout(() => {
            const effect = entry.target.getAttribute('data-animate-effect') || 'fadeInUp';
            entry.target.classList.add(effect, 'animated');
            entry.target.classList.remove('item-animate');
          }, index * 200);
        }
      });
    }, { threshold: 0.3 });

    animateBoxes.forEach(box => observer.observe(box));
  };

  // Burger menu toggle
  const burgerMenu = function () {
    const toggle = document.querySelector('.js-ipsingh-nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        const body = document.body;
        if (body.classList.contains('offcanvas')) {
          this.classList.remove('active');
          body.classList.remove('offcanvas');
        } else {
          this.classList.add('active');
          body.classList.add('offcanvas');
        }
      });
    }
  };

  // Click outside to close menu
  const mobileMenuOutsideClick = function () {
    document.addEventListener('click', function (e) {
      const aside = document.getElementById('ipsingh-aside');
      const toggle = document.querySelector('.js-ipsingh-nav-toggle');
      const isClickInside = aside?.contains(e.target) || toggle?.contains(e.target);
      
      if (!isClickInside && document.body.classList.contains('offcanvas')) {
        document.body.classList.remove('offcanvas');
        toggle?.classList.remove('active');
      }
    });

    window.addEventListener('scroll', function () {
      if (document.body.classList.contains('offcanvas')) {
        document.body.classList.remove('offcanvas');
        document.querySelector('.js-ipsingh-nav-toggle')?.classList.remove('active');
      }
    });
  };

  // Smooth scroll navigation
  const clickMenu = function () {
    const navLinks = document.querySelectorAll('#navbar a:not([class="external"])');
    navLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        const section = this.getAttribute('data-nav-section');
        const navbar = document.getElementById('navbar');
        const targetSection = document.querySelector(`[data-section="${section}"]`);
        
        if (targetSection) {
          event.preventDefault();
          const offsetTop = targetSection.offsetTop - 55;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
        
        if (navbar && navbar.classList.contains('in')) {
          navbar.classList.remove('in');
          navbar.setAttribute('aria-expanded', 'false');
          document.querySelector('.js-ipsingh-nav-toggle')?.classList.remove('active');
        }
        
        return false;
      });
    });
  };

  // Update active navigation item
  const navActive = function (section) {
    const navList = document.querySelector('#navbar > ul');
    if (navList) {
      navList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
      const activeLink = navList.querySelector(`a[data-nav-section="${section}"]`);
      if (activeLink) {
        activeLink.closest('li').classList.add('active');
      }
    }
  };

  // Navigation section highlighting on scroll
  const navigationSection = function () {
    const sections = document.querySelectorAll('section[data-section]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('data-section');
          navActive(section);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
  };

  // Simple slider for home section (replaces flexslider)
  const sliderMain = function () {
    const slider = document.querySelector('#ipsingh-home .flexslider');
    if (slider) {
      // The slider only has one slide, so we just add the animation class
      const sliderText = slider.querySelector('.slider-text');
      if (sliderText) {
        setTimeout(() => {
          sliderText.classList.add('animated', 'fadeInUp');
        }, 500);
      }
    }
  };

  // Owl carousel replacement (check if used)
  const owlCarouselFeatureSlide = function () {
    const carousels = document.querySelectorAll('.owl-carousel');
    // If there are no carousels, this function does nothing
    // The carousel functionality can be added here if needed in the future
    if (carousels.length > 0) {
      console.log('Carousel elements found but not initialized (library removed)');
    }
  };

  // Initialize all functions on DOM ready
  const init = function () {
    fullHeight();
    counter();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();
    clickMenu();
    navigationSection();
    mobileMenuOutsideClick();
    sliderMain();
    owlCarouselFeatureSlide();
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();