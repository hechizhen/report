<template>
<div class="shopBase">
    <div class="shopBase">
        <div class="commodityR-base" v-for="(item,index) in shopDaseData" :key="index">
            <div class="quan"></div>
            <span>{{item.name}}</span>
            <p>{{item.NoSales}}</p>
        </div>
        <div class="productLeft-btn">
            <newButton :defaultVal="defaultVal"></newButton>
        </div>
    </div>
</div>
</template>

<script>
    import  newButton from  '../base/newButton'
    export default {
        name: "shopBase",
        props:["shopDaseData","defaultVal"],
        components:{
            newButton
        }
    }
</script>

<style lang="less" scoped>
    .shopBase {
        width: 100%;
        float: left;
        background:rgba(238,240,245,.5);
        border-radius:6px 6px 0px 0px;
        margin-top: 1.2%;
        .commodityR-base {
            width: 50%;
            margin-left: 5%;
            margin-bottom: 1%;
            float: left;
            .quan {
                float: left;
                width:10px;
                height:10px;
                border:2px solid rgba(152,162,180,1);
                border-radius:50%;
                margin-top: 2.2%;
                margin-right: 1%;
            }

            span{
                line-height: 28px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(152,162,180,1);
                display: inline-block;
                width: 70%;
                white-space :  nowrap;
            }
            p{
                font-size:16px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                margin-bottom: 0;
                display: inline-block;
                color: rgba(152, 162, 180, 1);
            }
        }
        .productLeft-btn {
            width:10%;
            text-align: center;
            float: left;
            .newButton {
                margin-top: -18%;
                span {
                    width: 48px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-weight: 600;
                    color: rgba(51, 51, 51, 1);
                }
            }
        }
    }
.shopBase:nth-child(2) .commodityR-base{
      margin-left: 11%;
    }
</style>
