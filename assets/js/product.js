document.documentElement.classList.add('js');

const $rootSingle = $('.cSlidersingle');
const $rootNav = $('.cSlidernav');

// Main slider (3 items with center mode + autoplay)
$rootSingle.slick({
    slide: '.cSlider__item',
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '25%',
    arrows: false,
    infinite: true,
    adaptiveHeight: false,
    useTransform: true,
    speed: 400,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
  
    responsive: [
      
      {
        breakpoint: 768,
        settings: {
          autoplay: true,
          centerMode: false,     // 🔥 IMPORTANT
          centerPadding: '0px',  // 🔥 IMPORTANT
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  


// Nav slider (static thumbnails, no movement)
$rootNav.on('init', function (event, slick) {
    $(this).find('.slick-slide[data-slick-index="0"]').addClass('is-active');
}).slick({
    slide: '.cSlider__item',
    variableWidth: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    focusOnSelect: true,
    infinite: false,
    centerMode: false,
    draggable: false,
    swipe: false
});

// Sync manually (no track shift)
$rootSingle.on('afterChange', function (event, slick, currentSlide) {
    $rootNav.find('.slick-slide.is-active').removeClass('is-active');
    $rootNav.find('.slick-slide[data-slick-index="' + currentSlide + '"]').addClass('is-active');
});

// Click nav to go main
$rootNav.on('click', '.slick-slide', function () {
    const index = $(this).data('slick-index');
    $rootSingle.slick('slickGoTo', index);
});
