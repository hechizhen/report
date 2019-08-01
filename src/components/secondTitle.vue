
<template>
    <div class="secondTitle">
        {{titleName}}
    </div>
</template>
<script>
    export default {
        name : 'secondTitle',
        props:{
            //标题名字
            titleName:{
                type:String,
                default:'一帮卖分析'
            },
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
    .secondTitle{
        padding:29px 0 18px 0;
        font-size:24px;
        font-weight:bold;
        color:rgba(51,51,51,1);
    }
</style>
