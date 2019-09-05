
<template>
    <div class="newButton">
        <a-button v-if="!isGhost" :type="buttonType" @click="buttonClick">{{defaultVal}}</a-button>
        <a-button v-if="isGhost" :type="buttonType" ghost @click="buttonClick">{{defaultVal}}</a-button>
    </div>
</template>
<script>
    export default {
        name : 'index',
        props:{
            //按钮样式
            buttonType:{
                type:String,
                default:'default'
            },
            //是否使用ghost
            isGhost:{
                type:Boolean,
                default:false,
            },
            //点击事件
            buttonHandleClick:{
                type:Function
            },
            //按钮文字
            defaultVal:{
                type:String,
                default:'查询'
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
            buttonClick(val){
                this.buttonHandleClick(val)
            }
        },
        computed:{

        },
        watch: {

        },
        distroyed: function () {

        }
    }
</script>
<style lang="less">
    .newButton{
        // .ant-btn{
        //     color:#333!important
        // }
        // .ant-btn-primary{
        //     color:#fff!important
        // }
    }
</style>
