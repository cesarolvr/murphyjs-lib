<h1 align="center">
  <a href=""><img src="" width="250"/></a>
  <br>
  murphy.js
</h1>

<h4 align="center">JavaScript vanilla library to scroll based animations </h4>

<blockquote align="center">
  <em>murphy.js</em> is a lightweight JavaScript animation library with a simple implementation way.<br>
  All this works by joining of data-attributes, Web animate API and Intersection Observer API.
</blockquote>

<p align="center">
  <a href="#why-use-murphy">Why use murphy</a>&nbsp;|&nbsp;<a href="#getting-started">Getting started</a>&nbsp;|&nbsp;<a href="#documentation">Documentation</a>&nbsp;|&nbsp;<a href="#browser-support">Browser support</a>
</p>

<br>

## Why use murphy

- ⚡️ Lightweight library. Only 1KB gzipped.

- 🍎 Easy and fast implementation.

- 🎮 Total control of IntersectionObserver parameters.

- 🎨 Full customization of time, duration, ease, delay and distance of each element individually.

- 🎁 Some animations implemented by default.

- 🏝 Plug and play solution to landing pages and simple projects.

- ❎ Native fallback to not supported browsers.

<br>

## Getting started

### Download

Via npm

```bash
$ npm install murphyjs
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
import { playMurphy } from "murphy";
```
##### And trigger
```javascript
playMurphy()
```

#### That is enough to work! 🤟🏿


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
| data-murphy-delay    | String      | 'bottom-to-top' | - |
| data-murphy-element-threshold    | Int      | 1 | - |
| data-murphy-animation-duration    | Int      | 300 *(ms)* | - |


### Methods

| Method | What happens  |
| ------ | ---------     |
| playMurphy    | Start monitoring on element in DOM tagged with `data-murphy` |
| resetMurphy    | Resets all data-murphy elements to their initial state. |

<br>

## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| ------ | ------ | --------- | ------- | ----- |
| 58+    | 12.1+     | Not *(yet)* supported       | 55+     | 62+   |

