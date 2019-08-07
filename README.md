<h5 align="center">
<img src="https://raw.githubusercontent.com/cesarolvr/murphyjs/master/murphyjs-logo.png" width="450"/>
</h5>

<h4 align="center">A JavaScript vanilla library to scroll based reveal animations </h4>

<p align="center">
  <em>murphy.js</em> is a lightweight JavaScript animation library with a simple implementation way.<br>
  All this works by joining of data-attributes, Web animate API and Intersection Observer API.
</p>

<p align="center">
  <a href="https://cesarolvr.github.io/murphyjs/index.html" target="_blank">Demo</a>&nbsp;|&nbsp;<a href="#why-use-murphy">Why use murphy</a>&nbsp;|&nbsp;<a href="#getting-started">Getting started</a>&nbsp;|&nbsp;<a href="#examples">Examples</a>&nbsp;|&nbsp;<a href="#documentation">Documentation</a>&nbsp;|&nbsp;<a href="#browser-support">Browser support</a>
</p>

<br>

## Why use murphy

- ⚡️ Lightweight library (only 1.7KB gzipped).

- 🍎 Easy and fast implementation.

- 🎮 Total control of IntersectionObserver parameters.

- 🎨 Full customization of time, duration, ease, delay and distance of each element individually.

- 🎁 Some animations implemented by default.

- 🏝 Plug and play solution to landing pages and simple projects.

- ❎ Native fallback to not supported browsers.

<br>

## Getting started

### Download

Via npm:

```bash
$ npm install murphyjs
```

Via file include:

Download file [here](https://raw.githubusercontent.com/cesarolvr/murphyjs/master/dist/index.js) and link in your HTML.
```html
<script src="./murphy/index.js"></script>
```


### Usage
Just do three steps:

#### ⛳ &nbsp; Tag your HTML

In your markup, decore your element with attribute `data-murphy`.
<br>

```html
<div data-murphy="left-to-right">Any content here</div>
```
The default effect of murphy is `bottom-to-top`, but it's possible use `top-to-bottom`, `left-to-right` and `right-to-left` too.


#### 🔌 &nbsp; Reset your CSS
In your CSS, reset all the tagged elements.

```css
*[data-murphy] {
  opacity: 0;
}
```

#### 🚀 &nbsp; Start murphy

In Javascript side, just import and run playMurphy when your page is completely loaded to start monitoring decorated elements.

##### Import

```javascript
import murphy from "murphyjs";
```
##### And trigger
```javascript
murphy.play()
```

#### Or call from window

If you added murphy via **file include**, just access murphy's functions in window:
```javascript
window.murphy.play()
// or just
murphy.play()
```

#### That is enough to work! 🤟🏿

<br>

## Examples

#### 1. This `data-attributes`:
```html
<p data-murphy="bottom-to-top">Bottom to top</p>
<p data-murphy="top-to-bottom">Top to bottom</p>
<p data-murphy="left-to-right">Left to right</p>
<p data-murphy="right-to-left">Right to left</p>
```

####    Will result in that:

<img src="https://raw.githubusercontent.com/cesarolvr/murphyjs/master/all.gif" width="450"/>

#### 2. To do the same effect that murphy's logo, use:
```html
<p data-murphy="bottom-to-top">m</p>
<p data-murphy="bottom-to-top" data-murphy-animation-delay="400">u</p>
<p data-murphy="bottom-to-top" data-murphy-animation-delay="500">r</p>
<p data-murphy="bottom-to-top" data-murphy-animation-delay="600">p</p>
<p data-murphy="bottom-to-top" data-murphy-animation-delay="700">h</p>
<p data-murphy="bottom-to-top" data-murphy-animation-delay="800">y</p>
<p data-murphy="bottom-to-top" data-murphy-animation-delay="900">.</p>
<p data-murphy="bottom-to-top" data-murphy-animation-delay="1000">j</p>
<p data-murphy="bottom-to-top" data-murphy-animation-delay="1100">s</p>
```

####    Result:
<img src="https://raw.githubusercontent.com/cesarolvr/murphyjs/master/logo.gif" width="450"/>

<br>

#### 🚨 Important
> These animations are triggered when scrolling the page, but when the tagged elements are already within the bounds of the screen, everything works like appearance animations that React Transition Group already does.
So if you need animations on the first load of site, murphy is for you!


<br>

## Documentation

### Attributes
You can configure the animation of each decorated element individually. Beyond the `data-murphy` attribute, other attributes are available:
<br>

| Attribute | Value type | Default value  | What controls  |
| ------ | ------     | --------- | --------- |
| data-murphy    | String      | 'bottom-to-top' | - |
| data-murphy-appearance-distance    | Int      | 50 *(px)* | - |
| data-murphy-element-distance    | Int      | 30 *(px)* | - |
| data-murphy-ease    | String      | 'ease' *(can be a cubic-bezier)* | - |
| data-murphy-animation-delay    | Int      | 300 *(ms)* | - |
| data-murphy-element-threshold    | Int      | 1 | - |
| data-murphy-animation-duration    | Int      | 300 *(ms)* | - |


### Methods

| Method | What happens  |
| ------ | ---------     |
| play    | Start monitoring on element in DOM tagged with `data-murphy` |
| reset    | Resets all data-murphy elements to their initial state. |

<br>

## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| ------ | ------ | --------- | ------- | ----- |
| 58+    | 12.1+     | Not *(yet)* supported       | 55+     | 62+   |


## License

The code is available under the [MIT License](LICENSE.md).

