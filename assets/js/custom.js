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
        breakpoint: 850,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 611,
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
        breakpoint: 1537, // for tablet / medium screen
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1025, // for mobile landscape
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 850, // for mobile landscape
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

  // $('.hmSec2').slick({
  //   dots: false,
  //   arrows: false,
  //   infinite: true,
  //   speed: 300,
  //   autoplay: true,
  //   autoplaySpeed: 8000,
  //   fade: true,
  //   cssEase: 'linear',
  //   pauseOnHover: false,
  // });

  $('.psProductImg').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: false,
  });

  // Tab Section
  $(".tabBtn").click(function () {
    var tab_id = $(this).data("id");

    $(".tabBtn, .tab-content").removeClass("active");
    $(this).addClass("active");
    $("#" + tab_id).addClass("active");

    // Reinitialize Slick slider inside the active tab
    // $("#" + tab_id).find(".psAllArtBox").slick("setPosition");
  });


  // Map hover and mobile click code
  function isMobile() {
    return window.matchMedia("(max-width: 1023px)").matches;
  }

  // Desktop hover
  $(".mapPoint").on("mouseenter", function () {
    if (!isMobile()) {
      $(this).addClass("active");
    }
  });

  $(".mapPoint").on("mouseleave", function () {
    if (!isMobile()) {
      $(this).removeClass("active");
    }
  });

  // Mobile click
  $(".mapPoint").on("click", function (e) {
    if (isMobile()) {
      e.stopPropagation();
      const parent = $(this).closest(".mapPoints");

      // Close all others first
      $(".mapPoints").not(parent).removeClass("active");

      // Toggle current one
      parent.toggleClass("active");
    }
  });

  // Click anywhere outside to close on mobile
  $(document).on("click", function () {
    if (isMobile()) {
      $(".mapPoints").removeClass("active");
    }
  });




// Video play code
function setupVideoPlayer(videoSelector, playBtnSelector) {
  $(videoSelector).each(function () {
    const video = $(this).get(0);
    const playBtn = $(this).closest(".psProDetailVidBox").find(playBtnSelector);

    playBtn.on("click", function () {
      video.setAttribute("controls", true);
      video.play();
      playBtn.fadeOut(300);
    });

    $(video).on("ended", function () {
      video.removeAttribute("controls");
      playBtn.fadeIn(300);
    });
  });
}

// only pass the video and play Button selector
setupVideoPlayer(".psProDetailVidBox video", ".psVideoPlayBtn");

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
    end: "+=1000", // end after scrolling 1000px beyond the start
    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
  }
});

cards.forEach((card, i) => {
  const nextCard = cards[i + 1];

  if (nextCard) {
    // Animate the front card going backward (fade & scale down)
    tl.to(card, {
      yPercent: -15,
      scale: 0.95,
      opacity: 0.4,
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
    }, "<");
  }
});





// Home Page Second Section animation
function initHmSec2Animation() {
  const $section = $(".hmSec2");
  const slides = gsap.utils.toArray(".hmSec2slide");

  if (window.innerWidth >= 1024) {
    // Kill slick if exists
    if ($section.hasClass("slick-initialized")) {
      $section.slick("unslick");
    }

    // Kill old ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());

    // ✅ Wrap slides in a container if not wrapped
    if (!$section.find(".hmSec2Inner").length) {
      $section.wrapInner('<div class="hmSec2Inner"></div>');
    }

    const inner = $section.find(".hmSec2Inner")[0];

    gsap.set($section, {
      position: "relative",
      height: "100vh",
      overflow: "hidden",
    });

    gsap.set(inner, {
      display: "flex",
      flexWrap: "nowrap",
      width: `${slides.length * 100}%`,
      height: "100%",
    });

    gsap.set(slides, {
      width: `${100 / slides.length}%`,
      height: "100%",
      flexShrink: 0,
    });

    // ✅ Calculate dynamic scroll distance based on inner width
    const totalScroll = inner.scrollWidth - $section.outerWidth();

    gsap.to(inner, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: $section[0],
        start: "top-=80 top", // pin 80px below top
        end: `+=${totalScroll}`, // dynamically match scroll distance
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true, // important for resize recalculations
      },
    });
  } else {
    // ✅ Below 1024px — use slick
    if ($section.hasClass("slick-initialized")) return;

    // Unwrap if wrapped
    if ($section.find(".hmSec2Inner").length) {
      const inner = $section.find(".hmSec2Inner");
      inner.children().unwrap();
    }

    $section.slick({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 8000,
      pauseOnHover: false,
      adaptiveHeight: true
    });

    ScrollTrigger.getAll().forEach(st => st.kill());
  }
}

$(document).ready(initHmSec2Animation);
$(window).on("resize", function () {
  setTimeout(initHmSec2Animation, 500);
});
