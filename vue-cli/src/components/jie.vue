<template>
	<div class="jie">
		<h1>这个是我自定义的vue脚手架</h1>
		<!-- <img src="../assets/img/asset2.png" alt="" srcset="">
        <img src="/static/jie.png" alt="" srcset=""> -->
		<input type="file" @change="change" id="fileInput">
	</div>
</template>

<script>
export default {
	name: 'jie',
	methods: {
		change(e) {
			console.log();
			let target = e.target.files[0]
			const reader = new FileReader();
			reader.onload = function fileReadCompleted() {
				console.log(reader.result);
			};
			reader.readAsText(target);
		}
	},
}
</script>

<style lang="scss" scoped>
.jie {
	width: 100%;
	height: auto;
	border: 1px solid red;
	background: url('../assets/img/asset1.png');
	display: flex;
	backface-visibility: visible;

	h1 {
		text-shadow: 1px 1px 3px rgb(112, 211, 212);
		text-align: center;
		border: $b;
	}
}
</style>