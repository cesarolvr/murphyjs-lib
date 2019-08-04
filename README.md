<h1 align="center">
  <a href=""><img src="" width="250"/></a>
  <br>
  murphy.js
</h1>

<h4 align="center">JavaScript vanilla library to scroll based animations </h4>

<blockquote align="center">
  <em>murphy.js</em> is a lightweight JavaScript animation library with a simple implementation way.<br>
  All this works by joining of data-attributes, Web animate API and Intersection Observer.
</blockquote>

<p align="center">
  <a href="#getting-started">Getting started</a>&nbsp;|&nbsp;<a href="#documentation">Documentation</a>&nbsp;|&nbsp;<a href="#demos-and-examples">Demos and examples</a>&nbsp;|&nbsp;<a href="#browser-support">Browser support</a>
</p>

## Getting started

### Download

Via npm

```bash
$ npm install murphyjs
```
or manual [download](https://github.com/juliangarnier/anime/archive/master.zip).


### Usage
Just do three steps:
#### Tagging your HTML

In your markup, decore your element with attribute `data-murphy`.
<br>

```html
<div data-murphy="left-to-right">Any content here</div>
```
The default effect of murphy is `bottom-to-top`, but it's possible use `top-to-bottom`, `left-to-right` and `right-to-left` too.


#### Add to your CSS
In your CSS, reset all the tagged elements.

```css
*[data-murphy] {
  opacity: 0;
}
```

#### Initializing murphy

In Javascript side, just import and run playMurphy when your page is completely loaded to start monitoring decorated elements.

##### Import

```javascript
import { playMurphy, resetMurphy, othersFunctions... } from "murphy";
```
##### And run
```javascript
playMurphy()
```
<br>



## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| ------ | ------ | --------- | ------- | ----- |
| 58+    | 12.1+     | Not supported       | 55+     | 62+   |

