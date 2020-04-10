document.addEventListener("DOMContentLoaded", () => {
  
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
  
  function scrollToIt(anchor) {
    document.querySelector(anchor).scrollIntoView({
      behavior: 'smooth'
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
