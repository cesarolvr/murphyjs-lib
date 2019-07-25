var elements = document.querySelectorAll('*[data-motion]');

function initAnimation(element) {
  // console.log(element.dataset.motion);
  var animationType = element.dataset.motion;
  var io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const { intersectionRatio } = entry;
      if (intersectionRatio > 0) {
        element.setAttribute('data-motion', animationType);
        io.unobserve(entry.target);
      } else {
        // element.classList.remove('animated');
        element.removeAttribute('data-motion')
        // element.classList.add('hidden');
      };
    })
  });
  io.observe(element);
};


elements.forEach(element => {
  initAnimation(element);
});

