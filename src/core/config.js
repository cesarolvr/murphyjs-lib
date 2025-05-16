import BezierEasing from 'bezier-easing';

const config = {
  // Basic animations
  LEFT_TO_RIGHT: "left-to-right",
  RIGHT_TO_LEFT: "right-to-left",
  TOP_TO_BOTTOM: "top-to-bottom",
  BOTTOM_TO_TOP: "bottom-to-top",
  
  // Flip animations
  FLIP_LEFT: "flip-left",
  FLIP_RIGHT: "flip-right",
  FLIP_UP: "flip-up",
  FLIP_DOWN: "flip-down",
  
  // Zoom animations
  ZOOM_IN: "zoom-in",
  ZOOM_OUT: "zoom-out",
  
  // Fade animations
  FADE: "fade",
  FADE_UP: "fade-up",
  FADE_DOWN: "fade-down",
  FADE_LEFT: "fade-left",
  FADE_RIGHT: "fade-right",
  
  // Rotate animations
  ROTATE_LEFT: "rotate-left",
  ROTATE_RIGHT: "rotate-right",
  
  // Scale animations
  SCALE_UP: "scale-up",
  SCALE_DOWN: "scale-down",
  
  // Slide animations
  SLIDE_UP: "slide-up",
  SLIDE_DOWN: "slide-down",
  SLIDE_LEFT: "slide-left",
  SLIDE_RIGHT: "slide-right",
  
  // Bounce animations
  BOUNCE_IN: "bounce-in",
  BOUNCE_OUT: "bounce-out",
  
  MURPHY_SELECTOR: "[data-murphy]",
  APPEARANCE_DISTANCE_DEFAULT: 100,
  ELEMENT_DISTANCE_DEFAULT: 50,
  EASE_DEFAULT: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  ANIMATION_DELAY_DEFAULT: 0,
  THRESHOLD_DEFAULT: 0.1,
  ANIMATION_DURATION_DEFAULT: 300,
  
  // Animation configurations
  ANIMATION_CONFIGS: {
    // Flip animations
    'flip-left': {
      transform: 'rotateY(-90deg)',
      transformOrigin: 'left center',
      opacity: 0
    },
    'flip-right': {
      transform: 'rotateY(90deg)',
      transformOrigin: 'right center',
      opacity: 0
    },
    'flip-up': {
      transform: 'rotateX(-90deg)',
      transformOrigin: 'center top',
      opacity: 0
    },
    'flip-down': {
      transform: 'rotateX(90deg)',
      transformOrigin: 'center bottom',
      opacity: 0
    },
    
    // Zoom animations
    'zoom-in': {
      transform: 'scale(0.5)',
      opacity: 0
    },
    'zoom-out': {
      transform: 'scale(1.5)',
      opacity: 0
    },
    
    // Fade animations
    'fade': {
      opacity: 0
    },
    'fade-up': {
      transform: 'translateY(20px)',
      opacity: 0
    },
    'fade-down': {
      transform: 'translateY(-20px)',
      opacity: 0
    },
    'fade-left': {
      transform: 'translateX(20px)',
      opacity: 0
    },
    'fade-right': {
      transform: 'translateX(-20px)',
      opacity: 0
    },
    
    // Rotate animations
    'rotate-left': {
      transform: 'rotate(-180deg)',
      opacity: 0
    },
    'rotate-right': {
      transform: 'rotate(180deg)',
      opacity: 0
    },
    
    // Scale animations
    'scale-up': {
      transform: 'scale(0.5)',
      opacity: 0
    },
    'scale-down': {
      transform: 'scale(1.5)',
      opacity: 0
    },
    
    // Slide animations
    'slide-up': {
      transform: 'translateY(100%)',
      opacity: 0
    },
    'slide-down': {
      transform: 'translateY(-100%)',
      opacity: 0
    },
    'slide-left': {
      transform: 'translateX(100%)',
      opacity: 0
    },
    'slide-right': {
      transform: 'translateX(-100%)',
      opacity: 0
    },
    
    // Bounce animations
    'bounce-in': {
      transform: 'scale(0.3)',
      opacity: 0
    },
    'bounce-out': {
      transform: 'scale(1.2)',
      opacity: 0
    }
  },
  
  // Bezier easing functions for JavaScript animations
  BEZIER_EASINGS: {
    // Standard CSS timing functions
    'ease': [0.25, 0.1, 0.25, 1],
    'linear': [0, 0, 1, 1],
    'ease-in': [0.42, 0, 1, 1],
    'ease-out': [0, 0, 0.58, 1],
    'ease-in-out': [0.42, 0, 0.58, 1],
    
    // Material Design easings
    'material-standard': [0.4, 0.0, 0.2, 1],
    'material-decelerate': [0.0, 0.0, 0.2, 1],
    'material-accelerate': [0.4, 0.0, 1, 1],
    
    // Custom easings
    'bounce': [0.68, -0.55, 0.265, 1.55],
    'elastic': [0.68, -0.6, 0.32, 1.6],
    'smooth': [0.25, 0.1, 0.25, 1],
    'sharp': [0.4, 0, 0.6, 1],
    'swift': [0.25, 0.1, 0.25, 1],
    'spring': [0.68, -0.6, 0.32, 1.6]
  }
};

export default config;

