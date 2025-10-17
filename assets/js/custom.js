$(document).ready(function () {


  // Detect if screen supports hover
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  if (supportsHover) {
    // car parts hover
    const partMap = {
      'crPart11Btn': 'crPart1',
      'crPart22Btn': 'crPart2',
      'crPart33Btn': 'crPart3',
      'crPart44Btn': 'crPart4',
      'crPart55Btn': 'crPart5',
      'crPart66Btn': 'crPart6',
      'crPart77Btn': 'crPart7',
      'crPart88Btn': 'crPart8'
    };

    // Common function to show/hide parts
    function toggleParts(show, targetPart) {
      $('.carPartsImg').css({ opacity: 0, visibility: 'hidden' });
      $('.carSolidImg').css({ opacity: show ? 0 : 1, visibility: show ? 'hidden' : 'visible' });

      if (show && targetPart) {
        $('.' + targetPart).css({ opacity: 1, visibility: 'visible' });
      }
    }

    // Handle .btnBox hover events
    $('.btnBox').on({
      mouseenter: function () {
        const btnClass = $(this).attr('class').split(/\s+/).find(cls => partMap[cls]);
        toggleParts(true, partMap[btnClass]);
      },
      mouseleave: function () {
        toggleParts(false);
      }
    });

    // Arrow show/hide
    $('.btnBox').on({
      mouseenter: function () {
        $(this).find('.partArrow').css({ opacity: 1, visibility: 'visible' });
      },
      mouseleave: function () {
        $(this).find('.partArrow').css({ opacity: 0, visibility: 'hidden' });
      }
    });
  }







  // Sticky Header
  $(window).on("scroll", function () {
    $("header").toggleClass("stickyHead", $(this).scrollTop() > 0);
  });


  // Hamburger menu toggle
  $('.hambergerMenu').on('click', function () {
    $('.headNav > nav').toggleClass('active');
    $('body').toggleClass('menu-open');

    if (!$('.menu-overlay').length) {
      $('header').append('<div class="menu-overlay"></div>');
    }
  });

  // Close menu
  $(document).on('click', '.HamClose, .menu-overlay', function () {
    $('.headNav > nav').removeClass('active');
    $('body').removeClass('menu-open');
    $('.menu-overlay').remove();
  });

  // Accordion for sub-menus in mobile
  function bindAccordion() {
    if (window.innerWidth <= 1100) {
      $('.hasSub-menu').off('click').on('click', function (e) {
        if ($(e.target).closest('.sub-menu').length) return;

        e.preventDefault();

        const $clicked = $(this);
        const $clickedSub = $clicked.find('.sub-menu').first();
        const isOpen = $clicked.hasClass('open');

        // Close all others
        $('.hasSub-menu.open').not($clicked).each(function () {
          const $this = $(this);
          const $thisSub = $this.find('.sub-menu').first();
          $thisSub.css('height', $thisSub[0].scrollHeight + 'px');
          requestAnimationFrame(() => {
            $thisSub.css('height', '0');
          });
          $thisSub.one('transitionend', function () {
            $this.removeClass('open');
            $thisSub.removeAttr('style');
          });
        });

        // Toggle clicked item
        if (isOpen) {
          $clickedSub.css('height', $clickedSub[0].scrollHeight + 'px');
          requestAnimationFrame(() => {
            $clickedSub.css('height', '0');
          });
          $clickedSub.one('transitionend', function () {
            $clicked.removeClass('open');
            $clickedSub.removeAttr('style');
          });
        } else {
          $clicked.addClass('open');
          $clickedSub.css('height', '0');
          requestAnimationFrame(() => {
            $clickedSub.css('height', $clickedSub[0].scrollHeight + 'px');
          });
        }
      });
    } else {
      $('.hasSub-menu').off('click');
      $('.sub-menu').removeAttr('style');
      $('.hasSub-menu').removeClass('open');
    }
  }



  // Initial bind
  bindAccordion();

  // Rebind on resize
  $(window).on('resize', function () {
    bindAccordion();
  });







  // Select File Code
  $('#careerresume').on('change', function () {
    if (this.files.length > 0) {
      $('#fileNameText').text(this.files[0].name);
    } else {
      $('#fileNameText').text('Choose File');
    }
  });



  // Slick Sliders

  // Products Slider
  const $slider = $('.productContSlider');
  const slideCount = $slider.find('.productContSlide').length;

  // Adjust settings based on number of slides
  const slickOptions = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: slideCount >= 3, // Enable centerMode only if 3 or more slides
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  $slider.slick(slickOptions);

  // CareerSlick Sliders

  $('.psCareerSlideBox').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  // Home Banner Slider
  $('.hmBannerImg').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: true,
    asNavFor: '.hmBannerTitle'
  });

  $('.hmBannerTitle').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.hmBannerImg',
    dots: false,
    arrows: false,
    fade: true,
    centerMode: true,
    focusOnSelect: true
  });


  // Product Details Slider
  // Slider initialization function
  function initProductSlider($tab) {
    const $mainSlider = $tab.find('.productDetailSliderMain');
    const $thumbs = $tab.find('.productDetailSliderSub img');

    if (!$mainSlider.hasClass('slick-initialized')) {
      $mainSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        dots: false
      });

      // Sync slider change to thumbnails
      $mainSlider.on('afterChange', function (event, slick, currentSlide) {
        $thumbs.removeClass('active');
        $thumbs.eq(currentSlide).addClass('active');
      });
    } else {
      $mainSlider.slick('setPosition');
    }

    // Set first thumbnail as active
    $thumbs.removeClass('active');
    $thumbs.eq(0).addClass('active');

    // Thumbnail click
    $thumbs.off('click').on('click', function () {
      const index = $(this).index();
      $mainSlider.slick('slickGoTo', index);
      $thumbs.removeClass('active');
      $(this).addClass('active');
    });
  }

  // === Initial Load: Setup default tab ===
  $(document).ready(function () {
    const $initialTab = $('.tab-content.active');
    const initialTabId = $initialTab.data("id") || $initialTab.attr("id");

    initProductSlider($initialTab);

    // Set matching description active
    $('.tab-desc').removeClass('active');
    $('.tab-desc[data-id="' + initialTabId + '"]').addClass('active');
  });

  // === On Tab Click ===
  $('.tabBtn').click(function () {
    const tab_id = $(this).data("id");

    // Tab button active state
    $('.tabBtn').removeClass('active');
    $(this).addClass('active');

    // Tab content switching
    $('.tab-content').removeClass('active');
    const $newTab = $('#' + tab_id).addClass('active');

    // Reinitialize slider
    initProductSlider($newTab);

    // Update description block
    $('.tab-desc').removeClass('active');
    $('.tab-desc[data-id="' + tab_id + '"]').addClass('active');
  });






  // AOS Initialize
  AOS.init({
    once: false,
    mirror: false,
    offset: 50,
    duration: 800,
    easing: 'ease-in-out',
  });



});
