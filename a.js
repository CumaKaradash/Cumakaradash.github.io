// Smooth scrolling for navigation links
$(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = this.hash;
        var $target = $(target);
        
        $('html, body').animate({
            'scrollTop': $target.offset().top - 70
        }, 800, 'swing');
    });
    
    // Highlight active navigation link on scroll
    $(window).on('scroll', function() {
        highlightNavLink();
    });
    
    function highlightNavLink() {
        var scrollPosition = $(window).scrollTop();
        
        $('section').each(function() {
            var currentSection = $(this);
            var sectionTop = currentSection.offset().top - 100;
            var sectionId = currentSection.attr('id');
            
            if (scrollPosition >= sectionTop) {
                $('.nav-links a').removeClass('active');
                $('.nav-links a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    }
    
    // Add active class to nav links style
    $('.nav-links a').on('click', function() {
        $('.nav-links a').removeClass('active');
        $(this).addClass('active');
    });
    
    // Add CSS for active class
    $("<style>")
        .prop("type", "text/css")
        .html(`
            .nav-links a.active {
                color: var(--pastel-blue);
                font-weight: 700;
            }
        `)
        .appendTo("head");
    
    // Form submission with validation
    $('form').on('submit', function(e) {
        e.preventDefault();
        
        var name = $(this).find('input[type="text"]').first().val();
        var email = $(this).find('input[type="email"]').val();
        var message = $(this).find('textarea').val();
        
        if (!name || !email || !message) {
            alert('Lütfen tüm zorunlu alanları doldurun.');
            return;
        }
        
        // Form success feedback
        $(this).html('<div style="text-align: center; padding: 50px 0;"><i class="fas fa-check-circle" style="font-size: 48px; color: var(--light-green); margin-bottom: 20px;"></i><h3 style="margin-bottom: 15px;">Mesajınız Gönderildi!</h3><p>En kısa sürede sizinle iletişime geçeceğiz.</p></div>');
    });
    
    // Portfolio filter functionality
    // Can be expanded if adding filter buttons in the HTML
    $('.filter-btn').on('click', function() {
        var filterValue = $(this).attr('data-filter');
        
        if (filterValue === 'all') {
            $('.portfolio-item').show();
        } else {
            $('.portfolio-item').hide();
            $('.portfolio-item[data-category="' + filterValue + '"]').show();
        }
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
    });
    
    // Scroll to top button
    $('body').append('<a href="#" id="scroll-to-top"><i class="fas fa-arrow-up"></i></a>');
    
    $("<style>")
        .prop("type", "text/css")
        .html(`
            #scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background-color: var(--pastel-blue);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 99;
            }
            
            #scroll-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            
            #scroll-to-top:hover {
                background-color: var(--light-green);
                transform: translateY(-3px);
            }
        `)
        .appendTo("head");
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('#scroll-to-top').addClass('show');
        } else {
            $('#scroll-to-top').removeClass('show');
        }
    });
    
    $('#scroll-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                const src = image.getAttribute('data-src');
                if (src) {
                    image.src = src;
                }
                observer.unobserve(image);
            }
        });
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    images.forEach(image => {
        const src = image.getAttribute('src');
        image.setAttribute('data-src', src);
        observer.observe(image);
    });
    
    // Mobile navigation
    $('<button class="mobile-nav-toggle"><i class="fas fa-bars"></i></button>').insertBefore('.nav-links');
    
    $("<style>")
        .prop("type", "text/css")
        .html(`
            .mobile-nav-toggle {
                display: none;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-nav-toggle {
                    display: block;
                }
                
                .nav-links {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    background-color: var(--white);
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    transform: translateY(-150%);
                    transition: transform 0.3s ease;
                    z-index: 99;
                }
                
                .nav-links.active {
                    transform: translateY(0);
                }
                
                .nav-links li {
                    margin: 15px 0;
                }
            }
        `)
        .appendTo("head");
    
    $('.mobile-nav-toggle').on('click', function() {
        $('.nav-links').toggleClass('active');
        
        if ($('.nav-links').hasClass('active')) {
            $(this).html('<i class="fas fa-times"></i>');
        } else {
            $(this).html('<i class="fas fa-bars"></i>');
        }
    });
    
    // Close mobile menu when clicking on a link
    $('.nav-links a').on('click', function() {
        if ($('.nav-links').hasClass('active')) {
            $('.nav-links').removeClass('active');
            $('.mobile-nav-toggle').html('<i class="fas fa-bars"></i>');
        }
    });
    
    // Simple animations on scroll
    const animateElements = document.querySelectorAll('.portfolio-item, .testimonial-item, .about-image, .about-text, .section-title');
    
    const animateOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const handleAnimateIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const animateObserver = new IntersectionObserver(handleAnimateIntersection, animateOptions);
    
    $("<style>")
        .prop("type", "text/css")
        .html(`
            .portfolio-item, .testimonial-item, .about-image, .about-text, .section-title {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .portfolio-item.animate, .testimonial-item.animate, .about-image.animate, .about-text.animate, .section-title.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .section-title.animate {
                transition-delay: 0.2s;
            }
            
            .about-image.animate {
                transition-delay: 0.3s;
            }
            
            .about-text.animate {
                transition-delay: 0.5s;
            }
        `)
        .appendTo("head");
    
    animateElements.forEach(element => {
        animateObserver.observe(element);
    });
    
    // Initialize the page
    highlightNavLink();
});