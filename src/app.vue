<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div class="app">
        <router-view></router-view>
        <!--<div class="loding" v-if="this.$store.state.isShowLoading"><img src="./images/loading.gif" alt=""></div>-->
    </div>
</template>
<script>
    export default {
        data () {
            return {
//                isShowLoading:this.$store.state.isShowLoading
            }
        },
        created(){
//             this.$store.state.isShowLoading = true;
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
<style scoped lang="less">
    .app {
        position: relative;
        height: 100%;
        width: 100%;
    }
    .loding {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.6);
        z-index: 999;
    }

</style>
