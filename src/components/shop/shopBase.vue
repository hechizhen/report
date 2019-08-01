<template>
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
</template>

<script>
    export default {
        name: "shopBase"
    }
</script>

<style lang="less" scoped>
    .shopBase {
        width: 51%;
        height: 100%;
        float: left;

        .commodityR-base {
            width: 80%;
            height: 12%;
            margin-top: 6%;

            .quan {
                float: left;
                width: 12px;
                height: 12px;
                border: 4px solid rgba(255, 255, 255, 1);
                border-radius: 50%;
                margin-top: 3%;
                margin-right: 2%;
            }

            span {
                line-height: 28px;
                font-size: 14px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }

            .productLeft-btn {
                width: 30%;
                height: 100%;
                line-height: 26px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 6px;
                float: right;

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
</style>
