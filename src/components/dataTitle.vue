<template>
    <div class="dataTitle">
        <div class="leftLine"></div>
        <div class="subtitle_content">{{subtitlename}}
        </div>
        <div class="subtitleBox">
            <explain :explainList="explainSecondList" ></explain>
        </div>
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
        height: 2rem;
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
    }
    .leftLine{
        width: .2rem;
        height: .75rem;
        background:rgba(45,146,252,1);
        border-radius:3px;
    }
    .subtitle_content {
        font-size: 18px;
        padding-left: .3rem;
        font-weight:600;
        color:rgba(51,51,51,1);
    }
    .explain{
        height: 50%;
    }
    .subtitleBox{
		display: flex;
		align-items: center;
		height:100%;
		position: absolute;
		right:30px;
		top:0
	}
</style>
