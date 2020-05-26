<template>
	<div class="app">
		jie vue cli site 1
		<Jie />
        11
		<Image1 />
	</div>
</template>

<script>
import Jie from "./components/jie.vue";
import Image1 from "./components/image.vue";
export default {
	name: "App",
	data() {
		return {
			key: "1"
		};
	},
	components: {
		Jie, Image1
	}
};
</script>

<style lang="scss" scoped>
.app {
	width: 100%;
	height: 800px;
	border: $b;
	background: rgb(206, 200, 200);
}
</style>