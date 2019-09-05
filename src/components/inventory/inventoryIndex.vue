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
                    <newButton :defaultVal="defaultVal" :buttonHandleClick="detailHandleClick"
                               :btnStyle="btnStyle"  :txtStyle="txtStyle"
                    ></newButton>
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
    <core :coretype="coreData.coretype" :coretext="coreData.coretext" :evaluate="coreData.evaluate" :subscribe="coreData.subscribe"></core>
    </div>
</template>

<script>
    import inventoryCenten from './inventoryCenten'
    import inventoryDase from './inventoryDase'
    import  newButton from  '../button'
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
            },
            stockDetailHandleClick:{ //点击库存详情
                type:Function
            },
            //评分
            coreData:{
                type:Object
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
                // invechartsShow: false,
                isShowDetail:false,  //库存明细
                isShowreceivable:false, //库存可销天数
                newTableData:'',   //库存可销天数表格数据
                defaultVal:"未销明细",
                buttonGroup:{   //切换维度按钮
                    show:true,
                    list:['品类','系列','商品']
                },
                btnStyle:{
                    width:'88px',
                    height:'32px',
                    border: '1px solid #DCDCDC',
                },
                txtStyle:{
                    fontSize:'14px',
                    color:'#333333',
                    fontWeight:500
                },
                //指标解释数据
                explainSecondList:{
                    imgType:6,
                    tableData:[
                        {title:'库存金额：',data:'取立购星对应总金额计算逻辑'},
                        {title:'6个月未销售商品金额：',data:'统计6个月未创建订单的商品库存件数（含6个月份以上）'},
                        {title:'库存件数：',data:'统计当月期末商品库存件数'},
                        {title:'6个月未销售商品件数：',data:'统计6个月未创建订单的商品库存件数'},
                        {title:'库存件数周转次数：',data:'统计360/库存可销天数'},
                        {title:'库存件数可销天数：',data:'统计库存总数量/近3个月日均出货件数'},
                        {title:'库存件数可销天数环比增长：',data:'统计（当月库存可销天数-上个月库存可销天数）/上个月库存可销天数*100%'},
                        {title:'库存件数可销天数同比增长：',data:'统计（当月库存可销天数-去年同月库存可销天数）/去年同月库存可销天数*100%'},
                        {title:'立白商品件数可销天数：',data:'统计立白事业部商品库存总数量/近3个月立白事业部商品日均出货的件数'},
                        {title:'好爸爸商品件数可销天数：',data:'统计好爸爸事业部商品库存总数量/近3个月好爸爸事业部商品日均出货的件数'},
                        {title:'超威商品件数可销天数：',data:'统计超威商品库存总数量/近3个月超威商品日均出货的件数'},
                        {title:'口腔商品件数可销天数：',data:'统计口腔商品库存总数量/近3个月口腔商品日均出货的件数'},
                        {title:'晟美商品件数可销天数：',data:'统计晟美商品库存总数量/近3个月晟美商品日均出货的件数'},
                    ],
                    titleName:'库存指标解释',
                    span:7,
                    span2:17
                },
            }
        },
        methods:{
            //打开库存明细
            detailHandleClick(){
                this.isShowDetail = true
                //页面出现弹框页面禁止滚动
                 this.stopScoll()
            },
            //关闭库存明细
            closePopup(){
                this.isShowDetail = false
                //弹框消失，恢复正常滑动效果
               this.moveScoll()
            },
            //关闭可销天数明细
            dealClosePopup(){
                this.isShowreceivable = false
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },
            //打开可销天数明细
            dealHandleClick(){
                this.stockDetailHandleClick()
                this.isShowreceivable = true
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            }
        },
        watch:{
            //监听库存可销天数表格数据
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
        height:5.53rem;
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
        height:2.65rem;
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
            height:3rem;
            background:linear-gradient(90deg,#474FE7,#1D91F0);
            box-shadow:0px 2px 15px 0px rgba(255,182,2,0.13);
            border-radius:10px 10px 0 0;
            .table-headtxt{
                width: 51%;
                height: 100%;
                float: left;
                font-size: 14px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                position: relative;
                .yuan{
                    width: 15px;
                    height: 15px;
                    background-color: #fff;
                    color: #474FE7;
                    border-radius: 50%;
                    text-align: center;
                    margin-right: 2%;
                }
                p{
                    display: inline-block;
                    font-size:30px;
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
            line-height: 1.24rem;
        }
        .ant-col-6{
            line-height: 1.24rem;
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
        height: 2.48rem;
        float: left;
        display:flex;
        /*justify-content: center;//子元素水平居中*/
        align-items: center;//子元素垂直居中
    }
    .bartu{
        margin-top: 20px;
        height:100%;
        background:rgba(255,255,255,1);
        border-radius:10px;
        position: relative;
    }
</style>
