## Building...

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


#### Via ES6 modules

```javascript
import { playMurphy, resetMurphy, othersFunctions... } from "murphy";
```

#### Via file include

Link `murphy.js` in your HTML:

```html
<script src="murphy.js"></script>
```

#### Initializing murphy


In Javascript side, just run playMurphy when your page is completely loaded to start monitoring decorated elements.

```javascript
playMurphy()
```

In your markup, decore your element with attribute `data-murphy`.
<br>
The default effect of murphy is `bottom-to-top`, but it's possible pass the name of animation, like below:

```html
<div data-murphy="left-to-right">Any content here</div>
```

Other default animations are: 
<br>
* `bottom-to-top` 
* `top-to-bottom`
* `left-to-right`
* `right-to-left`



## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| ------ | ------ | --------- | ------- | ----- |
| 24+    | 8+     | 11+       | 32+     | 15+   |

