<template>
	<div
		:class="[imageClass, imageState]"
		:style="computedStyle"
		:data-state="imageState">
		<slot />
	</div>
</template>

<script>
import debounce from '../utils/debounce';

export default {
	props: {
		imageSources: {
			type: Array,
			required: true,
		},
		imageClass: {
			type: String,
			required: false,
			default: '',
		},
		loadingImage: {
			type: String,
			required: false,
		},
		errorImage: {
			type: String,
			required: false,
		},
		imageErrorCallback: {
			type: Function,
			required: false,
			default: function() {},
		},
		imageSuccessCallback: {
			type: Function,
			required: false,
			default: function() {},
		},
		backgroundSize: {
			type: String,
			required: false,
			default: 'cover',
		},
	},
	data() {
		return {
			sourceCount: 0,
			asyncImage: new Image(),
			screens: ['576', '992'],
			imageState: 'lazy-bg--before-load',
		};
	},
	computed: {
		computedStyle() {
			if (this.imageState === 'lazy-bg--loading' && this.loadingImage) {
				return `background-image: url('${this.loadingImage}');`;
			}

			if (this.imageState === 'lazy-bg--error' && this.errorImage) {
				return `background-image: url('${this.errorImage}');`;
			}

			if (this.imageState === 'lazy-bg--loaded') {
				return `background-image: url('${this.asyncImage.src}'); background-size: ${this.backgroundSize};`;
			}

			return '';
		},
	},
	methods: {
		fetchImage() {
			const newImage = this.chooseImage();
			this.setImage(newImage);
		},
		chooseImage() {
			if (this.sourceCount === 1) {
				return this.imageSources[0];
			}

			if (window.innerWidth > this.screens[this.screens.length - 1]) {
				return this.imageSources[this.imageSources.length - 1];
			}

			for (let i = 0; i < this.screens.length; i++) {
				if (window.innerWidth <= this.screens[i]) {
					return this.imageSources[i];
				}
			}
		},
		setImage(newImage) {
			if (this.asyncImage.src === newImage) {
				return;
			}
			this.imageState = 'lazy-bg--loading';
			this.asyncImage.src = newImage;
		},
		imageOnLoad(success) {
			this.imageState = 'lazy-bg--loaded';
			this.imageSuccessCallback();
		},
		imageOnError(error) {
			this.imageState = 'lazy-bg--error';
			this.imageErrorCallback();
		},
	},
	mounted() {
		this.sourceCount = this.imageSources.length;
		this.asyncImage.onload = this.imageOnLoad;
		this.asyncImage.onerror = this.imageOnError;

		this.$nextTick(() => {
			if (this.sourceCount !== 1) {
				window.addEventListener('resize', this.debounceFetchImage);
			}

			this.fetchImage();
		});
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.debounceFetchImage);
	},
	created() {
		this.debounceFetchImage = debounce(() => {
			this.fetchImage();
		}, 250);
	},
};
</script>
