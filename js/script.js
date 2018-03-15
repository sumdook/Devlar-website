// VARIABLES 
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30;
var slideDurationSetting = 600;
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;
var dots = $(".dot").length;
$('.brand-text').hide();

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
        previousItem();
      }
      
      slideDurationTimeout(slideDurationSetting);
    }
  }
  if (currentSlideNumber == 0) {
    $('.brand-text').hide();
  }
  else $('.brand-text').show();
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
    if (currentSlideNumber == 0) {
      $('.brand-text').hide();
    }
    else $('.brand-text').show();

}

$('.dot').on('click', function(e){
    e.preventDefault();
    myFunction($('.dot').index(this));
});


function myFunction(id) {
  if(id>currentSlideNumber)
  {
    n = id-currentSlideNumber;
    for(var i=0;i<n;i++){
      currentSlideNumber++;
        nextItem();
      }
    }
    else{
      n = currentSlideNumber - id + 1;
      for(i=1;i<n;i++){
        currentSlideNumber--;
        previousItem();
      }
   } 
   if (currentSlideNumber == 0) {
    $('.brand-text').hide();
    }
    else $('.brand-text').show();
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38' && currentSlideNumber!=0) {
        currentSlideNumber--;
        previousItem();
    }
    else if (e.keyCode == '40' && currentSlideNumber!=6) {
        currentSlideNumber++;
        nextItem();
    }
    if (currentSlideNumber == 0) {
      $('.brand-text').hide();
    }
    else $('.brand-text').show();

}

 $(function() {      
      //Enable swiping...
      $("section").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
         if(direction == "up" && currentSlideNumber!=6) {
          currentSlideNumber++;
          nextItem();
         }
         else if(direction == "down" && currentSlideNumber!=0){
          currentSlideNumber--;
          previousItem();
         }
         if (currentSlideNumber == 0) {
          $('.brand-text').hide();
        }
        else $('.brand-text').show();
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:10
      });
    });