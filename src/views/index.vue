
<template>
    <div class="index">
        <div class="title">
            <p>体检报告</p>
            <i></i>
        </div>
        <!-- 头部 -->
        <header-title :dealName="indexDealName" :score="indexScore" :summary="indexSummary" :defaultDate="indexDefaultDate" :changeDateHandle="indexChangeDate"></header-title>
        <!-- 一帮卖分析 -->
        <one-help-sale-en :titleName="oneHelpSaleTitle" :salesData="salesData" :coreData="oneHelpSaleScoreList" :barData="salesBarData"
        v-if="salesData.length!=0 && salesBarData.length!=0" ></one-help-sale-en>

        <!-- 帮卖分析-订单 -->
        <secondBand :orderAmountData="orderAmountData" :grossProfitData="grossProfitData" :grossInterestRateData="grossInterestRateData" :proportio="proportioData"></secondBand>
        <!-- 二帮卖分析-业务员 -->
        <salesman :salesmanData="salesmanData"></salesman>
        <!-- 产品 -->
        <productIndex ></productIndex>
        <!--门店-->
        <shopIndex></shopIndex>
         <!--库存-->
        <second-title :titleName="inventoryTitle"></second-title>
        <inventoryIndex  :inventoryDay="inventoryDay" :inventoryDetails="inventoryDetails"> </inventoryIndex>
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
                //库存金额，件数，可周转天数
                inventoryDetails:"",
                //库存可销天数
                inventoryDay: '',
                //库存可销天数折线图
                inventoryBarData: '',
                requestHttpUrl: this.$store.state.requestHttpUrl,//接口请求地址
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
                this.$http({
                    url: _this.requestHttpUrl + '/SalesData',
                    method: 'POST',
                    data: {
                        dateTime: _this.currentDate
                    }
                }).then(function (res) {
                    console.log(res)
                    let data = res.data.data.data
                    _this.salesData = {
                        monthData: {
                            sales: _this.dataProcess(data.monthSales, 'money').num,
                            reach: _this.dataProcess(data.monthReach, 'percent').num + _this.dataProcess(data.monthReach, 'percent').num,
                        },
                        yearData: {
                            sales: _this.dataProcess(data.yearSales, 'money').num,
                            reach: _this.dataProcess(data.yearReach, 'percent').num + _this.dataProcess(data.yearReach, 'percent').num
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
                    let monthBarData = {
                        id: 'barIdMonthSales',
                        xAxisData: data.BusinessAxiax,
                        xAxis: {
                            isShowLine: false,
                            isShowSplit: false,
                            axisLabelColor: '#333',
                        },
                        yAxis: {
                            isShowLine: false,
                            isShowSplit: false,
                            axisLabelColor: '#D7D9E5',
                        },
                        label: {
                            isShow: true
                        },
                        type: 'xAxis',
                        barData: [
                            {
                                name: 'ABC',
                                data: data.monthData,
                                color: '#D7D9E5',
                                barWidth: 11
                            },
                        ],
                        showType: 0
                    }
                    let yearBarData = {
                        id: 'barIdYearSales',
                        xAxisData: data.BusinessAxiax,
                        xAxis: {
                            isShowLine: false,
                            isShowSplit: false,
                            axisLabelColor: '#333',
                        },
                        yAxis: {
                            isShowLine: false,
                            isShowSplit: false,
                            axisLabelColor: '#D7D9E5',
                        },
                        label: {
                            isShow: true
                        },
                        type: 'xAxis',
                        barData: [
                            {
                                name: 'ABC',
                                data: data.yearData,
                                color: '#D7D9E5',
                                barWidth: 11
                            },
                        ],
                        showType: 0
                    }
                    _this.salesBarData = {
                        monthBarData,
                        yearBarData
                    }
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
                        overDueRadio: _this.dataProcess(data.overduePercent, 'percent').num + _this.dataProcess(data.overduePercent, 'percent').unit
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
                    orderAmountData.orderAmountDecimal = secondBandData.orderAmount.split(".")[1];
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
                            NoSales: _this.dataProcess(data.NoSalesMoney, 'money').num
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
                            amountTxt:"库存金额（万元）",
                            amount: _this.dataProcess(data.amount, 'money').num,  //库存金额
                            inventoryNumberTxt:"库存件数（件）",
                            inventoryNumber:data.inventoryNumber,  //库存件数
                            turnoverTxt:"库存周转次数",
                            turnover:data.turnover,  //库存周转次数
                        }
                        console.log(_this.inventoryDetails)
                    },
                )
            },
            //库存金额件数明细
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
                        console.log(data)
                        let Chain = {
                            name: '环比增长:',
                            inventoryChainVal: _this.dataProcess(data.inventoryChainVal, 'percent').num + _this.dataProcess(data.inventoryChainVal, 'percent').unit,
                        }
                        let Year = {
                            name: '同比增长:',
                            inventoryChainVal: _this.dataProcess(data.inventoryYearVal, 'percent').num + _this.dataProcess(data.inventoryYearVal, 'percent').unit,
                        }
                        let inventoryBarData = {
                            id: 'barIdinventory',
                            xAxisData: data.BusinessAxiax,
                            xAxis: {
                                isShowLine: false,
                                isShowSplit: false,
                                axisLabelColor: '#333',
                            },
                            yAxis: {
                                isShowLine: false,
                                isShowSplit: false,
                                axisLabelColor: '#D7D9E5',
                            },
                            label: {
                                isShow: true
                            },
                            type: 'xAxis',
                            barData: [
                                {
                                    name: 'ABC',
                                    data: data.dayData,
                                    color: '#6BBCFF',
                                    barWidth: 5
                                },
                            ],
                            showType: 0

                        }
                    _this.inventoryDay = {
                        inventorycompare: [
                            Chain,
                            Year
                        ],
                        receivableAverage: '库存可销天数（天） ',
                        inventoryVal: _this.dataProcess(data.inventoryVal, 'day').num,
                        inventoryBarData
                    }
                    console.log(_this.inventoryDay)
                    },
                )
            },



            
            computed: {},
            watch: {},
            distroyed: function () {

            }
        }
    }
</script>
<style scoped lang="less">
    .index{
       width:100%;
       padding:0 20px 120px 20px;
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
