# Vue Lazy Background Sizes
![npm version](https://badge.fury.io/js/vue-lazy-background-sizes.svg)

#### vue-lazy-background-sizes

A Vue component for lazy loading background images with the ability to load different images based on the window size.

Inspired by [Vue Lazy Background Images](https://github.com/darrynten/vue-lazy-background-images/)

## Installation

```bash
npm install --save vue-lazy-background-sizes
```

## Usage

Import the component

```js
import LazyBackgroundSizes from 'vue-lazy-background-sizes';
```

Register the component

```js
Vue.component('lazy-background-sizes', LazyBackgroundSizes);
```

Use the component in the DOM in the following way

```html
<lazy-background-sizes
  :image-sources="[
	"/img/small.jpg",
	"/img/medium.jpg",
	"/img/large.jpg",
  ]"
  loading-image="/img/loading.svg"
  error-image="/img/error.png"
  image-class="lazy-bg"
  background-size="cover"
  :image-success-callback="successCallback"
  :image-error-callback="errorCallback">
</lazy-background-sizes>
```

The returned html will look like the below
```html
<div data-state="lazy-bg--loaded" class="lazy-bg lazy-bg--loaded" style="background-image: url('http://wordpress.test:3000/wp-content/uploads/2018/06/fff.png'); background-size: cover;"></div>
```

## Props

- image-sources - An array of image sources (required)
- loading-image - Path to the loader image (png, svg etc) (optional)
- error-image - Path to the error image (optional)
- image-class - Any classes you wish to include on the image (optional)
- background-size - CSS background-size value (optional, default is cover)
- image-success-callback - Function on success (optional)
- image-error-callback - Function on error (optional)

## Details

#### - Image Sources

The image-sources prop should be an array of images, ordered from smallest to largest in terms of which image you would like to show at the different specified breakpoints.

Multiple images are not required the component will simply start with the first image in the array for small screens and at each break point look for the next image.  If there is not another image to show for that screen size the previous image will load.

#### - Breakpoints

By default the breakpoints where a new image is loaded are 576px and 992px.  This means the image-sources prop should contain 3 images to use all of the breakpoints.  The first image will be used from 0 - 576px, the second image between 577px and 992px, and finally the third image will be used on screen sizes 993px and greater.

##### Customizing Break Points

The default screen sizes can be overidden to anything you like, however the numbers must be real numbers without units. (This will be looked at in the future to allow for pixels, rems, view port units and other css units).

To customize the breakpoints simply create a new component and place the vue-lazy-background-sizes component in its mixins property like the following.

```js
import LazyBackgroundSizes from 'vue-lazy-background-sizes';

const MyLazyBackground = {
	mixins: [LazyBackgroundSizes],
	data() {
		return {
			screens: ['762', '1200'],
		}
	},
}

Vue.component('my-lazy-background', MyLazyBackground);
```

Then use your component in the DOM in the following way

```html
<my-lazy-background
  :image-sources="[
	"/img/small.jpg",
	"/img/medium.jpg",
	"/img/large.jpg",
  ]"
  loading-image="/img/loading.svg"
  error-image="/img/error.png"
  image-class="lazy-bg"
  background-size="cover"
  :image-success-callback="successCallback"
  :image-error-callback="errorCallback">
</my-lazy-background>
```

## TODO's

* Allow for different unit types in the screens array.
* Create Example Site.
* Add the ability to lazy load images based on the scroll position of the element.