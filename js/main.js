(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Respect the "reduce motion" accessibility preference
    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    // Initiate the wowjs (skipped with reduced motion; CSS shows .wow content)
    if (!reduceMotion) {
        new WOW().init();
    }


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        if (reduceMotion) {
            $('html, body').scrollTop(0);
        } else {
            $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        }
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: !reduceMotion,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left" aria-hidden="true"></i>',
            '<i class="bi bi-chevron-right" aria-hidden="true"></i>'
        ],
        onInitialized: function () {
            // Icon-only carousel buttons need accessible names
            var lang = ($('html').attr('lang') || 'en').toLowerCase();
            var labels = lang === 'uz' ? ['Oldingi slayd', 'Keyingi slayd'] : ['Previous slide', 'Next slide'];
            this.$element.find('.owl-prev').attr('aria-label', labels[0]);
            this.$element.find('.owl-next').attr('aria-label', labels[1]);
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: !reduceMotion,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        onInitialized: function () {
            // Dots are icon-only buttons: give them accessible names
            var lang = ($('html').attr('lang') || 'en').toLowerCase();
            var word = lang === 'uz' ? 'Slayd' : 'Slide';
            this.$element.find('.owl-dot').each(function (i) {
                $(this).attr('aria-label', word + ' ' + (i + 1));
            });
        },
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

