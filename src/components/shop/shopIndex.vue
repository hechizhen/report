<template>
<div class="shopindex">
    <dataTitle :subtitlename="titName" :explainSecondList="explainSecondList"></dataTitle>
    <div class="shop-centen">
        <div class="shop-centen-title">
             <div class="title-img">
                 <img :src="shopData.shopImg" style="width: 100%;height: 100%">
             </div>
            <div class="title-txt">
              <p style="display: flex; justify-content: center;">{{StoresDetailed.shopTitle}} <span style=" font-size:24px;">{{StoresDetailed.StoreActivity}}</span></p>
            </div>
        </div>
        <div class="shop-centen-middle">
            <shopLeft :shopActives="StoresDetailed.shopActiveData" :upraphy="upraphy" :downraphy="downraphy" :tableData="tableData.activeStoreDetail" :tradeTableData="tableData.noTradeData"></shopLeft>
            <shopRight :ActiveDetail="StoresDetailed.ActiveDetail" :tableData="tableData.addStoreDetail" :dealTableData="tableData.noDealDetail"></shopRight>
        </div>
    </div>
    <core :coretype="coreData.coretype" :coretext="coreData.coretext" :evaluate="coreData.evaluate" :subscribe="coreData.subscribe"></core>
    <shopChartUp v-if="upShow" :trendChartClick="upClick" :barEchartsData="upStoresData" :isShow="upStoresBar" :raiseExportData="exportData.raiseData"></shopChartUp>
    <shopChartrDown v-if="downShow" :trendChartClick="downClick"  :barEchartsData="downStoresData" :isShow="downStoresBar" :downExportData="exportData.downData"></shopChartrDown>
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
        props:{
            StoresDetailed:{  //门店概览数据
                type:Object
            },
            upStoresData:{  //增长bar数据
                type:Object
            },
            downStoresData:{   //下滑bar数据
                type:Object
            },
            isShow:{
                type:Boolean
            },
            downStoresBar:{     //下滑bar加载效果
                type:Boolean
            },
            upStoresBar:{     //下滑bar加载效果
                type:Boolean
            },
            tableData:{     //表格数据
                type:Object
            },
            exportData:{   //导出表格函数
                type:Object
            },
            //评分
            coreData:{
                type:Object
            }
        },
        data(){
            return{
                titName:"门店",
                upShow: false, //增长树状图隐藏
                downShow:false,  //下滑树状图隐藏
                shopData:{
                    shopImg: require("../../assets/img/mendian.png"),
                },
                // isShow:true,
                // barEchartsDataUp:{},
                // barEchartsDataDown:{},
                // lityUpData:{},
                // lityDownData:{},

                //门店指标解释
                explainSecondList:{
                    imgType:4,
                    tableData:[
                        {title:'总有效门店数：',data:'统计当前用户总有效门店数'},
                        {title:'门店单产：',data:'统计当月下单金额/活跃门店数'},
                        {title:'新增门店数：',data:'统计当月新增录入系统的门店数'},
                        {title:'门店活跃数：',data:'统计当月有下单的有效门店数（去重）'},
                        {title:'门店活跃率：',data:'统计当月有下单的有效门店数（去重）/总门店数'},
                        {title:'门店活跃数环比：',data:'统计（当月活跃门店数-上个月活跃门店数）/上个月活跃门店数*100%'},
                        {title:'门店活跃数同比：',data:'统计（当月活跃门店数-去年同月活跃门店数）/去年同月活跃门店数*100%'},
                        {title:'销量下滑门店数 ：',data:'统计当月门店下单金额与近三个月月均门店下单金额有所降低的门店数（去重）'},
                        {title:'销量增长门店数：',data:'统计当月门店下单金额与近三个月月均门店下单金额有所增长的门店数（去重）'},
                        {title:'近3个月无交易门店数：',data:'统计3个自然月到5个自然月无交易的门店数'},
                        {title:' 6个月无交易门店数：',data:'统计6个自然月以上无交易门店数 '},
                    ],
                    titleName:'二帮卖分析-门店指标解释',
                    span:6,
                    span2:18
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
            console.log(this.exportData)
            console.log(this.upStoresData)
            console.log(this.downStoresData)
        },
        watch:{
        },
        methods:{
            //开大增长树状图
            upraphy(){
                this.upShow = true;
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭增长树状图
            upClick(){
                this.upShow = false;
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },
            //打开下滑树状图
            downraphy(){
                this.downShow = true;
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭下滑树状图
            downClick(){
                this.downShow = false;
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
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
            float: left;
        }

    }
</style>

