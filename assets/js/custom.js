document.addEventListener("DOMContentLoaded", () => {

/*
    FADE-IN
*/

var fade_ins = document.querySelectorAll('.fadein');
fade_ins.forEach(element => {
  var element_classes = element.classList["value"];
  if (element_classes.includes("fade1")) {
    reveal(element, 500);
  } else if (element_classes.includes("fade2")) {
    reveal(element, 1000);
  } else {
    reveal(element, 0);
  }
  
  function reveal(element, time) {
    setTimeout(function() {
      element.classList.remove('hidden');
    }, time);
  }
});
/*
    NAVIGATION
*/
  
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
  
  var scroll_down = document.querySelector("#scrollDown");
  var scroll_down_href = scroll_down.getAttribute("href");
  scroll_down.addEventListener("click", function(e){
    e.preventDefault();
    scrollToIt(scroll_down_href)
  });
  scroll_down.addEventListener("touchstart", function(e){
    e.preventDefault();
    scrollToIt(scroll_down_href)
  });
  
  function scrollToIt(anchor) {
    document.querySelector(anchor).scrollIntoView({
      behavior: 'smooth'
    });
  }
  
/*
    MOBILE NAV
*/
  var menu_button = document.querySelector('#MainNav .icon--menu');
  var close_button = document.querySelector('#MainNav .icon--close');
  var mobile_nav_links = document.querySelectorAll('#MainNav .nav--links__portrait a');
  var nav_bg = document.querySelectorAll('.sticky--bg');
  
  [menu_button, close_button].forEach((element) => {
    element.addEventListener("touchstart", function(e){
      e.preventDefault();
      toggle_mobile_icons();
    });
    element.addEventListener("click", function(e){
      e.preventDefault();
      toggle_mobile_icons();
    })
  });
  mobile_nav_links.forEach((link) => {
    link.addEventListener("touchstart", function(e){
      e.preventDefault();
      toggle_mobile_icons();
    });
    link.addEventListener("click", function(e){
      e.preventDefault();
      toggle_mobile_icons();
    })
  });
  
  function toggle_mobile_icons() {
    [menu_button, close_button].forEach((element) => {
      element.classList.toggle("inactive");
    });
    mobile_nav_links.forEach((link) => {
      link.classList.toggle("hidden");
    });
    nav_bg.forEach((bg) => {
      bg.classList.toggle("expanded");
    });
  }
  
/*
    CONTACT FORM
*/

  const form = document.querySelector('#contactForm form');
  const formInputs = form.querySelectorAll("input, textarea");
  const formResponse = document.querySelector('#contactFormResponse p');
  const formButton = document.querySelector('#contactForm button');

  form.onsubmit = e => {
    e.preventDefault();
    
    formButton.disabled = true;
    formButton.className = 'loading';
    formButton.innerHTML = 'Sending...'
    formResponse.className = 'pending';

    // Prepare data to send
    const data = {};
    const formElements = Array.from(formInputs);
    formElements.map(input => (data[input.name] = input.value));

    // Log what our lambda function will receive
    console.log(JSON.stringify(data));
    // Construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON
    xhr.responseType="text";
    xhr.send(JSON.stringify(data));

    // Callback function
    xhr.onloadend = response => {
      if (response.target.status === 200) {
        // The form submission was successful
        form.reset();
        formButton.disabled = true;
        formButton.className = 'sent';
        formButton.innerHTML = 'Sent!';
        formInputs.forEach((element) => {
          element.value = '';
          element.setAttribute('value', "");
        });
        formResponse.className = 'success';
        formResponse.innerHTML = 'Thanks for the message! I’ll be in touch shortly.';
      } else {
        // The form submission failed
        formButton.disabled = false;
        formButton.className = 'button';
        formButton.innerHTML = 'Send';
        formResponse.className = 'fail';
        formResponse.innerHTML = 'Something went wrong. Please try again or send me a message at dorian.wolf@gmail.com';
        console.error(JSON.parse(response.target.response).message);
      }
    };
  };
  
});
