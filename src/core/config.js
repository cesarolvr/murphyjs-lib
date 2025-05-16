import BezierEasing from 'bezier-easing';

const config = {
  LEFT_TO_RIGHT: "left-to-right",
  RIGHT_TO_LEFT: "right-to-left",
  TOP_TO_BOTTOM: "top-to-bottom",
  BOTTOM_TO_TOP: "bottom-to-top",
  MURPHY_SELECTOR: "[data-murphy]",
  APPEARANCE_DISTANCE_DEFAULT: 100,
  ELEMENT_DISTANCE_DEFAULT: 50,
  EASE_DEFAULT: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  ANIMATION_DELAY_DEFAULT: 0,
  THRESHOLD_DEFAULT: 0.1,
  ANIMATION_DURATION_DEFAULT: 300,
  // Bezier easing functions for JavaScript animations
  BEZIER_EASINGS: {
    // Standard CSS timing functions
    'ease': BezierEasing(0.25, 0.1, 0.25, 1),
    'linear': BezierEasing(0, 0, 1, 1),
    'ease-in': BezierEasing(0.42, 0, 1, 1),
    'ease-out': BezierEasing(0, 0, 0.58, 1),
    'ease-in-out': BezierEasing(0.42, 0, 0.58, 1),
    
    // Material Design easings
    'material-standard': BezierEasing(0.4, 0.0, 0.2, 1),
    'material-decelerate': BezierEasing(0.0, 0.0, 0.2, 1),
    'material-accelerate': BezierEasing(0.4, 0.0, 1, 1),
    
    // Custom easings
    'bounce': BezierEasing(0.68, -0.55, 0.265, 1.55),
    'elastic': BezierEasing(0.68, -0.6, 0.32, 1.6),
    'smooth': BezierEasing(0.25, 0.1, 0.25, 1),
    'sharp': BezierEasing(0.4, 0, 0.6, 1),
    'swift': BezierEasing(0.25, 0.1, 0.25, 1),
    'spring': BezierEasing(0.68, -0.6, 0.32, 1.6)
  }
};

export default config;

