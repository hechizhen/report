<template>
<div class="shopindex">
    <dataTitle :subtitlename="titName"></dataTitle>
    <div class="shop-centen">
        <div class="shop-centen-title">
             <div class="title-img">
                 <img :src="shopData.shopImg" style="width: 100%;height: 100%">
             </div>
            <div class="title-txt">
              <p>{{shopData.shopTitle}} <span style=" font-size:24px;">{{shopData.shopActiverate}}</span></p>
            </div>
        </div>
        <div class="shop-centen-middle">
            <shopLeft :shopActives="shopData.shopActiveData" ></shopLeft>
            <shopRight :ActiveDetail="shopData.ActiveDetail"></shopRight>
        </div>
        <!--<div class="shop-centen-dase">-->
            <!--<shopBase></shopBase>-->
            <!--<shopBase></shopBase>-->
        <!--</div>-->
    </div>
    <core :coretype="'门店得分'" :coretext="87" :evaluate="'较好'"></core>
</div>
</template>

<script>
    import  dataTitle from '../dataTitle'
    import  shopLeft from './shopLeft'
    import  shopRight from './shopRight'
    import  core from  '../core'
    // import  shopBase from  './shop/shopBase'
    export default {
        name: "shopIndex",
        data(){
            return{
                titName:"门店",
                shopData:{
                    shopImg: require("../../assets/img/mendian.png"),
                    shopTitle:"门店活跃率：",
                    shopActiverate:"26.61%",
                    shopActiveData: {
                        ActiveStores:"活跃门店数",
                        ActiveStoresing:"（家）",
                        Activestressum:9999,
                        detailbtn:"门店详情",
                        shopActiveTitle:[
                            {
                                name:"环比: ",
                                sales:" -59%"
                            },
                            {
                                name:"同比: ",
                                sales:" -59%"
                            }
                        ],
                        shoplist:[
                            {
                                name:"销量下滑门店数（家）：",
                                sales:"58.75%",
                                btn:"下滑门店"
                            },
                            {
                                name:"销量增长门店数（家）：",
                                sales:"12%",
                                btn:"增长门店"
                            }
                        ],
                        shopDaseData:[
                            {txt:"当月无交易门店数(家）",value:"12"},
                            {txt:"3个月无交易门店数(家）",value:"20"}
                        ]
                    },
                    ActiveDetail:{
                        shopActiveDetail:[
                            {
                                ActiveStores:"门店单产",
                                ActiveStoresing:"（万元）",
                                Activestressum:3512,
                            },
                            {
                                ActiveStores:"总门店数",
                                ActiveStoresing:"（家）",
                                Activestressum:3512,
                            },
                            {
                                ActiveStores:"新增门店数",
                                ActiveStoresing:"（家）",
                                Activestressum:3512,
                            }
                        ],
                        shopDaseData:[
                            {txt:"3个月无交易门店应收（万元）：",value:"￥10.89"},
                            {txt:"闭店应收账款（万元）：",value:"￥100.89"}
                        ]
                    }


                },
            }
        },
        components:{
            dataTitle,
            shopLeft,
            shopRight,
            core
            // shopBase
        }
    }
</script>

<style lang="less" scoped>
.shopindex{
    margin-top: 36px;
    margin-bottom: 2%;
    height: 100%;
}
.shop-centen{
    width: 100%;
    height:350px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    margin: auto;
    margin-bottom: 1%;
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
        height: 75%;
        float: left;
    }
    /*.shop-centen-dase{*/
        /*width: 100%;*/
        /*height: 68px;*/
        /*background:rgba(238,240,245,1);*/
        /*opacity:0.5;*/
        /*border-radius:6px 6px 0px 0px;*/
        /*float: left;*/
    /*}*/
}
</style>
