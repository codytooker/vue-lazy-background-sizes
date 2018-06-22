<template>
	<div id="app">
		<div class="header">
			<div class="content">
				<h1>Vue Lazy Background Sizes</h1>
				<p>Vue Lazy Background Sizes lets you use multiple image sources for background images. The main use case is for hero images. You can use it to serve smaller images or for different cropping of images to smaller screens.</p>
				<p>Below is an example of a normal background image and one using Vue Lazy Sizes.</p>
			</div>
		</div>

		<h1>Example Without lazy Background Sizes</h1>
		<div class="bg-image" style="background-image: url('/images/animal-lg.jpg');"></div>
		<h1>Example With lazy Background Sizes</h1>
		<lazy-background-sizes
			class="bg-image"
			:image-sources="[
				'/images/animal-sm.jpg',
				'/images/animal-md.jpg',
				'/images/animal-lg.jpg',
			]"
		></lazy-background-sizes>

		<div class="footer">
			<div class="content">
				<a href=""><img src="/images/GitHub-Mark-32px.png"></a><br>
				<span>Photo by Torsten Dettlaff from Pexels</span>
			</div>
		</div>
		<!-- Photo by Torsten Dettlaff from Pexels -->
	</div>

</template>

<script>
import LazyBackgroundSizes from './components/LazyBackgroundSizes.vue';

export default {
	name: 'app',
	components: {
		LazyBackgroundSizes,
	},
};
</script>

<style>

html {
	font-size: 24px;
}

body {
	background-color: papayawhip;
	color: #333;
	margin: 0;
}

h1 {
	text-align: center;
}

.header {
	margin-bottom: 100px;
}

.footer {
	text-align: center;
	Padding: 100px 0;
}

.content {
	margin: 0 auto;
	max-width: 720px;
	padding: 0 15px;
}

.bg-image {
	height: 650px;
	width: 100vw;
	background-size: cover;
}

</style>
