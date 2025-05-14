/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["murphy"] = factory();
	else
		root["murphy"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/config.js":
/*!****************************!*\
  !*** ./src/core/config.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar config = {\n  LEFT_TO_RIGHT: \"left-to-right\",\n  RIGHT_TO_LEFT: \"right-to-left\",\n  TOP_TO_BOTTOM: \"top-to-bottom\",\n  BOTTOM_TO_TOP: \"bottom-to-top\",\n  MURPHY_SELECTOR: \"[data-murphy]\",\n  APPEARANCE_DISTANCE_DEFAULT: 50,\n  ELEMENT_DISTANCE_DEFAULT: 30,\n  EASE_DEFAULT: 'ease',\n  ANIMATION_DELAY_DEFAULT: 300,\n  THRESHOLD_DEFAULT: 1.0,\n  ANIMATION_DURATION_DEFAULT: 300\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://murphy/./src/core/config.js?");

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./src/core/config.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\nvar LEFT_TO_RIGHT = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].LEFT_TO_RIGHT,\n  RIGHT_TO_LEFT = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].RIGHT_TO_LEFT,\n  TOP_TO_BOTTOM = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TOP_TO_BOTTOM,\n  BOTTOM_TO_TOP = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BOTTOM_TO_TOP,\n  MURPHY_SELECTOR = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MURPHY_SELECTOR,\n  APPEARANCE_DISTANCE_DEFAULT = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].APPEARANCE_DISTANCE_DEFAULT,\n  ELEMENT_DISTANCE_DEFAULT = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ELEMENT_DISTANCE_DEFAULT,\n  EASE_DEFAULT = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].EASE_DEFAULT,\n  ANIMATION_DELAY_DEFAULT = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ANIMATION_DELAY_DEFAULT,\n  THRESHOLD_DEFAULT = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].THRESHOLD_DEFAULT,\n  ANIMATION_DURATION_DEFAULT = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ANIMATION_DURATION_DEFAULT;\nvar debounce = function debounce(fn, delay) {\n  var timeoutId;\n  return function () {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(function () {\n      return fn.apply(void 0, args);\n    }, delay);\n  };\n};\nvar play = function play() {\n  if (!murphyWillWork()) return cancel();\n  var elements = document.querySelectorAll(MURPHY_SELECTOR);\n  return elements.forEach(function (element) {\n    startAnimation(element);\n  });\n};\nvar cancel = function cancel() {\n  var elements = document.querySelectorAll(MURPHY_SELECTOR);\n  elements.forEach(function (element) {\n    element.style.opacity = 1;\n    element.animate && element.animate([{\n      opacity: \"1\"\n    }, {\n      opacity: \"1\"\n    }], {\n      duration: 1,\n      fill: \"forwards\"\n    });\n  });\n};\nvar reset = function reset() {\n  var elements = document.querySelectorAll(MURPHY_SELECTOR);\n  elements.forEach(function (element) {\n    element.style.opacity = 0;\n    element.animate && element.animate([{\n      opacity: \"0\"\n    }, {\n      opacity: \"0\"\n    }], {\n      duration: 1,\n      fill: \"forwards\"\n    });\n  });\n};\n\n// Cleanup function to disconnect observers\nvar cleanup = function cleanup() {\n  var elements = document.querySelectorAll(MURPHY_SELECTOR);\n  elements.forEach(function (element) {\n    if (element._observer) {\n      element._observer.disconnect();\n      delete element._observer;\n    }\n  });\n};\nvar startAnimation = function startAnimation(element) {\n  var animationType = element.dataset.murphy || BOTTOM_TO_TOP;\n  var appearanceDistance = element.dataset.murphyAppearanceDistance || APPEARANCE_DISTANCE_DEFAULT;\n  var elementDistance = element.dataset.murphyElementDistance || ELEMENT_DISTANCE_DEFAULT;\n  var ease = element.dataset.murphyEase || EASE_DEFAULT;\n  var delay = parseInt(element.dataset.murphyAnimationDelay) || ANIMATION_DELAY_DEFAULT;\n  var elementThreshold = parseFloat(element.dataset.murphyElementThreshold) || THRESHOLD_DEFAULT;\n  var animationDuration = parseInt(element.dataset.murphyAnimationDuration) || ANIMATION_DURATION_DEFAULT;\n\n  // Configurable root margin for all sides\n  var rootMargin = element.dataset.murphyRootMargin || \"0px 0px \".concat(appearanceDistance * -1, \"px 0px\");\n  var observerOptions = {\n    threshold: elementThreshold,\n    rootMargin: rootMargin\n  };\n  var elementOptions = {\n    element: element,\n    animationType: animationType,\n    animationDuration: animationDuration,\n    elementDistance: elementDistance,\n    ease: ease,\n    delay: delay\n  };\n  generateIntersectionObserver({\n    elementOptions: elementOptions,\n    observerOptions: observerOptions\n  });\n};\nvar generateIntersectionObserver = function generateIntersectionObserver(_ref) {\n  var elementOptions = _ref.elementOptions,\n    observerOptions = _ref.observerOptions;\n  try {\n    var element = elementOptions.element;\n    var _animationType = elementOptions.animationType;\n    var observer = new IntersectionObserver(debounce(function (entries) {\n      entries.forEach(function (entry) {\n        var intersectionRatio = entry.intersectionRatio;\n        if (intersectionRatio > 0) {\n          generateAnimate(elementOptions, _animationType);\n          observer.unobserve(entry.target);\n        }\n      });\n    }, 100), observerOptions);\n\n    // Store observer reference for cleanup\n    element._observer = observer;\n    observer.observe(element);\n  } catch (error) {\n    console.warn('IntersectionObserver not supported:', error);\n    // Fallback to immediate animation\n    generateAnimate(elementOptions, animationType);\n  }\n};\nvar generateAnimate = function generateAnimate(elementOptions, animationType) {\n  var animationDuration = elementOptions.animationDuration;\n  var delay = elementOptions.delay;\n  var element = elementOptions.element;\n  var elementDistance = elementOptions.elementDistance;\n  var ease = elementOptions.ease;\n  var options = {\n    elementDistance: elementDistance\n  };\n  if (!element.animate) return cancel();\n  element.animate(getAnimationType(animationType, options), {\n    duration: animationDuration,\n    fill: \"forwards\",\n    easing: ease,\n    delay: delay\n  });\n};\nvar getAnimationType = function getAnimationType() {\n  var animationType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : BOTTOM_TO_TOP;\n  var options = arguments.length > 1 ? arguments[1] : undefined;\n  var animations = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, BOTTOM_TO_TOP, [{\n    opacity: \"0\",\n    transform: \"translateY(\".concat(options.elementDistance, \"px)\")\n  }, {\n    opacity: \"1\",\n    transform: \"translateY(0px)\"\n  }]), TOP_TO_BOTTOM, [{\n    opacity: \"0\",\n    transform: \"translateY(-\".concat(options.elementDistance, \"px)\")\n  }, {\n    opacity: \"1\",\n    transform: \"translateY(0px)\"\n  }]), LEFT_TO_RIGHT, [{\n    opacity: \"0\",\n    transform: \"translateX(-\".concat(options.elementDistance, \"px)\")\n  }, {\n    opacity: \"1\",\n    transform: \"translateX(0px)\"\n  }]), RIGHT_TO_LEFT, [{\n    opacity: \"0\",\n    transform: \"translateX(\".concat(options.elementDistance, \"px)\")\n  }, {\n    opacity: \"1\",\n    transform: \"translateX(0px)\"\n  }]);\n  return animations[animationType];\n};\nvar observerIsSupported = function observerIsSupported() {\n  return !!(window.IntersectionObserver && \"IntersectionObserver\" in window && \"IntersectionObserverEntry\" in window && \"intersectionRatio\" in window.IntersectionObserverEntry.prototype);\n};\nvar animationIsSupported = function animationIsSupported() {\n  return !!window.Animation;\n};\nvar murphyWillWork = function murphyWillWork() {\n  return animationIsSupported() && observerIsSupported();\n};\nwindow.murphy = {\n  play: play,\n  cancel: cancel,\n  reset: reset,\n  cleanup: cleanup\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  play: play,\n  cancel: cancel,\n  reset: reset,\n  cleanup: cleanup\n});\n\n//# sourceURL=webpack://murphy/./src/core/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/core/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});