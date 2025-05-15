# MurphyJS

<div align="center">
  
  <img src="logo.png" alt="MurphyJS Logo" width="600"/>
  <br/><br/>
  <img src="https://img.shields.io/npm/v/murphyjs.svg" alt="npm version" />
  <!-- <img src="https://img.shields.io/bundlephobia/minzip/murphyjs" alt="bundle size" /> -->
  <img src="https://img.shields.io/npm/dm/murphyjs" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/cesarolvr/murphyjs" alt="license" />
  <br />
  <br />

  A lightweight JavaScript library for creating smooth animations with a simple API.
</div>


## Features

- 🚀 Lightweight and fast (only 1.7KB gzipped)
- 🎨 Simple and intuitive API
- 🌈 Beautiful animations
- 📱 Mobile-friendly
- 🎯 No dependencies
- 🎮 Total control of IntersectionObserver parameters
- 🎁 Some animations implemented by default
- 🏝 Plug and play solution to landing pages and simple projects
- ❎ Native fallback to not supported browsers

## Installation

```bash
npm install murphyjs
```

## Quick Start

```javascript
import { Murphy } from 'murphyjs';

// Create a new instance
const murphy = new Murphy();

// Animate elements
murphy.animate('.box', {
  opacity: [0, 1],
  y: [20, 0],
  duration: 1000
});
```

## Usage

### 1. Tag your HTML

In your markup, decorate your element with attribute `data-murphy`:

```html
<div data-murphy="left-to-right">Any content here</div>
```

The default effect of murphy is `bottom-to-top`, but you can also use:
- `top-to-bottom`
- `left-to-right`
- `right-to-left`

### 2. Reset your CSS

In your CSS, reset all the tagged elements:

```css
*[data-murphy] {
  opacity: 0;
}
```

### 3. Start murphy

In JavaScript, import and run `play` when your page is completely loaded:

```javascript
import murphy from "murphyjs";
murphy.play();
```

Or if you're using the script tag:

```html
<script src="./murphy/index.js"></script>
<script>
  murphy.play();
</script>
```

## Configuration

You can configure the animation of each decorated element individually using these attributes:

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| data-murphy | String | 'bottom-to-top' | Animation direction |
| data-murphy-appearance-distance | Int | 50px | Distance from viewport edge to trigger animation |
| data-murphy-element-distance | Int | 30px | Distance the element moves during animation |
| data-murphy-ease | String | 'ease' | Animation easing function (can be a cubic-bezier) |
| data-murphy-animation-delay | Int | 300ms | Delay before animation starts |
| data-murphy-element-threshold | Float | 1.0 | How much of the element needs to be visible to trigger (0-1) |
| data-murphy-animation-duration | Int | 300ms | Duration of the animation |
| data-murphy-root-margin | String | '0px 0px -50px 0px' | Custom root margin for the Intersection Observer |

## API

| Method | Description |
|--------|-------------|
| play() | Start monitoring elements in DOM tagged with `data-murphy` |
| reset() | Resets all data-murphy elements to their initial state |
| cleanup() | Disconnects all Intersection Observers and cleans up resources |

## Browser Support

| Chrome | Safari | Firefox | Opera | Edge |
|--------|--------|---------|-------|------|
| 58+ | 12.1+ | 55+ | 62+ | 79+ |

## Documentation

For detailed documentation and examples, visit our [documentation site](https://cesarolvr.github.io/murphyjs/).

## License

MIT © [Cesar Oliveira](https://github.com/cesarolvr)

