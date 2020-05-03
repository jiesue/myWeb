<template>
    <div class="app">
        jie vue cli
        <Jie />
    </div>
</template>

<script>
import Jie from "./components/jie.vue";
export default {
    name: "App",
    data() {
        return {
            key: "1"
        };
    },
    components: {
        Jie
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