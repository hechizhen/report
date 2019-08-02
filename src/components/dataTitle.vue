<template>
    <div class="dataTitle">
        <div class="subtitle_content">{{subtitlename}}</div>
    </div>
</template>

<script>
    export default {
        name: "dataTitle",
        props: {
            // 副标题名称
            subtitlename: {
                type: String,
                default: '订单'
            },
        }
    }
</script>

<style lang="less" scoped>
    .dataTitle {
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        /*justify-content: center;		*/
    }
    .subtitle_content {
        font-size:20px;
        padding-left: 10px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        border-left: 6px solid #2D92FC;
    }

</style>
