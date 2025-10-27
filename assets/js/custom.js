$(document).ready(function () {

  // Sticky Header
  $(window).on("scroll", function () {
    $("header").toggleClass("stickyHead", $(this).scrollTop() > 30);
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
    autoplaySpeed: 2000,

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
  $('.psNavTabs li a').click(function (e) {
    e.preventDefault();

    // Update tab active class
    $('.psNavTabs li').removeClass('psActive');
    $(this).parent().addClass('psActive');

    // Show the selected tab content
    $('.psTabPane').removeClass('psActive');
    var target = $(this).attr('href');
    $(target).addClass('psActive');
  });

  // Home Partners and Supporters Marquee
  $('.hmPartnerSupportMarquee').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
    cssEase: 'linear',
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 1300,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      }
    ]
  });

    $('.feedBackSlider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024, // for tablet / medium screen
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768, // for mobile landscape
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600, // for mobile landscape
        settings: {
          slidesToShow: 2
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

});



gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const cards = gsap.utils.toArray(".custom-card");

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".cards",
    pin: true,
    pinSpacing: true,
    markers: false,
    start: "top-=200px top", // when the top of the trigger hits the top of the viewport
    end: "+=2000", // end after scrolling 1000px beyond the start
    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
  }
});

cards.forEach((card, i) => {
  const nextCard = cards[i + 1];

  if (nextCard) {
    // Animate the front card going backward (fade & scale down)
    tl.to(card, {
      yPercent: -30,
      scale: 0.95,
      opacity: 0.6,
      zIndex: 8 - i,
      ease: "power2.inOut"
    });

    // Animate the next card coming to front
    tl.to(nextCard, {
      yPercent: 0,
      scale: 1,
      opacity: 1,
      zIndex: 9 - i,
      ease: "power2.inOut"
    }, "<"); // "<" keeps both animations in sync

    tl.to(card, {
      yPercent: -15,
      scale: 0.95,
      opacity: 1,
      ease: "power2.inOut"
    });
  }
});

// Animation for card 2
// tl.from('.card2', {  yPercent:0,  opacity: 1,}) 
tl.addLabel("card2");
// tl.add(() => setActiveNav(tl.scrollTrigger.direction > 0 ? 1 : 0), "-=0.15");
// tl.to('.card1',{  scale:0.925,  yPercent:-0.75,  opacity: 1}, "-=0.3")
// tl.to('.card2', {  yPercent:0,  opacity: 1})



// Additional animations for scaling down previous cards
// tl.to('.card1',{
//   // scale:0.925,
//   yPercent:-1.5,
//   opacity: 0.9
// }, "-=0.3")

// tl.to('.card2',{
//   // scale:0.95,
//   yPercent:-1.125,
//   opacity: 0.9
// }, "-=0.3")


// Without the .nav .circle elements, we don't need to handle setActiveNav function
/* gsap.utils.toArray(".nav .circle").forEach((circle, i) => {
  circle.classList[i === index ? "add" : "remove"]("active");
}); */
