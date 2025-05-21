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

const play = (group) => {
  if (!murphyWillWork()) return cancel();
  let selector = MURPHY_SELECTOR;
  if (group) selector += `[data-murphy-group="${group}"]`;
  const elements = document.querySelectorAll(selector);
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

const reset = (group) => {
  let selector = MURPHY_SELECTOR;
  if (group) selector += `[data-murphy-group="${group}"]`;
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    // Force element to final state before animating back
    element.style.opacity = '1';
    element.style.transform = 'none';
    // Force reflow
    void element.offsetWidth;

    // Get the current animation configuration
    const animationType = element.dataset.murphy || BOTTOM_TO_TOP;
    const elementDistance = element.dataset.murphyElementDistance || ELEMENT_DISTANCE_DEFAULT;
    const duration = parseInt(element.dataset.murphyAnimationDuration) || ANIMATION_DURATION_DEFAULT;
    const ease = element.dataset.murphyEase || config.EASE_DEFAULT;

    // Create reverse animation
    const cubicBezierValue = getEasingValue(ease);
    const initialTransform = getInitialTransform(animationType, elementDistance);
    
    const animation = element.animate(
      [
        {
          transform: 'none',
          opacity: 1
        },
        {
          transform: initialTransform,
          opacity: 0
        }
      ],
      {
        duration,
        easing: cubicBezierValue,
        fill: 'forwards'
      }
    );

    // Store animation reference
    element._animation = animation;

    // Handle animation completion
    animation.onfinish = () => {
      // Remove all murphy-related classes
      element.classList.remove('murphy-animated');
      element.classList.remove('murphy-in');
      element.classList.remove('murphy-out');
      
      // Reset animation reference
      delete element._animation;
      
      // Re-observe the element
      if (element._observer) {
        element._observer.disconnect();
        delete element._observer;
      }
      
      dispatchEvent(element, 'reset');
    };
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

  // Set initial state
  element.style.opacity = '0';
  element.style.transform = getInitialTransform(animationType, elementDistance);

  // Handle viewport position aliases
  let rootMargin = element.dataset.murphyRootMargin;
  if (rootMargin) {
    // Check if the value is an alias
    const alias = rootMargin.toUpperCase();
    if (config.VIEWPORT_POSITIONS[alias]) {
      rootMargin = config.VIEWPORT_POSITIONS[alias];
    }
  } else {
    rootMargin = `0px 0px ${appearanceDistance * -1}px 0px`;
  }

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
    delay,
    elementThreshold
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
    const shouldMirror = element.dataset.murphyMirror === 'true';
    
    const observer = new IntersectionObserver(
      debounce(entries => {
        entries.forEach(entry => {
          const { intersectionRatio } = entry;
          const elementThreshold = Number(elementOptions.elementThreshold) || 0;
          
          // Add a small buffer to prevent rapid toggling
          const buffer = 0.05;
          const isFullyInView = intersectionRatio >= (elementThreshold - buffer);
          const isFullyOutOfView = intersectionRatio <= buffer;
          const isInBufferZone = intersectionRatio > buffer && intersectionRatio < (elementThreshold - buffer);
          
          // Only trigger animations when fully in or out of view, ignoring buffer zone
          if (isFullyInView && !isInBufferZone) {
            const animate = generateAnimate(element, {
              delay: elementOptions.delay,
              duration: elementOptions.animationDuration,
              easing: elementOptions.ease,
              distance: elementOptions.elementDistance,
              direction: animationType
            });
            animate();
            if (!shouldMirror) {
              observer.unobserve(entry.target);
            }
            dispatchEvent(element, 'in', { intersectionRatio });
          } else if (shouldMirror && isFullyOutOfView && !isInBufferZone) {
            // Play animation in reverse only when fully out of view
            const reverseAnimate = generateAnimate(element, {
              delay: 0,
              duration: elementOptions.animationDuration,
              easing: elementOptions.ease,
              distance: elementOptions.elementDistance,
              direction: animationType,
              reverse: true
            });
            reverseAnimate();
            dispatchEvent(element, 'out', { intersectionRatio });
          }
          // Ignore intermediate states in buffer zone to prevent blinking
        });
      }, 100),
      observerOptions
    );

    // Store observer reference for cleanup
    element._observer = observer;
    observer.observe(element);
  } catch (error) {
    // Fallback to immediate animation
    const animate = generateAnimate(element, {
      delay: elementOptions.delay,
      duration: elementOptions.animationDuration,
      easing: elementOptions.ease,
      distance: elementOptions.elementDistance,
      direction: animationType
    });
    animate();
    dispatchEvent(element, 'in', { error: 'IntersectionObserver not supported' });
  }
};

