
<template>
    <div class="secondTitle">
        {{titleName}}
        <div class="secondTitleBox">
            <explain :explainList="explainSecondList" v-if="titleName!='二帮卖分析'"></explain>
        </div>
    </div>
</template>
<script>
    import explain from '../components/explain.vue'
    export default {
        name : 'secondTitle',
        props:{
            //标题名字
            titleName:{
                type:String,
                default:'一帮卖分析'
            },
            //数据集合
            explainSecondList:{
                type:Object
            }
        },
        components : {
            explain
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
        padding:0.75rem 0 0.45rem 0;
        // font-size:0.8rem;
        font-size:24px;
        font-weight:bold;
        color:rgba(51,51,51,1);
        display: flex;
        align-items: center;
        position: relative;
        .secondTitleBox{
            position: absolute;
            right: 30px;
            height:100%;
            display: flex;
            align-items: center;
            top:5px;
        }
    }
</style>
