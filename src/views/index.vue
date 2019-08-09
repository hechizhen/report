
<template>
    <div class="index">
        <!-- <div class="title">
            <p>体检报告</p>
            <i></i>
        </div> -->
        <!-- 头部 -->
        <header-title :dealName="indexDealName" :score="indexScore" :summary="indexSummary" :defaultDate="indexDefaultDate" :changeDateHandle="indexChangeDate"></header-title>
        <!-- 一帮卖分析 -->
        <one-help-sale-en :titleName="oneHelpSaleTitle" :salesData="salesData" :coreData="oneHelpSaleScoreList" :barData="salesBarData"
        v-if="salesData.length!=0 && salesBarData.length!=0" ></one-help-sale-en>

        <!-- 帮卖分析-订单 -->
        <secondBand :orderAmountData="orderAmountData" :grossProfitData="grossProfitData" :grossInterestRateData="grossInterestRateData" :proportio="proportioData" :directionData="directionData"></secondBand>
        <!-- 二帮卖分析-业务员 -->
        <salesman :salesmanData="salesmanData" :salesmanTrendData="salesmanTrendData" :salesmandownwardData="salesmandownwardData" :salesmanReachedData="salesmanReachedData" :salesmanContributionData="salesmanContributionData"></salesman>
        <!-- 产品 -->
        <productIndex :CommodityTurnoverRate="CommodityTurnoverRate"  :commoditydata="commoditydata" :GoodsDetail="GoodsDetail"
                      :VariabilityUpData="VariabilityUpData" :VariabilityDownData="VariabilityDownData"
                      v-if="CommodityTurnoverRate.length!=0"
        ></productIndex>
        <!--门店-->
        <shopIndex  :StoresDetailed="StoresDetailed" v-if="StoresDetailed.length!=0 "
                    :upStoresData="upStoresData"  :downStoresData="downStoresData"
        ></shopIndex>
         <!--库存-->
        <inventoryIndex  :inventoryDay="inventoryDay" :inventoryDetails="inventoryDetails"
                         :marketableDayChart="marketableDayChart"
                         v-if="inventoryDay.length!=0 "> </inventoryIndex>
        <!-- 财务 -->
        <finance :financeData="financeData" :receivableData="receivableData" :overDueData="overDueData" :titleName="financeTitle"
        v-if="financeData.length!=0 && receivableData.length!=0 && overDueData.length!=0"></finance>
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
                salesData: '',//本月/累计销量以及达成率
                salesBarData: '',//一帮卖本月/年累计销量
                oneHelpSaleScoreList: {//一帮卖评分
                    coretype: '一帮卖得分',
                    coretext: 100,
                    evaluate: '优秀'
                },
                salesmanData: {},//业务员数据
                orderAmountData: {}, //金额数据
                grossProfitData: {}, //毛利额
                grossInterestRateData: {},//毛利率
                proportioData: [],  //占比数据
                directionData:{}, //订单走势图
                salesmanTrendData:{},  //业务员走势图
                salesmandownwardData:{}, //业务员下滑
                salesmanReachedData:{},  //业务员-达成
                salesmanContributionData:{},//业务员-贡献
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
            this.getSalesData()
            this.getMonthSalesHistoryData()
            this.getFinanceTableData()
            this.getReceivableData()
            this.getOverdueData()
            this.getsalesman()
            this.getsecondBand()
            this.getProportio()
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
            this.getDownStores()
            this.geUpStores()
            this.getSalesmanReached()
            this.getSalesmanContribution()
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
                this.getSalesData()
                this.getMonthSalesHistoryData()
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
                this.getDownStores()
                this.geUpStores()
                this.getSalesmanReached()
                this.getSalesmanContribution()
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
            //本月/年累计下单金额以及总达成
            getSalesData() {
                var _this = this
                var params = {
                    "inputParam":{
                        "date_dt":_this.currentDate
                    },
                    "outputCol":"monthSales,monthReach,yearSales,yearReach",
                    "pageNum":1,
                    "pageSize":1000,
                    "serviceId":"inspect_report_sales_data",
                    "orderCol":"monthSales"
                }
                this.$http({
                    url: _this.requestHttpUrl+'/SalesData',
                    method: 'POST',
                    data: {
                        dateTime:_this.currentDate
                    }
                }).then(function (res) {
                    console.log(res)
                    let data = res.data.data.data
                    _this.salesData = {
                        monthData:{
                            sales:_this.dataProcess(data.monthSales,'money').num,
                            reach:_this.dataProcess(data.monthReach,'percent').num+_this.dataProcess(data.monthReach,'percent').unit,
                            bgColor:'#2D92FC',
                            titleName:'本月'
                        },
                        yearData:{
                            sales:_this.dataProcess(data.yearSales,'money').num,
                            reach:_this.dataProcess(data.yearReach,'percent').num+_this.dataProcess(data.yearReach,'percent').unit,
                            bgColor:'#FF9500',
                            titleName:'年累计'
                        }
                    }
                })
            },
            //本月/年累计达成率历史趋势
            getMonthSalesHistoryData() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/salesHistoryLineData',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    console.log(res)
                    let data = res.data.data.data
                    let monthData = []
                    let yearData = []
                    let Axiax = []
                    data.map(function(item){
                        Axiax.push(item.Axiax)
                        item.monthData = _this.dataProcess(item.monthData,'percent').num
                        item.yearData = _this.dataProcess(item.yearData,'percent').num
                        monthData.push(item.monthData)
                        yearData.push(item.yearData)
                    })
                    let monthBarData = {
                        config:{
                            id: 'barIdMonthSales',
                            xAxisData: Axiax,
                            unit:'%',
                            type: 'xAxis',
                            barData: [
                                {
                                    name: 'ABC',
                                    data: monthData,
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
                    let yearBarData = {
                        config:{
                            id: 'barIdYearSales',
                            unit:'%',
                            xAxisData: Axiax,
                            label: {
                                isShow: true
                            },
                            type: 'xAxis',
                            barData: [
                                {
                                    name: 'ABC',
                                    data: yearData,
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
                    _this.salesBarData = {
                        monthBarData,
                        yearBarData
                    }
                    console.log(_this.salesBarData)
                })
            },
            //财务报表数据
            getFinanceTableData() {
                var _this = this
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
                })
            },
            //应收账款
            getReceivableData() {
                var _this = this
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
                })
            },
            //逾期欠款
            getOverdueData() {
                var _this = this
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
                })
            },
            //二帮卖-业务员数据
            getsalesman() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/Salesman',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var salesmanData = res.data.data[0];
                    salesmanData.reached = !salesmanData.reached ? '--' : _this.dataProcess(salesmanData.reached, 'percent', 1).num + '%';
                    salesmanData.perCapitaOutput = !salesmanData.perCapitaOutput ? '--' : _this.dataProcess(salesmanData.perCapitaOutput, 'money').num;
                    salesmanData.totalNumber = !salesmanData.totalNumber ? '--' : _this.dataProcess(salesmanData.totalNumber, 'day').num;
                    salesmanData.declinePerformance = !salesmanData.declinePerformance ? '--' : _this.dataProcess(salesmanData.declinePerformance, 'day').num;
                    _this.salesmanData = salesmanData;
                })
            },
            //二帮卖-订单
            getsecondBand() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/Analysis',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var secondBandData = res.data.data[0], orderAmountData = {}, grossProfitData = {},
                        grossInterestRateData = {};
                    secondBandData.orderAmount = !secondBandData.orderAmount ? '--' : _this.dataProcess(secondBandData.orderAmount, 'money', 1).num;
                    // 下单金额数据
                    orderAmountData.orderAmountInteger = secondBandData.orderAmount.split(".")[0];
                    orderAmountData.orderAmountDecimal = '.' + secondBandData.orderAmount.split(".")[1];
                    orderAmountData.grossProfit = !secondBandData.grossProfit ? '--' : _this.dataProcess(secondBandData.grossProfit, 'money', 1).num;
                    orderAmountData.grossInterestRate = !secondBandData.grossInterestRate ? '--' : _this.dataProcess(secondBandData.grossInterestRate, 'percent').num + '%';
                    // 环比数据
                    grossProfitData.orderAmount = !secondBandData.orderAmountRatio ? '--' : _this.dataProcess(secondBandData.orderAmountRatio, 'percent').num + '%';
                    grossProfitData.grossProfit = !secondBandData.grossProfitRatio ? '--' : _this.dataProcess(secondBandData.grossProfitRatio, 'percent').num + '%';
                    grossProfitData.grossInterestRate = !secondBandData.grossInterestRateRatio ? '--' : _this.dataProcess(secondBandData.grossInterestRateRatio, 'percent').num + '%';
                    // 同比数据
                    grossInterestRateData.orderAmount = !secondBandData.orderAmountTerms ? '--' : _this.dataProcess(secondBandData.orderAmountTerms, 'percent').num + '%';
                    grossInterestRateData.grossProfit = !secondBandData.grossProfitTerms ? '--' : _this.dataProcess(secondBandData.grossProfitTerms, 'percent').num + '%';
                    grossInterestRateData.grossInterestRate = !secondBandData.grossInterestRateTerms ? '--' : _this.dataProcess(secondBandData.grossInterestRateTerms, 'percent').num + '%';

                    _this.orderAmountData = orderAmountData;
                    _this.grossProfitData = grossProfitData;
                    _this.grossInterestRateData = grossInterestRateData;
                })
            },
            //二帮卖-订单占比
            getProportio() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/Proportion',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var proportioData = res.data.data;
                    _this.proportioData = proportioData;
                    console.log(   _this.proportioData)
                })
            },
            //二帮卖-订单走势图
            getdirection() {
                var _this = this
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
                })
            },
            //业务员-走势图
            getsalesmanTrend() {
                var _this = this
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
                })
            },
            //业务员-下滑人员
            getsalesmandownward() {
                var _this = this
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
                    console.log(_this.salesmandownwardData)
                })
            },
            //业务员-达成
            getSalesmanReached() {
                var _this = this
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
                })
            },
            //业务员-贡献
            getSalesmanContribution() {
                var _this = this
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
                    _this.salesmanContributionData = salesmanContributionObject;
                })
            },
            //产品-商品动销率
            getCommodityTurnoverRate() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/CommodityTurnoverRate',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                        console.log(res)
                        let data = res.data.data.data
                        let  databar = res.data.data.data.data
                            console.log(data)
                            console.log(databar)
                            let dayData = []
                            let Axiax = []
                            databar.map(function(item){
                                Axiax.push(item.Axiax)
                                item.dayData = _this.dataProcess(item.dayData,'percent').num
                                dayData.push(item.dayData)
                            })
                            let produnarData = {
                                id: 'barIdProdun',
                                xAxisData: Axiax,
                                unit:'%',
                                xAxis: {
                                    isShowLine: false,
                                    isShowSplit: false,
                                    axisLabelColor: '#fff',
                                },
                                yAxis: {
                                    isShowLine: false,
                                    isShowSplit: false,
                                    axisLabelColor: '#fff',
                                },
                                label: {
                                    isShow: true
                                },
                                type: 'xAxis',
                                barData: [
                                    {
                                        name: 'ABC',
                                        data: dayData,
                                        color: '#fff',
                                        barWidth: 11
                                    },
                                ],
                                showType: 1,
                                markLineList:{
                                    show:true,
                                    data:100,
                                },
                            }
                        _this.CommodityTurnoverRate = {
                                productimg:require("../assets/img/dongxiao.png"),
                                name:"商品动销率",
                                RatePin:_this.dataProcess(data.RatePin, 'percent').num+_this.dataProcess(data.RatePin, 'percent').unit, //动销率
                                btn:"动销清单",
                                produnarData
                        }
                        console.log(_this.CommodityTurnoverRate)
                    },
                )
            },
            //产品-动销商品数
            getNumberMovingGoods() {
                var _this = this
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
                        name:"销量下滑商品数(个)：",
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
                        console.log(_this.commoditydata)
                    },
                )
            },
            //产品-动销商品数增长商品
            getVariabilityUp() {
                var _this = this
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
                    console.log( _this.VariabilityUpData)

                })
            },
            //产品-动销商品数下滑商品
            getVariabilityDown() {
                var _this = this
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
                    console.log( _this.VariabilityDownData)

                })
            },
            //产品-动销商品明细
            getGoodsdetail() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/GoodsDetail',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var Goods = res.data.data;
                    _this.GoodsDetail = Goods;
                    console.log(   _this.GoodsDetail)
                })
            },
            //门店活跃明细
            getStoresDetailed() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/StoresDetailed',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                        console.log(res)
                        let data = res.data.data.data
                        console.log(data)
                        let AmountChainVal = {
                            name: "环比: ",
                            NoSales: _this.dataProcess(data.AmountChainVal, 'percent').num + _this.dataProcess(data.AmountChainVal, 'percent').unit
                        }
                        let AmountYearVal = {
                            name: "同比: ",
                            NoSales: _this.dataProcess(data.AmountYearVal, 'percent').num + _this.dataProcess(data.AmountYearVal, 'percent').unit
                        }
                        let downSales = {
                            name:"销量下滑门店数(家):",
                            NoSales: data.downSales,
                            btn:"下滑门店"
                        }
                        let upSales = {
                            name:"销量增长门店数(家):",
                            NoSales: data.upSales,
                            btn:"增长门店"
                        }
                        let noTrade = {
                            name: "近3个月无交易门店数(家): ",
                            NoSales: data.noTrade
                        }
                        let noTrades = {
                            name: "6个月无交易门店数(家):",
                            NoSales:data.noTrades
                        }
                        let ActivestresPer = {
                            ActiveStores:"门店单产",
                            ActiveStoresing:"(万元)",
                            NoSales:data.ActivestresPer
                          }
                        let ActivestresSum = {
                            ActiveStores:"总门店数",
                            ActiveStoresing:"(家)",
                            NoSales:data.ActivestresSum
                        }
                        let ActivestresnNew = {
                            ActiveStores:"新增门店数",
                            ActiveStoresing:"(家)",
                            NoSales:data.ActivestresnNew
                        }
                        let nearnoTrade = {
                            name: "3个月无交易门店应收欠款(万元):",
                            NoSales: '￥'+ _this.dataProcess(data.nearnoTrade, 'money').num,
                        }
                        let nearnoTrades = {
                        name: "闭店应收账款(万元):",
                        NoSales: '￥'+_this.dataProcess(data.nearnoTrades, 'money').num,
                    }


                        _this.StoresDetailed = {
                            shopTitle:"门店活跃率:",
                            StoreActivity: _this.dataProcess(data.StoreActivity, 'percent').num + _this.dataProcess(data.StoreActivity, 'percent').unit,  //门店活跃率
                            shopActiveData: {
                                ActiveStoresTxt:"活跃门店数",
                                ActiveStoresing:"(家)",
                                ActiveStores:data.ActiveStores,  //门店活跃数
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
                        console.log(_this.StoresDetailed)
                    },
                )
            },
            //门店-门店下滑商品
            getDownStores() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/downStores',
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
                    _this.downStoresData = salesmandownwardObject
                    console.log( _this.downStoresData)

                })
            },
            //门店-门店增长商品
            geUpStores() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/upStores',
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
                    _this.upStoresData = salesmandownwardObject
                    console.log( _this.upStoresData)

                })
            },
            //库存明细金额件数明细
            getinventoryDetail() {
                var _this = this
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
                            turnover:data.turnover,  //库存周转次数
                        }
                        console.log(_this.inventoryDetails)
                    },
                )
            },
            //库存天数明细
            getDaysAvailableStock() {
                var _this = this
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
                       id: 'barIdInventory',
                       unit:'天',
                        xAxisData: Axiax,
                        xAxis: {
                            isShowLine: false,
                            isShowSplit: false,
                            axisLabelColor: '#333',
                        },
                        yAxis: {
                            isShowLine: false,
                            isShowSplit: true,
                            axisLabelColor: '#D7D9E5',
                        },
                        label: {
                            isShow: true
                        },
                        type: 'xAxis',
                        barData: [
                            {
                                name: 'ABC',
                                data: inventoryData,
                                color: '#6BBCFF',
                                barWidth: 11
                            },
                        ],
                        showType: 0,
                           markLineList:{
                               show:false,
                               data:100,
                           }
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
                    console.log(_this.inventoryDay)
                    },
                )
            },
            //库存-库存可销天数走势图
            getmarketableDayChart() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl + '/marketableDayChart',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    var marketableDay = res.data.data;
                    _this.marketableDayChart = marketableDay;

                    console.log(_this.marketableDayChart)
                })
            },
            distroyed: function () {

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
