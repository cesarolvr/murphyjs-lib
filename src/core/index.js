import config from "./config.js";

const {
  LEFT_TO_RIGHT,
  RIGHT_TO_LEFT,
  TOP_TO_BOTTOM,
  BOTTOM_TO_TOP,
  MURPHY_SELECTOR,
  APPEARANCE_DISTANCE_DEFAULT,
  ELEMENT_DISTANCE_DEFAULT,
  EASE_DEFAULT,
  ANIMATION_DELAY_DEFAULT,
  THRESHOLD_DEFAULT,
  ANIMATION_DURATION_DEFAULT,
  EASINGS
} = config;

// Event system
const dispatchEvent = (element, eventName, detail = {}) => {
  const event = new CustomEvent(`murphy:${eventName}`, {
    detail: { element, ...detail }
  });
  document.dispatchEvent(event);
};

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const play = () => {
  if (!murphyWillWork()) return cancel();
  const elements = document.querySelectorAll(MURPHY_SELECTOR);

  return elements.forEach(element => {
    startAnimation(element);
  });
};

const cancel = () => {
  const elements = document.querySelectorAll(MURPHY_SELECTOR);
  elements.forEach(element => {
    element.style.opacity = 1;
    element.animate &&
      element.animate([{ opacity: "1" }, { opacity: "1" }], {
        duration: 1,
        fill: "forwards"
      });
    dispatchEvent(element, 'cancel');
  });
};

const reset = () => {
  const elements = document.querySelectorAll(MURPHY_SELECTOR);
  elements.forEach(element => {
    element.style.opacity = 0;
    element.animate &&
      element.animate([{ opacity: "0" }, { opacity: "0" }], {
        duration: 1,
        fill: "forwards"
      });
    dispatchEvent(element, 'reset');
  });
};

// Cleanup function to disconnect observers
const cleanup = () => {
  const elements = document.querySelectorAll(MURPHY_SELECTOR);
  elements.forEach(element => {
    if (element._observer) {
      element._observer.disconnect();
      delete element._observer;
    }
    dispatchEvent(element, 'cleanup');
  });
};

const startAnimation = element => {
  const animationType = element.dataset.murphy || BOTTOM_TO_TOP;
  const appearanceDistance = element.dataset.murphyAppearanceDistance || APPEARANCE_DISTANCE_DEFAULT;
  const elementDistance = element.dataset.murphyElementDistance || ELEMENT_DISTANCE_DEFAULT;
  const ease = element.dataset.murphyEase ? EASINGS[element.dataset.murphyEase] || element.dataset.murphyEase : EASE_DEFAULT;
  const delay = parseInt(element.dataset.murphyAnimationDelay) || ANIMATION_DELAY_DEFAULT;
  const elementThreshold =
    parseFloat(element.dataset.murphyElementThreshold) || THRESHOLD_DEFAULT;
  const animationDuration =
    parseInt(element.dataset.murphyAnimationDuration) || ANIMATION_DURATION_DEFAULT;

  // Apply easing function directly to the element's style
  element.style.transitionTimingFunction = ease;

  // Configurable root margin for all sides
  const rootMargin = element.dataset.murphyRootMargin || 
    `0px 0px ${appearanceDistance * -1}px 0px`;

  const observerOptions = {
    threshold: elementThreshold,
    rootMargin
  };

  const elementOptions = {
    element,
    animationType,
    animationDuration,
    elementDistance,
    ease,
    delay
  };

  generateIntersectionObserver({ elementOptions, observerOptions });
};

const generateIntersectionObserver = ({ elementOptions, observerOptions }) => {
  try {
    const element = elementOptions.element;
    const animationType = elementOptions.animationType;
    
    const observer = new IntersectionObserver(
      debounce(entries => {
        entries.forEach(entry => {
          const { intersectionRatio } = entry;
          if (intersectionRatio > 0) {
            generateAnimate(elementOptions, animationType);
            observer.unobserve(entry.target);
            dispatchEvent(element, 'in', { intersectionRatio });
          } else {
            dispatchEvent(element, 'out', { intersectionRatio });
          }
        });
      }, 100),
      observerOptions
    );

    // Store observer reference for cleanup
    element._observer = observer;
    observer.observe(element);
  } catch (error) {
    console.warn('IntersectionObserver not supported:', error);
    // Fallback to immediate animation
    generateAnimate(elementOptions, animationType);
    dispatchEvent(element, 'in', { error: 'IntersectionObserver not supported' });
  }
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

  if (!element.animate) {
    cancel();
    return;
  }

  const animation = element.animate(getAnimationType(animationType, options), {
    duration: animationDuration,
    fill: "forwards",
    easing: ease,
    delay
  });

  animation.onfinish = () => {
    dispatchEvent(element, 'finish');
  };
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
  return !!(
    window.IntersectionObserver &&
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
  );
};

const animationIsSupported = () => {
  return !!window.Animation;
};

const murphyWillWork = () => {
  return animationIsSupported() && observerIsSupported();
};

window.murphy = { play, cancel, reset, cleanup };
export default { play, cancel, reset, cleanup };