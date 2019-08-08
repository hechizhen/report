<template>
    <div class="dataTitle">
        <div class="subtitle_content">{{subtitlename}}
        </div>
        <explain :explainList="explainSecondList" ></explain>

    </div>
</template>

<script>
    import explain from './explain'
    export default {
        name: "dataTitle",
        props: {
            // 副标题名称
            subtitlename: {
                type: String,
                default: '订单'
            },
            explainSecondList:{
                type:Object
            }
        },
        components:{
            explain
        }

    }
</script>

<style lang="less" scoped>
    .dataTitle {
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
    }
    .subtitle_content {
        font-size:20px;
        padding-left: 10px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        border-left: 6px solid #2D92FC;
    }
    .explain{
        height: 50%;
    }

</style>
