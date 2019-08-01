<template>
<div class="shopindex">
    <dataTitle></dataTitle>
    <div class="shop-centen">
        <div class="shop-centen-title">
             <div class="title-img">
                 <img src="../assets/img/mendian.png" style="width: 100%;height: 100%">
             </div>
            <div class="title-txt">
              <p>门店活跃率: <span style=" font-size:24px;"> 26.61%</span></p>
            </div>
        </div>
        <div class="shop-centen-middle">
            <shopLeft></shopLeft>
            <shopRight></shopRight>
        </div>
        <div class="shop-centen-dase">
            <shopBase></shopBase>
        </div>
    </div>
</div>
</template>

<script>
    import  dataTitle from  './dataTitle'
    import  shopLeft from  './shop/shopLeft'
    import  shopRight from  './shop/shopRight'
    import  shopBase from  './shop/shopBase'
    export default {
        name: "shopIndex",
        components:{
            dataTitle,
            shopLeft,
            shopRight,
            shopBase
        }
    }
</script>

<style lang="less" scoped>
.shopindex{
    margin-top: 36px;
    margin-bottom: 5%;
    height: 100%;
}
.shop-centen{
    width: 90%;
    height:345px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    margin: auto;
    .shop-centen-title{
        height:63px;
        line-height:63px;
        margin: auto;
        border-bottom: 1px solid #E7E7E7;
        .title-img{
            width:42px;
            height: 42px;
            float: left;
            margin-left: 12px;
        }
        .title-txt{
            line-height: 63px;
            font-size:16px;
            font-family:PingFangSC-Medium;
            font-weight:bold;
            color:rgba(51,51,51,1);
            float: left;
            margin-left: 14px;
        }
    }
    .shop-centen-middle{
        width: 100%;
        float: left;
    }
    .shop-centen-dase{
        width: 100%;
        float: left;
    }
}
</style>
