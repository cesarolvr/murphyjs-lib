import config from "./config.js";
import BezierEasing from 'bezier-easing';

const {
  LEFT_TO_RIGHT,
  RIGHT_TO_LEFT,
  TOP_TO_BOTTOM,
  BOTTOM_TO_TOP,
  MURPHY_SELECTOR,
  APPEARANCE_DISTANCE_DEFAULT,
  ELEMENT_DISTANCE_DEFAULT,
  ANIMATION_DELAY_DEFAULT,
  THRESHOLD_DEFAULT,
  ANIMATION_DURATION_DEFAULT,
  BEZIER_EASINGS
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
    element.style.opacity = '1';
    element.style.transform = 'translate(0)';
    element.classList.add('murphy-animated');
    dispatchEvent(element, 'cancel');
  });
};

const reset = () => {
  const elements = document.querySelectorAll(MURPHY_SELECTOR);
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = getInitialTransform(element.dataset.murphy || BOTTOM_TO_TOP, ELEMENT_DISTANCE_DEFAULT);
    element.classList.remove('murphy-animated');
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
  const easeName = element.dataset.murphyEase || 'ease';
  const delay = parseInt(element.dataset.murphyAnimationDelay) || ANIMATION_DELAY_DEFAULT;
  const elementThreshold = parseFloat(element.dataset.murphyElementThreshold) || THRESHOLD_DEFAULT;
  const animationDuration = parseInt(element.dataset.murphyAnimationDuration) || ANIMATION_DURATION_DEFAULT;

  console.log('Animation config:', {
    type: animationType,
    easeName,
  });

  // Set initial state
  element.style.opacity = '0';
  element.style.transform = getInitialTransform(animationType, elementDistance);

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
    ease: easeName,
    delay
  };

  generateIntersectionObserver({ elementOptions, observerOptions });
};

const getInitialTransform = (animationType, distance) => {
  const transforms = {
    [BOTTOM_TO_TOP]: `translateY(${distance}px)`,
    [TOP_TO_BOTTOM]: `translateY(-${distance}px)`,
    [LEFT_TO_RIGHT]: `translateX(-${distance}px)`,
    [RIGHT_TO_LEFT]: `translateX(${distance}px)`
  };
  return transforms[animationType] || transforms[BOTTOM_TO_TOP];
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

  console.log('Generating animation with ease:', {
    ease,
    bezierEasing: BEZIER_EASINGS[ease],
    availableBezierEasings: Object.keys(BEZIER_EASINGS)
  });

  // Add delay using setTimeout
  setTimeout(() => {
    // Get the bezier easing function
    const bezierEasing = BEZIER_EASINGS[ease] || BezierEasing(0.4, 0.0, 0.2, 1);
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = bezierEasing(progress);
      
      // Use the same eased progress for both opacity and transform
      element.style.opacity = easedProgress;

      // Apply transform based on animation type with the same easing
      const transforms = {
        [BOTTOM_TO_TOP]: `translateY(${elementDistance * (1 - easedProgress)}px)`,
        [TOP_TO_BOTTOM]: `translateY(-${elementDistance * (1 - easedProgress)}px)`,
        [LEFT_TO_RIGHT]: `translateX(-${elementDistance * (1 - easedProgress)}px)`,
        [RIGHT_TO_LEFT]: `translateX(${elementDistance * (1 - easedProgress)}px)`
      };

      element.style.transform = transforms[animationType] || transforms[BOTTOM_TO_TOP];
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.opacity = '1';
        element.style.transform = 'translate(0)';
        element.classList.add('murphy-animated');
        dispatchEvent(element, 'finish');
      }
    };
    
    requestAnimationFrame(animate);
  }, delay);
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

// Only attach to window if we're in a browser environment
if (typeof window !== 'undefined') {
  window.murphy = { play, cancel, reset, cleanup };
}

export default { play, cancel, reset, cleanup };