// Enhanced Animations and Interactions

(function($) {
  'use strict';

  // Document ready
  $(document).ready(function() {
    
    // Scroll Animation Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Apply animation to sections
    const animatedElements = document.querySelectorAll(
      '.info-area, .single-counter, .single-price, .single-course, .single-testimonial, .title'
    );

    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.8s ease-out';
      scrollObserver.observe(element);
    });

    // Parallax effect for sections
    $(window).scroll(function() {
      const scrolled = $(window).scrollTop();
      
      // Parallax for banner
      $('.banner-area').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
      
      // Parallax for images
      $('.banner-right img').css('transform', 'translateY(' + (scrolled * -0.1) + 'px)');
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.textContent);
          animateCounter(target, 0, endValue, 2000);
          counterObserver.unobserve(target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

    function animateCounter(element, start, end, duration) {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;
      
      const timer = setInterval(function() {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current);
      }, 16);
    }

    // Smooth hover effects for cards
    $('.single-price, .single-course, .single-testimonial').hover(
      function() {
        $(this).addClass('hover-effect');
      },
      function() {
        $(this).removeClass('hover-effect');
      }
    );

    // Button ripple effect
    $('.primary-btn, .header-btn').on('click', function(e) {
      const button = $(this);
      const ripple = $('<span class="ripple"></span>');
      
      const size = Math.max(button.outerWidth(), button.outerHeight());
      const x = e.pageX - button.offset().left - size / 2;
      const y = e.pageY - button.offset().top - size / 2;
      
      ripple.css({
        width: size,
        height: size,
        top: y,
        left: x
      });
      
      button.append(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 600);
    });

    // Navbar scroll effect
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('#header').addClass('sticky');
      } else {
        $('#header').removeClass('sticky');
      }
    });

    // Image lazy load with fade-in
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.5s ease-in';
          
          const tempImg = new Image();
          tempImg.onload = function() {
            img.src = tempImg.src;
            img.style.opacity = '1';
          };
          tempImg.src = img.dataset.src || img.src;
          
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img').forEach(img => {
      imageObserver.observe(img);
    });

    // Animated gradient text
    function animateGradient() {
      const gradientElements = document.querySelectorAll('.gradient-text, .banner-content h1');
      gradientElements.forEach(element => {
        let hue = 0;
        setInterval(function() {
          hue = (hue + 1) % 360;
          const color1 = `hsl(${hue}, 70%, 60%)`;
          const color2 = `hsl(${(hue + 60) % 360}, 70%, 60%)`;
          element.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
          element.style.webkitBackgroundClip = 'text';
          element.style.webkitTextFillColor = 'transparent';
        }, 50);
      });
    }

    // Tilt effect for cards
    $('.single-price, .single-course').on('mousemove', function(e) {
      const card = $(this);
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.css({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
      });
    });

    $('.single-price, .single-course').on('mouseleave', function() {
      $(this).css({
        transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
      });
    });

    // Cursor glow effect
    const cursor = $('<div class="cursor-glow"></div>');
    $('body').append(cursor);

    $(document).on('mousemove', function(e) {
      cursor.css({
        left: e.pageX,
        top: e.pageY
      });
    });

    // Social links animation
    $('.footer-social-link').each(function(index) {
      $(this).css({
        animationDelay: (index * 0.1) + 's'
      });
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
      const target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 80
        }, 1000, 'easeInOutExpo');
      }
    });

    // Page load animation
    $('body').addClass('page-loaded');
    
    setTimeout(function() {
      $('.banner-content').addClass('animate-in');
    }, 300);

    // Stagger animation for elements
    function staggerAnimation(selector, delay = 100) {
      $(selector).each(function(index) {
        const element = $(this);
        setTimeout(function() {
          element.addClass('animate-in');
        }, index * delay);
      });
    }

    // Apply stagger animations
    const staggerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('row')) {
            const children = entry.target.querySelectorAll('.col-lg-3, .col-lg-4, .col-md-6');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, index * 150);
            });
          }
          staggerObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.counter-area .row, .price-area .row').forEach(row => {
      row.querySelectorAll('.col-lg-3, .col-lg-4, .col-md-6').forEach(col => {
        col.style.opacity = '0';
        col.style.transform = 'translateY(30px)';
        col.style.transition = 'all 0.6s ease-out';
      });
      staggerObserver.observe(row);
    });

    // Typing effect for text
    function typeWriter(element, text, speed = 50) {
      let i = 0;
      element.textContent = '';
      
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      type();
    }

    // Initialize typing effect for banner h5
    const bannerSubtitle = document.querySelector('.banner-content h5');
    if (bannerSubtitle) {
      const originalText = bannerSubtitle.textContent;
      setTimeout(function() {
        typeWriter(bannerSubtitle, originalText, 100);
      }, 500);
    }

    // Add floating particles effect
    function createParticle() {
      const particle = $('<div class="particle"></div>');
      const size = Math.random() * 5 + 2;
      
      particle.css({
        position: 'fixed',
        width: size + 'px',
        height: size + 'px',
        background: 'rgba(245, 63, 81, 0.3)',
        borderRadius: '50%',
        left: Math.random() * window.innerWidth + 'px',
        top: window.innerHeight + 'px',
        pointerEvents: 'none',
        zIndex: '1'
      });
      
      $('body').append(particle);
      
      particle.animate({
        top: '-50px',
        left: '+=' + (Math.random() * 200 - 100) + 'px',
        opacity: 0
      }, 3000 + Math.random() * 2000, function() {
        particle.remove();
      });
    }

    // Create particles periodically
    setInterval(createParticle, 500);

    // Loading screen
    $(window).on('load', function() {
      $('.loading-screen').fadeOut(500);
    });

  });

  // Add ripple styles dynamically
  const rippleStyles = `
    <style>
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      .cursor-glow {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(245, 63, 81, 0.3);
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        z-index: 9999;
        mix-blend-mode: screen;
      }
      
      .hover-effect {
        animation: pulse 0.5s ease;
      }
      
      .page-loaded {
        overflow-x: hidden;
      }
      
      .animate-in {
        animation: fadeInUp 0.8s ease-out;
      }
      
      .particle {
        animation: float 3s ease-in-out;
      }
      
      .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  `;
  
  $('head').append(rippleStyles);

})(jQuery);
