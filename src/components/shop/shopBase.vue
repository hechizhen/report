<template>
<div class="shopBase">
    <div class="shopBase">
        <div class="commodityR-base">
            <div class="quan"></div>
            <span>当月无交易门店数(家）：</span>
            <span style="font-size:16px;font-family:PingFangSC-Semibold;font-weight:600;">20</span>
        </div>
        <div class="commodityR-base">
            <div class="quan"></div>
            <span>3个月无交易门店数（家）：</span>
            <span style="font-size:16px;font-family:PingFangSC-Semibold;font-weight:600;">20</span>
        </div>
        <div class="productLeft-btn">
            <span>无交易明细</span>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "shopBase"
    }
</script>

<style lang="less" scoped>
    .shopBase {
        width: 100%;
        height: 100%;
        float: left;
        position: relative;
        background:rgba(238,240,245,.5);
        border-radius:6px 6px 0px 0px;
        margin-top: 1%;
        .commodityR-base {
            width: 80%;
            margin-left: 49px;
            margin-bottom: 1%;
            .quan {
                float: left;
                width:10px;
                height:10px;
                border:2px solid rgba(152,162,180,1);
                border-radius:50%;
                margin-top: 1.5%;
                margin-right: 1%;
            }

            span {
                line-height: 28px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(152,162,180,1);
            }
        }
        .productLeft-btn {
            position: absolute;
            top: 20%;
            left: 52%;
            width:88px;
            height:32px;
            line-height: 26px;
            text-align: center;
            border:1px solid rgba(220,220,220,1);
            border-radius:6px;
            float: right;

            span {
                width: 48px;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:600;
                color:rgba(51,51,51,1);
            }
        }
    }
</style>
