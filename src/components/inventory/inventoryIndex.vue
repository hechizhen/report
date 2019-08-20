<template>
    <div>
        <second-title :titleName="inventoryTitle" :explainSecondList="explainSecondList"></second-title>
        <!--库存概览-->
        <div class="inventoryindex">
        <div style="width: 100%;height: 100%;">
        <div class="inventory-table">
            <div class="table-head">
                <div class="table-headtxt">
                    <div class="table-headtxt-one">
                    <span class="yuan">{{Money}}</span>
                    <strong>{{inventoryDetails.amountTxt}}</strong>
                    </div>
                    <div class="table-headtxt-two">
                    <p> <span>{{Money}}</span>{{inventoryDetails.amount}}</p>
                    </div>
                    <span class="shu"></span>
                </div>
                <div class="table-headtxt">
                    <div class="table-headtxt-one">
                    <span class="yuan"></span>
                    <strong style="display: block;">{{inventoryDetails.inventoryNumberTxt}}</strong>
                    </div>
                    <div class="table-headtxt-two">
                    <p> <span></span>{{inventoryDetails.inventoryNumber}}</p>
                    </div>
                </div>
            </div>
            <div class="table-dase">
                <div style="height: 100%;float: left;width: 75%">
                    <a-Row  class="commodityR-base" v-for="(item,index) in inventoryDetails.noSalesDetail" :key="index">
                        <a-Col :span="18">
                            <div class="onetxt">
                                {{item.name}}
                            </div>
                        </a-Col>
                        <a-Col :span="6">
                            {{item.NoSales}}
                        </a-Col>
                    </a-Row>
                </div>
                <div class="productLeft-btn">
                    <newButton :defaultVal="defaultVal" :buttonHandleClick="detailHandleClick" ></newButton>
                </div>
            </div>
            <loading-data :isShow="stockAmount"></loading-data>
        </div>
        <inventoryCenten :turnoverTxt="inventoryDetails.turnoverTxt" :turnover="inventoryDetails.turnover" :isShow="InventoryTurnover"></inventoryCenten>
        <inventoryDase v-if="inventoryDay.length!=0" :inventoryTxt="inventoryDay" :isShow="DaysAvailableStock"
                     :barData="inventoryDay.inventoryBarData"
                       :dealHandleClick="dealHandleClick"
        ></inventoryDase>
        </div>
            <!--库存明细-->
            <public-table v-if="isShowDetail" :close="closePopup" :tableHeader="getPinListing.header" :interfaceParams="getPinListing.params" :titleName="getPinListing.titleName"></public-table>
           <!--库存可销天数-->
            <public-table v-if="isShowreceivable" :close="dealClosePopup" :tableHeader="getInvDayListing.header"
                          :buttonGroup="buttonGroup" :interfaceParams="getInvDayListing.params" :selectButtonClick="selectButtonClick" :titleName="getInvDayListing.titleName"></public-table>
             <!--折线图-->
            <!-- <inventoryChart v-if="invechartsShow" :trendChartClick="trendChartClick" :lineEchartsData="marketableDayLine" :isShow="marketableDayLine"></inventoryChart> -->
    </div>
        <!--走势图line-->
        <div class="bartu">
            <trendChart  :lineEchartsData="marketableDayChart" v-if="marketableDayChart != ''"></trendChart>
            <loading-data :isShow="marketableDayLine"></loading-data>
        </div>
    <core :coretype="'库存得分'" :coretext="87" :evaluate="'较好'"></core>
    </div>
</template>

<script>
    import inventoryCenten from './inventoryCenten'
    import inventoryDase from './inventoryDase'
    import  newButton from  '../base/newButton'
    import  core from  '../core'
    import  inventoryChart  from  './inventoryChart'
    import  secondTitle from  '../secondTitle'
    import loadingData from '../base/loadingData'
    import publicTable from '../base/publicTable.vue'
    import trendChart from  './trendChart'
    export default {
        name: "inventoryIndex",
        props:{
            inventoryDay:{   //库存主页面概览
                type:Object
            },
            inventoryDetails:{   //库存主页面概览
                type:Object
            },
            marketableDayChart:{    //库存走势图数据
                type:Object
            },
            DaysAvailableStock:{      //库存可销天数加载效果
                type:Boolean
            },
            InventoryTurnover:{        //库存周转次数加载效果
                type:Boolean
            },
            marketableDayLine:{     //库存可销天数走势图加载效果
              type:Boolean
            },
            stockAmount:{           //库存金额加载效果
                type:Boolean
            },
            getPinListing:{
                type:Object     //库存未销明细表格数据
            },
            getInvDayListing:{
                type:Object     //库存可销天数表格数据
            },
            selectButtonClick:{  //切换维度点击事件
                type:Function
            }
        },
        components:{
            inventoryCenten,
            inventoryDase,
            newButton,
            core,
            inventoryChart,
            secondTitle,
            loadingData,
            publicTable,
            trendChart
        },
        data(){
            return{
                Money:"￥",
                inventoryTitle: '库存',//库存标题
                invechartsShow: false,
                isShowDetail:false,
                isShowreceivable:false,
                marketableDay:[],
                newTableData:'',
                defaultVal:"未销明细",
                buttonGroup:{   //切换维度按钮
                    show:true,
                    list:['品类','系列','商品']
                },
                explainSecondList:{
                    imgType:6,
                    tableData:[
                        {title:'库存金额：',data:'取立购星对应总金额计算逻辑'},
                        {title:'6个月未销售商品金额：',data:'统计6个月未创建订单的商品库存件数（含6个月份以上）'},
                        {title:'库存件数：',data:'统计累计商品库存件数'},
                        {title:'6个月未销售商品件数：',data:'统计6个月未创建订单的商品库存件数'},
                        {title:'库存周转次数：',data:'统计360/库存可销天数'},
                        {title:'库存可销天数：',data:'统计库存总数量/近3个月日均出货件数'},
                        {title:'库存可销天数环比增长：',data:'统计（当月库存可销天数-上个月库存可销天数）/上个月库存可销天数*100%'},
                        {title:'库存可销天数同比增长：',data:'统计（当月库存可销天数-去年同月库存可销天数）/去年同月库存可销天数*100%'},
                        {title:'立白可销天数：',data:'统计立白事业部商品库存总数量/近3个月立白事业部商品日均出货的件数'},
                        {title:'好爸爸可销天数：',data:'统计好爸爸事业部商品库存总数量/近3个月好爸爸事业部商品日均出货的件数'},
                    ],
                    titleName:'库存指标解释',
                    span:6,
                    span2:18
                },
            }
        },
        methods:{
            //打开库存明细
            detailHandleClick(){
                this.isShowDetail = true
            },
            //关闭库存明细
            closePopup(){
                this.isShowDetail = false
            },
            //关闭可销天数明细
            dealClosePopup(){
                this.isShowreceivable = false
            },
            //打开可销天数明细
            dealHandleClick(){
                this.isShowreceivable = true
            }
        },
        watch:{
            getInvDayListing(val){
                console.log(val)
                this.newTableData = val
                deep:true
            },
        },
         mounted() {
             console.log(this.marketableDayChart)
             this.newTableData = this.getInvDayListing
         }
    }
