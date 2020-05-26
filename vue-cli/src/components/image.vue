<template>
	<div class="image">
		<label for="select" class="label">
			click to select image
		</label>
		<input type="file" @change="handleChange" name="" ref="select" id="select" multiple accept="image/gif, image/png, image/jpg, image/jpeg">

        <div v-for="(item,i) in imgArr" :key="i">
            <img :src="item" alt="">
        </div>

	</div>
</template>

<script>
export default {
	name: 'image',
	data() {
		return {
			imgArr: []
		}
	},
	methods: {
		handleChange(e) {
			console.log(e);
            let _this = this;
			// var file = this.$refs.select.files[0]
			console.log(this.$refs.select.files);
			// this.$refs.select.files.map((item) => {
			// 	let fr = new FileReader();
			// 	fr.onloadend = function (t) {
			// 		console.log('123', t);
            //         // document.getElementById("imgs").src = t.target.result;
            //         _this.imgArr.push(t.target.result)
			// 	};
			// 	fr.readAsDataURL(file);
			// })


		}
	},

}
</script>

<style lang="scss" scoped>
.image {
	width: 100%;
	height: 500px;
	border: 1px solid rgb(214, 26, 26);
	.label {
		display: inline-block;
		width: 100%;
		height: 50px;
		background: rgb(0, 0, 0);
		color: aliceblue;
		font-size: 30px;
		text-align: center;
	}
	input {
		opacity: 0;
	}
	img {
		width: 300px;
		height: auto;
	}
}
</style>