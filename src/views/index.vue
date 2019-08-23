
<template>
    <div class="index" :style="{width:bodyWdith}">
        <!-- <div class="title">
            <p>体检报告</p>
            <i></i>
        </div> -->
        <!-- 头部 -->
        <header-title :dealName="indexDealName" :score="totalScoreList" :summary="indexSummary" :defaultDate="indexDefaultDate" :changeDateHandle="indexChangeDate"
        :dealList="dealList" :isShowDealIdSelect="isShowDealIdSelect"></header-title>
        <!-- 一帮卖分析 -->
        <one-help-sale-en :titleName="oneHelpSaleTitle" :monthSalesData="monthSalesData" :monthBarData="monthBarData"  :coreData="oneHelpSaleScoreList"
        :yearSalesData="yearSalesData" :yearBarData="yearBarData" :monthShow="oneHelpSaleMonthShow" :yearShow="oneHelpSaleYearShow"
        v-if="monthBarData.length!=0 && monthSalesData.length!=0 && yearSalesData.length!=0 && yearBarData.length!=0"></one-help-sale-en>

        <!-- 二帮卖分析-订单 -->
        <secondBand :orderAmountData="orderAmountData" :directionLineData="directionData" :towHelYoy="towHelYoy" :towHelProportion="towHelProportion"
                    :towHelpSaleMonthShow="towHelpSaleMonthShow" :towHelpSaleMonthLineShow="towHelpSaleMonthLineShow" :orderDetailClick="orderDetailHandleClick"
                    :tableData="twoDetailTableData.gettwoListing"  v-if="orderAmountData!='' && Object.keys(directionData).length!=0"  :selectButtonClick="twoDetaSelectButtonClick"
                    :coreData="orderScoreList"
        ></secondBand>
        <!-- 二帮卖分析-业务员 -->
        <salesman :salesmanData="salesmanData" :salesmanTrendData="salesmanTrendData" :salesmandownwardData="salesmandownwardData"
                  :salesmanReachedData="salesmanReachedData" :salesmanContributionData="salesmanContributionData" :isShow="salesmanReached"
                  :salesmanReachedBar="salesmanReachedBar" :salesmanContributionBar="salesmanContributionBar" :salesmandownwardBar="salesmandownwardBar"
                  :salesmanTrendPie="salesmanTrendPie" :ownwardExportData="ownwardExportData" :reachContributionData="reachContributionData"
                  :coreData="personScoreList"
                  v-if="reachContributionData!='' && salesmanTrendData!=''"></salesman>
        <!-- 商品 -->
        <productIndex :CommodityTurnoverRate="CommodityTurnoverRate"  :commoditydata="commoditydata" :indexStoreHandleClick="indexStoreHandleClick"
                      :prodownStoresData="prodownStoresData" :upproStoresData="upproStoresData" :indexGoodDetailHandleClick="indexGoodDetailHandleClick"
                      :NumberGoods="NumberGoods"  :CommodityRate="CommodityRate"  :NumberGoodsDownBar="NumberGoodsDownBar" :NumberGoodsUpBar="NumberGoodsUpBar"
                      :NumberGoodsPie="NumberGoodsPie" :NumberGoodsList="NumberGoodsList" v-if="CommodityTurnoverRate.length!=0"
                      :tableData="getPinListing"  :exportData="ProExportData"  :productTableData="productTableData"
                      :detailExport="exportDetailData"  :selectButtonClick="proDetaSelectButtonClick"  :proListDetaSelectButtonClick="proListDetaSelectButtonClick"
                      :coreData="productScoreList"
        ></productIndex>
        <!--门店-->
        <shopIndex  :StoresDetailed="StoresDetailed" v-if="StoresDetailed.length!=0 && storeDetailTableData!='' && upStoresData!=''"  :isShow="StoreisShow"
                    :upStoresData="upStoresData"  :downStoresData="downStoresData"  :downStoresBar="downStoresBar"   :upStoresBar="upStoresBar"
                    :tableData="storeDetailTableData" :exportData="storeExportData"
                    :coreData="storeScoreList"
        ></shopIndex>
         <!--库存-->
        <inventoryIndex  :inventoryDay="inventoryDay" :inventoryDetails="inventoryDetails" :marketableDayChart="marketableDayChart" :stockDetailHandleClick="indexStockDetailHandleClick"
                         :DaysAvailableStock="DaysAvailableStock" :InventoryTurnover="InventoryTurnover" :stockAmount="stockAmount"
                         :marketableDayLine="marketableDayLine"   v-if="inventoryDay.length!=0 && Object.keys(marketableDayChart).length!=0"
                         :getPinListing="invDetailTableData.getPinListing"  :getInvDayListing="invDetailTableData.getInvDayListing" :selectButtonClick="invDetaSelectButtonClick"
                         :coreData="stockScoreList"
        > </inventoryIndex>
        <!-- 财务 -->
        <finance :financeData="financeData" :receivableData="receivableData" :overDueData="overDueData" :titleName="financeTitle"
        v-if="financeData.length!=0 && receivableData.length!=0 && overDueData.length!=0" :isShow="financeIsShow"
        :tableData="financeDetailTableData.overdueDetail"></finance>
    </div>
