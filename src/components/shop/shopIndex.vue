<template>
<div class="shopindex">
    <dataTitle :subtitlename="titName"></dataTitle>
    <div class="shop-centen">
        <div class="shop-centen-title">
             <div class="title-img">
                 <img :src="shopData.shopImg" style="width: 100%;height: 100%">
             </div>
            <div class="title-txt">
              <p>{{StoresDetailed.shopTitle}} <span style=" font-size:24px;">{{StoresDetailed.StoreActivity}}</span></p>
            </div>
        </div>
        <div class="shop-centen-middle">
            <shopLeft :shopActives="StoresDetailed.shopActiveData" :upraphy="upraphy" :downraphy="downraphy"></shopLeft>
            <shopRight :ActiveDetail="StoresDetailed.ActiveDetail"></shopRight>
        </div>
    </div>
    <core :coretype="'门店得分'" :coretext="87" :evaluate="'较好'"></core>
    <shopChartUp v-if="upShow" :trendChartClick="upClick" :barEchartsData="barEchartsDataUp" ></shopChartUp>
    <shopChartrDown v-if="downShow" :trendChartClick="downClick"  :barEchartsData="barEchartsDataDown"></shopChartrDown>
</div>
</template>

<script>
    import  dataTitle from '../dataTitle'
    import  shopLeft from './shopLeft'
    import  shopRight from './shopRight'
    import  core from  '../core'
    import shopChartUp from './shopChartUp'
    import  shopChartrDown from  './shopChartrDown'
    export default {
        name: "shopIndex",
        props:["StoresDetailed","upStoresData","downStoresData"],
        data(){
            return{
                titName:"门店",
                upShow: false,
                downShow:false,
                shopData:{
                    shopImg: require("../../assets/img/mendian.png"),
                },
                barEchartsDataUp:{},
                barEchartsDataDown:{},
                lityUpData:{},
                lityDownData:{}
            }
        },
        components:{
            dataTitle,
            shopLeft,
            shopRight,
            core,
            shopChartUp,
            shopChartrDown
        },
        watch:{
            upStoresData(val){
                console.log(val)
                this.lityUpData = val;
                this.barEchartsDataUp = {
                    id:'barId',
                    unit:'%',
                    xAxisData:this.lityUpData.xAxisData,
                    xAxis:{
                        isShowLine:false,
                        isShowSplit:false,
                        axisLabelColor:'#333',
                    },
                    yAxis:{
                        isShowLine:false,
                        isShowSplit:false,
                        axisLabelColor:'#333',
                    },
                    label:{
                        isShow:false
                    },
                    type:'xAxis',
                    barData:this.lityUpData.seriesData,
                    showType:0,//0横过来 1竖起来
                    markLineList:{
                        show:false
                    }
                }
            },
            downStoresData(val){
                console.log(val)
                this.lityDownData = val;
                this.barEchartsDataDown = {
                    id:'barId',
                    unit:'%',
                    xAxisData:this.lityDownData.xAxisData,
                    xAxis:{
                        isShowLine:false,
                        isShowSplit:false,
                        axisLabelColor:'#333',
                    },
                    yAxis:{
                        isShowLine:false,
                        isShowSplit:false,
                        axisLabelColor:'#333',
                    },
                    label:{
                        isShow:false
                    },
                    type:'xAxis',
                    barData:this.lityDownData.seriesData,
                    showType:0,//0横过来 1竖起来
                    markLineList:{
                        show:false
                    }
                }
            }
        },
        methods:{
            upraphy(){
                this.upShow = true;
            },
            upClick(){
                this.upShow = false;
            },
            downraphy(){
                this.downShow = true;
            },
            downClick(){
                this.downShow = false;
            },
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
