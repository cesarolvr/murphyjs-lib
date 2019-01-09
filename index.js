var elements = document.querySelectorAll('section');

function initAnimation(element) {
  var io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const { intersectionRatio } = entry;
      console.log(intersectionRatio);
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

