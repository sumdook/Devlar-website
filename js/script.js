// VARIABLES 
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30;
var slideDurationSetting = 600;
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;
var dots = $(".dot").length;

//DETERMINE DELTA/SCROLL DIRECTION 
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
        
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
        console.log(delta);
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}


function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

//EVENT LISTENER
var mousewheelEvent = isFirefox ? "mousewheel" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// SLIDE MOTION 
function nextItem() {
  if(currentSlideNumber==6){
    var $slide = $(".background").eq(currentSlideNumber);
    console.log("thanks");
    $slide.removeClass("down-scrolltwo").addClass("last-down-scroll ");
    $('.dot-container').css('top','14vh');
    $('.scroll-inst').css('top','15vh');
  }
  else{
  var $nextSlide = $(".background").eq(currentSlideNumber);
  var $next2Slide = $(".background").eq(currentSlideNumber+1);
  $nextSlide.removeClass("down-scrolltwo").removeClass("up-scroll").addClass("down-scroll");
  $next2Slide.removeClass("down-scrolltwo").addClass("down-scrolltwo");

  var $currentDot= $(".dot").eq(currentSlideNumber);
  var $prevDot = $(".dot").eq(currentSlideNumber-1);
  $prevDot.removeClass("current");
  $currentDot.addClass("current");
  }

  console.log(currentSlideNumber);
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber+1);
  var $nextSlide = $(".background").eq(currentSlideNumber+2);
  $currentSlide.removeClass("down-scroll").removeClass("last-down-scroll").removeClass("up-scrolltwo").addClass("up-scroll");
  $nextSlide.removeClass("down-scrolltwo").removeClass("up-scroll").addClass("up-scrolltwo");
  var $currentDot= $(".dot").eq(currentSlideNumber);
  var $nextDot = $(".dot").eq(currentSlideNumber+1);
  $nextDot.removeClass("current");
  $currentDot.addClass("current");
  $('.dot-container').css('top','87vh');
  $('.scroll-inst').css('top','88vh');
}

function reset(){
  for (var i = $(".background").length - 1; i >= 0; i--) {
    $(".background").eq(i).removeClass("down-scroll").removeClass("last-down-scroll").removeClass("up-scroll").removeClass("down-scrolltwo").removeClass("up-scrolltwo").addClass("background");
      $(".dot").eq(i).removeClass().addClass("dot");
      $(".dot").eq(0).addClass("current");
      currentSlideNumber = 0; 
    }

}