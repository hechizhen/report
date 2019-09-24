<template>
    <div class="cententindex" >
        <div class="product">
            <dataTitle :subtitlename="titName" :explainSecondList="explainSecondList"></dataTitle>
            <div class="product-content">
                <a-Row >
                    <a-Col :span="10" style=" height: 257px;" >
                        <productLeft :productdata="CommodityTurnover"  :selectButtonClick="selectButtonClick" :storeHandleClick="storeDetailHandleClick"
                                     :tableData="newTableData"> </productLeft>
                        <productRight :barData="CommodityTurnover.produnarData"></productRight>
                        <loading-data :isShow="CommodityRate"></loading-data>
                    </a-Col>
                    <a-Col :span="14" style=" height: 257px;" >
                        <commodityRight :goodHandleClick="goodDetailHandleClick" :commoditydata="commoditydata" :upraphy="upraphy" :downraphy="downraphy"  :tableData="productTableData"  :selectButtonClick="proListDetaSelectButtonClick" ></commodityRight>
                        <loading-data :isShow="NumberGoods"></loading-data>
                    </a-Col>
                </a-Row>
            </div>
        </div>
        <core :coretype="coreData.coretype" :coretext="coreData.coretext" :evaluate="coreData.evaluate" :subscribe="coreData.subscribe"></core>

        <downproductChart v-if="downShow" :trendChartClick="downClick"  :VariabilityDown="VariabilityDown"
                        :downExportData="exportData.prodownData"
                        :isShow="NumberGoodsDownBar"></downproductChart>  <!--下滑-->
        <upproductChart v-if="upShow" :trendChartClick="upClick" :VariabilityUp="VariabilityUp"
                          :raiseExportData="exportData.proraiseData"
                          :isShow="NumberGoodsUpBar"></upproductChart>  <!--增长-->

        <!--<productChartPie v-if="pieShow" :trendChartClick="pieClick" :GoodsDetailPie="GoodsDetailPie" :tableData="productTableData"-->
                        <!--:NumberGoodsPie="NumberGoodsPie" :NumberGoodsList="NumberGoodsList" :pieChartHandleClick="IndexChartHandleClick"-->
                        <!--:checkValChange="indexCheckVal" :pageNumChange="indexPageNum" :exportClick="indexExportClick"-->
                        <!--:tableExport="detailExport"-->
        <!--&gt;</productChartPie>-->
        <!--<productList  v-if="listShow"  :trendChartClick="listClick" ></productList>-->
    </div>
</template>

