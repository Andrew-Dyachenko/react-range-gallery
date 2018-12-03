# react-range-gallery

> Simple react gallery with range control

[![NPM](https://img.shields.io/npm/v/react-range-gallery.svg)](https://www.npmjs.com/package/react-range-gallery) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo
[http://react-range-gallery.tech/](http://react-range-gallery.tech/)

## Attention!
The project is at the stage of **early development**. Project is't stable yet. Please use it if you really need!

## Touch
NO touch events yet supported! Will coming with *-beta*...

## Install

```bash
npm install --save react-range-gallery
```

or

```bash
yarn add react-range-gallery
```

## Usage

Usage example implies to use [create-react-app](https://facebook.github.io/create-react-app/) boilerplate

> App.js

```jsx
import React, { Component } from 'react'
import RangeGallery from 'react-range-gallery'

export default class App extends Component {
    render() {
        return (
            <RangeGallery>
                {
                    Array(20)
                        .fill(0)
                        .map((element, index) => {
                            return (
                                <img
                                    src="https://loremflickr.com/g/480/480/owl/all"
                                    alt={`Example ${index}`}
                                    key={index}/>
                            )
                        })
                }
            </RangeGallery>
        )
    }
}
```

#### Lazy images load

> App.js

```jsx
import React, { Component } from 'react'
import RangeGallery, { RangeLazyImage } from 'react-range-gallery'
const preloader = 'http://react-range-gallery.tech/preloader.gif'

export default class App extends Component {
    render() {
        return (
            <RangeGallery>
                {
                    Array(20)
                        .fill(0)
                        .map((element, index) => {
                            return (
                                <RangeLazyImage
                                    src="https://loremflickr.com/g/480/480/owl/all"
                                    alt={`Example ${index}`}
                                    key={index}
                                    fakeSrc={preloader}/>
                            )
                        })
                }
            </RangeGallery>
        )
    }
}
```
> The `RangeLazyImage` is based on **react-lazy-images**, which you can optionally read about [here](https://github.com/fpapado/react-lazy-images).

>index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## API Reference

| Name                   | Type                                     | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | isRequired | Description                                                                                                                                                                                                              |
|------------------------|------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **children**           | Array&nbsp;of&nbsp;Nodes<br> or<br> Node | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false      | Any DOM nodes you wanted to render                                                                                                                                                                                       |
| **className**          | String                                   | range-gallery                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | true       | Main gallery class.<br> Sub dependent components will inherit this class in [BEM](https://en.bem.info/) style format.<br> Example: *className="block__element--modificator"*                                             |
| **conrollerClassName** | String                                   | range-conroller                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | true       | Main controller class                                                                                                                                                                                                    |
| **slidesToShow**       | Number                                   | 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | true       | Slides quantity to show.<br> All slides separating to groups visible at the moment                                                                                                                                       |
| **slidesToScroll**     | Number                                   | 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | true       | Slides quantity to slide.<br> All slides separating to groups visible at the moment                                                                                                                                      |
| **slidesPerRow**       | Number                                   | 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | true       | The number of rows in one slides group.<br> For example: *If the number of slides is six `6` and the number of rows is two `2`, then each row will have three `3` slides separated by a horizontal indent*               |
| **breakpoint**         | Number                                   | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | true       | Simply start responsive point.<br> It is *NOT recommended to change*. This option **will probably be removed** in the future                                                                                             |
| **responsive**         | Array                                    | [<br > &nbsp;&nbsp;&nbsp;&nbsp;{<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;breakpoint:&nbsp;0,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToShow:&nbsp;1,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToScroll:&nbsp;1,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesPerRow:&nbsp;1<br > &nbsp;&nbsp;&nbsp;&nbsp;},<br > &nbsp;&nbsp;&nbsp;&nbsp;{<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;breakpoint:&nbsp;480,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToShow:&nbsp;2,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToScroll:&nbsp;2,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesPerRow:&nbsp;1<br > &nbsp;&nbsp;&nbsp;&nbsp;},<br > &nbsp;&nbsp;&nbsp;&nbsp;{<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;breakpoint:&nbsp;768,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToShow:&nbsp;3,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToScroll:&nbsp;3,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesPerRow:&nbsp;1<br > &nbsp;&nbsp;&nbsp;&nbsp;},<br > &nbsp;&nbsp;&nbsp;&nbsp;{<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;breakpoint:&nbsp;1024,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToShow:&nbsp;4,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToScroll:&nbsp;4,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesPerRow:&nbsp;1<br > &nbsp;&nbsp;&nbsp;&nbsp;},<br > &nbsp;&nbsp;&nbsp;&nbsp;{<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;breakpoint:&nbsp;1366,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToShow:&nbsp;5,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToScroll:&nbsp;5,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesPerRow:&nbsp;1<br > &nbsp;&nbsp;&nbsp;&nbsp;},<br > &nbsp;&nbsp;&nbsp;&nbsp;{<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;breakpoint:&nbsp;1600,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToShow:&nbsp;6,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToScroll:&nbsp;6,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesPerRow:&nbsp;2<br > &nbsp;&nbsp;&nbsp;&nbsp;},<br > &nbsp;&nbsp;&nbsp;&nbsp;{<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;breakpoint:&nbsp;1920,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToShow:&nbsp;8,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesToScroll:&nbsp;8,<br > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slidesPerRow:&nbsp;2<br > &nbsp;&nbsp;&nbsp;&nbsp;}<br > ]   | false      | Use this Array of Objects to describe how your gallery should look like at different screen resolutions. You can make any number of rows and columns. Gallery powered by CSS GRID. Use CSS to decorate it to your needs  |
| **dataList**           | Boolean                                  | false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | false      | The aditional HTML `<datalist>` element contains a set of `<option>` elements that represent the values available for input range control.<br> You can use it as well as decoration of your `<input type="range">` track |

## Libraries
This package is mainly bootstrapping and builded with next libraries
- [create-react-app](https://github.com/facebook/create-react-app)
- [create-react-library](https://github.com/transitive-bullshit/create-react-library)
- [react-lazy-images](https://github.com/fpapado/react-lazy-images)

## License

MIT © [Andrew-Dyachenko](https://github.com/Andrew-Dyachenko)
