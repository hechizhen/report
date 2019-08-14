<template>
<div class="shopindex">
    <dataTitle :subtitlename="titName" :explainSecondList="explainSecondList"></dataTitle>
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
            <shopLeft :shopActives="StoresDetailed.shopActiveData" :upraphy="upraphy" :downraphy="downraphy" :tableData="tableData.activeStoreDetail"></shopLeft>
            <shopRight :ActiveDetail="StoresDetailed.ActiveDetail" :tableData="tableData.addStoreDetail"></shopRight>
        </div>
    </div>
    <core :coretype="'门店得分'" :coretext="87" :evaluate="'较好'"></core>
    <shopChartUp v-if="upShow" :trendChartClick="upClick" :barEchartsData="barEchartsDataUp" :isShow="upStoresBar"></shopChartUp>
    <shopChartrDown v-if="downShow" :trendChartClick="downClick"  :barEchartsData="barEchartsDataDown" :isShow="downStoresBar"></shopChartrDown>
    <loading-data :isShow="isShow"></loading-data>
</div>
</template>

<script>
    import  dataTitle from '../dataTitle'
    import  shopLeft from './shopLeft'
    import  shopRight from './shopRight'
    import  core from  '../core'
    import shopChartUp from './shopChartUp'
    import  shopChartrDown from  './shopChartrDown'
    import loadingData from '../base/loadingData'
    export default {
        name: "shopIndex",
        props:["StoresDetailed","upStoresData","downStoresData","isShow","downStoresBar","upStoresBar",'tableData'],
        data(){
            return{
                titName:"门店",
                upShow: false,
                downShow:false,
                shopData:{
                    shopImg: require("../../assets/img/mendian.png"),
                },
                // isShow:true,
                barEchartsDataUp:{},
                barEchartsDataDown:{},
                lityUpData:{},
                lityDownData:{},
                explainSecondList:{
                    imgType:4,
                    tableData:[
                        {title:'总门店数：',data:'统计当前用户总有效门店数'},
                        {title:'门店单产：',data:'统计当月下单金额/活跃门店数'},
                        {title:'新增门店数：',data:'统计当月新增录入系统的门店数'},
                        {title:'活跃门店数：',data:'统计当月有下单的有效门店数（去重）'},
                        {title:'活跃门店率：',data:'统计当月有下单的有效门店数（去重）/总门店数'},
                        {title:'活跃门店数环比：',data:'统计（当月活跃门店数-上个月活跃门店数）/上个月活跃门店数*100%'},
                        {title:'活跃门店数同比：',data:'统计（当月活跃门店数-去年同月活跃门店数）/去年同月活跃门店数*100%'},
                        {title:'销量下滑门店数 ：',data:'统计当月门店下单金额与近三个月月均门店下单金额有所降低的门店数（去重）'},
                        {title:'销量增长门店数：',data:'统计当月门店下单金额与近三个月月均门店下单金额有所增长的门店数（去重）'},
                    ],
                    titleName:'二帮卖分析-门店指标解释',
                    // span:6,
                    // span2:18
                }
            }
        },
        components:{
            dataTitle,
            shopLeft,
            shopRight,
            core,
            shopChartUp,
            shopChartrDown,
            loadingData
        },
        mounted(){
            console.log(this.tableData)
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
                        isShowLine:true,
                        isShowSplit:false,
                        axisLabelColor:'#0092FE',
                    },
                    yAxis:{
                        isShowLine:true,
                        isShowSplit:true,
                        axisLabelColor:'#0092FE',
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
                        isShowLine:true,
                        isShowSplit:false,
                        axisLabelColor:'#0092FE',
                    },
                    yAxis:{
                        isShowLine:true,
                        isShowSplit:true,
                        axisLabelColor:'#0092FE',
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
    height: 100%;
    position: relative;
}
.shop-centen{
    width: 100%;
    height:350px;
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
        height: 75%;
        float: left;
    }

}
</style>
