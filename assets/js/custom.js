$(document).ready(function () {

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

});
