$('.counting').each(function () {
    var $this = $(this),
        countTo = $this.attr('data-count');
    $({
        countNum: $this.text()
    }).animate({
        countNum: countTo
    }, {
        duration: 5000,
        easing: 'linear',
        step: function () {
            $this.text(Math.floor(this.countNum));
        },
        complete: function () {
            $this.text(this.countNum);
        }
    });
});

//////////////////////////////////
$('.logo-slider').slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 4000,
    cssEase: 'linear',
    variableWidth: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: { slidesToShow: 5 }
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 3 }
        },
        {
            breakpoint: 576,
            settings: { slidesToShow: 2 }
        }
    ]
});

//////////////////////////////////
$('.service-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true, 
    centerPadding: '40px',

    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                centerMode: true
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                autoplay: false,  
                centerMode: false,
                arrows: true
            }
        }
    ]
});

//////////////////////////////////
const t = $(".zanim");
const s = $(window);

function e() {
    const e = s.height();
    const o = s.scrollTop();
    var a = o + e;
    $.each(t, function () {
        var e = $(this);
        var t = e.outerHeight();
        var s = e.offset().top;
        var i = s + t;
        if (i >= o && s <= a) {
            e.addClass("animated")
        } else { }
    })
}
$(".dwp-solution-list li").on("click", function () {
    if (s.outerWidth() <= 1024) {
        return
    }
    if ($(this).hasClass("active")) { } else {
        $(".dwp-solution-list li").removeClass("active");
        $(this).addClass("active")
    }
});