
<template>
    <div class="loadingData" v-if="isShow">
        <a-spin size="large"/>
    </div>
</template>
<script>
    export default {
        name : 'loadingData',
        props:{
            //是否显示
            isShow:{
                type:Boolean,
                default:false
            }
        },
        components : {
        },
        data () {
            return {

            }
        },
        mounted () {

        },
        methods: {
        },
        computed:{

        },
        watch: {

        },
        distroyed: function () {

        }
    }
</script>
<style scoped lang="less">
    .loadingData{
        position: absolute;
        width:100%;
        height:100%;
        background:	rgba(255,255,255,0.8);
        z-index:121;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 0;
    }
</style>