</script>

<style lang="less" scoped>
    .inventoryindex{
        width: 100%;
        height:210px;
    }
    .commodityR-base:nth-child(2) .ant-col-6{
        padding-left: 2%;
    }
    .table-headtxt:last-child  .yuan{
        display: none !important;
    }
    .inventory-table .table-dase .table-base:first-child span{
        border-bottom: 1px solid rgba(229,229,229,1);
        padding-bottom: 2%;
    }
    .table-headtxt-one{
        text-align: center; height: 50%;display: flex;align-items: center;justify-content: center
    }
    .table-headtxt-two{
        display: inline-block;width: 100%;text-align:center;height: 50%;
    }
    .inventory-table .table-head .table-headtxt:nth-child(2){
        width: 49%;
    }
    .commodityR-base:nth-child(2) .ant-col-4{
        padding-left: 2%;
    }
    .shu{
        width:1px;
        height:94px;
        border:1px solid rgba(255,255,255,1);
        float: right;
        position: absolute;
        right: 0;
        bottom: 10%;
    }
    .onetxt{
        text-align: left;
        margin-left: 4%;
        border-bottom: 1px solid #E5E5E5;
    }
    .inventory-table{
        width: 35%;
        float: left;
        position: relative;
        .table-head{
            width: 100%;
            height: 120px;
            background:linear-gradient(90deg,rgba(71,79,231,1),rgba(29,145,240,1),rgba(71,79,231,1));
            box-shadow:0px 2px 15px 0px rgba(255,182,2,0.13);
            border-radius:10px 10px 0 0;
            .table-headtxt{
                width: 51%;
                height: 100%;
                float: left;
                font-size:14px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                position: relative;
                .yuan{
                    width:15px;
                    height:15px;
                    background-color: #fff;
                    color: #474FE7;
                    display: inline-block;
                    border-radius: 50%;
                    text-align: center;
                    margin-right: 2%;
                }
                p{
                    display: inline-block;
                    line-height: 33px;
                    font-size: 30px;
                    font-weight: bold;
                    margin-bottom: 0;
                    span{
                        font-size: 18px;
                    }
                }
            }
        }
        .table-dase{
            width: 100%;
            float: left;
            position: relative;
            background:rgba(255,255,255,.5);
            border-radius:0px 0px 10px 10px ;
               .table-base {
                width: 80%;
                height: 44px;
                line-height: 44px;
                margin-left: 10%;
                   span {
                    line-height: 28px;
                    font-size:16px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(0,0,0,1);
                    display: inline-block;
                    width: 56%;
                }
            }
                .tableLeft-btn {
                    position: absolute;
                    top: 30%;
                    right: 5%;
                    width:88px;
                    height:32px;
                    line-height: 26px;
                    text-align: center;
                    float: right;

                    span {
                        width: 48px;
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:600;
                        color:rgba(0,0,0,1);
                    }
                }
        }
    }
    .commodityR-base {
        width: 100%;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        .ant-col-18{
            font-size:14px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            display: inline-block;
            width: 70%;
            line-height: 44px;
        }
        .ant-col-6{
            line-height: 44px;
            font-size:18px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            margin-bottom: 0;
            display: inline-block;
            color:rgba(51,51,51,1);
            border-bottom: 1px solid #E5E5E5;
        }
    }
    .productLeft-btn {
        width:25%;
        height:88px;
        float: left;
        display:flex;
        /*justify-content: center;//子元素水平居中*/
        align-items: center;//子元素垂直居中
        .newButton {
            span {
                width: 48px;
                font-size: 14px;
                font-family: PingFangSC-Regular;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
            }
        }
    }
    .bartu{
        margin-top: 23px;
        height:100%;
        background:rgba(255,255,255,1);
        border-radius:10px;
        position: relative;
    }
</style>
