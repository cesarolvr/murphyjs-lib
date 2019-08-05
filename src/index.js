import config from "./core/config.js";

const {
  LEFT_TO_RIGHT,
  RIGHT_TO_LEFT,
  TOP_TO_BOTTOM,
  BOTTOM_TO_TOP,
  MURPHY_SELECTOR
} = config;

const play = () => {
  if (murphyWillWorks()) {
    var elements = document.querySelectorAll(MURPHY_SELECTOR);

    return elements.forEach(element => {
      startAnimation(element);
    });
  } else {
    return cancel();
  }
};

const cancel = () => {
  var elements = document.querySelectorAll(MURPHY_SELECTOR);
  elements.forEach(element => {
    element.style.opacity = 1;
  });
};

const reset = () => {
  var elements = document.querySelectorAll(MURPHY_SELECTOR);
  elements.forEach(element => {
    element.style.opacity = 0;
    if (element.animate) {
      element.animate([{ opacity: "0" }, { opacity: "0" }], {
        duration: 1,
        fill: "forwards"
      });
    }
  });
};

const startAnimation = element => {
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
};

const generateIntersectionObserver = ({ elementOptions, observerOptions }) => {
  const element = elementOptions.element;
  const animationType = elementOptions.animationType;
  const threshold = observerOptions.elementThreshold;

  const observer = new IntersectionObserver(
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
};

const generateAnimate = (elementOptions, animationType) => {
  const animationDuration = elementOptions.animationDuration;
  const delay = elementOptions.delay;
  const element = elementOptions.element;
  const elementDistance = elementOptions.elementDistance;
  const ease = elementOptions.ease;

  const options = {
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
    cancel();
  }
};

const getAnimationType = (animationType = BOTTOM_TO_TOP, options) => {
  const animations = {
    [BOTTOM_TO_TOP]: [
      { opacity: "0", transform: `translateY(${options.elementDistance}px)` },
      { opacity: "1", transform: "translateY(0px)" }
    ],
    [TOP_TO_BOTTOM]: [
      {
        opacity: "0",
        transform: `translateY(-${options.elementDistance}px)`
      },
      { opacity: "1", transform: "translateY(0px)" }
    ],
    [LEFT_TO_RIGHT]: [
      {
        opacity: "0",
        transform: `translateX(-${options.elementDistance}px)`
      },
      { opacity: "1", transform: "translateX(0px)" }
    ],
    [RIGHT_TO_LEFT]: [
      { opacity: "0", transform: `translateX(${options.elementDistance}px)` },
      { opacity: "1", transform: "translateX(0px)" }
    ]
  };

  return animations[animationType];
};

const observerIsSupported = () => {
  if (
    window.IntersectionObserver &&
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
  ) {
    return true;
  } else {
    return false;
  }
};

const animationIsSupported = () => {
  if (window.Animation) {
    return true;
  } else {
    return false;
  }
};

const murphyWillWorks = () => {
  return animationIsSupported() && observerIsSupported();
};

window.murphy = { play, cancel, reset };
exports.default = { play, cancel, reset };
