<template>
    <div class="jie">
        <h1>这个是我自定义的vue脚手架</h1>
        <img src="../../static/11.png" alt="" srcset="">
    </div>
</template>

<script>
    export default {
        name:'jie'
    }
</script>

<style lang="scss" scoped>
    .jie{
        width: 100%;
        height: auto;
        border:1px solid red;
        h1{
            text-shadow: 1px 1px 3px rgb(112,211,212);
            text-align: center;
            border:$b;
        }
    }
</style>