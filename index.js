var elements = document.querySelectorAll('*[data-motion]');

function initAnimation(element) {
  var io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const { intersectionRatio } = entry;
      if (intersectionRatio > 0) {
        element.classList.remove('hidden')
        element.classList.add('animated');
      } else {
        element.classList.remove('animated');
        element.classList.add('hidden');
      };
    })
  });
  io.observe(element);
};


elements.forEach(element => {
  initAnimation(element);
});

