$(document).ready(function () {

  // Sticky Header
  $(window).on("scroll", function () {
    $("header").toggleClass("stickyHead", $(this).scrollTop() > 0);
  });

  // Hamburger menu toggle
  $('.menuIcon').on('click', function () {
    $('.menuCont').toggleClass('active');
    $('body').toggleClass('menu-open');

    if (!$('.menu-overlay').length) {
      $('header').append('<div class="menu-overlay"></div>');
    }
  });

  // Close menu
  $(document).on('click', '.menuClose, .menu-overlay', function () {
    $('.menuCont').removeClass('active');
    $('body').removeClass('menu-open');
    $('.menu-overlay').remove();
  });

  // AOS Initialize
  AOS.init({
    once: false,
    mirror: false,
    offset: 50,
    duration: 800,
    easing: 'ease-in-out',
  });


  // Accordians
  // Show the first accordion content by default
  $(".psAccContents:first").css("display", "block");
  $(".psAccHeading:first").addClass("psAccActive"); // optional: make first active

  // Accordion click
  $(".psAccHeading").click(function () {
      var $content = $(this).next(".psAccContents");

      // Toggle clicked content
      $content.slideToggle(500);

      // Close other contents
      $(".psAccContents").not($content).slideUp(500);

      // Toggle active class for clicked heading
      $(this).toggleClass("psAccActive");

      // Remove active from other headings
      $(".psAccHeading").not(this).removeClass("psAccActive");
  });


  // Latest article slider knowledge
  $('.psArticleSlider').slick({
    slidesToShow: 3.5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 200000,

    responsive: [
      {
        breakpoint: 1024, // for tablet / medium screen
        settings: {
          slidesToShow: 2.5
        }
      },
      {
        breakpoint: 768, // for mobile landscape
        settings: {
          slidesToShow: 1.5
        }
      },
      {
        breakpoint: 600, // for mobile landscape
        settings: {
          slidesToShow: 1.2
        }
      },
      {
        breakpoint: 500, // for small mobile
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });


  function initSlider() {
    if ($(window).width() <= 610) {
      if (!$('.psAllArtBox').hasClass('slick-initialized')) {
        $('.psAllArtBox').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          arrows: true,
          autoplaySpeed: 200000
        });
      }
    } else {
      if ($('.psAllArtBox').hasClass('slick-initialized')) {
        $('.psAllArtBox').slick('unslick');
      }
    }
  }

  initSlider();
  $(window).on('resize', initSlider);



  // solution tabing
  $('.psNavTabs li a').click(function(e) {
    e.preventDefault();

    // Update tab active class
    $('.psNavTabs li').removeClass('psActive');
    $(this).parent().addClass('psActive');

    // Show the selected tab content
    $('.psTabPane').removeClass('psActive');
    var target = $(this).attr('href');
    $(target).addClass('psActive');
  });

});