<script>
    import productLeft from './productLeft'
    import productRight from './productRight'
    import  commodityRight from './commodityRight'
    import  dataTitle from '../dataTitle'
    import  core from  '../core'
    import  upproductChart from  './upproductChart'
    import  downproductChart from  './downproductChart'
    import  productChartPie  from  './productChartPie'
    import loadingData from '../base/loadingData'
    export default {
        name: "cententindex",
             props:{
                 CommodityTurnoverRate:{   //商品动销率概览数据
                     type:Object
                 },
                 commoditydata:{    //动销商品数概览数据
                     type:Object
                 },
                 // GoodsDetail:{      //商品饼图数据
                 //     type:Array
                 // },
                 NumberGoods:{    //动销商品数概览加载效果
                     type:Boolean
                 },
                 CommodityRate:{    //商品动销率概览加载效果
                     type:Boolean
                 },
                 upproStoresData:{   //增长商品数据
                     type:Object,
                     default:{}
                 },
                 prodownStoresData:{   //下滑商品数据
                     type:Object,
                     default:{}
                 },
                 productTableData:{   //产品-列表数据
                     type:Object,
                     default:{}
                 },
                 NumberGoodsDownBar:{  //下滑商品加载效果
                     type:Boolean
                 },
                 NumberGoodsUpBar:{  //增长商品加载效果
                     type:Boolean
                 },
                 NumberGoodsPie:{   //饼图加载效果
                     type:Boolean
                 },
                 NumberGoodsList:{   //动销商品数表格加载效果
                     type:Boolean
                 },
                 tableData:{   //动销清单表格
                     type:Object,
                     default:{}
                 },
                 exportData:{     //树状图导出数据
                     type:Object
                 },
                 homeChartHandleClick:{  //切换时间触发函数
                     type:Function
                 },
                 homePageNumChange:{    //切换时间触发函数
                     type:Function
                 },
                 homeCheckValChange:{    //切换时间触发函数
                     type:Function
                 },
                 homeExportClick:{   //切换时间触发函数
                     type:Function
                 },
                 // detailExport:{     //导出表格数据
                 //     type:Object
                 // },
                 selectButtonClick:{  //切换维度点击事件
                     type:Function
                 },
                 proListDetaSelectButtonClick:{  //商品明细表格切换维度
                     type:Function
                 },
                 //点击动销明细
                 indexStoreHandleClick:{
                     type:Function
                 },
                 //点击商品明细
                 indexGoodDetailHandleClick:{
                     type:Function
                 },
                 //评分
                 coreData:{
                    type:Object
                }
             },
        components:{
            productLeft,
            productRight,
            commodityRight,
            dataTitle,
            core,
            upproductChart,
            downproductChart,
            productChartPie,
            loadingData
        },
        data(){
            return{
                goodsData:"",
                VariabilityUp:this.upproStoresData,
                VariabilityDown:this.prodownStoresData,
                CommodityTurnover:this.CommodityTurnoverRate,
                // GoodsDetailPie:this.GoodsDetail,
                pieEchartsData:{},
                barEchartsDataDown:{},
                barEchartsDataUp:{},
                upShow: false,
                downShow:false,
                pieShow:false,
                listShow:false,
                newTableData:{},
                // productisShow:true,
                // commodityisShow:true,
                titName:"商品", // 产品
                //指标注释
                explainSecondList:{
                    imgType:5,
                    tableData:[
                        {title:'商品分销率：',data:'统计当月订单商品的SKU数(去重)(只取立白)/有库存商品的SKU数(上月期末快照和当月期末快照去重)'},
                        {title:'立白商品分销率：',data:'统计当月订单立白事业部商品的SKU数（去重）/立白事业部库存商品的SKU数'},
                        {title:'好爸爸商品分销率：',data:'统计当月订单好爸爸事业部商品的SKU数（去重）/好爸爸事业部库存商品的SKU数'},
                        {title:'超威商品分销率：',data:'统计当月订单超威商品的SKU数（去重）/超威库存商品的SKU数'},
                        {title:'口腔商品分销率：',data:'统计当月订单口腔商品的SKU数（去重）/口腔库存商品的SKU数'},
                        {title:'晟美商品分销率：',data:'统计当月订单晟美商品的SKU数（去重）/晟美库存商品的SKU数'},
                        {title:'总商品数：',data:'统计当月库存商品总SKU数（去重）（上月期末快照和当月期末快照去重）'},
                        {title:'动销商品数：',data:'统计当月商品下单SKU数（去重）'},
                        {title:'动销商品数环比：',data:'统计（当月下单商品数-上个月下单商品数）/上个月下单商品数*100%'},
                        {title:'动销商品数同比：',data:'统计（当月下单商品数-去年同月下单商品数）/去年同月下单商品数*100%'},
                        {title:'销量下滑商品数：',data:'统计当月商品下单金额与上个月下单金额有所降低的商品数'},
                        {title:'销量增长商品数：',data:'统计当月商品下单金额与上个月下单金额有所增长的商品数'},
                    ],
                    titleName:'二帮卖分析-产品指标解释',
                    span:6,
                    span2:18
                }
            }
        },
        methods:{
            //打开下滑树状图
            upraphy(){
                this.downShow = true;
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭下滑树状图
            upClick(){
                this.upShow = false;
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },
            //打开增长树状图
            downraphy(){
                this.upShow = true;
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭下滑树状图
            downClick(){
                this.downShow = false;
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },
            //点击动销明细
            storeDetailHandleClick(){
                this.indexStoreHandleClick()
            },
            //点击商品明细
            goodDetailHandleClick(){
                this.indexGoodDetailHandleClick()
            },
            // //打开饼图
            // pieraphy(){
            //     this.pieShow = true;
            // },
            // //关闭饼图
            // pieClick(){
            //     this.pieShow = false;
            // },
            // IndexChartHandleClick(item){
            //     var _this  =this
            //     console.log(item)
            //     _this.homeChartHandleClick(item)
            // },
            // indexPageNum(item){
            //     var _this  =this
            //     console.log(item)
            //     _this.homePageNumChange(item)
            // },
            // indexCheckVal(item){
            //     var _this  =this
            //     console.log(item)
            //     _this.homeCheckValChange(item)
            // },
            // indexExportClick(item){
            //     this.homeExportClick(item)
            // }
        },
        watch:{
            //饼图监听
            // GoodsDetail(val){
            //   this.GoodsDetailPie =val
            // },
            //下滑树状图监听
            upproStoresData(val){
               this.VariabilityUp = val
            },
            //增长树状图监听
            prodownStoresData(val){
               this.VariabilityDown = val
            },
            //切换维度表格监听
            tableData(val){
                this.newTableData = val
                deep:true
            },
            CommodityTurnoverRate(val){
                this.CommodityTurnover = val
            },
        },
        mounted() {
            this.newTableData = this.tableData
        }
    }
</script>

<style lang="less" scoped>
    .product{
        .product-content{
            width: 100%;
            margin: 0 auto;
            .ant-row{
                .ant-col-10{
                    background:rgba(67,159,255,1);
                    border:1px solid rgba(105,151,255,1);
                    border-radius:6px;
                    height: 100%;
                    position: relative;
                }
                .ant-col-14{
                    width: 56.3%;
                    height: 100%;
                    background:rgba(67,159,255,1);
                    border:1px solid rgba(105,151,255,1);
                    border-radius:6px;
                    margin-left: 2%;
                    position: relative;
                }
            }
        }
    }

</style>
