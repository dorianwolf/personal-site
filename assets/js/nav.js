document.addEventListener("DOMContentLoaded", () => {
  
  var nav_items = document.querySelectorAll('#MainNav a');
  nav_items.forEach(nav_item => {
    var href = nav_item.getAttribute("href");
    nav_item.addEventListener("click", function(e){
      e.preventDefault();
      scrollToIt(href)
    });
    nav_item.addEventListener("touchstart", function(e){
      e.preventDefault();
      scrollToIt(href)
    });
  });
  
  function scrollToIt(anchor) {
    document.querySelector(anchor).scrollIntoView({
      behavior: 'smooth'
    });
  }
  
  
});

// // Line drawing animation

// document.addEventListener("DOMContentLoaded", () => {
//   var imagePath = document.querySelector('#animationLine path');
//   var pathLength = imagePath.getTotalLength();
//
//   imagePath.style.strokeDasharray = pathLength;
//   imagePath.style.strokeDashoffset = pathLength;
//
//   window.addEventListener("scroll", function(e) {
//
//     var scrollPercentage = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
//
//     var drawLength = (pathLength*scrollPercentage);
//
//     imagePath.style.strokeDashoffset = (pathLength - drawLength);
//   });
// });