</template>
<script>
    import headerTitle from '../components/headerTitle.vue'//头部标题
    import secondTitle from '../components/secondTitle.vue'//模块标题
    import oneHelpSaleEn from '../components/oneHelpSaleEn.vue' //一帮卖分析
    import finance from '../components/finance.vue'//财务
    import pieEchart from '../components/echarts/pie.vue'//饼图
    import lineEchart from '../components/echarts/line.vue'//折线图
    import barEchart from '../components/echarts/bar.vue'//柱状图
    import secondBand from "./../components/secondBand/index.vue"  //二帮卖分析-订单
    import salesman from "./../components/salesman/index.vue"  //二帮卖分析-业务员
    import productIndex from '../components/product/productIndex' //产品
    import shopIndex from '../components/shop/shopIndex' //门店
    import inventoryIndex from '../components/inventory/inventoryIndex' //库存
    import core from '../components/core.vue'
    export default {
        name: 'index',
        components: {
            headerTitle,
            secondTitle,
            oneHelpSaleEn,
            finance,
            pieEchart,
            lineEchart,
            barEchart,
            secondBand,
            salesman,
            productIndex,
            shopIndex,
            inventoryIndex,
            core
        },
        data() {
            return {
                dealer_id:'',
                indexDealName: '',//经销商名称
                indexScore: 97,//体检评分
                indexSummary: '很好',//总结
                indexDefaultDate: '',//默认时间
                currentDate: '',//当前时间
                oneHelpSaleTitle: '一帮卖分析',//一帮卖分析标题
                financeTitle: '财务',//财务标题
                inventoryTitle: '库存',//库存标题
                //财务数据
                financeData: '',
                //应收账款
                receivableData: '',
                //逾期账款
                overDueData: '',
                //产品-商品动销率
                CommodityTurnoverRate:"",
                //产品-动销商品数
                commoditydata:"",
                //产品-动销商品数增长商品
                upproStoresData:{},
                //产品-动销商品数下滑商品
                prodownStoresData:{},
                //产品-动销商品明细-饼图
                // GoodsDetail:"",
                //门店活跃明细
                StoresDetailed:"",
                //门店-门店下滑门店
                downStoresData:"",
                //门店-门店下滑门店
                upStoresData:"",
                //库存金额，件数，可周转天数
                inventoryDetails:"",
                //库存可销天数
                inventoryDay: "",
                //库存-库存可销天数走势图
                marketableDayChart:"",
                requestHttpUrl: this.$store.state.requestHttpUrl,//接口请求地址
                testRequestHttpUrl: this.$store.state.testRequestHttpUrl,//接口请求地址
                monthSalesData: '',//本月/累计销量以及达成率
                monthBarData: '',//本月/累计销量以及达成率
                yearSalesData: '',//本月/累计销量以及达成率
                yearBarData: '',//本月/累计销量以及达成率
                totalScoreList: {//总得分
                    coretype: '总得分',
                    coretext: '',
                    evaluate: ''
                },
                oneHelpSaleScoreList: {//一帮卖评分
                    coretype: '一帮卖得分',
                    coretext: '',
                    evaluate: ''
                },
                orderScoreList: {//二帮卖订单评分
                    coretype: '订单得分',
                    coretext: '',
                    evaluate: ''
                },
                personScoreList: {//二帮卖业务员评分
                    coretype: '人员得分',
                    coretext: '',
                    evaluate: ''
                },
                productScoreList: {//二帮卖商品评分
                    coretype: '商品得分',
                    coretext: '',
                    evaluate: ''
                },
                storeScoreList: {//二帮卖门店评分
                    coretype: '门店得分',
                    coretext: '',
                    evaluate: ''
                },
                stockScoreList: {//二帮卖库存评分
                    coretype: '库存得分',
                    coretext: '',
                    evaluate: ''
                },
                oneHelpSaleMonthShow:false,  //一帮卖分析当月
                oneHelpSaleYearShow:false,  //一帮卖分析年累计
                towHelpSaleMonthShow:false,  //二帮卖当月
                towHelpSaleMonthLineShow:false, //二帮卖当月走势图
                towHelProportion:false,     //二帮卖占比
                towHelYoy:false,            //二帮卖同比
                salesmanReached:false,      //二帮卖人员
                salesmanReachedBar:false,   //业务员-达成
                salesmanContributionBar:false, //业务员-贡献
                salesmandownwardBar:false,  //业务员下滑
                salesmanTrendPie:false,     //业务员走势图
                CommodityRate:false,        //商品动销率
                NumberGoods:false,          //动销商品数
                NumberGoodsPie:false,       //动销商品数饼图
                NumberGoodsList:false,       //动销商品数表格
                NumberGoodsUpBar:false,     //动销商品增长
                NumberGoodsDownBar:false,   //动销商品下降
                upStoresBar:false,          //门店增长
                downStoresBar:false,         //门店下降
                marketableDayLine:false,     //库存可销天数走势图
                StoreisShow:false,          //二帮卖门店
                stockAmount:false,          //库存金额
                InventoryTurnover:false,    //库存周转次数
                DaysAvailableStock:false,   //库存可销天数
                financeIsShow:false,        //财务
                salesmanData: {},//业务员数据
                orderAmountData: '', //金额数据
                directionData:{}, //订单走势图
                salesmanTrendData:{},  //业务员走势图
                salesmandownwardData:{}, //业务员下滑
                ownwardExportData:{
                    tableHeaderTxt:'',
                    tableHeaderKey:'',
                    tableData:'',
                    tableName:''
                },
                salesmanReachedData:{},  //业务员-达成
                salesmanContributionData:{},//业务员-贡献
                productTableData:{},//产品列表数据
                //活跃门店二级表格数据
                storeDetailTableData:'',
                //产品清单二级表格数据
                proDetailTableData:{},
                getPinListing:{},
                //财务模块二级表格数据
                financeDetailTableData:'',
                //二帮卖订单列表数据
                twoDetailTableData:"",
                //库存明细二级表格数据
                invDetailTableData:{},
                //门店增长下滑导出数据
                storeExportData:{
                    //增长导出数据
                    raiseData:{
                        tableHeaderTxt:'',
                        tableHeaderKey:'',
                        tableData:'',
                        tableName:''
                    },
                    //下滑导出数据
                    downData:{
                        tableHeaderTxt:'',
                        tableHeaderKey:'',
                        tableData:'',
                        tableName:''
                    },
                },
                //产品增长下滑导出数据
                 ProExportData:{
                    //增长导出数据
                    proraiseData:{
                        tableHeaderTxt:'',
                        tableHeaderKey:'',
                        tableData:'',
                        tableName:''
                    },
                    //下滑导出数据
                    prodownData:{
                        tableHeaderTxt:'',
                        tableHeaderKey:'',
                        tableData:'',
                        tableName:''
                    },
                },
                categoryName:'',
                categoryList:'',
                productPageNum:1,
                exportDetailData:'',
                //达成贡献导出数据
                reachContributionData:'',
                //经销商列表
                dealList:[
                    {id:'ff80808169c93eb80169d6a73cc02d04',name:'黄梅县林峰日化经营部'},
                    {id:'8a981eb458580fe9015860d7b87c0307',name:'立白生产环境测试库'},
                    {id:'8a981eb458580fe9015860d8b87c0307',name:'广州立白集团企业有限公司'},
                    {id:'ff80808169c93eb80169d6756c101eef',name:'富平县百洁商贸有限公司'},
                    {id:'ff80808169c93eb80169d69fb8d92c31',name:'宜昌市太华商贸有限公司'},
                    {id:'ff80808169c93eb80169d6bd844a2de1',name:'鄂州市嘉德商贸有限公司'},
                    {id:'ff80808169d8d9b30169db5961eb0011',name:'荆州市立晨商贸有限公司'},
                    {id:'ff8080816a194910016a42de93bb1164',name:'苏州汇浚贸易有限公司'},
                    {id:'ff8080816a194910016a43acc36938b8',name:'徐州信如商贸有限公司【沛县】'},
                    {id:'ff8080816a194910016a43b00eeb3a75',name:'芜湖市明坤日用百货贸易有限公司'},
                ],
                //评分接口
                scoreRequestUrl:'https://dcc.libyuat.com/tjbg-manage/gradeConfig/queryModuleScore',
                scoreRequestSumUrl:'https://dcc.libyuat.com/tjbg-manage/gradeConfig/queryModuleSumScore',
                scoreTxtRequestUrl:'https://dcc.libyuat.com/tjbg-manage/gradeConfig/queryModuleEvaluate',
                //一帮卖评分参数
                oneScoreParams:'',
                //订单评分参数
                orderScoreParams:'',
                //人员评分参数
                personScoreParams:'',
                //商品评分参数
                productScoreParams:'',
                //门店评分参数
                storeScoreParams:'',
                //库存评分参数
                stockScoreParams:'',
                //总评分参数
                totalScoreParams:'',
                //一帮卖评分描述参数
                oneScoreTxtParams:'',
                //订单评分描述参数
                orderScoreTxtParams:'',
                //人员评分描述参数
                personScoreTxtParams:'',
                //商品评分描述参数
                productScoreTxtParams:'',
                //门店评分描述参数
                storeScoreTxtParams:'',
                //库存描述评分参数
                stockScoreTxtParams:'',
                //总评分描述评分参数
                totalScoreTxtParams:'',
                loadingDataArray:[],
                //是否展示经销商下拉框
                isShowDealIdSelect:false,
                screenWidth: window.screen.width, // 屏幕尺寸
                bodyWdith:'',
            }
        },
        created() {
            if(this.screenWidth<=1480){
                this.bodyWdith = this.screenWidth - 180 +'px'
            }
            let date = new Date;
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            if(day<6){
                month = month -2
            }else{
                month = month -1
            }
            month = month < 10 ? "0" + month : month;
            //获取当前接口年月
            this.currentDate = year + '' + month
            //获取当前默认显示年月
            this.indexDefaultDate = year + '/' + month
            //获取本地链接判断登陆入口  预生产或者立购星
            let href= location.hash
            if(href.indexOf('dealerId')!=-1){
                this.dealer_id = href.match(/dealerId=(\S*)/)[1];
                this.isShowDealIdSelect=false
            }else{
                this.dealer_id = 'ff80808169c93eb80169d6a73cc02d04'
                this.isShowDealIdSelect=true
            }
            this.getDealIdListData()
        },
        mounted() {
            this.getsalesmanTrend()
            this.getOneHelpSalesData()
            this.getFinanceOverviewData()
            this.getsalesman()
            this.getsecondBand()
            this.getinventoryDetail()
            this.getStoresDetailed()
            this.getCommodityTurnoverRate()
            this.getdirection()
            this.getmarketableDayChart()
            this.getVariability()
            this.getsalesmandownward()
            this.getRaiseDownStores()
            this.getSalesmanReached()
            this.getDetailTableData()
        },
        computed: {

        },
        watch: {

        },
        methods: {
            getIframUrl(id){
                var url = parent.document.getElementsByTagName(id).contentWindow.location.href;
                return url;
            },
            //点击查询
            indexChangeDate(dateVal,selectVal,selectName) {
                this.loadingDataArray = []
                this.dealer_id = selectVal
                this.indexDealName = selectName
                //判断入口为立购星或者预生产 是否改变经销商id
                // if(this.isShowDealIdSelect){
                //     this.dealer_id = selectVal
                //     this.indexDealName = selectName
                // }
                this.currentDate = dateVal
                this.getsalesmanTrend()
                this.getOneHelpSalesData()
                this.getFinanceOverviewData()
                this.getsalesman()
                this.getsecondBand()
                this.getinventoryDetail()
                this.getStoresDetailed()
                this.getCommodityTurnoverRate()
                this.getdirection()
                this.getmarketableDayChart()
                this.getVariability()
                this.getsalesmandownward()
                this.getRaiseDownStores()
                this.getSalesmanReached()
                this.getDetailTableData()
                this.getdirection()
                this.getsalesman()
            },
            //二帮卖订单详情切换维度调用方法
            twoDetaSelectButtonClick(val){
                if(val == '系列'){
                    //二帮卖订单列表数据
                    this.twoDetailTableData={
                        //二帮卖订单明细系列维度
                        gettwoListing:{
                            titleName:'二帮卖下单毛利明细-系列',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":"系列"
                                },
                                "outputCol":"bo1_name,bo2_name,bo3_name,money,ratio_rate,money_mom,money_yoy,gross_money,gross_rate,gross_money_mom,gross_money_yoy",
                                "pageNum":1,
                                "pageSize":100,
                                "groupByCol":["bo1_name","bo2_name","bo3_name"],
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_sales_order_dtl"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'品类',unit:false},
                                {txt:'系列',unit:false},
                                {txt:'系列下单金额（元）',unit:'money'},
                                {txt:'占比',unit:'percent'},
                                {txt:'环比',unit:'percent'},
                                {txt:'同比',unit:'percent'},
                                {txt:'毛利额（元）',unit:'percent'},
                                {txt:'毛利率',unit:'percent'},
                                {txt:'毛利额环比',unit:'percent'},
                                {txt:'毛利额同比',unit:'percent'},

                            ]
                        }
                    }
                }
                else if(val == '商品'){
                    //二帮卖订单列表数据
                    this.twoDetailTableData={
                        //二帮卖订单明细商品维度
                        gettwoListing:{
                            titleName:'二帮卖下单毛利明细-商品',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":"商品"
                                },
                                "outputCol":"bo1_name,bo2_name,bo3_name,goods_code69,goods_code79,goods_name,money,ratio_rate,money_mom,money_yoy,gross_money,gross_rate,gross_money_mom,gross_money_yoy",
                                "pageNum":1,
                                "pageSize":100,
                                "groupByCol":["bo1_name","bo2_name","bo3_name","goods_name"],
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_sales_order_dtl"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'品类',unit:false},
                                {txt:'系列',unit:false},
                                {txt:'69码',unit:false},
                                {txt:'79码',unit:false},
                                {txt:'商品名称',unit:false},
                                {txt:'商品金额（元）',unit:'money'},
                                {txt:'占比',unit:'percent'},
                                {txt:'环比',unit:'percent'},
                                {txt:'同比',unit:'percent'},
                                {txt:'毛利额（元）',unit:'percent'},
                                {txt:'毛利率',unit:'percent'},
                                {txt:'毛利额环比',unit:'percent'},
                                {txt:'毛利额同比',unit:'percent'},

                            ]
                        }
                    }
                }
                else {
                    //二帮卖订单列表数据
                    this.twoDetailTableData={
                        //二帮卖订单明细品类维度
                        gettwoListing:{
                            titleName:'二帮卖下单毛利明细-品类',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":"品类"
                                },
                                "outputCol":"bo1_name,bo2_name,money,ratio_rate,money_mom,money_yoy,gross_money,gross_rate,gross_money_mom,gross_money_yoy",
                                "pageNum":1,
                                "pageSize":100,
                                "groupByCol":["bo1_name","bo2_name"],
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_sales_order_dtl"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'品类',unit:false},
                                {txt:'品类下单金额（元）',unit:'money'},
                                {txt:'占比',unit:'percent'},
                                {txt:'环比',unit:'percent'},
                                {txt:'同比',unit:'percent'},
                                {txt:'毛利额（元）',unit:'percent'},
                                {txt:'毛利率',unit:'percent'},
                                {txt:'毛利额环比',unit:'percent'},
                                {txt:'毛利额同比',unit:'percent'},

                            ]
                        }
                    }
                }
            },
            //产品-动销清单切换维度调用方法
            proDetaSelectButtonClick(val){
                if(val == '系列'){
                    //动销清单表格数据
                        //产品动销清单明细  系列
                        this.getPinListing={
                            titleName:'商品分销明细-系列',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":'系列'
                                },
                                "outputCol":"bo1_name,bo2_name,bo3_name,order_qty,stock_qty,sale_rate",
                                "pageNum":1,
                                "groupByCol":["bo1_name","bo2_name","bo3_name"],
                                "pageSize":1000,
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_goods_stock_sales"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'品类',unit:false},
                                {txt:'系列',unit:false},
                                {txt:'订单SKU数',unit:false},
                                {txt:'库存SKU数',unit:false},
                                {txt:'系列动销率',unit:'percent'},
                            ]
                        }
                }
                else if(val == '商品'){
                    //动销清单表格数据
                        //产品动销清单明细  商品
                    this.getPinListing={
                            titleName:'商品分销明细-商品',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":'商品'
                                },
                                "outputCol":"bo1_name,bo2_name,bo2_name,goods_code69,goods_code79,goods_name,sale_rate",
                                "groupByCol":["bo1_name","bo2_name","bo3_name","goods_name"],
                                "pageNum":1,
                                "pageSize":1000,
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_goods_stock_sales"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'品类',unit:false},
                                {txt:'系列',unit:false},
                                {txt:'69码',unit:false},
                                {txt:'79码',unit:false},
                                {txt:'商品名称',unit:false},
                                {txt:'是否动销',unit:false},
                            ]
                    }
                }
                else {
                    //动销清单表格数据
                        //产品动销清单明细  品类
                        this.getPinListing={
                            titleName:'商品分销明细-品类',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":'品类'
                                },
                                "outputCol":"bo1_name,bo2_name,order_qty,stock_qty,sale_rate",
                                "pageNum":1,
                                "groupByCol":["bo1_name","bo2_name"],
                                "pageSize":1000,
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_goods_stock_sales"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'品类',unit:false},
                                {txt:'订单SKU数',unit:false},
                                {txt:'库存SKU数',unit:false},
                                {txt:'品类动销率',unit:'percent'},
                            ]
                    }
                }
            },
            //产品-商品销量明细切换维度调用方法
            proListDetaSelectButtonClick(val){
                if(val == '品类'){
                    //商品销量表格数据
                        //产品商品销量明细  品类
                        this.productTableData={
                            titleName:'下单商品明细-品类',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":'品类'
                                },
                                "outputCol":"bo1_name,bo2_name,money,ratio_rate",
                                "pageNum":1,
                                "pageSize":100,
                                "groupByCol":["bo1_name","bo2_name"],
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_goods_sales_dtl"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'品类',unit:false},
                                {txt:'销售（元/月）',unit:'money'},
                                {txt:'销售占比',unit:'percent'},
                            ]
                    }
                }
                else if(val == '系列'){
                    //商品销量表格数据
                        //产品商品销量明细  系列
                    this.productTableData={
                            titleName:'下单商品明细-系列',
                        params : {
                            "inputParam":{
                                "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":'系列'
                            },
                            "outputCol":"bo1_name,bo2_name,bo3_name,money,ratio_rate",
                                "pageNum":1,
                                "pageSize":100,
                               "groupByCol":["bo1_name","bo2_name","bo3_name"],
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                            "serviceId":"service_tjbg02_goods_sales_dtl"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'事业部',unit:false},
                            {txt:'品类',unit:false},
                            {txt:'系列',unit:false},
                            {txt:'系列销量（元/月）',unit:'money'},
                            {txt:'销售占比',unit:'percent'},
                        ]
                    }
                }
                else if(val == '商品'){
                    //商品销量表格数据
                        //产品商品销量明细  商品
                    this.productTableData={
                            titleName:'下单商品明细-商品',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":'商品'
                                },
                                "outputCol":"bo1_name,bo2_name,bo3_name,goods_code69,goods_code79,goods_name,money,ratio_rate",
                                "pageNum":1,
                                "pageSize":100,
                                "groupByCol":["bo1_name","bo2_name","bo3_name","goods_name"],
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_goods_sales_dtl"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'品类',unit:false},
                                {txt:'系列',unit:false},
                                {txt:'69码',unit:false},
                                {txt:'79码',unit:false},
                                {txt:'商品名称',unit:false},
                                {txt:'商品销售（元/月）',unit:'money'},
                                {txt:'当月销售占比',unit:'percent'},
                            ]
                        }
                }
                else {
                    //商品销量表格数据
                        //产品商品销量明细  事业部
                    this.productTableData={
                            titleName:'下单商品明细-事业部',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":'事业部'
                                },
                                "outputCol":"bo1_name,money,ratio_rate",
                                "pageNum":1,
                                "pageSize":100,
                                "groupByCol":["bo1_name"],
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_goods_sales_dtl"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'销售（元/月）',unit:'money'},
                                {txt:'销售占比',unit:'percent'},
                            ]
                        }
                }
            },
            //库存可销天数详情切换维度调用方法
            invDetaSelectButtonClick(val){
                if(val == '系列'){
                    //库存数据列表数据
                    this.invDetailTableData= {
                        //库存可销天数详细
                        getInvDayListing: {
                            titleName:'库存可销天数-系列',
                            params: {
                                "inputParam": {
                                    "data_mon": this.currentDate,
                                    "data_type": "当月",
                                    "partition": "bo2_name"
                                },
                                "isReturnTotalSize": "Y",
                                "outputCol": "bo1_name,bo2_name,bo3_name,saledays",
                                "groupByCol": ["bo1_name","bo2_name","bo3_name"],
                                "pageNum": 1,
                                "pageSize": 100,
                                "serviceId": "service_tjbg02_stock_saledays",
                                "whereCndt": {"dealer_id": "='ff80808169c93eb80169d6a73cc02d04'"}
                            },
                            header: [
                                {txt: '序号', unit: false},
                                {txt: '事业部', unit: false},
                                {txt: '品类', unit: false},
                                {txt: '系列', unit: false},
                                {txt: '可销天数', unit: 'day'},
                            ]
                        },
                    }
                }
                else if(val == '商品'){
                    //库存数据列表数据
                    this.invDetailTableData= {
                        //库存可销天数详细
                        getInvDayListing: {
                            titleName:'库存可销天数-商品',
                            params: {
                                "inputParam": {
                                    "data_mon": this.currentDate,
                                    "data_type": "当月",
                                    "partition": "goods_name"
                                },
                                "isReturnTotalSize": "Y",
                                "outputCol": "bo2_name,bo3_name,goods_code69,goods_code79,goods_name,saledays",
                                "groupByCol": ["bo1_name","bo2_name","bo3_name","goods_name"],
                                "pageNum": 1,
                                "pageSize": 100,
                                "serviceId": "service_tjbg02_stock_saledays",
                                "whereCndt": {"dealer_id": "='ff80808169c93eb80169d6a73cc02d04'"}
                            },
                            header: [
                                {txt: '序号', unit: false},
                                {txt: '品类', unit: false},
                                {txt: '系列', unit: false},
                                {txt: '69码', unit: false},
                                {txt: '79码', unit: false},
                                {txt: '商品名称', unit: false},
                                {txt: '可销天数', unit: 'day'},
                            ]
                        },
                    }
                }
                else {
                    //库存数据列表数据
                    this.invDetailTableData= {
                        //库存可销天数详细
                        getInvDayListing: {
                            titleName:'库存可销天数-品类',
                            params: {
                                "inputParam": {
                                    "data_mon": this.currentDate,
                                    "data_type": "当月",
                                    "partition": "bo2_name"
                                },
                                "isReturnTotalSize": "Y",
                                "outputCol": "bo1_name,bo2_name,bo3_name,saledays",
                                "groupByCol": ["bo1_name","bo2_name"],
                                "pageNum": 1,
                                "pageSize": 100,
                                "serviceId": "service_tjbg02_stock_saledays",
                                "whereCndt": {"dealer_id": "='ff80808169c93eb80169d6a73cc02d04'"}
                            },
                            header: [
                                {txt: '序号', unit: false},
                                {txt: '事业部', unit: false},
                                {txt: '品类', unit: false},
                                {txt: '系列', unit: false},
                                {txt: '可销天数', unit: 'day'},
                            ]
                        },
                    }
                }
            },
            //获取经销商数据
            getDealIdListData(){
                var _this = this
                //经销商集合接口参数
                var params = {
                    "inputParam":{},
                    "outputCol": "dealer_id,dealer_name",
                    "pageNum": 1,
                    "pageSize": 1000,
                    "serviceId": "service_tjbg02_dealer_all",
                    "orderCol":"dealer_id desc"
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=dealList',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    console.log(res)
                    let dealData = res.data.data.data
                    let list = []
                    dealData.map(function(item){
                        list.push({name:item.dealer_name,id:item.dealer_id})
                        if(_this.dealer_id == item.dealer_id){
                            _this.indexDealName = item.dealer_name
                        }
                    })
                    _this.dealList = list
                })
            },
            // //体检报告概览
            // getOverViewData() {
            //     var _this = this
            //     this.$http({
            //         url: _this.requestHttpUrl + '/overviewScoring',
            //         method: 'POST',
            //         data: {
            //             dateTime: _this.currentDate
            //         }
            //     }).then(function (res) {
            //         console.log(res)
            //         let data = res.data.data.data
            //         _this.indexDealName = data.dealName
            //         _this.indexScore = data.score
            //         _this.indexSummary = data.summary
            //     })
            // },
            //本月累计下单金额以及总达成 以及本月累计达成率
            getOneHelpSalesData() {
                var _this = this
                //显示laoding状态
                _this.oneHelpSaleMonthShow = true
                _this.oneHelpSaleYearShow = true
                //获取一帮卖销量本月数据
                function getMonthData(){
                    var params = {
                        "inputParam":
                            {
                                "data_mon":_this.currentDate,
                                "data_type":"当月"
                            },
                        "outputCol":"data_mon,data_type,dealer_id,money,target_money,liby_money,liby_target_money,kispa_money,kispa_target_money,cheerwin_money,cheerwin_target_money,oral_money,oral_target_money,shengmei_money,shengmei_target_money,strategic_money,strategic_target_money",
                        "pageNum":1,
                        "pageSize":1000,
                        "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                        "serviceId":"service_tjbg01_sales"
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl+'?v=oneHelpSalesMonth',
                        method: 'POST',
                        data: params,
                    })
                }
                //获取一帮卖销量年累计数据
                function getYearData(){
                    var params = {
                        "inputParam":
                            {
                                "data_mon":_this.currentDate,
                                "data_type":"累计"
                            },
                        "outputCol":"data_mon,data_type,dealer_id,money,target_money,liby_money,liby_target_money,kispa_money,kispa_target_money,cheerwin_money,cheerwin_target_money,oral_money,oral_target_money,shengmei_money,shengmei_target_money,strategic_money,strategic_target_money",
                        "pageNum":1,
                        "pageSize":1000,
                        "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                        "serviceId":"service_tjbg01_sales"
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl+'?v=oneHelpSalesYear',
                        method: 'POST',
                        data: params,
                    })
                }
                //合并请求 同时请求 本月和累计的销量数据
                this.$http.all([getMonthData(), getYearData()])
                    .then(this.$http.spread((salesMonth, salesYear) => {
                        //判断月销量是否为空
                        if(salesMonth.data.data.data.length!=0){
                            var salesMonthData = salesMonth.data.data.data[0]
                        }else{
                            var salesMonthData=''
                        }
                        //本月下单金额达成率
                        _this.monthSalesData = {
                            sales:_this.dataProcess(salesMonthData.money,'money','tenth').num,
                            reach:(_this.getReachPercent(salesMonthData.money,salesMonthData.target_money)*100).toFixed(2)+'%',
                            bgColor:'#2D92FC',
                            titleName:'本月'
                        }
                        //本月柱状图数据
                        var barDataMonth = [
                            _this.getReachPercent(salesMonthData.liby_money,salesMonthData.liby_target_money),_this.getReachPercent(salesMonthData.kispa_money,salesMonthData.kispa_target_money),
                            _this.getReachPercent(salesMonthData.cheerwin_money,salesMonthData.cheerwin_target_money),_this.getReachPercent(salesMonthData.oral_money,salesMonthData.oral_target_money),
                            _this.getReachPercent(salesMonthData.shengmei_money,salesMonthData.shengmei_target_money),_this.getReachPercent(salesMonthData.strategic_money,salesMonthData.strategic_target_money)
                        ]
                        //柱状图x轴数据
                        let Axiax = ['立白','好爸爸','超威','口腔','晟美','战略品']
                        //年累计达成率历史趋势
                        _this.monthBarData = {
                            config:{
                                id: 'barIdMonthSales',
                                xAxisData: Axiax,
                                unit:['percent'],
                                type: 'xAxis',
                                barData: [
                                    {
                                        name: '达成率',
                                        data: barDataMonth,
                                        color: '#D7D9E5',
                                        barWidth: 11
                                    },
                                ],
                                showType: 0,
                                markLineList:{
                                    show:true,
                                    data:1,
                                }
                            },
                            label: {
                                isShow: true,
                                position:'top'
                            },
                            xAxis:{
                                axisLine:{
                                    show:false,
                                    color:'#3699FF'
                                },
                                axisLabel:{
                                    show:true,
                                    color:'#333333',
                                    fontSize:12
                                },
                                splitLine:{
                                    show:false,
                                    color:'#CCCCCC'
                                },
                            },
                            yAxis:{
                                axisLine:{
                                    show:false,
                                    color:'#3699FF'
                                },
                                axisLabel:{
                                    show:true,
                                    color:'#D7D9E5',
                                    fontSize:12
                                },
                                splitLine:{
                                    show:false,
                                    color:'#CCCCCC'
                                },
                            },
                            legendShow:false,
                            isShowMax:true,
                        }
                        //判断年销量是否为空
                        if(salesYear.data.data.data.length!=0){
                            var salesYearData = salesYear.data.data.data[0]
                        }else{
                            var salesYearData = ''
                        }
                        //年累计下单金额达成率
                        _this.yearSalesData = {
                            sales:_this.dataProcess(salesYearData.money,'money','tenth').num,
                            reach:(_this.getReachPercent(salesYearData.money,salesYearData.target_money)*100).toFixed(2)+'%',
                            bgColor:'#FF9500',
                            titleName:'年累计'
                        }
                        //年累计柱状图数据
                        var barDataYear = [
                            _this.getReachPercent(salesYearData.liby_money,salesYearData.liby_target_money),_this.getReachPercent(salesYearData.kispa_money,salesYearData.kispa_target_money),
                            _this.getReachPercent(salesYearData.cheerwin_money,salesYearData.cheerwin_target_money),_this.getReachPercent(salesYearData.oral_money,salesYearData.oral_target_money),
                            _this.getReachPercent(salesYearData.shengmei_money,salesYearData.shengmei_target_money),_this.getReachPercent(salesYearData.strategic_money,salesYearData.strategic_target_money)
                        ]
                        //年累计达成率历史趋势
                        _this.yearBarData = {
                            config:{
                                id: 'barIdYearSales',
                                xAxisData: Axiax,
                                unit:['percent'],
                                type: 'xAxis',
                                barData: [
                                    {
                                        name: '达成率',
                                        data: barDataYear,
                                        color: '#D7D9E5',
                                        barWidth: 11
                                    },
                                ],
                                showType: 0,
                                markLineList:{
                                    show:true,
                                    data:1,
                                }
                            },
                            label: {
                                isShow: true,
                                position:'top'
                            },
                            xAxis:{
                                axisLine:{
                                    show:false,
                                    color:'#3699FF'
                                },
                                axisLabel:{
                                    show:true,
                                    color:'#333333',
                                    fontSize:12
                                },
                                splitLine:{
                                    show:false,
                                    color:'#CCCCCC'
                                },
                            },
                            yAxis:{
                                axisLine:{
                                    show:false,
                                    color:'#3699FF'
                                },
                                axisLabel:{
                                    show:true,
                                    color:'#D7D9E5',
                                    fontSize:12
                                },
                                splitLine:{
                                    show:false,
                                    color:'#CCCCCC'
                                },
                            },
                            legendShow:false,
                            isShowMax:true,
                        }
                        //一帮卖评分接口参数
                        _this.oneScoreParams = {
                            "moduleName":"一帮卖",
                            "kpi_values":[
                                {
                                    "kpi_name":"月立白达成率",
                                    "kpi_value":_this.getReachPercent(salesMonthData.liby_money,salesMonthData.liby_target_money)*100
                                },
                                {
                                    "kpi_name":"月达成率",
                                    "kpi_value":_this.getReachPercent(salesMonthData.money,salesMonthData.target_money)*100
                                },
                                {
                                    "kpi_name":"月超威达成率",
                                    "kpi_value":_this.getReachPercent(salesMonthData.cheerwin_money,salesMonthData.cheerwin_target_money)*100
                                },
                                {
                                    "kpi_name":"月好爸爸达成率",
                                    "kpi_value":_this.getReachPercent(salesMonthData.kispa_money,salesMonthData.kispa_target_money)*100
                                },
                                {
                                    "kpi_name":"月口腔达成率",
                                    "kpi_value":_this.getReachPercent(salesMonthData.oral_money,salesMonthData.oral_target_money)*100
                                },
                                {
                                    "kpi_name":"月晟美达成率",
                                    "kpi_value":_this.getReachPercent(salesMonthData.shengmei_money,salesMonthData.shengmei_target_money)*100
                                },
                                {
                                    "kpi_name":"月战略达成率",
                                    "kpi_value":_this.getReachPercent(salesMonthData.strategic_money,salesMonthData.strategic_target_money)*100
                                },
                                {
                                    "kpi_name":"年立白达成率",
                                    "kpi_value":_this.getReachPercent(salesYearData.liby_money,salesYearData.liby_target_money)*100
                                },
                                {
                                    "kpi_name":"年达成率",
                                    "kpi_value":_this.getReachPercent(salesYearData.money,salesYearData.target_money)*100
                                },
                                {
                                    "kpi_name":"年超威达成率",
                                    "kpi_value":_this.getReachPercent(salesYearData.cheerwin_money,salesYearData.cheerwin_target_money)*100
                                },
                                {
                                    "kpi_name":"年好爸爸达成率",
                                    "kpi_value":_this.getReachPercent(salesYearData.kispa_money,salesYearData.kispa_target_money)*100
                                },
                                {
                                    "kpi_name":"年口腔达成率",
                                    "kpi_value":_this.getReachPercent(salesYearData.oral_money,salesYearData.oral_target_money)*100
                                },
                                {
                                    "kpi_name":"年晟美达成率",
                                    "kpi_value":_this.getReachPercent(salesYearData.shengmei_money,salesYearData.shengmei_target_money)*100
                                },
                                {
                                    "kpi_name":"年战略达成率",
                                    "kpi_value":_this.getReachPercent(salesYearData.strategic_money,salesYearData.strategic_target_money)*100
                                }
                            ]
                        }
                        // 一帮卖评分描述接口参数
                        let oneScore1 = _this.getReachPercent(salesMonthData.liby_money,salesMonthData.liby_target_money)*100
                        let oneScore2 = _this.getReachPercent(salesYearData.liby_money,salesYearData.liby_target_money)*100
                        let oneScore3 = _this.getReachPercent(salesMonthData.strategic_money,salesMonthData.strategic_target_money)*100
                        let oneScore4 = _this.getReachPercent(salesYearData.strategic_money,salesYearData.strategic_target_money)*100
                        _this.oneScoreTxtParams = {
                            moduleName:"一帮卖结论2",
                            values:oneScore1+','+oneScore2+','+oneScore3+','+oneScore4
                        }
                        //一帮卖评分方法
                        _this.getOneHelpSaleScoreData()
                        //隐藏laoding状态
                        _this.oneHelpSaleMonthShow = false
                        _this.oneHelpSaleYearShow = false
                    }
                ));
            },
            //一帮卖分析-评分
            getOneHelpSaleScoreData(){
                var _this = this
                function getScoreData(){
                    return _this.$http({
                        url: _this.scoreRequestUrl + '?v=oneScore',
                        method: 'POST',
                        data: _this.oneScoreParams,
                    })
                }
                function getScoreTxtData(){
                    return _this.$http({
                        url: _this.scoreTxtRequestUrl + '?v=oneScore',
                        method: 'POST',
                        data: $.param(_this.oneScoreTxtParams),
                    })
                }
                //合并请求 同时请求
                this.$http.all([getScoreData(), getScoreTxtData()])
                    .then(this.$http.spread((score, scoreTxt) => {
                        console.log(score)
                        console.log(scoreTxt)
                        let scoreData = score.data.data
                        let scoreTxtData = scoreTxt.data.data
                        //一帮卖评分
                        _this.oneHelpSaleScoreList = {
                            coretype: '一帮卖得分',
                            coretext: scoreData.toFixed(1),
                            evaluate: scoreTxtData.grade_evaluate,
                            subscribe: scoreTxtData.grade_evaluate_detail,
                        }
                        _this.loadingDataArray.push(true)
                        if(_this.loadingDataArray.length==6){
                            _this.getTotalScoreData()
                        }
                    }
                ))
            },
            //财务模块概览本数据
            getFinanceOverviewData() {
                var _this = this
                //显示laoding状态
                _this.financeIsShow = true
                //财务概览接口参数
                var params = {
                    "inputParam":
                    {
                        "data_mon":_this.currentDate,
                        "data_type":"当月"
                    },
                        "isReturnTotalSize": "Y",
                        "outputCol": "dealer_id,data_mon,data_type,in_money,cost_money,gross_money,factory_money,out_money,profit_money,debt_money,receipt_money,avg_receipt_age,overdue_money,overdue_rate",
                        "pageNum": 1,
                        "pageSize": 1000,
                        "serviceId": "service_tjbg02_finace",
                        "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                    }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=finance',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    //判断财务概览接口是否为空
                    if(res.data.data.data.length!=0){
                        var data = res.data.data.data[0]
                    }else{
                        var data=''
                    }
                    // let data = res.data.data.data[0]
                    //财务报表数据
                    let list = [
                        {name:'收入（万元）',val:_this.dataProcess(data.in_money, 'money','tenth').num},
                        {name:'成本（万元）',val:_this.dataProcess(data.cost_money, 'money','tenth').num},
                        {name:'毛利（万元）',val:_this.dataProcess(data.gross_money, 'money','tenth').num},
                        {name:'厂家费用（万元）',val:_this.dataProcess(data.factory_money, 'money','tenth').num},
                        {name:'支出费用（万元）',val:_this.dataProcess(data.out_money, 'money','tenth').num},
                        {name:'利润（万元）',val:_this.dataProcess(data.profit_money, 'money','tenth').num}
                    ]
                    _this.financeData = list
                    //应收欠款数据
                    _this.receivableData = {
                        receivableTxt: '应收欠款（万元）',
                        receivableValUnit: '￥',
                        receivableVal: _this.dataProcess(data.debt_money, 'money','tenth').num,
                        receivableMonth: '当月已收（万元）',
                        receivableMonthValUnit: '￥',
                        receivableMonthVal: _this.dataProcess(data.receipt_money, 'money','tenth').num,
                        receivableAverage: '平均账龄（天数）',
                        receivableAverageVal: _this.dataProcess(data.avg_receipt_age, 'day').num,
                    }
                    //逾期欠款数据
                    _this.overDueData = {
                        overDueTxt: '逾期账款(万元）',
                        overDueValUnit: '￥',
                        overDueval: _this.dataProcess(data.overdue_money, 'money','tenth').num,
                        overDueRadioTxt: '逾期占比',
                        overDueRadio: _this.dataProcess(data.overdue_rate, 'percent').num + _this.dataProcess(data.overdue_rate, 'percent').unit,
                        overDueRadioPercent: _this.dataProcess(data.overdue_rate, 'percent').num
                    }
                    //隐藏laoding状态
                    _this.financeIsShow = false
                })
            },
            //二帮卖-业务员数据
            getsalesman() {
                var _this = this
                _this.salesmanReached = true
                var params = {
                    "inputParam":
                        {
                            "data_mon":_this.currentDate,
                            "data_type":"当月"
                        },
                    "outputCol":"dealer_id,data_mon,data_type,emp_rate,emp_avg_money,emp_cnt,emp_drop_cnt,all_cnt",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                    "serviceId":"service_tjbg02_emp"
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=salesman',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    if(res.data.code == '200'){
                        //判断财务概览接口是否为空
                        if(res.data.data.data.length!=0){
                            var salesmanData = res.data.data.data[0]
                        }else{
                            var salesmanData= []
                        }
                        // var salesmanData = res.data.data.data[0];
                        _this.personScoreParams={
                            "moduleName":"业务员",
                            "kpi_values":[
                                {
                                    "kpi_name":"业务员达成",
                                    "kpi_value":salesmanData.emp_rate==null ? 0 : Number((salesmanData.emp_rate*100).toFixed(2))
                                },
                                {
                                    "kpi_name":"人均产出",
                                    "kpi_value":salesmanData.emp_avg_money==null ? 0 : salesmanData.emp_avg_money
                                },
                                {
                                    "kpi_name":"业绩下滑人数占比",
                                    "kpi_value":_this.getReachPercent(salesmanData.emp_drop_cnt,salesmanData.emp_cnt)*100
                                },
                            ]
                        }
                        let personScore1 = salesmanData.emp_rate==null ? 0 : Number((salesmanData.emp_rate*100).toFixed(2))
                        let personScore2 = salesmanData.emp_avg_money==null ? 0 : salesmanData.emp_avg_money
                        let personScore3 = salesmanData.emp_drop_cnt
                        // 人员评分描述接口参数
                        _this.personScoreTxtParams = {
                            moduleName:"业务员结论4",
                            values:personScore1+','+personScore2+','+personScore3
                        }
                        _this.getTwoPersonScoreData()
                        salesmanData.emp_rate = !salesmanData.emp_rate ? '--' : _this.dataProcess(salesmanData.emp_rate, 'percent', 1).num + '%'; //业务员达成
                        salesmanData.emp_cnt = !salesmanData.emp_cnt ? '--' : _this.dataProcess(salesmanData.emp_cnt, 'day').num;   //业务员人数
                        salesmanData.emp_avg_money = !salesmanData.emp_avg_money ? '--' : _this.dataProcess(salesmanData.emp_avg_money, 'money','tenth').num;  //人均产出
                        salesmanData.emp_drop_cnt = !salesmanData.emp_drop_cnt ? '--' : _this.dataProcess(salesmanData.emp_drop_cnt, 'day').num;  //下滑人数
                        salesmanData.all_cnt = !salesmanData.all_cnt ? '--' : _this.dataProcess(salesmanData.all_cnt, 'day').num;  //下滑人数
                        _this.salesmanData = salesmanData;
                        _this.salesmanReached = false
                    }
                })
            },
            //二帮卖分析-人员评分
            getTwoPersonScoreData(){
                var _this = this
                function getScoreData(){
                    return _this.$http({
                        url: _this.scoreRequestUrl + '?v=personScore',
                        method: 'POST',
                        data: _this.personScoreParams
                    })
                }
                function getScoreTxtData(){
                    return _this.$http({
                        url: _this.scoreTxtRequestUrl + '?v=personScore',
                        method: 'POST',
                        data: $.param(_this.personScoreTxtParams),
                    })
                }
                //合并请求 同时请求
                this.$http.all([getScoreData(), getScoreTxtData()])
                    .then(this.$http.spread((score, scoreTxt) => {
                        let scoreData = score.data.data
                        let scoreTxtData = scoreTxt.data.data
                        //一帮卖评分
                        _this.personScoreList = {
                            coretype: '人员得分',
                            coretext: scoreData.toFixed(1),
                            evaluate: scoreTxtData.grade_evaluate,
                            subscribe: scoreTxtData.grade_evaluate_detail,
                        }
                        _this.loadingDataArray.push(true)
                        if(_this.loadingDataArray.length==6){
                            _this.getTotalScoreData()
                        }
                    }
                ))
            },
            //二帮卖-订单
            getsecondBand() {
                var _this = this
                _this.towHelpSaleMonthShow = true
                _this.towHelProportion = true
                _this.towHelYoy = true
                var params = {
                    "inputParam":
                        {
                            "data_mon":_this.currentDate,
                            "data_type":"当月"
                        },
                    "outputCol":"data_mon,dealer_id,data_type,dealer_code,dealer_name,money,liby_money,kispa_money,cheerwin_money,oral_money,shengmei_money,other_money,money_lm,liby_money_lm,kispa_money_lm,cheerwin_money_lm,oral_money_lm,shengmei_money_lm,other_money_lm,money_ly,liby_money_ly,kispa_money_ly,cheerwin_money_ly,oral_money_ly,shengmei_money_ly,other_money_ly,gross_money,gross_money_rate,gross_money_lm,gross_money_mom,gross_money_rate_mom,gross_money_ly,gross_money_yoy,gross_money_rate_yoy",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                    "serviceId":"service_tjbg02_sales_order"
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=analysis',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                     if(res.data.code == '200'){
                         //判断二帮卖-订单走势图接口参数是否为空
                         if(res.data.data.data.length!=0){
                             var secondBandData = res.data.data.data[0]
                         }else{
                             var secondBandData=''
                         }
                        var thatMonth = {},chainratio = {},yearOnYear = {};
                        // 当月数据
                        thatMonth.money = !secondBandData.money ? '--' : _this.dataProcess(secondBandData.money, 'money', 'tenth').num;  //本月下单金额
                        if(secondBandData.money){
                            thatMonth.moneyInteger = thatMonth.money.split(".")[0];   //本月下单金额整数部分
                            thatMonth.moneyDecimal = '.' + thatMonth.money.split(".")[1];//本月下单金额小数部分
                        }else {
                            thatMonth.moneyInteger = '--';   //本月下单金额整数部分
                            thatMonth.moneyDecimal = '--';//本月下单金额小数部分
                        }
                        thatMonth.gross_money = !secondBandData.gross_money ? '--' : _this.dataProcess(secondBandData.gross_money, 'money','tenth').num; //毛利额
                        thatMonth.gross_money_rate = !secondBandData.gross_money_rate ? '--' : _this.dataProcess(secondBandData.gross_money_rate, 'percent').num + '%'; //毛利率
                        var list = [{name:'立白',value:!secondBandData.liby_money ? 0 : secondBandData.liby_money},
                            {name:'好爸爸',value:!secondBandData.kispa_money ? 0 : secondBandData.kispa_money},
                            {name:'超威',value:!secondBandData.cheerwin_money ? 0 : secondBandData.cheerwin_money},
                            {name:'口腔',value:!secondBandData.oral_money ? 0 : secondBandData.oral_money},
                            {name:'晟美',value:!secondBandData.shengmei_money ? 0 : secondBandData.shengmei_money},
                            {name:'其他',value:!secondBandData.other_money ? 0 : secondBandData.other_money}]
                        thatMonth.list = {
                            id:'pieSalesManId',
                            colorList:['#365AF8','#FFC925','#7B8EFB','#34DF8E','#A3FC8A','#FF7C25'],
                            labelType:1,
                            unit:['money','tenth'],
                            pieData:list,
                            radius:['40%', '70%'],
                            borderWidth:0,
                        }
                        // 环比数据
                        chainratio.name = '环比';
                        chainratio.moneymonthly = _this.getHandle(secondBandData.money,secondBandData.money_lm,2);   //金额环比
                        chainratio.grossmoneymonthly = _this.dataProcess(secondBandData.gross_money_mom, 'percent').num + _this.dataProcess(secondBandData.gross_money_mom, 'percent').unit; //毛利额环比
                        chainratio.rossmoneyratemonthly = _this.dataProcess(secondBandData.gross_money_rate_mom, 'percent').num+_this.dataProcess(secondBandData.gross_money_rate_mom, 'percent').unit;//毛利率环比
                        chainratio.list = [{name:'立白',value:_this.getHandle(secondBandData.liby_money,secondBandData.liby_money_lm,2)},
                            {name:'好爸爸',value: _this.getHandle(secondBandData.kispa_money,secondBandData.kispa_money_lm,2)},
                            {name:'超威',value: _this.getHandle(secondBandData.cheerwin_money,secondBandData.cheerwin_money_lm,2)},
                            {name:'口腔',value: _this.getHandle(secondBandData.oral_money,secondBandData.oral_money_lm,2)},
                            {name:'晟美',value: _this.getHandle(secondBandData.shengmei_money,secondBandData.shengmei_money_lm,2)},
                            {name:'其他',value: _this.getHandle(secondBandData.other_money,secondBandData.other_money_lm,2)}]
                            chainratio.classNameMoney = chainratio.moneymonthly.indexOf('-')!=-1 && chainratio.moneymonthly!="--" ?  'colorStyle' : ''
                            chainratio.classNamegross = chainratio.grossmoneymonthly.indexOf('-')!=-1 && chainratio.grossmoneymonthly!="--" ?  'colorStyle' : ''
                            chainratio.classNameRoss = chainratio.rossmoneyratemonthly.indexOf('-')!=-1 && chainratio.rossmoneyratemonthly!="--" ?   'colorStyle' : ''
                             chainratio.list.map(function(item){
                                 if(item.value.indexOf('-')!=-1 && item.value!="--"){
                                     item.className = 'colorStyle'
                                 }
                             })
                        // 同比数据
                        yearOnYear.name = '同比';
                        yearOnYear.moneymonthly = _this.getHandle(secondBandData.money,secondBandData.money_ly,2); //金额同比
                        yearOnYear.grossmoneymonthly =  _this.dataProcess(secondBandData.gross_money_yoy, 'percent').num + _this.dataProcess(secondBandData.gross_money_yoy, 'percent').unit;  //毛利额同比
                        yearOnYear.rossmoneyratemonthly = _this.dataProcess(secondBandData.gross_money_rate_yoy, 'percent').num + _this.dataProcess(secondBandData.gross_money_rate_yoy, 'percent').unit; //毛利率同比
                        yearOnYear.list = [{name:'立白',value:_this.getHandle(secondBandData.liby_money,secondBandData.liby_money_ly,2)},
                            {name:'好爸爸',value: _this.getHandle(secondBandData.kispa_money,secondBandData.kispa_money_ly,2)},
                            {name:'超威',value: _this.getHandle(secondBandData.cheerwin_money,secondBandData.cheerwin_money_ly,2)},
                            {name:'口腔',value: _this.getHandle(secondBandData.oral_money,secondBandData.oral_money_ly,2)},
                            {name:'晟美',value: _this.getHandle(secondBandData.shengmei_money,secondBandData.shengmei_money_ly,2)},
                            {name:'其他',value: _this.getHandle(secondBandData.other_money,secondBandData.other_money_ly,2)}]
                         yearOnYear.classNameMoney = yearOnYear.moneymonthly.indexOf('-')!=-1 && yearOnYear.moneymonthly!="--" ?  'colorStyle' : ''
                         yearOnYear.classNamegross = yearOnYear.grossmoneymonthly.indexOf('-')!=-1 && yearOnYear.grossmoneymonthly!="--" ?  'colorStyle' : ''
                         yearOnYear.classNameRoss = yearOnYear.rossmoneyratemonthly.indexOf('-')!=-1 && yearOnYear.rossmoneyratemonthly!="--"  ?  'colorStyle' : ''
                         yearOnYear.list.map(function(item){
                             if(item.value.indexOf('-')!=-1 && item.value!="--"){
                                 item.className = 'colorStyle'
                             }
                         })
                        _this.orderAmountData = {thatMonth:thatMonth,chainratio:chainratio,yearOnYear:yearOnYear}
                        console.log( _this.orderAmountData)
                        _this.orderScoreParams={
                            "moduleName":"订单",
                            "kpi_values":[
                                {
                                    "kpi_name":"下单环比",
                                    "kpi_value":_this.getHandleComputed(secondBandData.money,secondBandData.money_lm)
                                },
                                {
                                    "kpi_name":"立白下单环比",
                                    "kpi_value":_this.getHandleComputed(secondBandData.liby_money,secondBandData.liby_money_lm)
                                },
                                {
                                    "kpi_name":"好爸爸下单环比",
                                    "kpi_value":_this.getHandleComputed(secondBandData.kispa_money,secondBandData.kispa_money_lm)
                                },
                                {
                                    "kpi_name":"超威下单环比",
                                    "kpi_value":_this.getHandleComputed(secondBandData.cheerwin_money,secondBandData.cheerwin_money_lm)
                                },
                                {
                                    "kpi_name":"口腔下单环比",
                                    "kpi_value":_this.getHandleComputed(secondBandData.oral_money,secondBandData.oral_money_lm)
                                },
                                {
                                    "kpi_name":"晟美下单环比",
                                    "kpi_value":_this.getHandleComputed(secondBandData.shengmei_money,secondBandData.shengmei_money_lm)
                                },
                                {
                                    "kpi_name":"毛利额环比",
                                    "kpi_value":secondBandData.gross_money_mom==null ? 0 : (secondBandData.gross_money_mom*100).toFixed(2)
                                },
                                {
                                    "kpi_name":"毛利率环比增长",
                                    "kpi_value":secondBandData.gross_money_rate_mom==null ? 0 : (secondBandData.gross_money_rate_mom*100).toFixed(2)
                                },
                            ]
                        }
                        let orderScore1 = _this.getHandleComputed(secondBandData.money,secondBandData.money_lm)
                        let orderScore2 = secondBandData.gross_money_rate_mom==null ? 0 : (secondBandData.gross_money_rate_mom*100).toFixed(2)
                        _this.orderScoreTxtParams = {
                            moduleName:"订单结论3",
                            values:orderScore1+','+orderScore2
                        }
                        _this.getTwoOrderScoreData()
                        _this.towHelpSaleMonthShow = false
                        _this.towHelProportion = false
                        _this.towHelYoy = false

                     }
                })
            },
            //二帮卖分析-订单评分
            getTwoOrderScoreData(){
                var _this = this
                function getScoreData(){
                    return _this.$http({
                        url: _this.scoreRequestUrl + '?v=orderScore',
                        method: 'POST',
                        data: _this.orderScoreParams
                    })
                }
                function getScoreTxtData(){
                    return _this.$http({
                        url: _this.scoreTxtRequestUrl + '?v=orderScore',
                        method: 'POST',
                        data: $.param(_this.orderScoreTxtParams),
                    })
                }
                //合并请求 同时请求
                this.$http.all([getScoreData(), getScoreTxtData()])
                    .then(this.$http.spread((score, scoreTxt) => {
                        let scoreData = score.data.data
                        let scoreTxtData = scoreTxt.data.data
                        //一帮卖评分
                        _this.orderScoreList = {
                            coretype: '订单得分',
                            coretext: scoreData.toFixed(1),
                            evaluate: scoreTxtData.grade_evaluate,
                            subscribe: scoreTxtData.grade_evaluate_detail,
                        }
                        _this.loadingDataArray.push(true)
                        if(_this.loadingDataArray.length==6){
                            _this.getTotalScoreData()
                        }
                    }
                ))
            },
            //二帮卖-订单走势图
            getdirection() {
                var _this = this
                _this.towHelpSaleMonthLineShow = true;
                var params = {
                    "inputParam":
                        {
                            "data_mon":_this.currentDate,
                            "data_type":'13'
                        },

                    "outputCol":"data_mon,dealer_id,data_type,dealer_code,dealer_name,money,liby_money,kispa_money,cheerwin_money,oral_money,shengmei_money,other_money,money_lm,liby_money_lm,kispa_money_lm,cheerwin_money_lm,oral_money_lm,shengmei_money_lm,other_money_lm,money_ly,liby_money_ly,kispa_money_ly,cheerwin_money_ly,oral_money_ly,shengmei_money_ly,other_money_ly,gross_money,gross_money_rate,gross_money_lm,gross_money_mom,gross_money_rate_mom,gross_money_ly,gross_money_yoy,gross_money_rate_yoy",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                    "serviceId":"service_tjbg02_sales_order"
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=direction',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    console.log(res)
                    //判断二帮卖-订单走势图接口参数是否为空
                    // if(res.data.data.data.length!=0){
                    //     var directionData = res.data.data.data
                    // }else{
                    //     var directionData=[]
                    // }
                    var directionData = res.data.data.data,monthArr = [],seriesData=[],directionArr = {};
                    directionData.map(function(value){
                        monthArr.push(value.data_mon)
                        seriesData.push(value.money)
                    })
                    directionArr.monthArr = monthArr;
                    directionArr.seriesData = seriesData;
                    _this.directionData ={
                        config:{
                            id:'lineIdBandDirect',
                            xAxisData:directionArr.monthArr,
                            unit:['money','tenth'],
                            lineData:[
                                {
                                    name:'订单金额',
                                    data:directionArr.seriesData,
                                    color:'#00E2BF'
                                },
                            ],
                        },
                        xAxis:{
                            axisLine:{
                                show:true,
                                color:'#333'
                            },
                            axisLabel:{
                                show:true,
                                color:'#333',
                                fontSize:14
                            },
                            splitLine:{
                                show:false,
                                color:'#C3C6CD'
                            },
                        },
                        yAxis:{
                            axisLine:{
                                show:true,
                                color:'#333'
                            },
                            axisLabel:{
                                show:true,
                                color:'#333',
                                fontSize:14
                            },
                            splitLine:{
                                show:true,
                                color:'#C3C6CD'
                            },
                        },
                    }
                    console.log(_this.directionData)
                    _this.towHelpSaleMonthLineShow = false
                })
            },
            //业务员-走势图
            getsalesmanTrend() {
                var _this = this
                _this.salesmanTrendPie = true;
                var params = {
                    "inputParam":
                        {
                            "data_mon":_this.currentDate,
                            "data_type":"13"
                        },
                    "outputCol":"dealer_id,data_mon,data_type,emp_name,emp_phone,emp_money,emp_target_money,emp_rate,emp_money_rate,gross_money,gross_rate",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                    "serviceId":"service_tjbg02_emp_rate"
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=salesmanTrend',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    //判断业务员-走势图接口参数是否为空
                    if(res.data.data.data.length!=0){
                        var salesmanTrendData = res.data.data.data
                    }else{
                        var salesmanTrendData=''
                    }
                    var xAxisData=[],salesmanArr=[],seriesData=[],salesmanColor=['#009EE2','#E9A837','#00E2BF','#65E6F5'];
                    console.log(salesmanTrendData)
                    salesmanTrendData.map(function(value){
                        if(xAxisData.length==0){
                          xAxisData.push(value.data_mon);
                        }else{
                          if(xAxisData.indexOf(value.data_mon) == -1){
                            xAxisData.push(value.data_mon);
                          }
                        }
                        if(salesmanArr.length==0){
                          salesmanArr.push(value.emp_name);
                        }else{
                          if(salesmanArr.indexOf(value.emp_name) == -1){
                            salesmanArr.push(value.emp_name);
                          }
                        }
                    })
                    salesmanArr.map(function(value,index){
                        var tempObjecd = {name:value,color:salesmanColor[index]},tempArr = [];
                        salesmanTrendData.map(function(data){
                           if(value == data.emp_name){
                                tempArr.push(!data.emp_rate ? 0 : data.emp_rate)
                            }
                        })
                        tempObjecd.data = tempArr;
                        seriesData.push(tempObjecd)
                    })
                    var tempsalesmanTrendData = {monthArr:xAxisData,seriesData:seriesData}
                    _this.salesmanTrendData = {
                        id:'lineSalesTrendId123',
                        unit:['percent'],
                        xAxisData:tempsalesmanTrendData.monthArr,
                        lineData:tempsalesmanTrendData.seriesData
                    }
                    console.log( _this.salesmanTrendData)
                    _this.salesmanTrendPie = false;

                })
            },
            //业务员-下滑人员
            getsalesmandownward() {
                var _this = this
                _this.salesmandownwardBar = true
                var params = {
                    "inputParam":{
                        "data_mon":_this.currentDate,
                        "data_type":"当月"
                    },
                    "outputCol":"dealer_id,data_mon,data_type,emp_name,emp_phone,money,money_lm,money_rate_lm,money_rate,dif_money",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                    "serviceId":"service_tjbg02_emp_drop"
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=salesmandownward',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    if(res.data.code == '200'){
                        //判断业务员-下滑人员接口参数是否为空
                        // if(res.data.data.data.length!=0){
                        //     var salesmandownwardData = res.data.data.data
                        // }else{
                        //     var salesmandownwardData=''
                        // }
                        var salesmandownwardData = res.data.data.data,xAxisData=[],seriesData=[],lastMonth=[],sameMonth=[],difference=[],salesmandownwardObject={},exportData=[];
                        salesmandownwardData.map(function(value,index){
                            exportData.push({
                                index: index + 1,  //序号
                                emp_name: value.emp_name,   //业务员
                                emp_phone:value.emp_phone,   //联系电话
                                money_lm: value.money_lm,         //上月销量（元）
                                money_rate_lm: _this.dataProcess(value.money_rate_lm,'percent').num +_this.dataProcess(value.money_rate_lm,'percent').unit,   //上月达成率
                                money: value.money, //当月销量（元）
                                money_rate:  _this.dataProcess(value.money_rate,'percent').num +_this.dataProcess(value.money_rate,'percent').unit, //当月达成率
                                dif_money: value.dif_money  //差额（元）
                            })
                            if(index<5) {
                                xAxisData.push(value.emp_name);
                                lastMonth.push(value.money_lm)
                                sameMonth.push(value.money)
                                difference.push(Math.abs(value.dif_money))
                            }
                        })
                        seriesData.push(
                            {name:'上月销售额',data:lastMonth,color:'#009EE2',barWidth:'22'},
                            {name:'本月销售额',data:sameMonth,color:'#E9A837',barWidth:'22'},
                            {name:'销售差额',data:difference,color:'#FE9600',barWidth:'22'})
                        salesmandownwardObject.xAxisData = xAxisData;
                        salesmandownwardObject.seriesData = seriesData;
                        _this.salesmandownwardData = salesmandownwardObject
                        _this.salesmandownwardBar = false
                        console.log(_this.salesmandownwardData)

                        _this.ownwardExportData = {
                            tableHeaderTxt:['序号','业务员','联系电话','上月销量（元）','上月达成率','当月销量（元）','当月达成率','差额（元）'],
                            tableHeaderKey:['index','emp_name','emp_phone','money_lm','money_rate_lm','money','money_rate','dif_money'],
                            tableData:exportData,
                            tableName:'下滑业务员'
                        }
                    }
                })
            },
            //业务员-达成-贡献
            getSalesmanReached() {
                var _this = this
                _this.salesmanReachedBar = true;
                _this.salesmanContributionBar = true;
                var params = {
                    "inputParam":{
                        "data_mon":_this.currentDate,
                        "data_type":"当月"
                    },
                    "outputCol":"emp_name,emp_phone,emp_target_money,emp_money,emp_dif_money,emp_rate,emp_money_rate,gross_money,gross_rate,dealer_money",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                    "serviceId":"service_tjbg02_emp_rate"
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=salesmanReached',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    if(res.data.code == '200'){
                        //判断业务员-达成-贡献接口参数是否为空
                        if(res.data.data.data.length!=0){
                            var salesmanReachedData = res.data.data.data
                        }else{
                            var salesmanReachedData=''
                        }
                        // 达成
                        let targetList = []
                        var xAxisData=[],seriesData=[],lastMonth=[],sameMonth=[],difference=[],salesmanReachedObject={},contributionseriesData=[],contributionlastMonth=[],contributiondifference = [],salesmanContributionObject={};
                        salesmanReachedData.map(function(value,index){
                            xAxisData.push(value.emp_name);
                            lastMonth.push(value.emp_money)
                            sameMonth.push(value.emp_target_money)
                            difference.push(value.emp_rate)
                            contributionlastMonth.push(value.dealer_money)
                            contributiondifference.push(value.emp_money_rate)
                            value.numberId = index+1
                            targetList.push(   //处理表格数据 百分比转换
                                {   numberId:value.numberId,
                                    emp_name:value.emp_name,
                                    emp_phone:value.emp_phone,
                                    emp_target_money:value.emp_target_money,
                                    emp_money:value.emp_money,
                                    emp_dif_money:value.emp_dif_money,
                                    emp_rate:_this.dataProcess(value.emp_rate, 'percent').num+_this.dataProcess(value.emp_rate, 'percent').unit,
                                    emp_money_rate:_this.dataProcess(value.emp_money_rate, 'percent').num+_this.dataProcess(value.emp_money_rate, 'percent').unit,
                                    gross_money:value.gross_money,
                                    gross_rate:_this.dataProcess(value.gross_rate, 'percent').num+_this.dataProcess(value.gross_rate, 'percent').unit,
                                },
                            )
                        })
                        console.log(targetList)
                        //导出数据
                        _this.reachContributionData = {
                            headerTxt:['序号','业务员姓名','联系电话','目标销量（元/月）','下单金额（元/月）','完成差额（元/月）','达成率','销量占比','毛利额（元）','毛利率'],
                            headerKey:["numberId","emp_name","emp_phone","emp_target_money","emp_money","emp_dif_money","emp_rate","emp_money_rate","gross_money","gross_rate"],
                            data:targetList,  //获取到处理好的表格数据
                            name:'达成和贡献'
                        }
                        seriesData.push(
                            {name:'当月目标',data:sameMonth,color:'#FFBD7B',barWidth:'自适应'},
                            {name:'当月销量',data:lastMonth,color:'#FE9600',barWidth:'自适应'},
                            {name:'达成率',data:difference,color:'#fff',barWidth:0},
                            )
                        salesmanReachedObject.xAxisData = xAxisData;
                        salesmanReachedObject.seriesData = seriesData;
                        _this.salesmanReachedData = salesmanReachedObject;
                        _this.salesmanReachedBar = false
                        // 贡献
                        contributionseriesData.push(
                            {name:'当月销量',data:sameMonth,color:'#2D92FC',barWidth:'自适应'},
                            {name:'当月总销量',data:contributionlastMonth,color:'#85C1FF',barWidth:'自适应'},
                            {name:'贡献率',data:contributiondifference,color:'#fff',barWidth:0}
                            )
                        salesmanContributionObject.xAxisData = xAxisData;
                        salesmanContributionObject.seriesData = contributionseriesData;
                        _this.salesmanContributionData = salesmanContributionObject;
                        _this.salesmanContributionBar = false

                        console.log('1111111111111111')
                        console.log(_this.salesmanReachedData)
                        console.log(_this.salesmanContributionData)
                    }
                })
            },
            //产品-商品动销率，商品动销数
            getCommodityTurnoverRate() {
                var _this = this
                _this.CommodityRate = true
                _this.NumberGoods = true
                var params = {
                    "inputParam":{
                        "data_mon":_this.currentDate,
                        "data_type":"当月"
                    },
                    "outputCol":"dealer_id,data_mon,data_type,stock_sale_rate,stock_sale_goods_cnt,goods_cnt,stock_sale_goods_cnt_mom,stock_sale_goods_cnt_yoy,sales_raise_goods_cnt,sales_drop_goods_cnt,liby_stock_sale_rate,kispa_stock_sale_rate,cheerwin_stock_sale_rate,oral_stock_sale_rate,shengmei_stock_sale_rate",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                    "serviceId":"service_tjbg02_goods"
                }
                this.$http({
                    url: _this.testRequestHttpUrl+'?v=produceOverview',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    //判断产品-商品动销率，商品动销数接口参数是否为空
                        if(res.data.data.data.length!=0){
                            var data = res.data.data.data[0]
                        }else{
                            var data=''
                        }
                        _this.productScoreParams={
                            "moduleName":"产品",
                            "kpi_values":[
                                {
                                    "kpi_name":"商品动销率",
                                    "kpi_value":data.stock_sale_rate==null ? 0 : Number((data.stock_sale_rate*100).toFixed(2))
                                },
                                {
                                    "kpi_name":"立白商品动销率",
                                    "kpi_value":data.liby_stock_sale_rate==null ? 0 : Number((data.liby_stock_sale_rate*100).toFixed(2))
                                },
                                {
                                    "kpi_name":"好爸爸商品动销率",
                                    "kpi_value":data.kispa_stock_sale_rate==null ? 0 : Number((data.kispa_stock_sale_rate*100).toFixed(2))
                                },
                                {
                                    "kpi_name":"超威商品动销率",
                                    "kpi_value":data.cheerwin_stock_sale_rate==null ? 0 : Number((data.cheerwin_stock_sale_rate*100).toFixed(2))
                                },
                                {
                                    "kpi_name":"口腔商品动销率",
                                    "kpi_value":data.oral_stock_sale_rate==null ? 0 : Number((data.oral_stock_sale_rate*100).toFixed(2))
                                },
                                {
                                    "kpi_name":"晟美商品动销率",
                                    "kpi_value":data.shengmei_stock_sale_rate==null ? 0 : Number((data.shengmei_stock_sale_rate*100).toFixed(2))
                                },
                                {
                                    "kpi_name":"动销商品数环比",
                                    "kpi_value":data.stock_sale_goods_cnt_mom==null ? 0 : Number((data.stock_sale_goods_cnt_mom*100).toFixed(2))
                                },
                                {
                                    "kpi_name":"销量下滑商品占比",
                                    "kpi_value":_this.getReachPercent(data.sales_drop_goods_cnt,data.goods_cnt)*100
                                },
                            ]
                        }
                        let orderScore1 = data.stock_sale_rate==null ? 0 : Number((data.stock_sale_rate*100).toFixed(2))
                        let orderScore2 = data.stock_sale_goods_cnt_mom==null ? 0 : Number((data.stock_sale_goods_cnt_mom*100).toFixed(2))
                        _this.productScoreTxtParams = {
                            moduleName:"商品结论5",
                            values:orderScore1+','+orderScore2
                        }
                        _this.getTwoProductScoreData()
                        //  console.log(res)
                        // let data = res.data.data.data[0]
                        console.log(data)
                    //产品环比数据
                        let goodsChainVal = {
                            name: "环比:",
                            NoSales: !data.stock_sale_goods_cnt_mom ? '--' : _this.dataProcess(data.stock_sale_goods_cnt_mom,'percent').num+_this.dataProcess(data.stock_sale_goods_cnt_mom,'percent').unit,
                            classNameNoSales:data.stock_sale_goods_cnt_mom < 0 ? 'colorStyle' : '',
                        }
                    //产品同比数据
                        let goodsYearVal = {
                            name: "同比:",
                            NoSales: !data.stock_sale_goods_cnt_yoy ? '--' :_this.dataProcess(data.stock_sale_goods_cnt_yoy,'percent').num+_this.dataProcess(data.stock_sale_goods_cnt_yoy,'percent').unit,
                            classNameNoSales:data.stock_sale_goods_cnt_yoy < 0 ? 'colorStyle' : '',
                        }
                    //产品销量增长商品数数据
                        let downGoods = {
                            name:"销量增长商品数(个):",
                            NoSales:!data.sales_raise_goods_cnt ? '--' :data.sales_raise_goods_cnt,
                            btn:"下滑商品"
                        }
                    //产品销量下滑商品数数据
                        let upGoods = {
                            name:"销量下滑商品数(个):",
                            NoSales: !data.sales_drop_goods_cnt ? '--' :data.sales_drop_goods_cnt,
                            btn:"增长商品"
                        }

                        _this.commoditydata = {
                            //环比同比数据
                            commoditytitle:[
                                goodsChainVal,
                                goodsYearVal,

                            ],
                            downGoods,  //销量增长商品数
                            upGoods,   //销量下滑商品数
                            commodityname:"总商品数",
                            name:"分销商品数",
                            btn:"商品明细",
                            RatePin:!data.stock_sale_goods_cnt ? '--' :data.stock_sale_goods_cnt,  //动销商品数
                            commoditysum:!data.goods_cnt ? '--' :data.goods_cnt,   //总商品数
                            productimg: require("../assets/img/shangpinshu.png"), //动销商品数图片
                        }
                        //产品动销率树状图
                        let barDataMonth = [
                            data.liby_stock_sale_rate, data.kispa_stock_sale_rate,
                            data.cheerwin_stock_sale_rate, data.oral_stock_sale_rate,
                            data.shengmei_stock_sale_rate
                        ]
                        console.log(barDataMonth)
                        let Axiax = ['立白','好爸爸','超威','口腔','晟美']
                        let produnarData = {
                            config:{
                                id: 'barIdProdun',
                                unit:['percent'],
                                xAxisData: Axiax,
                                label: {
                                    isShow: true
                                },
                                type: 'xAxis',
                                barData: [
                                    {
                                        name: '分销率',
                                        data: barDataMonth,
                                        color: '#fff',
                                        barWidth: 11
                                    },
                                ],
                                showType: 1,
                                markLineList:{
                                    show:false,
                                    data:100,
                                }
                            },
                            grid:{
                                top: 'middle',
                                left: '3%',
                                right: '20%',
                                height: '75%',
                                bottom:'3%',
                                containLabel: true
                            },
                            label: {
                                isShow: true,
                                position:'right'
                            },
                            xAxis:{
                                axisLine:{
                                    show:true,
                                    color:'rgba(207,222,255,0.2)'
                                },
                                axisLabel:{
                                    show:true,
                                    color:'#fff',
                                    fontSize:12
                                },
                                splitLine:{
                                    show:false,
                                    color:'#fff'
                                },
                            },
                            yAxis:{
                                axisLine:{
                                    show:true,
                                    color:'rgba(207,222,255,0.2)'
                                },
                                axisLabel:{
                                    show:true,
                                    color:'#fff',
                                    fontSize:12
                                },
                                splitLine:{
                                    show:false,
                                    color:'#fff'
                                },
                            },
                            legendShow:false,
                            isShowMax:true,
                        }
                        _this.CommodityTurnoverRate = {
                            productimg:require("../assets/img/dongxiao.png"), //商品分销率图片
                            name:"商品分销率",
                            RatePin:!data.stock_sale_rate ? '--' :_this.dataProcess(data.stock_sale_rate, 'percent').num+_this.dataProcess(data.stock_sale_rate, 'percent').unit, //商品动销率
                            btn:"分销清单",
                            produnarData
                        }
                        _this.CommodityRate = false //加载效果变关闭
                        _this.NumberGoods=false  //加载效果变关闭
                        console.log(_this.CommodityTurnoverRate)
                        console.log(_this.commoditydata)
                    },
                )
            },
            //二帮卖分析-商品评分
            getTwoProductScoreData(){
                var _this = this
                function getScoreData(){
                    return _this.$http({
                        url: _this.scoreRequestUrl + '?v=productScore',
                        method: 'POST',
                        data: _this.productScoreParams
                    })
                }
                function getScoreTxtData(){
                    return _this.$http({
                        url: _this.scoreTxtRequestUrl + '?v=productScore',
                        method: 'POST',
                        data: $.param(_this.productScoreTxtParams),
                    })
                }
                //合并请求 同时请求
                this.$http.all([getScoreData(), getScoreTxtData()])
                    .then(this.$http.spread((score, scoreTxt) => {
                        let scoreData = score.data.data
                        let scoreTxtData = scoreTxt.data.data
                        //一帮卖评分
                        _this.productScoreList = {
                            coretype: '商品得分',
                            coretext: scoreData.toFixed(1),
                            evaluate: scoreTxtData.grade_evaluate,
                            subscribe: scoreTxtData.grade_evaluate_detail,
                        }
                        _this.loadingDataArray.push(true)
                        if(_this.loadingDataArray.length==6){
                            _this.getTotalScoreData()
                        }
                    }
                ))
            },
            // //产品-列表数据导出
            // getProductExportData(){
            //     var _this = this
            //      var params = {
            //         "inputParam":
            //         {
            //             "data_mon":_this.currentDate,
            //             "data_type":"当月",
            //             "bo_type":"品类"
            //         },
            //         "outputCol":"bo1_name,bo2_name,bo3_name,goods_name,money,RATIO_RATE",
            //         "pageNum":_this.productPageNum,
            //         "isReturnTotalSize": "Y",
            //         "pageSize":_this.exportPageSize,
            //         "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'","bo2_name":"='"+_this.categoryName+"'"},
            //         "groupByCol":["bo1_name","bo2_name","bo3_name","goods_name"],
            //         "serviceId":"service_tjbg02_sales_order_dtl"
            //     }
            //     this.$http({
            //         url: _this.testRequestHttpUrl + '?v=GoodsDetailTable',
            //         method: 'POST',
            //         data: params
            //     }).then(function (res) {
            //         console.log(res)
            //         var data = res.data.data.data;
            //         let headerTxt = [
            //             '事业部',
            //             '品类',
            //             '系列',
            //             '商品名称',
            //             '销量（元）',
            //             '销售占比',
            //         ]
            //         let headerKey = params.outputCol.split(',')
            //         _this.exportDetailData = {
            //             headerTxt:headerTxt,
            //             headerKey:headerKey,
            //             name:'商品明细',
            //             data:data
            //         }
            //     })
            // },
            // //产品-列表数据
            // getProductTableData(){
            //     var _this = this
            //     _this.NumberGoodsList = true
            //      var params = {
            //         "inputParam":
            //         {
            //             "data_mon":_this.currentDate,
            //             "data_type":"当月",
            //             "bo_type":"品类"
            //         },
            //         "outputCol":"bo1_name,bo2_name,bo3_name,goods_name,money,RATIO_RATE",
            //         "pageNum":_this.productPageNum,
            //         "isReturnTotalSize": "Y",
            //         "pageSize":1000,
            //         "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'","bo2_name":"='"+_this.categoryName+"'"},
            //         "groupByCol":["bo1_name","bo2_name","bo3_name","goods_name"],
            //         "serviceId":"service_tjbg02_sales_order_dtl"
            //     }
            //     this.$http({
            //         url: _this.testRequestHttpUrl + '?v=GoodsDetailTable',
            //         method: 'POST',
            //         data: params
            //     }).then(function (res) {
            //         console.log(res)
            //         var data = res.data.data.data;
            //         let headerTxt = [
            //             {title:'事业部'},
            //             {title:'品类'},
            //             {title:'系列'},
            //             {title:'商品名称'},
            //             {title:'销量（元）'},
            //             {title:'销售占比'},
            //         ]
            //         let headerKey = params.outputCol.split(',')
            //         headerKey.map(function(item,index){
            //             headerTxt[index].key = item
            //         })
            //         let tablecColumns = headerTxt
            //         _this.productTableData = {
            //             data:data,
            //             columns:tablecColumns,
            //             totalSize:res.data.data.totalSize,
            //             defaultSize:params.pageSize,
            //             category:_this.categoryList
            //         }
            //         _this.NumberGoodsList = false
            //         console.log(_this.productTableData)
            //     })
            // },

            //产品-产品下滑/增长商品
            getVariability() {
                var _this = this
                _this.NumberGoodsUpBar = true
                _this.NumberGoodsDownBar = true
                //下滑产品数据
                function getProDownData(){
                    var params = {
                        "inputParam":{
                            "data_mon":_this.currentDate,
                            "data_type":"当月",
                            "money_type":"下滑",
                            "bo_type":"商品"
                        },
                        "outputCol":"goods_code69,goods_code79,goods_name,money_lm,money,dif_money",
                        "pageNum":1,
                        "pageSize":1000,
                        "orderCol":'dif_money desc',
                        "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                        "serviceId":"service_tjbg02_goods_sales_change"
                    }
                    let keyValue = params.outputCol.split(',')
                    let numArray = ['numberId']
                        _this.tableHeaderKey = numArray.concat(keyValue)
                    _this.ProExportData.prodownData = {
                        //下滑产品导出数据
                        tableHeaderTxt:['序号','69码','79码','商品名称','上月销量（元）','当月销量（元）','差额（元）'],
                        tableData:'',
                        tableName:'下滑商品',
                        tableHeaderKey:numArray.concat(keyValue)
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl+'?v=variabilityDown',
                        method: 'POST',
                        data: params,
                    })
                }
                //增长产品数据
                function getProRaiseData(){
                    var params = {
                        "inputParam":{
                            "data_mon":_this.currentDate,
                            "data_type":"当月",
                            "money_type":"上升",
                            "bo_type":"商品"
                        },
                        "outputCol":"goods_code69,goods_code79,goods_name,money,money_lm,dif_money",
                        "pageNum":1,
                        "pageSize":1000,
                        "orderCol":'dif_money desc',
                        "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                        "serviceId":"service_tjbg02_goods_sales_change"
                    }
                    let keyValue = params.outputCol.split(',')
                    let numArray = ['numberId']
                    _this.tableHeaderKey = numArray.concat(keyValue)
                    _this.ProExportData.proraiseData = {
                        //增长产品导出数据
                        tableHeaderTxt:['序号','69码','79码','商品名称','上月销量（元）','当月销量（元）','差额（元）'],
                        tableData:'',
                        tableName:'增长商品',
                        tableHeaderKey:numArray.concat(keyValue)  //key对应表头
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl+'?v=variabilityUp',
                        method: 'POST',
                        data: params,
                    })
                }
                this.$http.all([getProRaiseData(), getProDownData()])
                    .then(this.$http.spread((proraiseData, prodownData) => {
                            console.log(proraiseData)  //增长
                            console.log(prodownData)   //下滑
                            //增长产品数据
                            //判断增长产品数据是否为空
                            if(proraiseData.data.data.data.length!=0){
                                var proraiseList = proraiseData.data.data.data
                            }else{
                                var proraiseList=''
                            }
                            // let proraiseList = proraiseData.data.data.data
                            console.log(proraiseList)
                            let raisexAxisData = []//增长门店x轴
                            let raiseLastMonth = []//增长门店上月销售额
                            let raiseSameMonth = []//增长门店当月销售额
                            let raiseDifference = []//增长门店差异销售额
                            proraiseList.map(function(item,index){
                                item.numberId = index+1
                                if(index<5) {
                                    raisexAxisData.push(item.goods_name)  //商品名称
                                    raiseLastMonth.push(item.money_lm)//上月销售额
                                    raiseSameMonth.push(item.money)//当月销售额
                                    raiseDifference.push(Math.abs(item.dif_money))//差异销售额
                                }
                            })
                            _this.ProExportData.proraiseData.tableData = proraiseList
                             console.log(proraiseList)
                            console.log( _this.ProExportData.proraiseData)
                            //增长产品柱状图数据
                            let raiseBarData = {
                                //id
                                id:'barRaiseId',
                                //数据单位
                                unit:['money'],
                                //x轴单位
                                xAxisData:raisexAxisData,
                                type:'xAxis',
                                //柱状图数据
                                barData:[
                                    {
                                        name:'上月销售额',
                                        data:raiseLastMonth,
                                        color:'#2D92FC',
                                        barWidth:22,
                                    },
                                    {
                                        name:'当月销售额',
                                        data:raiseSameMonth,
                                        color:'#FFBD7B',
                                        barWidth:22,
                                    },
                                    {
                                        name:'销售差额',
                                        data:raiseDifference,
                                        color:'#FE9600',
                                        barWidth:22,
                                    },
                                ],
                                showType:0,//0横过来 1竖起来
                                //markline
                                markLineList:{
                                    show:false
                                },
                            }
                            _this.upproStoresData = raiseBarData
                            //下滑产品数据
                            //判断下滑产品数据是否为空
                            if(prodownData.data.data.data.length!=0){
                                var downList = prodownData.data.data.data
                            }else{
                                var downList=''
                            }
                            // let downList = prodownData.data.data.data
                            let downxAxisData = []//下滑门店x轴
                            let downLastMonth = []//下滑门店上月销售额
                            let downSameMonth = []//下滑门店当月销售额
                            let downDifference = []//下滑门店差异销售额
                            downList.map(function(item,index){
                                item.numberId = index+1
                                if(index<5) {
                                    downxAxisData.push(item.goods_name)  //商品名称
                                    downLastMonth.push(item.money_lm)//上月销售额
                                    downSameMonth.push(item.money)//当月销售额
                                    downDifference.push(Math.abs(item.dif_money))//差异销售额
                                }
                            })
                            _this.ProExportData.prodownData.tableData = downList
                            console.log( _this.ProExportData.prodownData.tableData)
                            //下滑产品柱状图数据
                            let downBarData = {
                                //id
                                id:'barDownId',
                                //数据单位
                                unit:['money'],
                                //x轴单位
                                xAxisData:downxAxisData,
                                type:'xAxis',
                                //柱状图数据
                                barData:[
                                    {
                                        name:'上月销售额(万元)',
                                        data:downLastMonth,
                                        color:'#2D92FC',
                                        barWidth:22,
                                    },
                                    {
                                        name:'当月销售额(万元)',
                                        data:downSameMonth,
                                        color:'#FFBD7B',
                                        barWidth:22,
                                    },
                                    {
                                        name:'销售差额(万元)',
                                        data:downDifference,
                                        color:'#FE9600',
                                        barWidth:22,
                                    },
                                ],
                                showType:0,//0横过来 1竖起来
                                //markline
                                markLineList:{
                                    show:_this
                                },
                            }
                            _this.prodownStoresData = downBarData
                            console.log( _this.prodownStoresData)
                             console.log(_this.downStoresData)
                            _this.NumberGoodsUpBar = false//关闭looding效果
                           _this.NumberGoodsDownBar = false //关闭looding效果
                        })
                    )
            },

            // //产品-动销商品明细
            // getGoodsdetail() {
            //     var _this = this
            //     _this.NumberGoodsPie = true
            //     var params = {
            //         "inputParam":{
            //             "data_mon":_this.currentDate,
            //             "data_type":"当月",
            //             "bo_type":'品类'
            //         },
            //         "outputCol":"bo1_name,bo2_name,bo3_name,goods_name,money,ratio_rate,money_mom,money_yoy",
            //         "pageNum":1,
            //         "pageSize":1000,
            //         "groupByCol":["dealer_id","data_mon"],
            //         "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
            //         "serviceId":"service_tjbg02_sales_order_dtl"
            //     }
            //     this.$http({
            //         url: _this.testRequestHttpUrl + '?v=GoodsDetail',
            //         method: 'POST',
            //         data: params
            //     }).then(function (res) {
            //         var Goods = res.data.data.data;
            //         let list =[]
            //         let list1=[]
            //         Goods.map(function(item){
            //             list.push({value:item.money,name:item.bo2_name})
            //             list1.push(item.bo2_name)
            //         })
            //         _this.categoryList = list1
            //         _this.GoodsDetail = list;
            //         _this.NumberGoodsPie = false
            //         console.log(_this.GoodsDetail)
            //     })
            // },
            //

            // 门店模块概览
            getStoresDetailed() {
                var _this = this
                //显示loading状态
                _this.StoreisShow = true
                var params = {
                    "inputParam":
                        {
                            "data_mon":_this.currentDate,
                            "data_type":"当月"
                        },
                    "outputCol":"dealer_id,data_mon,data_type,active_store_cnt,active_store_cnt_mom,active_store_cnt_yoy,sale_drop_store_cnt,sale_raise_store_cnt,unsale_store_cnt,mon3_unsale_store_cnt,mon3_unsale_store_dept_money,close_store_dept_money,store_avg_money,store_cnt,new_store_cnt,active_store_rate,mon6_unsale_store_cnt",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                    "serviceId":"service_tjbg02_store"
                }
                this.$http({
                    url: _this.testRequestHttpUrl+'?v=storeActivity',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    //判断门店模块概览数据是否为空
                    if(res.data.data.data.length!=0){
                        var data = res.data.data.data[0]
                    }else{
                        var data=''
                    }
                    _this.storeScoreParams={
                        "moduleName":"门店",
                        "kpi_values":[
                            {
                                "kpi_name":"门店活跃率",
                                "kpi_value":data.active_store_rate==null ? 0 : Number((data.active_store_rate*100).toFixed(2))
                            },
                            {
                                "kpi_name":"活跃门店数环比",
                                "kpi_value":data.active_store_cnt_mom==null ? 0 : Number((data.active_store_cnt_mom*100).toFixed(2))
                            },
                            {
                                "kpi_name":"销量下滑门店占比",
                                "kpi_value":_this.getReachPercent(data.sale_drop_store_cnt,data.store_cnt)*100
                            },
                            {
                                "kpi_name":"当月无交易门店占比",
                                "kpi_value":_this.getReachPercent(data.unsale_store_cnt,data.store_cnt)*100
                            },
                            {
                                "kpi_name":"3个月无交易门店占比",
                                "kpi_value":_this.getReachPercent(data.mon3_unsale_store_cnt,data.store_cnt)*100
                            },
                        ]
                    }
                    let storeScore1 = data.active_store_rate==null ? 0 : Number((data.active_store_rate*100).toFixed(2)) //评分计算
                    let storeScore2 = data.store_avg_money==null ? 0 : data.store_avg_money//评分计算
                    let storeScore3 = _this.getReachPercent(data.mon3_unsale_store_cnt,data.store_cnt)*100//评分计算
                    _this.storeScoreTxtParams = {
                        moduleName:"门店结论6",
                        values:storeScore1+','+storeScore2+','+storeScore3
                    }
                    _this.getTwoStoreScoreData()
                    // let data = res.data.data.data[0]
                    //门店环比数据
                    let AmountChainVal = {
                        name: "环比: ",
                        NoSales: _this.dataProcess(data.active_store_cnt_mom, 'percent').num + _this.dataProcess(data.active_store_cnt_mom, 'percent').unit,
                        classNameNoSales:data.active_store_cnt_mom<0 ? 'colorStyle' : '',
                    }
                    //门店同比数据
                    let AmountYearVal = {
                        name: "同比: ",
                        NoSales: _this.dataProcess(data.active_store_cnt_yoy, 'percent').num + _this.dataProcess(data.active_store_cnt_yoy, 'percent').unit,
                        classNameNoSales:data.active_store_cnt_yoy<0 ? 'colorStyle' : '',
                    }
                    //门店销量下滑门店数数据
                    let downSales = {
                        name:"销量下滑门店数(家):",
                        NoSales: !data.sale_drop_store_cnt ? '--' : data.sale_drop_store_cnt,
                        btn:"下滑门店"
                    }
                    //门店销量增长门店数数据
                    let upSales = {
                        name:"销量增长门店数(家):",
                        NoSales:!data.sale_raise_store_cnt ? '--' :  data.sale_raise_store_cnt,
                        btn:"增长门店"
                    }
                    //门店近3个月无交易门店数数据
                    let noTrade = {
                        name: "近3个月无交易门店数(家): ",
                        NoSales: !data.mon3_unsale_store_cnt ? '--' : data.mon3_unsale_store_cnt
                    }
                    //门店6个月无交易门店数数据
                    let noTrades = {
                        name: "6个月无交易门店数(家):",
                        NoSales:!data.mon6_unsale_store_cnt ? '--' : data.mon6_unsale_store_cnt
                    }
                    //门店门店单产数据
                    let ActivestresPer = {
                        ActiveStores:"门店单产",
                        ActiveStoresing:"(万元)",
                        NoSales:_this.dataProcess(data.store_avg_money, 'money','tenth').num,
                        }
                    //门店总门店数数据
                    let ActivestresSum = {
                        ActiveStores:"总门店数",
                        ActiveStoresing:"(家)",
                        NoSales:!data.store_cnt ? '--' :data.store_cnt
                    }
                    //门店新增门店数数据
                    let ActivestresnNew = {
                        ActiveStores:"新增门店数",
                        ActiveStoresing:"(家)",
                        NoSales:!data.new_store_cnt ? '--' :data.new_store_cnt
                    }
                    //门店3个月无交易门店应收欠款数据
                    let nearnoTrade = {
                        name: "3个月无交易门店应收欠款(万元):",
                        NoSales: '￥'+ _this.dataProcess(data.mon3_unsale_store_dept_money, 'money','tenth').num,
                    }
                    //门店闭店应收账款数据
                    let nearnoTrades = {
                        name: "闭店应收账款(万元):",
                        NoSales: '￥'+_this.dataProcess(data.close_store_dept_money, 'money','tenth').num,
                    }
                    //门店门店活跃率数据
                    _this.StoresDetailed = {
                        shopTitle:"门店活跃率:",
                        StoreActivity: _this.dataProcess(data.active_store_rate, 'percent').num + _this.dataProcess(data.active_store_rate, 'percent').unit,  //门店活跃率
                        shopActiveData: {
                            ActiveStoresTxt:"活跃门店数",
                            ActiveStoresing:"(家)",
                            ActiveStores:!data.active_store_cnt ? '--' :data.active_store_cnt,  //门店活跃数
                            detailbtn:"门店详情",
                            shopActiveTitle: [
                                AmountChainVal,  //环比数额
                                AmountYearVal   //同比数额
                            ],
                                downSales,
                                upSales,
                            shopDaseData:[  //近3个月无交易门店数，6个月无交易门店数
                                noTrade,
                                noTrades
                            ]
                        },
                        ActiveDetail:{
                            shopActiveDetail:[ //门店单产,总门店数,新增门店数
                                ActivestresPer,
                                ActivestresSum,
                                ActivestresnNew
                            ],
                            shopDaseData:[  //3个月无交易门店应收欠款,闭店应收账款
                                nearnoTrade,
                                nearnoTrades
                            ]
                        }
                    }
                    _this.StoreisShow = false  //looding效果关闭
                    console.log(_this.StoresDetailed)
                    },
                )
            },
             //二帮卖分析-门店评分
            getTwoStoreScoreData(){
                var _this = this
                function getScoreData(){
                    return _this.$http({
                        url: _this.scoreRequestUrl + '?v=storeScore',
                        method: 'POST',
                        data: _this.storeScoreParams
                    })
                }
                function getScoreTxtData(){
                    return _this.$http({
                        url: _this.scoreTxtRequestUrl + '?v=storeScore',
                        method: 'POST',
                        data: $.param(_this.storeScoreTxtParams),
                    })
                }
                //合并请求 同时请求
                this.$http.all([getScoreData(), getScoreTxtData()])
                    .then(this.$http.spread((score, scoreTxt) => {
                        let scoreData = score.data.data
                        let scoreTxtData = scoreTxt.data.data
                        //一帮卖评分
                        _this.storeScoreList = {
                            coretype: '门店得分',
                            coretext: scoreData.toFixed(1),
                            evaluate: scoreTxtData.grade_evaluate,
                            subscribe: scoreTxtData.grade_evaluate_detail,
                        }
                        _this.loadingDataArray.push(true)
                        if(_this.loadingDataArray.length==6){
                            _this.getTotalScoreData()
                        }
                    }
                ))
            },
            //门店-门店下滑/增长商品
            getRaiseDownStores() {
                var _this = this
                _this.downStoresBar = true
                _this.upStoresBar = true
                //下滑门店数据
                function getDownData(){
                    var params = {
                        "inputParam":
                            {
                                "data_mon":_this.currentDate,
                                "money_type":"下滑",
                                "data_type":"当月"
                            },
                        "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_nature,store_address,money,mon3_avg_m_money,gross_money,gross_rate,dif_money",
                        "pageNum":1,
                        "pageSize":1000,
                        "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                        "serviceId":"service_tjbg02_store_sales_change",
                        "orderCol": "dif_money desc"
                    }
                    let numArray = ['numberId']
                    _this.storeExportData.downData = {
                        //增长门店导出数据
                        tableHeaderTxt:['序号','业务员姓名','联系电话','门店名称','门店老板姓名','门店老板电话','门店类型','门店地址','月均销量（元）','当月销量（元）','当月毛利额（元）','当月毛利率（元）','差额（元）'],
                        tableHeaderKey:numArray.concat(params.outputCol.split(',')),
                        tableData:'',
                        tableName:'下滑门店'
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl+'?v=downStore',
                        method: 'POST',
                        data: params,
                    })
                }
                //增长门店数据
                function getRaiseData(){
                    var params = {
                        "inputParam":
                            {
                                "data_mon":_this.currentDate,
                                "money_type":"上升",
                                "data_type":"当月"
                            },
                        "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_nature,store_address,money,mon3_avg_m_money,gross_money,gross_rate,dif_money",
                        "pageNum":1,
                        "pageSize":1000,
                        "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                        "serviceId":"service_tjbg02_store_sales_change",
                        "orderCol": "dif_money desc"
                    }
                    let numArray = ['numberId']
                    _this.storeExportData.raiseData={
                        //下滑门店导出数据
                        tableHeaderTxt:['序号','业务员姓名','联系电话','门店名称','门店老板姓名','门店老板电话','门店类型','门店地址','月均销量（元）','当月销量（元）','当月毛利额（元）','当月毛利率（元）','差额（元）'],
                        tableHeaderKey:numArray.concat(params.outputCol.split(',')),
                        tableData:'',
                        tableName:'增长门店'
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl+'?v=raiseStore',
                        method: 'POST',
                        data: params,
                    })
                }
                this.$http.all([getRaiseData(), getDownData()])
                    .then(this.$http.spread((raiseData, downData) => {
                        console.log(raiseData)
                        //增长门店数据
                        //判断增长门店数据是否为空
                        if(raiseData.data.data.data.length!=0){
                            var raiseList = raiseData.data.data.data
                        }else{
                            var raiseList=''
                        }
                        // let raiseList = raiseData.data.data.data
                        let raisexAxisData = []//增长门店x轴
                        let raiseLastMonth = []//增长门店月平均销售额
                        let raiseSameMonth = []//增长门店当月销售额
                        let raiseDifference = []//增长门店差异销售额
                        raiseList.map(function(item,index){
                            item.numberId = index+1
                            item.gross_rate = _this.dataProcess(item.gross_rate,'percent').num +_this.dataProcess(item.gross_rate,'percent').unit    //处理毛利率数据
                            if(index<5){
                                raisexAxisData.push(item.store_name)
                                raiseLastMonth.push(item.mon3_avg_m_money)
                                raiseSameMonth.push(item.money)
                                raiseDifference.push(Math.abs(item.dif_money))
                            }
                        })
                        _this.storeExportData.raiseData.tableData = raiseList
                        //增长门店柱状图数据
                        let raiseBarData = {
                                //id
                                id:'barRaiseId',
                                //数据单位
                                unit:['money','tenth'],
                                //x轴单位
                                xAxisData:raisexAxisData,
                                type:'xAxis',
                                //柱状图数据
                                barData:[
                                    {
                                        name:'月均销售额',
                                        data:raiseLastMonth,
                                        color:'#2D92FC',
                                        barWidth:22,
                                    },
                                    {
                                        name:'当月销售额',
                                        data:raiseSameMonth,
                                        color:'#FFBD7B',
                                        barWidth:22,
                                    },
                                    {
                                        name:'销售差额',
                                        data:raiseDifference,
                                        color:'#FE9600',
                                        barWidth:22,
                                    },
                                ],
                                showType:0,//0横过来 1竖起来
                                //markline
                                markLineList:{
                                    show:false
                                },
                        }
                        _this.upStoresData = raiseBarData
                        //下滑门店数据
                        //判断下滑门店数据是否为空
                        if(downData.data.data.data.length!=0){
                            var downList = downData.data.data.data
                        }else{
                            var downList=''
                        }
                        // let downList = downData.data.data.data
                        let downxAxisData = []//下滑门店x轴
                        let downLastMonth = []//下滑门店月平均销售额
                        let downSameMonth = []//下滑门店当月销售额
                        let downDifference = []//下滑门店差异销售额
                        downList.map(function(item,index){
                            item.numberId = index+1
                            item.gross_rate = _this.dataProcess(item.gross_rate,'percent').num +_this.dataProcess(item.gross_rate,'percent').unit  //处理毛利率数据
                            if(index<5){
                                downxAxisData.push(item.store_name)
                                downLastMonth.push(item.mon3_avg_m_money)
                                downSameMonth.push(item.money)
                                downDifference.push(Math.abs(item.dif_money))
                            }
                        })
                        _this.storeExportData.downData.tableData = downList
                        //下滑门店柱状图数据
                        let downBarData = {
                                //id
                                id:'barDownId',
                                //数据单位
                                unit:['money','tenth'],
                                //x轴单位
                                xAxisData:downxAxisData,
                                type:'xAxis',
                                //柱状图数据
                                barData:[
                                    {
                                        name:'月均销售额',
                                        data:downLastMonth,
                                        color:'#2D92FC',
                                        barWidth:22,
                                    },
                                    {
                                        name:'当月销售额',
                                        data:downSameMonth,
                                        color:'#FFBD7B',
                                        barWidth:22,
                                    },
                                    {
                                        name:'销售差额',
                                        data:downDifference,
                                        color:'#FE9600',
                                        barWidth:22,
                                    },
                                ],
                                showType:0,//0横过来 1竖起来
                                //markline
                                markLineList:{
                                    show:false
                                },
                        }
                        _this.downStoresData = downBarData
                        _this.downStoresBar = false
                        _this.upStoresBar = false
                    })
                )
            },
            //库存一级页面概览明细
            getinventoryDetail() {
                var _this = this
                _this.stockAmount = true
                _this.InventoryTurnover = true
                _this.DaysAvailableStock = true
                var params = {
                    "inputParam": {
                        "data_mon":_this.currentDate,
                        "data_type":"当月"
                    },
                    "isReturnTotalSize": "Y",
                    "outputCol": "dealer_id,data_mon,data_type,money,qty,mon6_unsale_money,non6_unsale_qty,turnover_rate,saledays,saledays_mon,saledays_yoy,liby_saledays,kispa_saledays,cheerwin_saledays,shengmei_saledays,oral_saledays",
                    "pageNum": 1,
                    "pageSize": 10,
                    "serviceId": "service_tjbg02_stock",
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=inventoryDetail',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    // console.log(res)
                    //判断库存一级页面概览明细数据是否为空
                    if(res.data.data.data.length!=0){
                        var data = res.data.data.data[0]
                    }else{
                        var data=[]
                    }
                    _this.stockScoreParams={
                        "moduleName":"库存",
                        "kpi_values":[
                            {
                                "kpi_name":"6个月未销售商品金额占比",
                                "kpi_value":_this.getReachPercent(data.mon6_unsale_money,data.money)*100
                            },
                            {
                                "kpi_name":"6个月未销售商品件数占比",
                                "kpi_value":_this.getReachPercent(data.non6_unsale_qty,data.qty)*100
                            },
                            {
                                "kpi_name":"库存周转率",
                                "kpi_value":data.turnover_rate==null ? 0 : data.turnover_rate
                            },
                            {
                                "kpi_name":"库存可销天数",
                                "kpi_value":data.saledays==null ? 0 : data.saledays
                            },
                            {
                                "kpi_name":"立白库存可销天数",
                                "kpi_value":data.liby_saledays==null ? 0 : data.liby_saledays
                            },
                            {
                                "kpi_name":"好爸爸库存可销天数",
                                "kpi_value":data.kispa_saledays==null ? 0 : data.kispa_saledays
                            },
                            {
                                "kpi_name":"超威库存可销天数",
                                "kpi_value":data.cheerwin_saledays==null ? 0 : data.cheerwin_saledays
                            },
                            {
                                "kpi_name":"口腔库存可销天数",
                                "kpi_value":data.oral_saledays==null ? 0 : data.oral_saledays
                            },
                            {
                                "kpi_name":"晟美库存可销天数",
                                "kpi_value":data.shengmei_saledays==null ? 0 : data.shengmei_saledays
                            },
                            {
                                "kpi_name":"库存可销天数环比增长",
                                "kpi_value":data.saledays_mon==null ? 0 : Number((data.saledays_mon*100).toFixed(2))
                            },
                        ]
                    }
                    let stockScore1 = data.saledays==null ? 0 : data.saledays
                    let stockScore2 = _this.getReachPercent(data.mon6_unsale_money,data.money)*100
                    let stockScore3 = data.saledays_mon==null ? 0 : Number((data.saledays_mon*100).toFixed(2))
                    _this.stockScoreTxtParams = {
                        moduleName:"库存结论7",
                        values:stockScore1+','+stockScore2+','+stockScore3
                    }
                    _this.getTwoStockScoreData()
                        // let data = res.data.data.data[0]
                        // console.log(data)
                    //库存6个月未销售商品金额数据
                        let SalesMoney = {
                            name: '6个月未销售商品金额(万元)',
                            NoSales:'￥'+ _this.dataProcess(data.mon6_unsale_money, 'money','tenth').num
                        }
                    //库存6个月未销售商品数数据
                        let SalesSum = {
                            name: '6个月未销售商品数(件)',
                            NoSales:_this.dataProcess(data.non6_unsale_qty,'day').num
                        }
                    //库存环比数据
                        let Chain = {
                            name: '环比增长:',
                            inventoryChainVal:_this.dataProcess(data.saledays_mon,'percent').num+_this.dataProcess(data.saledays_mon,'percent').unit,
                            inventoryChainValColor:data.saledays_mon<0 ? 'colorStyle' : '',
                        }
                    //库存同比数据
                        let Year = {
                            name: '同比增长:',
                            inventoryChainVal:_this.dataProcess(data.saledays_yoy,'percent').num+_this.dataProcess(data.saledays_yoy,'percent').unit,
                            inventoryChainValColor:data.saledays_yoy<0 ? 'colorStyle' : ''

                        }
                        //产品动销率树状图
                        let barDataMonth = [
                            data.liby_saledays = !data.liby_saledays ? '--' : data.liby_saledays ,  //立白树状图数据
                            data.kispa_saledays = !data.kispa_saledays ? '--' : data.kispa_saledays ,//好爸爸树状图数据
                            data.cheerwin_saledays = !data.cheerwin_saledays ? '--' : data.cheerwin_saledays ,//超威树状图数据
                            data.oral_saledays = !data.oral_saledays ? '--' : data.oral_saledays ,//口腔树状图数据
                            data.shengmei_saledays = !data.shengmei_saledays ? '--' : data.shengmei_saledays ,//晟美树状图数据
                        ]
                        let Axiax = ['立白','好爸爸','超威','口腔','晟美']  //X轴数据
                        let inventoryBarData = {
                        config:{
                            id: 'barIdInventory',
                            unit:['day'],
                            xAxisData: Axiax,
                            label: {
                                isShow: true
                            },
                            type: 'xAxis',
                            barData: [
                                {
                                    name: '库存可销天数',
                                    data: barDataMonth,
                                    color: '#3699FF',
                                    barWidth: 11,
                                    textStyle: {
                                        color: "#000"
                                    },
                                },
                            ],
                            showType: 0,
                            markLineList:{
                                show:false,
                                data:100,
                            }
                        },
                        label: {
                            isShow: true,
                            position:'top',
                            color: "#000",
                            fontWeight: "bolder",

                        },
                        xAxis:{
                            axisLine:{
                                show:true,
                                color:'#ccc'
                            },
                            axisLabel:{
                                show:true,
                                color:'#000',
                                fontSize:12
                            },
                            splitLine:{
                                show:false,
                                color:'#ccc'
                            },
                        },
                        yAxis:{
                            axisLine:{
                                show:false,
                                color:'#ccc'
                            },
                            axisLabel:{
                                show:true,
                                color:'#333333',
                                fontSize:12
                            },
                            splitLine:{
                                show:true,
                                color:'#eeeeee'
                            },
                        },
                        legendShow:false,
                        isShowMax:false,
                    }
                        _this.inventoryDetails = {
                            noSalesDetail: [  //6个月未销售商品金额,6个月未销售商品数
                                SalesMoney,
                                SalesSum
                            ],
                            noSalesbtn:"无交易明细",
                            amountTxt:"库存金额(万元)",
                            amount: !data.money ? '--' :_this.dataProcess(data.money,'money','tenth').num,  //库存金额
                            inventoryNumberTxt:"库存件数(件)",
                            inventoryNumber:!data.qty ? '--' :_this.dataProcess(data.qty, 'day').num,  //库存件数
                            turnoverTxt:"库存周转次数",
                            turnover:!data.turnover_rate ? '--' :_this.dataProcess(data.turnover_rate, 'day').num+'次',  //库存周转次数
                        }
                        _this.inventoryDay = {
                            inventorycompare: [  //同比环比数据
                                Chain,
                                Year
                            ],
                            receivableAverage: '库存件数可销天数（天）',
                            inventoryVal:!data.saledays ? '--' : _this.dataProcess(data.saledays, 'day').num,  //库存件数可销天数
                            inventoryBarData   //树状图数据
                        }
                        _this.stockAmount = false
                        _this.InventoryTurnover = false
                        _this.DaysAvailableStock = false   //库存加载页面效果
                        console.log(_this.inventoryDetails)
                        console.log(_this.inventoryDay)
                    },
                )
            },
            //二帮卖分析-库存评分
            getTwoStockScoreData(){
                var _this = this
                function getScoreData(){
                    return _this.$http({
                        url: _this.scoreRequestUrl + '?v=stockScore',
                        method: 'POST',
                        data: _this.stockScoreParams
                    })
                }
                function getScoreTxtData(){
                    return _this.$http({
                        url: _this.scoreTxtRequestUrl + '?v=stockScore',
                        method: 'POST',
                        data: $.param(_this.stockScoreTxtParams),
                    })
                }
                //合并请求 同时请求
                this.$http.all([getScoreData(), getScoreTxtData()])
                    .then(this.$http.spread((score, scoreTxt) => {
                        let scoreData = score.data.data
                        let scoreTxtData = scoreTxt.data.data
                        //一帮卖评分
                        _this.stockScoreList = {
                            coretype: '库存得分',
                            coretext: scoreData.toFixed(1),
                            evaluate: scoreTxtData.grade_evaluate,
                            subscribe: scoreTxtData.grade_evaluate_detail,
                        }
                        _this.loadingDataArray.push(true)
                        if(_this.loadingDataArray.length==6){
                            _this.getTotalScoreData()
                        }
                    }
                ))
            },
            // 库存-库存可销天数走势图
            getmarketableDayChart() {
                var _this = this
                _this.marketableDayLine = true
                var params = {
                    "inputParam": {
                        "data_mon":_this.currentDate,
                        "data_type":"13"
                    },
                    "isReturnTotalSize": "Y",
                    "outputCol": "dealer_id,data_mon,data_type,money,qty,mon6_unsale_money,non6_unsale_qty,turnover_rate,saledays,saledays_mon,saledays_yoy,liby_saledays,kispa_saledays,cheerwin_saledays,shengmei_saledays,oral_saledays",
                    "pageNum": 1,
                    "pageSize": 10000,
                    "serviceId": "service_tjbg02_stock",
                    "orderCol": "data_mon asc",
                    "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=marketableDayChart',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    console.log(res)
                    //判断库存可销天数走势图数据是否为空
                    // if(res.data.data.data.length!=0){
                    //     var salesmanTrendData = res.data.data.data
                    // }else{
                    //     var salesmanTrendData=''
                    // }
                    var salesmanTrendData = res.data.data.data,xAxisData=[],salesmanArr=[],seriesData=[],salesmanColor=['#1378ec','#ee723f','#e9b533','#cc57d9','#1b9ad9','#39d4e7'];
                   // console.log(salesmanTrendData)
                    salesmanTrendData.map(function(value){
                        //非空值判断
                        if(xAxisData.length==0){
                            xAxisData.push(value.data_mon);
                        }else{
                            if(xAxisData.indexOf(value.data_mon) == -1){
                                xAxisData.push(value.data_mon);
                            }
                        }
                    })
                    salesmanArr.push('全部','立白','好爸爸','超威','口腔','晟美');
                    salesmanArr.map(function(value,index){
                        var tempObjecd = {name:value,color:salesmanColor[index]},tempArr = [];
                        salesmanTrendData.map(function(data){
                            //写死遍历数据
                            if(value == '立白'){
                                tempArr.push(!data.liby_saledays ? 0 : data.liby_saledays)
                            }else if(value == '好爸爸'){
                                tempArr.push(!data.kispa_saledays ? 0 : data.kispa_saledays)
                            }else if(value == '超威'){
                                tempArr.push(!data.cheerwin_saledays ? 0 : data.cheerwin_saledays)
                            }else if(value == '口腔'){
                                tempArr.push(!data.oral_saledays ? 0 : data.oral_saledays)
                            }else if(value == '晟美'){
                                tempArr.push(!data.shengmei_saledays ? 0 :data.shengmei_saledays)
                            }else {
                                tempArr.push(!data.saledays ? 0 :data.saledays)
                            }
                        })
                        tempObjecd.data = tempArr;
                        seriesData.push(tempObjecd)
                    })
                    var tempsalesmanTrendData = {monthArr:xAxisData,seriesData:seriesData}
                    _this.marketableDayChart = {
                        config:{
                            id:'lineStockId',
                            unit:['day'],
                            xAxisData:xAxisData,
                            lineData:seriesData
                        },
                        xAxis:{
                            axisLine:{
                                show:true,
                                color:'#333'
                            },
                            axisLabel:{
                                show:true,
                                color:'#333',
                                fontSize:14
                            },
                            splitLine:{
                                show:false,
                                color:'#C3C6CD'
                            },
                        },
                        yAxis:{
                            axisLine:{
                                show:true,
                                color:'#333'
                            },
                            axisLabel:{
                                show:true,
                                color:'#333',
                                fontSize:14
                            },
                            splitLine:{
                                show:true,
                                color:'#C3C6CD'
                            },
                        },
                    }
                    _this.marketableDayLine = false
                    console.log(_this.marketableDayChart)
                })
            },
            //获取二级页面表格数据
            getDetailTableData(){
                var _this = this
                //门店数据列表数据
                _this.storeDetailTableData = {
                    //活跃门店详情
                    activeStoreDetail:{
                        titleName:'门店贡献',
                        params:{
                            "inputParam":
                                {
                                    "data_mon":_this.currentDate,
                                    "data_type":"当月",
                                },
                            "isReturnTotalSize": "Y",
                            "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_nature,money,money_rate,gross_money,gross_rate,sale_goods_cnt,sale_goods_cnt_lm",
                            "pageNum":1,
                            "pageSize":100,
                            "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                            "serviceId":"service_tjbg02_store_active"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'业务员姓名',unit:false},
                            {txt:'业务员电话',unit:false},
                            {txt:'门店店名',unit:false},
                            {txt:'门店老板姓名',unit:false},
                            {txt:'门店老板联系方式',unit:false},
                            {txt:'门店类型',unit:false},
                            {txt:'当月销量（元）',unit:'money'},
                            {txt:'当月销量占比',unit:'percent'},
                            {txt:'当月毛利额',unit:false},
                            {txt:'当月毛利率',unit:'percent'},
                            {txt:'当月门店销售SKU数量',unit:'day'},
                            {txt:'上月门店销售SKU数量',unit:'day'},
                        ]
                    },
                    //新增门店详情
                    addStoreDetail:{
                        titleName:'新增门店明细',
                        params:{
                            "inputParam":
                                {
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                },
                            "isReturnTotalSize": "Y",
                            "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_address,store_nature",
                            "pageNum":1,
                            "pageSize":100,
                            "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                            "serviceId":"service_tjbg02_store_create"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'业务员姓名',unit:false},
                            {txt:'联系电话',unit:false},
                            {txt:'门店名称',unit:false},
                            {txt:'门店老板姓名',unit:false},
                            {txt:'门店老板电话',unit:false},
                            {txt:'门店地址',unit:false},
                            {txt:'门店类型',unit:false},
                        ]
                    },
                    //无交易明细
                    noTradeData:{
                        titleName:'无交易门店明细',
                        params:{
                            "inputParam":
                                {
                                    "data_mon":_this.currentDate,
                                    "data_type":"当月",
                                },
                            "isReturnTotalSize": "Y",
                            "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_nature,store_address,last_order_time,last_order_money,unsale_days",
                            "pageNum":1,
                            "pageSize":100,
                            "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                            "serviceId":"service_tjbg02_store_unsale"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'业务员姓名',unit:false},
                            {txt:'联系电话',unit:false},
                            {txt:'门店名称',unit:false},
                            {txt:'门店老板姓名',unit:false},
                            {txt:'门店老板电话',unit:false},
                            {txt:'门店类型',unit:false},
                            {txt:'门店地址',unit:false},
                            {txt:'最近交易时间',unit:false},
                            {txt:'最近交易金额（元）',unit:'money'},
                            {txt:'无交易时长（天）',unit:'day'},
                        ]
                    },
                    //无交易门店应收账款明细
                    noDealDetail:{
                        titleName:'无交易门店应收账款明细',
                        params:{
                            "inputParam":
                                {
                                    "data_mon":_this.currentDate,
                                    "data_type":"当月",
                                },
                            "isReturnTotalSize": "Y",
                            "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_nature,store_address,store_status,last_order_time,unsale_days,debt_money",
                            "pageNum":1,
                            "pageSize":100,
                            "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                            "serviceId":"service_tjbg02_store_unsale"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'业务员姓名',unit:false},
                            {txt:'联系电话',unit:false},
                            {txt:'门店名称',unit:false},
                            {txt:'门店老板姓名',unit:false},
                            {txt:'门店老板电话',unit:false},
                            {txt:'门店类型',unit:false},
                            {txt:'门店地址',unit:false},
                            {txt:'是否开业',unit:false},
                            {txt:'最近交易时间',unit:false},
                            {txt:'无交易时长（天）',unit:'day'},
                            {txt:'应收账款（元）',unit:'money'},
                        ]
                    },
                }
                //库存数据列表数据
                _this.invDetailTableData= {
                    //未销明细
                    getPinListing: {
                        titleName:'未销售商品明细',
                        params: {
                            "inputParam": {
                                "data_mon":_this.currentDate,
                                "data_type": "当月"
                            },
                            "isReturnTotalSize": "Y",
                            "outputCol": "goods_code69,goods_code79,goods_name,last_order_time,unsale_days,qty,money",
                            "pageNum": 1,
                            "pageSize": 1000,
                            "orderCol": "unsale_days desc" ,
                            "serviceId": "service_tjbg02_stock_unsale",
                            "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                        },
                        header: [
                            {txt: '序号', unit: false},
                            {txt: '69码', unit: false},
                            {txt: '79码', unit: false},
                            {txt: '商品名称', unit: false},
                            {txt: '最近交易时间', unit: false},
                            {txt: '无交易时长（天）', unit: 'day'},
                            {txt: '库存件数（件）', unit: 'day'},
                            {txt: '库存金额（元）', unit: 'money'},
                        ]
                    },
                    //库存可销天数详细
                    getInvDayListing: {
                        titleName:'库存可销天数-品类',
                        params: {
                            "inputParam": {
                                "data_mon": _this.currentDate,
                                "data_type": "当月",
                                "partition": "bo2_name"
                            },
                            "isReturnTotalSize": "Y",
                            "outputCol": "bo1_name,bo2_name,saledays",
                            "groupByCol": ["bo1_name","bo2_name"],
                            "orderCol":"bo1_orderNum,bo2_orderNum,saledays desc",
                            "pageNum": 1,
                            "pageSize": 100,
                            "serviceId": "service_tjbg02_stock_saledays",
                            "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                        },
                        header: [
                            {txt: '序号', unit: false},
                            {txt: '事业部', unit: false},
                            {txt: '品类', unit: false},
                            {txt: '可销天数', unit: 'day'},
                        ]
                    },
                }
                //财务模块二级列表数据
                _this.financeDetailTableData = {
                    //逾期明细
                    overdueDetail:{
                        titleName:'逾期金额汇总',
                        params:{
                            "inputParam":
                            {
                                "data_mon":_this.currentDate,
                                "data_type":"当月"
                            },
                            "isReturnTotalSize": "Y",
                            "outputCol": "emp_name,emp_phone,store_code,store_name,store_concat,store_phone,store_nature,store_address,overdue_money",
                            "orderCol":'overdue_money desc',
                            "pageNum": 1,
                            "pageSize": 100,
                            "serviceId": "service_tjbg02_finace_overdue_dtl",
                            "whereCndt":{"dealer_id":"='"+_this.dealer_id+"'"},
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'业务员名称',unit:false},
                            {txt:'业务员电话',unit:false},
                            {txt:'门店编号',unit:false},
                            {txt:'门店店名',unit:false},
                            {txt:'门店老板姓名',unit:false},
                            {txt:'门店老板联系方式',unit:false},
                            {txt:'门店类型',unit:false},
                            {txt:'门店地址',unit:false},
                            {txt:'逾期金额（元）',unit:'money'},
                        ]
                    },
                }
                 },
                //点击二帮卖订单详情
                orderDetailHandleClick(){
                    //二帮卖订单列表数据
                    this.twoDetailTableData={
                        //二帮卖订单明细
                        gettwoListing:{
                            titleName:'二帮卖下单毛利明细-品类',
                            params : {
                                "inputParam":{
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                    "bo_type":"品类"
                                },
                                "outputCol":"bo1_name,bo2_name,money,ratio_rate,money_mom,money_yoy,gross_money,gross_rate,gross_money_mom,gross_money_yoy",
                                "pageNum":1,
                                "pageSize":100,
                                "groupByCol":["bo1_name","bo2_name"],
                                "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                                "serviceId":"service_tjbg02_sales_order_dtl"
                            },
                            header:[
                                {txt:'序号',unit:false},
                                {txt:'事业部',unit:false},
                                {txt:'品类',unit:false},
                                {txt:'品类下单金额（元）',unit:'money'},
                                {txt:'占比',unit:'percent'},
                                {txt:'环比',unit:'percent'},
                                {txt:'同比',unit:'percent'},
                                {txt:'毛利额（元）',unit:'money'},
                                {txt:'毛利率',unit:'percent'},
                                {txt:'毛利额环比',unit:'percent'},
                                {txt:'毛利额同比',unit:'percent'},

                            ]
                        }
                    }
                },
                //点击分销清单
                indexStoreHandleClick(){
                     //产品动销清单明细
                    this.getPinListing={
                        titleName:'商品分销明细-品类',
                        params : {
                            "inputParam":{
                                "data_mon":this.currentDate,
                                "data_type":"当月",
                                "bo_type":'品类'
                            },
                            "outputCol":"bo1_name,bo2_name,order_qty,stock_qty,sale_rate",
                            "pageNum":1,
                            "pageSize":100,
                            "groupByCol":["bo1_name","bo2_name"],
                            "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                            "serviceId":"service_tjbg02_goods_stock_sales"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'事业部',unit:false},
                            {txt:'品类',unit:false},
                            {txt:'订单SKU数',unit:'day'},
                            {txt:'库存SKU数',unit:'day'},
                            {txt:'品类动销率',unit:'percent'},
                        ]
                    }
                },
                //点击商品明细
                indexGoodDetailHandleClick(){
                    //商品明细
                    this.productTableData={
                        titleName:'下单商品明细-事业部',
                        params : {
                            "inputParam":{
                                "data_mon":this.currentDate,
                                "data_type":"当月",
                                "bo_type":'事业部'
                            },
                            "outputCol":"bo1_name,money,ratio_rate",
                            "pageNum":1,
                            "pageSize":1000,
                            "groupByCol":["bo1_name"],
                            "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                            "serviceId":"service_tjbg02_goods_sales_dtl"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'事业部',unit:false},
                            {txt:'销售（元/月）',unit:'money'},
                            {txt:'销售占比',unit:'percent'},
                        ]
                    }
                },
                //点击库存详情
                indexStockDetailHandleClick(){
                    this.invDetailTableData.getInvDayListing= {
                        //库存可销天数详细
                        titleName:'库存可销天数-品类',
                        params: {
                            "inputParam": {
                                "data_mon": this.currentDate,
                                "data_type": "当月",
                                "partition": "bo2_name"
                            },
                            "isReturnTotalSize": "Y",
                            "outputCol": "bo1_name,bo2_name,saledays",
                            "groupByCol": ["bo1_name","bo2_name"],
                            "orderCol":"bo1_orderNum,bo2_orderNum,saledays desc",
                            "pageNum": 1,
                            "pageSize": 100,
                            "serviceId": "service_tjbg02_stock_saledays",
                            "whereCndt":{"dealer_id":"='"+this.dealer_id+"'"},
                        },
                        header: [
                            {txt: '序号', unit: false},
                            {txt: '事业部', unit: false},
                            {txt: '品类', unit: false},
                            {txt: '可销天数', unit: 'day'},
                        ]
                    }
                },
                //获取总评分
                getTotalScoreData(){
                    var _this = this
                    //得分参数
                    _this.totalScoreParams={
                        "moduleName":"总得分",
                        "kpi_values":[
                            {
                                "kpi_name":"一帮卖",
                                "kpi_value":Number(_this.oneHelpSaleScoreList.coretext)
                            },
                            {
                                "kpi_name":"订单",
                                "kpi_value":Number(_this.orderScoreList.coretext)
                            },
                            {
                                "kpi_name":"业务员",
                                "kpi_value":Number(_this.personScoreList.coretext)
                            },
                            {
                                "kpi_name":"产品",
                                "kpi_value":Number(_this.productScoreList.coretext)
                            },
                            {
                                "kpi_name":"门店",
                                "kpi_value":Number(_this.storeScoreList.coretext)
                            },
                            {
                                "kpi_name":"库存",
                                "kpi_value":Number(_this.stockScoreList.coretext)
                            },
                        ]
                    }
                    console.log(_this.totalScoreParams)
                    let totalScore1 = _this.oneHelpSaleScoreList.evaluate
                    let totalScore2 = _this.orderScoreList.evaluate
                    // let totalScore3 = _this.personScoreList.evaluate
                    // let totalScore4 = _this.productScoreList.evaluate
                    // let totalScore5 = _this.storeScoreList.evaluate
                    let totalScore6 = _this.stockScoreList.evaluate
                    //评价参数
                    _this.totalScoreTxtParams={
                        moduleName:"整体结论1",
                        values:"'"+totalScore2+"','"+totalScore6+"','"+totalScore1+"'"
                    }
                    function getScoreData(){
                        return _this.$http({
                            url: _this.scoreRequestSumUrl + '?v=totalScore',
                            method: 'POST',
                            data: _this.totalScoreParams
                        })
                    }
                    function getScoreTxtData(){
                        return _this.$http({
                            url: _this.scoreTxtRequestUrl + '?v=totalScore',
                            method: 'POST',
                            data: $.param(_this.totalScoreTxtParams),
                        })
                    }
                    //合并请求 同时请求
                    this.$http.all([getScoreData(), getScoreTxtData()])
                        .then(this.$http.spread((score, scoreTxt) => {
                            let scoreData = score.data.data
                            let scoreTxtData = scoreTxt.data.data
                            //总得分
                            _this.totalScoreList = {
                                coretype: '总得分',
                                coretext: scoreData.toFixed(1),
                                evaluate: scoreTxtData.grade_evaluate,
                                subscribe: scoreTxtData.grade_evaluate_detail,
                            }
                            console.log(_this.stockScoreList)
                        }
                    ))
                },
                //计算环比/同比
                getHandle(molecule,denominator,num){
                    var tempObj;
                    if(!denominator){
                        tempObj = '--';
                    }else {
                        tempObj = (((molecule-denominator)/denominator)*100).toFixed(num)+'%';
                    }
                    return tempObj
                },
                //计算环比/同比
                getHandleComputed(molecule,denominator){
                var tempObj;
                if(!denominator){
                    tempObj = 0
                }else {
                    tempObj = (((molecule-denominator)/denominator)*100).toFixed(2);
                }
                return tempObj
            },
            getParamsFromIframe(name){
                var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
                var arr = window.parent.document.getElementsByClassName("show_ifm").contentWindow.location.search.match(reg);
                if (arr != null) {
                    return decodeURI(arr[0].substring(arr[0].search("=") + 1));
                }
                return "";
            }
        }
    }
</script>
<style scoped lang="less">
    .index{
       width:100%;
       padding:0 20px 50px 20px;
       background:#eaeff8;
       p{
           margin-bottom:0;
       }
       .title{
           background:#fff;
           width:140px;
           height:40px;
           border-bottom:2px solid #2D92FC;
           display: flex;
           align-items: center;
           justify-content: center;
           p{
               color:#2D92FC;
               font-size: 16px;
           }
       }
       .oneHelpSalesBox{
           width:100%;
           display: flex;
           flex-wrap: wrap;
       }
    }
</style>
