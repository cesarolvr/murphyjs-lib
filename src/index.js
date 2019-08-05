var LEFT_TO_RIGHT = "left-to-right";
var RIGHT_TO_LEFT = "right-to-left";
var TOP_TO_BOTTOM = "top-to-bottom";
var BOTTOM_TO_TOP = "bottom-to-top";

var murphySelector = "[data-murphy]";

function playMurphy() {
  if (observerIsSupported()) {
    var elements = document.querySelectorAll(murphySelector);
    return elements.forEach(element => {
      startAnimation(element);
    });
  } else {
    return cancelMurphy();
  }
}

function cancelMurphy() {
  var elements = document.querySelectorAll(murphySelector);
  elements.forEach(element => {
    element.style.opacity = 1;
  });
}

function resetMurphy() {
  var elements = document.querySelectorAll(murphySelector);
  resetElements(elements);
}

function startAnimation(element) {
  var animationType = element.dataset.murphy || BOTTOM_TO_TOP;
  var appearanceDistance = element.dataset.murphyAppearanceDistance || 50;
  var elementDistance = element.dataset.murphyElementDistance || 30;
  var ease = element.dataset.murphyEase || "ease";
  var delay = parseInt(element.dataset.murphyAnimationDelay) || 300;
  var elementThreshold = parseInt(element.dataset.murphyElementThreshold) || 1;

  var animationDuration =
    parseInt(element.dataset.murphyAnimationDuration) || 300;

  var observerOptions = {
    threshold: 1,
    rootMargin: `0px 0px ${appearanceDistance * -1}px 0px`
  };

  var elementOptions = {
    element,
    animationType,
    animationDuration,
    elementDistance,
    elementThreshold,
    ease,
    delay
  };

  generateIntersectionObserver({ elementOptions, observerOptions });
}

function generateIntersectionObserver({ elementOptions, observerOptions }) {
  var element = elementOptions.element;
  var animationType = elementOptions.animationType;
  var threshold = observerOptions.elementThreshold;
  var observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        var { intersectionRatio } = entry;
        if (intersectionRatio > 0) {
          generateAnimate(elementOptions, animationType);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      ...observerOptions,
      threshold
    }
  );
  observer.observe(element);
}

function generateAnimate(elementOptions, animationType) {
  var element = elementOptions.element;
  var elementDistance = elementOptions.elementDistance;
  var animationDuration = elementOptions.animationDuration;
  var ease = elementOptions.ease;
  var delay = elementOptions.delay;

  var options = {
    elementDistance
  };

  if (element.animate) {
    element.animate(getAnimationType(animationType, options), {
      duration: animationDuration,
      fill: "forwards",
      easing: ease,
      delay
    });
  } else {
    cancelMurphy();
  }
}

function getAnimationType(animationType, options) {
  switch (animationType) {
    case BOTTOM_TO_TOP:
      return [
        { opacity: "0", transform: `translateY(${options.elementDistance}px)` },
        { opacity: "1", transform: "translateY(0px)" }
      ];
    case TOP_TO_BOTTOM:
      return [
        {
          opacity: "0",
          transform: `translateY(-${options.elementDistance}px)`
        },
        { opacity: "1", transform: "translateY(0px)" }
      ];
    case LEFT_TO_RIGHT:
      return [
        {
          opacity: "0",
          transform: `translateX(-${options.elementDistance}px)`
        },
        { opacity: "1", transform: "translateX(0px)" }
      ];
    case RIGHT_TO_LEFT:
      return [
        { opacity: "0", transform: `translateX(${options.elementDistance}px)` },
        { opacity: "1", transform: "translateX(0px)" }
      ];
    default:
      return [
        { opacity: "0", transform: `translateY(60px)` },
        { opacity: "1", transform: "translateY(0px)" }
      ];
  }
}

function resetElements(elements) {
  elements.forEach(element => {
    element.style.opacity = 0;
    if (observerIsSupported()) {
      element.animate([{ opacity: "0" }, { opacity: "0" }], {
        duration: 1,
        fill: "forwards"
      });
    }
  });
}

function observerIsSupported() {
  if (
    window.IntersectionObserver &&
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype &&
    window.Animation
  ) {
    return true;
  } else {
    return false;
  }
}

export { playMurphy, resetMurphy };
