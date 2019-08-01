<template>
    <div class="shopRight">
        <div class="shopRight-title">
        <div class="shop-active">
            <p>门店单产 <span>（万元）</span></p>
            <span>3512</span>
        </div>
        <div class="shop-active">
            <p>门店单产 <span>（万元）</span></p>
            <span>3512</span>
        </div>
        <div class="shop-active">
            <p>门店单产 <span>（万元）</span></p>
            <span>3512</span>
        </div>
        </div>
        <shopBase></shopBase>
    </div>
</template>

<script>
    import shopBase from './shopBase'
    export default {
        name: "shopRight",
        components:{
            shopBase
        }
    }
</script>

<style lang="less" scoped>
    .shopRight {
        width: 49%;
        height: 100%;
        float: left;
        /*margin-left: 9%;*/
        .shopRight-title{
            height: 174px;
        }
        .shop-active {
            width: 18%;
            height: 165px;
            background:linear-gradient(90deg,rgba(0,166,255,1),rgba(140,93,255,1));
            border-radius: 6px;
            font-family: PingFangSC-Medium;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            float: left;
            margin-left:10%;
            p {
                display: grid;
                font-size: 14px;
                font-weight: 500;
                padding-top: 34px;
                padding-bottom:25px;
                margin-bottom: 0;
                span{
                    font-size: 14px;
                    font-weight: 500;
                }
            }
            span {
                font-size: 26px;
                font-weight: 600;
            }

            .productLeft-btn {
                width: 72px;
                line-height: 26px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 6px;
                margin-left: 20%;
                margin-top: 20px;

                span {
                    width: 48px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
    }
    .shop-active:nth-child(2){
        background:linear-gradient(90deg,rgba(50,213,131,1),rgba(0,210,203,1));
    }
    .shop-active:last-child{
        background:linear-gradient(90deg,rgba(251,112,67,1),rgba(252,79,153,1));
    }
</style>