function generateAnimate(element, options) {
  const {
    delay = config.ANIMATION_DELAY_DEFAULT,
    duration = config.ANIMATION_DURATION_DEFAULT,
    easing = config.EASE_DEFAULT,
    distance = config.ELEMENT_DISTANCE_DEFAULT,
    direction = config.LEFT_TO_RIGHT,
    reverse = false
  } = options;

  // Validate animation parameters
  const validDuration = Math.max(0, Number(duration) || config.ANIMATION_DURATION_DEFAULT);
  const validDelay = Math.max(0, Number(delay) || config.ANIMATION_DELAY_DEFAULT);
  const validDistance = Math.max(0, Number(distance) || config.ELEMENT_DISTANCE_DEFAULT);

  return () => {
    setTimeout(() => {
      const cubicBezierValue = getEasingValue(easing);
      
      // Get animation configuration based on direction
      const animationConfig = config.ANIMATION_CONFIGS[direction] || {
        transform: getTransformValue(direction, validDistance),
        opacity: 0
      };

      // Create animation with reversed keyframes if needed
      const animation = element.animate(
        reverse ? [
          {
            transform: 'none',
            opacity: 1
          },
          animationConfig
        ] : [
          animationConfig,
          {
            transform: 'none',
            opacity: 1
          }
        ],
        {
          duration: validDuration,
          easing: cubicBezierValue,
          fill: 'forwards'
        }
      );

      // Store animation reference for reset
      element._animation = animation;

      animation.onfinish = () => {
        if (!reverse) {
          element.classList.add('murphy-animated');
        } else {
          element.classList.remove('murphy-animated');
        }
        dispatchEvent(element, 'finish', { reverse });
      };
    }, validDelay);
  };
}

function getTransformValue(direction, distance) {
  switch (direction) {
    case config.LEFT_TO_RIGHT:
      return `translateX(-${distance}px)`;
    case config.RIGHT_TO_LEFT:
      return `translateX(${distance}px)`;
    case config.TOP_TO_BOTTOM:
      return `translateY(-${distance}px)`;
    case config.BOTTOM_TO_TOP:
      return `translateY(${distance}px)`;
    default:
      return 'none';
  }
}

function getEasingValue(easing) {
  if (typeof easing === 'string') {
    // Check if it's a cubic-bezier value
    if (easing.startsWith('cubic-bezier')) {
      return easing;
    }
    // Check if it's a predefined easing
    const bezierPoints = config.BEZIER_EASINGS[easing];
    if (bezierPoints && Array.isArray(bezierPoints) && bezierPoints.length === 4) {
      return `cubic-bezier(${bezierPoints.join(', ')})`;
    }
  }
  return config.EASE_DEFAULT;
}

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

class Murphy {
  constructor() {
    if (!murphyWillWork()) {
      console.warn('MurphyJS: Your browser does not support required features');
    }
  }

  animate(selector, options) {
    const elements = document.querySelectorAll(selector);
    const {
      opacity = [0, 1],
      x = [0, 0],
      y = [0, 0],
      duration = 1000,
      delay = 0,
      ease = 'ease'
    } = options;

    elements.forEach(element => {
      // Set initial state
      element.style.opacity = opacity[0];
      element.style.transform = `translate(${x[0]}px, ${y[0]}px)`;

      // Add delay using setTimeout
      setTimeout(() => {
        const bezierEasing = BEZIER_EASINGS[ease] || BezierEasing(0.4, 0.0, 0.2, 1);
        const startTime = performance.now();
        
        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = bezierEasing(progress);
          
          // Interpolate values
          const currentOpacity = opacity[0] + (opacity[1] - opacity[0]) * easedProgress;
          const currentX = x[0] + (x[1] - x[0]) * easedProgress;
          const currentY = y[0] + (y[1] - y[0]) * easedProgress;
          
          element.style.opacity = currentOpacity;
          element.style.transform = `translate(${currentX}px, ${currentY}px)`;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            element.style.opacity = opacity[1];
            element.style.transform = `translate(${x[1]}px, ${y[1]}px)`;
            dispatchEvent(element, 'finish');
          }
        };
        
        requestAnimationFrame(animate);
      }, delay);
    });
  }
}

// Only attach to window if we're in a browser environment
if (typeof window !== 'undefined') {
  window.murphy = { play, cancel, reset, cleanup };
  window.Murphy = Murphy;
}

export { play, cancel, reset, cleanup, Murphy };
export default { play, cancel, reset, cleanup, Murphy };