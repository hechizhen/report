
<template>
    <div class="index">
        <!-- <div class="title">
            <p>体检报告</p>
            <i></i>
        </div> -->
        <!-- 头部 -->
        <header-title :dealName="indexDealName" :score="indexScore" :summary="indexSummary" :defaultDate="indexDefaultDate" :changeDateHandle="indexChangeDate"></header-title>
        <!-- 一帮卖分析 -->
        <one-help-sale-en :titleName="oneHelpSaleTitle" :monthSalesData="monthSalesData" :monthBarData="monthBarData"  :coreData="oneHelpSaleScoreList"
        :yearSalesData="yearSalesData" :yearBarData="yearBarData" :monthShow="oneHelpSaleMonthShow" :yearShow="oneHelpSaleYearShow"
        v-if="monthBarData.length!=0 && monthSalesData.length!=0 && yearSalesData.length!=0 && yearBarData.length!=0"></one-help-sale-en>

        <!-- 二帮卖分析-订单 -->
        <secondBand :orderAmountData="orderAmountData" :directionData="directionData" :towHelYoy="towHelYoy" :towHelProportion="towHelProportion"
                    :towHelpSaleMonthShow="towHelpSaleMonthShow" :towHelpSaleMonthLineShow="towHelpSaleMonthLineShow" v-if="orderAmountData"></secondBand>
        <!-- 二帮卖分析-业务员 -->
        <salesman :salesmanData="salesmanData" :salesmanTrendData="salesmanTrendData" :salesmandownwardData="salesmandownwardData"
                  :salesmanReachedData="salesmanReachedData" :salesmanContributionData="salesmanContributionData" :isShow="salesmanReached"
                  :salesmanReachedBar="salesmanReachedBar" :salesmanContributionBar="salesmanContributionBar" :salesmandownwardBar="salesmandownwardBar"
                  :salesmanTrendPie="salesmanTrendPie"></salesman>
        <!-- 商品 -->
        <productIndex :CommodityTurnoverRate="CommodityTurnoverRate"  :commoditydata="commoditydata" :GoodsDetail="GoodsDetail"
                      :VariabilityUpData="VariabilityUpData" :VariabilityDownData="VariabilityDownData" :productTableData="productTableData"
                      :NumberGoods="NumberGoods"  :CommodityRate="CommodityRate"  :NumberGoodsDownBar="NumberGoodsDownBar" :NumberGoodsUpBar="NumberGoodsUpBar"
                      :NumberGoodsPie="NumberGoodsPie" :NumberGoodsList="NumberGoodsList" v-if="CommodityTurnoverRate.length!=0"
        ></productIndex>
        <!--门店-->
        <shopIndex  :StoresDetailed="StoresDetailed" v-if="StoresDetailed.length!=0 && storeDetailTableData!='' && upStoresData!=''"  :isShow="StoreisShow"
                    :upStoresData="upStoresData"  :downStoresData="downStoresData"  :downStoresBar="downStoresBar"   :upStoresBar="upStoresBar"
                    :tableData="storeDetailTableData" :exportData="storeExportData"
        ></shopIndex>
         <!--库存-->
        <inventoryIndex  :inventoryDay="inventoryDay" :inventoryDetails="inventoryDetails" :marketableDayChart="marketableDayChart"
                         :DaysAvailableStock="DaysAvailableStock" :InventoryTurnover="InventoryTurnover" :stockAmount="stockAmount"
                         :marketableDayLine="marketableDayLine"   v-if="inventoryDay.length!=0 "> </inventoryIndex>
        <!-- 财务 -->
        <finance :financeData="financeData" :receivableData="receivableData" :overDueData="overDueData" :titleName="financeTitle"
        v-if="financeData.length!=0 && receivableData.length!=0 && overDueData.length!=0" :isShow="financeIsShow"></finance>
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
                indexDealName: '吴凌云',//经销商名称
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
                VariabilityUpData:"",
                //产品-动销商品数下滑商品
                VariabilityDownData:"",
                //产品-动销商品明细-饼图
                GoodsDetail:"",
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
                oneHelpSaleScoreList: {//一帮卖评分
                    coretype: '一帮卖得分',
                    coretext: '',
                    evaluate: ''
                },
                oneHelpSaleMonthShow:false,
                oneHelpSaleYearShow:false,
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
                salesmanReachedData:{},  //业务员-达成
                salesmanContributionData:{},//业务员-贡献
                productTableData:'',//产品列表数据
                //活跃门店二级表格数据
                storeDetailTableData:'',
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
            }
        },
        created() {
            let date = new Date;
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            //获取当前接口年月
            this.currentDate = year + '' + month
            //获取当前默认显示年月
            this.indexDefaultDate = year + '/' + month
        },
        mounted() {
            this.getOverViewData()
            this.getOneHelpSalesData()
            this.getFinanceTableData()
            this.getReceivableData()
            this.getOverdueData()
            this.getsalesman()
            this.getsecondBand()
            this.getDaysAvailableStock()
            this.getinventoryDetail()
            this.getStoresDetailed()
            this.getCommodityTurnoverRate()
            this.getNumberMovingGoods()
            this.getGoodsdetail()
            this.getdirection()
            this.getsalesmanTrend()
            this.getmarketableDayChart()
            this.getVariabilityUp()
            this.getVariabilityDown()
            this.getsalesmandownward()
            this.getRaiseDownStores()
            this.getSalesmanReached()
            this.getSalesmanContribution()
            this.getProductTableData()
            this.getDetailTableData()
        },
        computed: {

        },
        watch: {

        },
        methods: {
            //修改时间
            indexChangeDate(val) {
                this.currentDate = val
                this.getOverViewData()
                this.getOneHelpSalesData()
                this.getFinanceTableData()
                this.getReceivableData()
                this.getOverdueData()
                this.getDaysAvailableStock()
                this.getinventoryDetail()
                this.getStoresDetailed()
                this.getCommodityTurnoverRate()
                this.getNumberMovingGoods()
                this.getGoodsdetail()
                this.getsalesmanTrend()
                this.getsalesmandownward()
                this.getmarketableDayChart()
                this.getVariabilityUp()
                this.getVariabilityDown()
                this.getRaiseDownStores()
                this.getSalesmanReached()
                this.getSalesmanContribution()
                this.getProductTableData()
                this.getDetailTableData()
            },
            //体检报告概览
            getOverViewData() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/overviewScoring',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    console.log(res)
                    let data = res.data.data.data
                    _this.indexDealName = data.dealName
                    _this.indexScore = data.score
                    _this.indexSummary = data.summary
                })
            },
            //本月累计下单金额以及总达成 以及本月累计达成率
            getOneHelpSalesData() {
                var _this = this
                _this.oneHelpSaleMonthShow = true
                _this.oneHelpSaleYearShow = true
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
                        "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                        "serviceId":"service_tjbg01_sales"
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl,
                        method: 'POST',
                        data: params,
                    })
                }
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
                        "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                        "serviceId":"service_tjbg01_sales"
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl,
                        method: 'POST',
                        data: params,
                    })
                }

                this.$http.all([getMonthData(), getYearData()])
                    .then(this.$http.spread((salesMonth, salesYear) => {
                        //同时请求 本月和累计的销量数据
                        console.log(salesMonth)
                        console.log(salesYear)
                        let salesMonthData = salesMonth.data.data.data[0]
                        let salesYearData = salesYear.data.data.data[0]
                         //本月下单金额达成率
                    _this.monthSalesData = {
                        sales:_this.dataProcess(salesMonthData.money,'money').num,
                        reach:_this.getReachPercent(salesMonthData.money,salesMonthData.target_money)+'%',
                        bgColor:'#2D92FC',
                        titleName:'本月'
                    }
                    //本月达成率历史趋势
                    let barDataMonth = [
                        _this.getReachPercent(salesMonthData.liby_money,salesMonthData.liby_target_money),_this.getReachPercent(salesMonthData.kispa_money,salesMonthData.kispa_target_money),
                        _this.getReachPercent(salesMonthData.cheerwin_money,salesMonthData.cheerwin_target_money),_this.getReachPercent(salesMonthData.oral_money,salesMonthData.oral_target_money),
                        _this.getReachPercent(salesMonthData.shengmei_money,salesMonthData.shengmei_target_money),_this.getReachPercent(salesMonthData.strategic_money,salesMonthData.strategic_target_money)
                    ]
                    let Axiax = ['立白','好爸爸','超威','口腔','晟美','战略品']
                    _this.monthBarData = {
                        config:{
                            id: 'barIdMonthSales',
                            xAxisData: Axiax,
                            unit:'%',
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
                                data:100,
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
                     //本月下单金额达成率
                    _this.yearSalesData = {
                        sales:_this.dataProcess(salesYearData.money,'money').num,
                        reach:_this.getReachPercent(salesYearData.money,salesYearData.target_money)+'%',
                        bgColor:'#FF9500',
                        titleName:'年累计'
                    }
                    //本月达成率历史趋势
                    let barDataYear = [
                        _this.getReachPercent(salesYearData.liby_money,salesYearData.liby_target_money),_this.getReachPercent(salesYearData.kispa_money,salesYearData.kispa_target_money),
                        _this.getReachPercent(salesYearData.cheerwin_money,salesYearData.cheerwin_target_money),_this.getReachPercent(salesYearData.oral_money,salesYearData.oral_target_money),
                        _this.getReachPercent(salesYearData.shengmei_money,salesYearData.shengmei_target_money),_this.getReachPercent(salesYearData.strategic_money,salesYearData.strategic_target_money)
                    ]
                    _this.yearBarData = {
                        config:{
                            id: 'barIdYearSales',
                            xAxisData: Axiax,
                            unit:'%',
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
                                data:100,
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
                    console.log(barDataYear)
                    console.log(barDataMonth)
                    let score = _this.scoreProcess(barDataYear,barDataMonth)
                    _this.oneHelpSaleScoreList={//一帮卖评分
                        coretype: '一帮卖得分',
                        coretext: score,
                        evaluate: '优秀'
                    }
                    _this.oneHelpSaleMonthShow = false
                    _this.oneHelpSaleYearShow = false
                }));
            },
            //财务报表数据
            getFinanceTableData() {
                var _this = this
                _this.financeIsShow = true
                this.$http({
                    url: _this.requestHttpUrl + '/financeTableData',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    console.log(res)
                    let data = res.data.data.data
                    let list = []
                    data.map(function (item, index) {
                        item.val = _this.dataProcess(item.val, 'money').num
                        list.push({name: item.name, val: item.val})
                    })
                    _this.financeData = list
                    _this.financeIsShow = false
                })
            },
            //应收账款
            getReceivableData() {
                var _this = this
                _this.financeIsShow = true
                this.$http({
                    url: _this.requestHttpUrl + '/receivableData',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    console.log(res)
                    let data = res.data.data.data
                    _this.receivableData = {
                        receivableTxt: '应收欠款（万元）',
                        receivableValUnit: '￥',
                        receivableVal: _this.dataProcess(data.receivableVal, 'money').num,
                        receivableMonth: '当月已收（万元）',
                        receivableMonthValUnit: '￥',
                        receivableMonthVal: _this.dataProcess(data.monthReceivableVal, 'money').num,
                        receivableAverage: '平均账龄（天数）',
                        receivableAverageVal: _this.dataProcess(data.averageAge, 'day').num,
                        receivableDay: '应收账款周转天数（天）',
                        receivableDayVal: _this.dataProcess(data.receivableDayVal, 'day').num,
                    }
                    _this.financeIsShow = false
                })
            },
            //逾期欠款
            getOverdueData() {
                var _this = this
                _this.financeIsShow = true
                this.$http({
                    url: _this.requestHttpUrl + '/overdueData',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    console.log(res)
                    let data = res.data.data.data
                    _this.overDueData = {
                        overDueTxt: '逾期账款(万元）',
                        overDueValUnit: '￥',
                        overDueval: _this.dataProcess(data.overdueVal, 'money').num,
                        overDueRadioTxt: '逾期占比',
                        overDueRadio: _this.dataProcess(data.overduePercent, 'percent').num + _this.dataProcess(data.overduePercent, 'percent').unit,
                        overDueRadioPercent: _this.dataProcess(data.overduePercent, 'percent').num
                    }
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
                            "data_type":"累计"
                        },
                    "outputCol":"dealer_id,data_mon,data_type,emp_rate,emp_avg_money,emp_cnt,emp_drop_cnt",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                    "serviceId":"service_tjbg02_emp"
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=salesman',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                    if(res.data.code == '200'){
                        var salesmanData = res.data.data.data[0];
                        salesmanData.emp_rate = !salesmanData.emp_rate ? '--' : _this.dataProcess(salesmanData.emp_rate, 'percent', 1).num + '%'; //业务员达成
                        salesmanData.emp_cnt = !salesmanData.emp_cnt ? '--' : _this.dataProcess(salesmanData.emp_cnt, 'day').num;   //总人数
                        salesmanData.emp_avg_money = !salesmanData.emp_avg_money ? '--' : _this.dataProcess(salesmanData.emp_avg_money, 'money').num;  //人均产出
                        salesmanData.emp_drop_cnt = !salesmanData.emp_drop_cnt ? '--' : _this.dataProcess(salesmanData.emp_drop_cnt, 'day').num;  //下滑人数
                        _this.salesmanData = salesmanData;
                        _this.salesmanReached = false
                    }
                })
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
                    "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                    "serviceId":"service_tjbg02_sales_order"
                }
                this.$http({
                    url: _this.testRequestHttpUrl + '?v=analysis',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                     if(res.data.code == '200'){
                        var secondBandData = res.data.data.data[0],thatMonth = {},chainratio = {},yearOnYear = {};
                        // 当月数据
                        thatMonth.money = !secondBandData.money ? '--' : _this.dataProcess(secondBandData.money, 'money', 1).num;  //本月下单金额
                        if(secondBandData.money){
                            thatMonth.moneyInteger = thatMonth.money.split(".")[0];   //本月下单金额整数部分
                            thatMonth.moneyDecimal = '.' + thatMonth.money.split(".")[1];//本月下单金额小数部分
                        }else {
                            thatMonth.moneyInteger = '--';   //本月下单金额整数部分
                            thatMonth.moneyDecimal = '--';//本月下单金额小数部分
                        }
                        thatMonth.gross_money = !secondBandData.gross_money ? '--' : _this.dataProcess(secondBandData.gross_money, 'money', 1).num; //毛利额
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
                            pieData:list,
                            radius:['35%', '70%'],
                            borderWidth:0,
                        }    
                        // 环比数据
                        chainratio.name = '环比';
                        chainratio.moneymonthly = _this.getHandle(secondBandData.money,secondBandData.money_lm,2);
                        chainratio.grossmoneymonthly = _this.getHandle(secondBandData.gross_money,secondBandData.gross_money_lm,2);
                        chainratio.rossmoneyratemonthly = _this.getHandle(secondBandData.gross_money_rate,secondBandData.gross_money_rate_lm,2);
                        chainratio.list = [{name:'立白',value:_this.getHandle(secondBandData.liby_money,secondBandData.liby_money_lm,2)},
                            {name:'好爸爸',value: _this.getHandle(secondBandData.kispa_money,secondBandData.kispa_money_lm,2)},
                            {name:'超威',value: _this.getHandle(secondBandData.cheerwin_money,secondBandData.cheerwin_money_lm,2)},
                            {name:'口腔',value: _this.getHandle(secondBandData.oral_money,secondBandData.oral_money_lm,2)},
                            {name:'晟美',value: _this.getHandle(secondBandData.shengmei_money,secondBandData.shengmei_money_lm,2)},
                            {name:'其他',value: _this.getHandle(secondBandData.other_money,secondBandData.other_money_lm,2)}]
                        // 同比数据
                        yearOnYear.name = '同比';
                        yearOnYear.moneymonthly = _this.getHandle(secondBandData.money,secondBandData.money_ly,2);
                        yearOnYear.grossmoneymonthly = _this.getHandle(secondBandData.gross_money,secondBandData.gross_money_ly,2);
                        yearOnYear.rossmoneyratemonthly = _this.getHandle(secondBandData.gross_money_rate,secondBandData.gross_money_rate_ly,2);
                        yearOnYear.list = [{name:'立白',value:_this.getHandle(secondBandData.liby_money,secondBandData.liby_money_ly,2)},
                            {name:'好爸爸',value: _this.getHandle(secondBandData.kispa_money,secondBandData.kispa_money_ly,2)},
                            {name:'超威',value: _this.getHandle(secondBandData.cheerwin_money,secondBandData.cheerwin_money_ly,2)},
                            {name:'口腔',value: _this.getHandle(secondBandData.oral_money,secondBandData.oral_money_ly,2)},
                            {name:'晟美',value: _this.getHandle(secondBandData.shengmei_money,secondBandData.shengmei_money_ly,2)},
                            {name:'其他',value: _this.getHandle(secondBandData.other_money,secondBandData.other_money_ly,2)}]
                        _this.orderAmountData = {thatMonth:thatMonth,chainratio:chainratio,yearOnYear:yearOnYear}
                        console.log('5555555555555555555555555555')
                        console.log(_this.orderAmountData)
                        _this.towHelpSaleMonthShow = false
                        _this.towHelProportion = false
                        _this.towHelYoy = false    
                     }   
                })
            },
            //二帮卖-订单走势图
            getdirection() {
                var _this = this
                _this.towHelpSaleMonthLineShow = true
                this.$http({
                    url: _this.requestHttpUrl + '/direction',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var directionData = res.data.data,monthArr = [],seriesData=[],directionArr = {};
                    directionData.map(function(value){
                        monthArr.push(value.month)
                        seriesData.push(value.value)
                    })
                    directionArr.monthArr = monthArr;
                    directionArr.seriesData = seriesData;
                    _this.directionData = directionArr;
                    _this.towHelpSaleMonthLineShow = false
                })
            },
            //业务员-走势图
            getsalesmanTrend() {
                var _this = this
                _this.salesmanTrendPie = true
                this.$http({
                    url: _this.requestHttpUrl + '/salesmanTrend',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var salesmanTrendData = res.data.data,xAxisData=[],salesmanArr=[],seriesData=[],salesmanColor=['#009EE2','#E9A837','#00E2BF','#65E6F5'];
                    salesmanTrendData.map(function(value){
                        xAxisData.push(value.month)
                    })
                    salesmanTrendData[0].salesmanList.map(function(value){
                        salesmanArr.push(value.name)
                    })
                    salesmanArr.map(function(value,index){
                        var tempObjecd = {name:value,color:salesmanColor[index]},tempArr = [];
                        salesmanTrendData.map(function(data){
                           data.salesmanList.map(function(resdata){
                                if(value == resdata.name){
                                    tempArr.push(resdata.value)
                                }
                           })
                        })
                        tempObjecd.data = tempArr;
                        seriesData.push(tempObjecd)
                    })
                    var tempsalesmanTrendData = {monthArr:xAxisData,seriesData:seriesData}
                    _this.salesmanTrendData = tempsalesmanTrendData
                    _this.salesmanTrendPie = false
                    console.log( _this.salesmanTrendData)

                })
            },
            //业务员-下滑人员
            getsalesmandownward() {
                var _this = this
                _this.salesmandownwardBar = true
                this.$http({
                    url: _this.requestHttpUrl + '/salesmandownward',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var salesmandownwardData = res.data.data,xAxisData=[],seriesData=[],lastMonth=[],sameMonth=[],difference=[],salesmandownwardObject={};
                    salesmandownwardData.map(function(value){
                        xAxisData.push(value.salesmanName);
                        lastMonth.push(value.lastMonth)
                        sameMonth.push(value.sameMonth)
                        difference.push(value.difference)
                    })
                    seriesData.push({name:'上月销售额',data:lastMonth,color:'#009EE2',barWidth:20},{name:'本月销售额',data:sameMonth,color:'#E9A837',barWidth:20},{name:'销售差额',data:difference,color:'#00E2BF',barWidth:20})
                    salesmandownwardObject.xAxisData = xAxisData;
                    salesmandownwardObject.seriesData = seriesData;
                    _this.salesmandownwardData = salesmandownwardObject
                    _this.salesmandownwardBar = false
                    console.log(_this.salesmandownwardData)
                })
            },
            //业务员-达成
            getSalesmanReached() {
                var _this = this
                _this.salesmanReachedBar = true
                this.$http({
                    url: _this.requestHttpUrl + '/SalesmanReached',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var salesmanReachedData = res.data.data,xAxisData=[],seriesData=[],lastMonth=[],sameMonth=[],difference=[],salesmanReachedObject={};
                    salesmanReachedData.map(function(value){
                        xAxisData.push(value.salesmanName);
                        lastMonth.push(value.monthlysales)
                        sameMonth.push(value.monthlytarget)
                        // difference.push(value.reached)
                    })
                    seriesData.push(
                        {name:'当月目标',data:sameMonth,color:'#85C1FF',barWidth:20},
                        {name:'当月销量',data:lastMonth,color:'#2D92FC',barWidth:20},
                        // {name:'达成率',data:difference,color:'#00E2BF',barWidth:20}
                        )
                    salesmanReachedObject.xAxisData = xAxisData;
                    salesmanReachedObject.seriesData = seriesData;
                    _this.salesmanReachedData = salesmanReachedObject;
                    _this.salesmanReachedBar = false
                })
            },
            //业务员-贡献
            getSalesmanContribution() {
                var _this = this
                _this.salesmanContributionBar = true
                this.$http({
                    url: _this.requestHttpUrl + '/SalesmanContribution',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var salesmanContributionData = res.data.data,xAxisData=[],seriesData=[],lastMonth=[],sameMonth=[],difference=[],salesmanContributionObject={};
                    salesmanContributionData.map(function(value){
                        xAxisData.push(value.salesmanName);
                        lastMonth.push(value.monthlysales)
                        sameMonth.push(value.totalMonthlySales)
                        // difference.push(value.reached)
                    })
                    seriesData.push(
                        {name:'当月目标',data:sameMonth,color:'#85C1FF',barWidth:20},
                        {name:'当月总销量',data:lastMonth,color:'#2D92FC',barWidth:20},
                        // {name:'达成率',data:difference,color:'#00E2BF',barWidth:20}
                        )
                    salesmanContributionObject.xAxisData = xAxisData;
                    salesmanContributionObject.seriesData = seriesData;
                    _this.salesmanContributionData = salesmanContributionObject;
                    _this.salesmanContributionBar = false
                })
            },
            //产品-商品动销率
            getCommodityTurnoverRate() {
                var _this = this
                _this.CommodityRate = true
                var params = {
                    "inputParam":
                        {
                            "data_mon":_this.currentDate,
                            "data_type":"当月"
                        },
                    "outputCol":"dealer_id,data_mon,data_type,stock_sale_rate,stock_sale_goods_cnt,goods_cnt,stock_sale_goods_cnt_mom,stock_sale_goods_cnt_yoy,sales_raise_goods_cnt,sales_drop_goods_cnt,liby_stock_sale_rate,kispa_stock_sale_rate,cheerwin_stock_sale_rate,oral_stock_sale_rate,shengmei_stock_sale_rate",
                    "pageNum":1,
                    "pageSize":1000,
                    "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                    "serviceId":"service_tjbg02_goods"
                }
                this.$http({
                    url: _this.testRequestHttpUrl+'?v=produceOverview',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                        console.log(res)
                        let data = res.data.data.data
                        // let  databar = res.data.data.data.data
                        console.log(data)
                        // console.log(databar)
                        let dayData = []
                        let Axiax = []
                        // databar.map(function(item){
                        //     Axiax.push(item.Axiax)
                        //     item.dayData = _this.dataProcess(item.dayData,'percent').num
                        //     dayData.push(item.dayData)
                        // })
                        // let produnarData = {
                        //     config:{
                        //         id: 'barIdProdun',
                        //         unit:'%',
                        //         xAxisData: Axiax,
                        //         label: {
                        //             isShow: true
                        //         },
                        //         type: 'xAxis',
                        //         barData: [
                        //             {
                        //                 name: 'ABC',
                        //                 data: dayData,
                        //                 color: '#fff',
                        //                 barWidth: 11
                        //             },
                        //         ],
                        //         showType: 1,
                        //         markLineList:{
                        //             show:false,
                        //             data:100,
                        //         }
                        //     },
                        //     label: {
                        //         isShow: true,
                        //         position:'right'
                        //     },
                        //     xAxis:{
                        //         axisLine:{
                        //             show:false,
                        //             color:'#3699FF'
                        //         },
                        //         axisLabel:{
                        //             show:true,
                        //             color:'#fff',
                        //             fontSize:12
                        //         },
                        //         splitLine:{
                        //             show:false,
                        //             color:'#fff'
                        //         },
                        //     },
                        //     yAxis:{
                        //         axisLine:{
                        //             show:false,
                        //             color:'#fff'
                        //         },
                        //         axisLabel:{
                        //             show:true,
                        //             color:'#fff',
                        //             fontSize:12
                        //         },
                        //         splitLine:{
                        //             show:false,
                        //             color:'#fff'
                        //         },
                        //     },
                        //     legendShow:false,
                        //     isShowMax:true,
                        // }
                        // _this.CommodityTurnoverRate = {
                        //         productimg:require("../assets/img/dongxiao.png"),
                        //         name:"商品动销率",
                        //         RatePin:_this.dataProcess(data.RatePin, 'percent').num+_this.dataProcess(data.RatePin, 'percent').unit, //动销率
                        //         btn:"动销清单",
                        //         produnarData
                        // }
                        // _this.CommodityRate = false
                        // console.log(_this.CommodityTurnoverRate)
                    },
                )
            },
            //产品-列表数据
            getProductTableData(){
                var _this = this
                _this.NumberGoodsList = true
                this.$http({
                    url: _this.requestHttpUrl + '/commodityDetail',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    console.log(res)
                    let data = res.data.data.data
                    let tablecColumns = [
                        {
                            title:'商品编码',
                            dataIndex:'code'
                        },
                        {
                            title:'事业部',
                            dataIndex:'business'
                        },
                        {
                            title:'品类',
                            dataIndex:'category'
                        },
                        {
                            title:'系列',
                            dataIndex:'series'
                        },
                        {
                            title:'商品名称',
                            dataIndex:'name'
                        },
                        {
                            title:'销量',
                            dataIndex:'sales'
                        },
                        {
                            title:'销量占比',
                            dataIndex:'salesPercent'
                        },
                    ]
                    _this.productTableData = {
                        data:data,
                        columns:tablecColumns
                    }
                    _this.NumberGoodsList = false
                })
            },
            //产品-动销商品数
            getNumberMovingGoods() {
                var _this = this
                _this.NumberGoods = true
                this.$http({
                    url: _this.requestHttpUrl + '/NumberMovingGoods',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                        console.log(res)
                        let data = res.data.data.data
                        console.log(data)
                    let goodsChainVal = {
                        name: "环比:",
                        NoSales: _this.dataProcess(data.chainval, 'percent').num + _this.dataProcess(data.chainval, 'percent').unit
                    }
                    let goodsYearVal = {
                        name: "同比:",
                        NoSales: _this.dataProcess(data.yearval, 'percent').num + _this.dataProcess(data.yearval, 'percent').unit
                    }
                    let downGoods = {
                        name:"销量增长商品数(个):",
                        NoSales:data.upGoods,
                        btn:"下滑商品"
                    }
                    let upGoods = {
                        name:"销量下滑商品数(个):",
                        NoSales: data.downGoods,
                        btn:"增长商品"
                    }

                          _this.commoditydata = {
                            commoditytitle:[
                                goodsChainVal,
                                goodsYearVal
                            ],
                            downGoods,
                            upGoods,
                            commodityname:"总商品数",
                            name:"动销商品数",
                            btn:"商品明细",
                             RatePin:data.NumberGoods,
                            commoditysum:data.commoditysum,
                            productimg: require("../assets/img/shangpinshu.png"),
                    }
                        _this.NumberGoods = false
                        console.log(_this.commoditydata)
                    },
                )
            },
            //产品-动销商品数增长商品
            getVariabilityUp() {
                var _this = this
                _this.NumberGoodsUpBar = true
                this.$http({
                    url: _this.requestHttpUrl + '/variabilityUp',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var VariabilityUpData = res.data.data,
                        xAxisData=[],
                        seriesData=[],
                        lastMonth=[],
                        sameMonth=[],
                        difference=[],
                        salesmandownwardObject={};
                    VariabilityUpData.map(function(value){
                        xAxisData.push(value.salesmanName);
                        lastMonth.push(value.lastMonth)
                        sameMonth.push(value.sameMonth)
                        difference.push(value.difference)
                    })
                    seriesData.push(
                        {name:'上月销售额(万元)',data:lastMonth,color:'#2D92FC',barWidth:22},
                        {name:'当月销售额(万元)',data:sameMonth,color:'#FFBD7B',barWidth:22},
                        {name:'销售差额(万元)',data:difference,color:'#FE9600',barWidth:22})
                    salesmandownwardObject.xAxisData = xAxisData;
                    salesmandownwardObject.seriesData = seriesData;
                    _this.VariabilityUpData = salesmandownwardObject
                    _this.NumberGoodsUpBar = false
                    console.log( _this.VariabilityUpData)

                })
            },
            //产品-动销商品数下滑商品
            getVariabilityDown() {
                var _this = this
                _this.NumberGoodsDownBar = true
                this.$http({
                    url: _this.requestHttpUrl + '/variabilityDown',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var VariabilityUpData = res.data.data,
                        xAxisData=[],
                        seriesData=[],
                        lastMonth=[],
                        sameMonth=[],
                        difference=[],
                        salesmandownwardObject={};
                    VariabilityUpData.map(function(value){
                        xAxisData.push(value.salesmanName);
                        lastMonth.push(value.lastMonth)
                        sameMonth.push(value.sameMonth)
                        difference.push(value.difference)
                    })
                    seriesData.push(
                        {name:'上月销售额(万元)',data:lastMonth,color:'#2D92FC',barWidth:22},
                        {name:'当月销售额(万元)',data:sameMonth,color:'#FFBD7B',barWidth:22},
                        {name:'销售差额(万元)',data:difference,color:'#FE9600',barWidth:22})
                    salesmandownwardObject.xAxisData = xAxisData;
                    salesmandownwardObject.seriesData = seriesData;
                    _this.VariabilityDownData = salesmandownwardObject
                    _this.NumberGoodsDownBar = false
                    console.log( _this.VariabilityDownData)

                })
            },
            //产品-动销商品明细
            getGoodsdetail() {
                var _this = this
                _this.NumberGoodsPie = true
                this.$http({
                    url: _this.requestHttpUrl + '/GoodsDetail',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var Goods = res.data.data;
                    _this.GoodsDetail = Goods;
                    _this.NumberGoodsPie = false
                    console.log(   _this.GoodsDetail)
                })
            },
            //门店活跃明细
            getStoresDetailed() {
                var _this = this
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
                    "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                    "serviceId":"service_tjbg02_store"
                }
                this.$http({
                    url: _this.testRequestHttpUrl+'?v=storeActivity',
                    method: 'POST',
                    data: params
                }).then(function (res) {
                        console.log(res)
                        let data = res.data.data.data[0]
                        console.log(data)
                        let AmountChainVal = {
                            name: "环比: ",
                            NoSales: _this.dataProcess(data.active_store_cnt_mom, 'percent').num + _this.dataProcess(data.active_store_cnt_mom, 'percent').unit
                        }
                        let AmountYearVal = {
                            name: "同比: ",
                            NoSales: _this.dataProcess(data.active_store_cnt_yoy, 'percent').num + _this.dataProcess(data.active_store_cnt_yoy, 'percent').unit
                        }
                        let downSales = {
                            name:"销量下滑门店数(家):",
                            NoSales: data.sale_drop_store_cnt,
                            btn:"下滑门店"
                        }
                        let upSales = {
                            name:"销量增长门店数(家):",
                            NoSales: data.sale_raise_store_cnt,
                            btn:"增长门店"
                        }
                        let noTrade = {
                            name: "近3个月无交易门店数(家): ",
                            NoSales: data.mon3_unsale_store_cnt
                        }
                        let noTrades = {
                            name: "6个月无交易门店数(家):",
                            NoSales:data.mon6_unsale_store_cnt
                        }
                        let ActivestresPer = {
                            ActiveStores:"门店单产",
                            ActiveStoresing:"(万元)",
                            NoSales:_this.dataProcess(data.store_avg_money, 'money').num,
                          }
                        let ActivestresSum = {
                            ActiveStores:"总门店数",
                            ActiveStoresing:"(家)",
                            NoSales:data.store_cnt
                        }
                        let ActivestresnNew = {
                            ActiveStores:"新增门店数",
                            ActiveStoresing:"(家)",
                            NoSales:data.new_store_cnt
                        }
                        let nearnoTrade = {
                            name: "3个月无交易门店应收欠款(万元):",
                            NoSales: '￥'+ _this.dataProcess(data.mon3_unsale_store_dept_money, 'money').num,
                        }
                        let nearnoTrades = {
                        name: "闭店应收账款(万元):",
                        NoSales: '￥'+_this.dataProcess(data.close_store_dept_money, 'money').num,
                    }


                        _this.StoresDetailed = {
                            shopTitle:"门店活跃率:",
                            StoreActivity: _this.dataProcess(data.active_store_rate, 'percent').num + _this.dataProcess(data.active_store_rate, 'percent').unit,  //门店活跃率
                            shopActiveData: {
                                ActiveStoresTxt:"活跃门店数",
                                ActiveStoresing:"(家)",
                                ActiveStores:data.active_store_cnt,  //门店活跃数
                                detailbtn:"门店详情",
                                shopActiveTitle: [
                                    AmountChainVal,  //环比数额
                                    AmountYearVal   //同比数额
                                ],
                                    downSales,
                                    upSales,
                                shopDaseData:[
                                    noTrade,
                                    noTrades
                                ]
                            },
                            ActiveDetail:{
                                shopActiveDetail:[
                                    ActivestresPer,
                                    ActivestresSum,
                                    ActivestresnNew
                                ],
                                shopDaseData:[
                                    nearnoTrade,
                                    nearnoTrades
                                ]
                            }
                        }
                        _this.StoreisShow = false
                        console.log(_this.StoresDetailed)
                    },
                )
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
                        "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_address,money,mon3_avg_m_money,dif_money",
                        "pageNum":1,
                        "pageSize":1000,
                        "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                        "serviceId":"service_tjbg02_store_sales_change"
                    }
                    _this.storeExportData.raiseData = {
                        //增长门店导出数据
                        tableHeaderTxt:['序号','业务员姓名','联系电话','门店名称','门店老板姓名','门店老板电话','门店地址','月均销量（元）','当月销量（元）','差额（元）'],
                        tableHeaderKey:params.outputCol,
                        tableData:'',
                        tableName:'增长门店'
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl+'?v=raiseStore',
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
                        "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_address,money,mon3_avg_m_money,dif_money",
                        "pageNum":1,
                        "pageSize":1000,
                        "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                        "serviceId":"service_tjbg02_store_sales_change"
                    }
                    _this.storeExportData.downData={
                        //下滑门店导出数据
                        tableHeaderTxt:['序号','业务员姓名','联系电话','门店名称','门店老板姓名','门店老板电话','门店地址','月均销量（元）','当月销量（元）','差额（元）'],
                        tableHeaderKey:params.outputCol,
                        tableData:'',
                        tableName:'下滑门店'
                    }
                    return _this.$http({
                        url: _this.testRequestHttpUrl+'?v=downStore',
                        method: 'POST',
                        data: params,
                    })
                }
                this.$http.all([getRaiseData(), getDownData()])
                    .then(this.$http.spread((raiseData, downData) => {
                        console.log(raiseData)
                        //增长门店数据
                        let raiseList = raiseData.data.data.data
                        let raisexAxisData = []//增长门店x轴
                        let raiseLastMonth = []//增长门店月平均销售额
                        let raiseSameMonth = []//增长门店当月销售额
                        let raiseDifference = []//增长门店差异销售额
                        raiseList.map(function(item,index){
                            item.numberId = index+1
                            raisexAxisData.push(item.store_name)
                            raiseLastMonth.push(item.mon3_avg_m_money)
                            raiseSameMonth.push(item.money)
                            raiseDifference.push(item.dif_money)
                        })
                        _this.storeExportData.raiseData.tableData = raiseList
                        //增长门店柱状图数据
                        let raiseBarData = {
                                //id
                                id:'barRaiseId',
                                //数据单位
                                unit:'万元',
                                //x轴单位
                                xAxisData:raisexAxisData,
                                type:'xAxis',
                                //柱状图数据
                                barData:[
                                    {
                                        name:'月均销售额(万元)',
                                        data:raiseLastMonth,
                                        color:'#2D92FC',
                                        barWidth:22,
                                    },
                                    {
                                        name:'当月销售额(万元)',
                                        data:raiseSameMonth,
                                        color:'#FFBD7B',
                                        barWidth:22,
                                    },
                                    {
                                        name:'销售差额(万元)',
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
                        let downList = downData.data.data.data
                        let downxAxisData = []//下滑门店x轴
                        let downLastMonth = []//下滑门店月平均销售额
                        let downSameMonth = []//下滑门店当月销售额
                        let downDifference = []//下滑门店差异销售额
                        downList.map(function(item,index){
                            item.numberId = index+1
                            downxAxisData.push(item.store_name)
                            downLastMonth.push(item.mon3_avg_m_money)
                            downSameMonth.push(item.money)
                            downDifference.push(item.dif_money)
                        })
                        _this.storeExportData.downData.tableData = downList
                        //下滑门店柱状图数据
                        let downBarData = {
                                //id
                                id:'barDownId',
                                //数据单位
                                unit:'万元',
                                //x轴单位
                                xAxisData:downxAxisData,
                                type:'xAxis',
                                //柱状图数据
                                barData:[
                                    {
                                        name:'月均销售额(万元)',
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
                                    show:false
                                },
                        }
                        _this.downStoresData = downBarData
                        _this.downStoresBar = false
                        _this.upStoresBar = false
                    })
                )
            },
            //库存明细金额件数明细
            getinventoryDetail() {
                var _this = this
                _this.stockAmount = true
                _this.InventoryTurnover = true
                this.$http({
                    url: _this.requestHttpUrl + '/inventoryDetail',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                        console.log(res)
                        let data = res.data.data.data
                        console.log(data)
                        let SalesMoney = {
                            name: '6个月未销售商品金额(万元)',
                            NoSales:'￥'+ _this.dataProcess(data.NoSalesMoney, 'money').num
                        }
                        let SalesSum = {
                            name: '6个月未销售商品数(件)',
                            NoSales: data.NoSalesSum
                        }
                        _this.inventoryDetails = {
                            noSalesDetail: [
                                SalesMoney,
                                SalesSum
                            ],
                            noSalesbtn:"无交易明细",
                            amountTxt:"库存金额(万元)",
                            amount: _this.dataProcess(data.amount, 'money').num,  //库存金额
                            inventoryNumberTxt:"库存件数(件)",
                            inventoryNumber:data.inventoryNumber,  //库存件数
                            turnoverTxt:"库存周转次数",
                            turnover:data.turnover+'次',  //库存周转次数
                        }
                    _this.stockAmount = false
                    _this.InventoryTurnover = false
                        console.log(_this.inventoryDetails)
                    },
                )
            },
            //库存天数明细
            getDaysAvailableStock() {
                var _this = this
                _this.DaysAvailableStock = true
                this.$http({
                    url: _this.requestHttpUrl + '/DaysAvailableStock',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                        console.log(res)
                        let data = res.data.data.data
                        let daydata = res.data.data.data.data
                        console.log(data)
                        let Chain = {
                            name: '环比增长:',
                            inventoryChainVal: _this.dataProcess(data.inventoryChainVal, 'percent').num + _this.dataProcess(data.inventoryChainVal, 'percent').unit,
                        }
                        let Year = {
                            name: '同比增长:',
                            inventoryChainVal: _this.dataProcess(data.inventoryYearVal, 'percent').num + _this.dataProcess(data.inventoryYearVal, 'percent').unit,
                        }
                        let inventoryData = []
                        let Axiax = []
                          daydata.map(function(item){
                                Axiax.push(item.Axiax)
                                item.dayData = _this.dataProcess(item.dayData,'day').num
                                inventoryData.push(item.dayData)
                        })
                    let inventoryBarData = {
                        config:{
                            id: 'barIdInventory',
                            unit:'天',
                            xAxisData: Axiax,
                            label: {
                                isShow: true
                            },
                            type: 'xAxis',
                            barData: [
                                {
                                    name: 'ABC',
                                    data: inventoryData,
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
                       _this.inventoryDay = {
                        inventorycompare: [
                            Chain,
                            Year
                        ],
                        receivableAverage: '库存可销天数(天) ',
                        inventoryVal: _this.dataProcess(data.inventoryVal, 'day').num,
                        inventoryBarData
                    }
                    _this.DaysAvailableStock = false
                    console.log(_this.inventoryDay)
                    },
                )
            },
            //库存-库存可销天数走势图
            getmarketableDayChart() {
                var _this = this
                _this.marketableDayLine = true
                this.$http({
                    url: _this.requestHttpUrl + '/marketableDayChart',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var marketableDayChart = res.data.data,xAxisData=[],salesmanArr=[],seriesData=[],
                        salesmanColor=['#EAB90D','#F07132','#00E2BF','#D14BDD','#009ADC','#25D5EA'];
                    marketableDayChart.map(function(value){
                            xAxisData.push(value.month)
                        })
                    marketableDayChart[0].salesmanList.map(function(value){
                            salesmanArr.push(value.name)
                        })
                        salesmanArr.map(function(value,index){
                            var tempObjecd = {name:value,color:salesmanColor[index]},tempArr = [];
                            marketableDayChart.map(function(data){
                                data.salesmanList.map(function(resdata){
                                    if(value == resdata.name){
                                        tempArr.push(resdata.value)
                                    }
                                })
                            })
                            tempObjecd.data = tempArr;
                            seriesData.push(tempObjecd)
                        })
                        var tempsalesmanTrendData = {monthArr:xAxisData,seriesData:seriesData}
                        _this.marketableDayChart = tempsalesmanTrendData
                        _this.marketableDayLine = false
                    console.log(_this.marketableDayChart)
                })
            },
            //获取二级页面表格数据
            getDetailTableData(){
                //门店数据列表数据
                var _this = this
                _this.storeDetailTableData = {
                    //活跃门店详情
                    activeStoreDetail:{
                        params:{
                            "inputParam":
                                {
                                    "data_mon":_this.currentDate,
                                    "data_type":"当月",
                                },
                            "isReturnTotalSize": "Y",
                            "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,money,money_rate,sale_goods_cnt,sale_goods_cnt_lm",
                            "pageNum":1,
                            "pageSize":100,
                            "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                            "serviceId":"service_tjbg02_store_active"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'业务员姓名',unit:false},
                            {txt:'业务员电话',unit:false},
                            {txt:'门店店名',unit:false},
                            {txt:'门店老板姓名',unit:false},
                            {txt:'门店老板联系方式',unit:false},
                            {txt:'当月销量（元）',unit:'money'},
                            {txt:'当月销量占比',unit:'percent'},
                            {txt:'当月门店销售SKU数量',unit:'day'},
                            {txt:'上月门店销售SKU数量',unit:'day'},
                        ]
                    },
                    //新增门店详情
                    addStoreDetail:{
                        params:{
                            "inputParam":
                                {
                                    "data_mon":this.currentDate,
                                    "data_type":"当月",
                                },
                            "isReturnTotalSize": "Y",
                            "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_address,new_store_cnt",
                            "pageNum":1,
                            "pageSize":100,
                            "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
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
                            {txt:'新增门店数（家）',unit:'day'},
                        ]
                    },
                    //无交易明细
                    noTradeData:{
                        params:{
                            "inputParam":
                                {
                                    "data_mon":_this.currentDate,
                                    "data_type":"当月",
                                },
                            "isReturnTotalSize": "Y",
                            "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_address,last_order_time,last_order_money,unsale_days",
                            "pageNum":1,
                            "pageSize":100,
                            "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                            "serviceId":"service_tjbg02_store_unsale"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'业务员姓名',unit:false},
                            {txt:'联系电话',unit:false},
                            {txt:'门店名称',unit:false},
                            {txt:'门店老板姓名',unit:false},
                            {txt:'门店老板电话',unit:false},
                            {txt:'门店地址',unit:false},
                            {txt:'最近交易时间',unit:false},
                            {txt:'最近交易金额（元）',unit:'day'},
                            {txt:'无交易时长（天）',unit:'money'},
                        ]
                    },
                    //无交易门店应收账款明细
                    noDealDetail:{
                        params:{
                            "inputParam":
                                {
                                    "data_mon":_this.currentDate,
                                    "data_type":"当月",
                                },
                            "isReturnTotalSize": "Y",
                            "outputCol":"emp_name,emp_phone,store_name,store_contact,store_phone,store_address,store_status,last_order_time,unsale_days,debt_money",
                            "pageNum":1,
                            "pageSize":100,
                            "whereCndt":{"dealer_id":"='ff8080816c0b0669016c416c850a4149'"},
                            "serviceId":"service_tjbg02_store_unsale"
                        },
                        header:[
                            {txt:'序号',unit:false},
                            {txt:'业务员姓名',unit:false},
                            {txt:'联系电话',unit:false},
                            {txt:'门店名称',unit:false},
                            {txt:'门店老板姓名',unit:false},
                            {txt:'门店老板电话',unit:false},
                            {txt:'门店地址',unit:false},
                            {txt:'是否开业',unit:false},
                            {txt:'最近交易时间',unit:false},
                            {txt:'无交易时长（天）',unit:'day'},
                            {txt:'应收账款（元）',unit:'money'},
                        ]
                    }
                }
            },
            //计算环比/同比
            getHandle(molecule,denominator,num){
                var tempObj;
                if(!denominator){
                    tempObj = '--';
                }else {
                    tempObj = ((molecule-denominator)/denominator).toFixed(num)+'%';
                }
                return tempObj
            },
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
