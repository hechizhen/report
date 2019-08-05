
<template>
    <div class="index">
        <div class="title">
            <p>体检报告</p>
            <i></i>
        </div>
        <!-- 头部 -->
        <header-title :dealName="indexDealName" :score="indexScore" :summary="indexSummary" :defaultDate="indexDefaultDate" :changeDateHandle="indexChangeDate"></header-title>
        <!-- 一帮卖分析 -->
        <second-title :titleName="oneHelpSaleTitle"></second-title>
        <div class="oneHelpSalesBox">
            <one-help-sale :salesData="monthSalesData" :barData="monthBarData" style="margin-right:2%;" v-if="monthBarData.length!=0"></one-help-sale>
            <one-help-sale :salesData="yearSalesData" :barData="yearBarData" v-if="yearBarData.length!=0"></one-help-sale>
        </div>
        <core :coretype="oneHelpSaleScoreList.coretype" :coretext="oneHelpSaleScoreList.coretext" :evaluate="oneHelpSaleScoreList.evaluate"></core>
        <!-- 帮卖分析-订单 -->
        <secondBand :orderAmountData="orderAmountData" :grossProfitData="grossProfitData" :grossInterestRateData="grossInterestRateData"></secondBand>
        <!-- 二帮卖分析-业务员 -->
        <salesman :salesmanData="salesmanData"></salesman>
        <!-- 产品 -->
        <productIndex ></productIndex>
        <!--门店-->
        <shopIndex></shopIndex>
         <!--库存-->
        <second-title :titleName="inventoryTitle"></second-title>
        <inventoryIndex  > </inventoryIndex>
        <!-- 财务 -->
        <finance :financeData="financeData" :receivableData="receivableData" :overDueData="overDueData" :titleName="financeTitle"></finance>
    </div>
</template>
<script>
    import headerTitle from '../components/headerTitle.vue'//头部标题
    import secondTitle from '../components/secondTitle.vue'//模块标题
    import oneHelpSale from '../components/oneHelpSale.vue'//一帮卖分析
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
        name : 'index',
        components : {
            headerTitle,
            secondTitle,
            oneHelpSale,
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
        data () {
            return {
                indexDealName:'吴凌云',//经销商名称
                indexScore:97,//体检评分
                indexSummary:'很好',//总结
                indexDefaultDate:'',//默认时间
                currentDate:'',//当前时间
                oneHelpSaleTitle:'一帮卖分析',//一帮卖分析标题
                financeTitle:'财务',//财务标题
                inventoryTitle:'库存',//库存标题
                //一帮卖本月销量
                monthBarData:'',
                //一帮卖本月销量
                yearBarData:'',
                //财务数据
                financeData:'',
                //应收账款
                receivableData:'',
                //逾期账款
                overDueData:'',
                requestHttpUrl:'https://www.easy-mock.com/mock/5d429dcbd3020d2d3bc58a32/medicalReport',//接口请求地址
                monthSalesData:'',//本月销量以及达成率
                yearSalesData:'',//累计销量以及达成率
                oneHelpSaleScoreList:{//一帮卖评分
                    coretype:'一帮卖得分',
                    coretext:100,
                    evaluate:'优秀'
                },
                salesmanData:{},//业务员数据
                orderAmountData:{}, //金额数据
                grossProfitData:{}, //毛利额
                grossInterestRateData:{},//毛利率
            }
        },
        created(){
            let date=new Date;
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            month = month<10 ? "0"+month : month;
            //获取当前接口年月
            this.currentDate = year +''+ month
            //获取当前默认显示年月
            this.indexDefaultDate = year +'/'+ month
        },
        mounted () {
            this.getOverViewData()
            this.getSalesData()
            this.getMonthSalesHistoryData()
            this.getFinanceTableData()
            this.getReceivableData()
            this.getOverdueData()
            this.getsalesman()
            this.getsecondBand()
        },
        methods: {
            //修改时间
            indexChangeDate(val){
                this.currentDate = val
                this.getOverViewData()
                this.getSalesData()
                this.getMonthSalesHistoryData()
                this.getFinanceTableData()
                this.getReceivableData()
                this.getOverdueData()
            },
            //体检报告概览
            getOverViewData(){
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl+'/overviewScoring',
                    method: 'POST',
                    data: {
                        dateTime:_this.currentDate
                    }
                }).then(function(res){
                    console.log(res)
                    let data = res.data.data.data
                    _this.indexDealName = data.dealName
                    _this.indexScore = data.score
                    _this.indexSummary = data.summary
                })
            },
            //本月/年累计下单金额以及总达成
            getSalesData(){
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl+'/SalesData',
                    method: 'POST',
                    data: {
                        dateTime:_this.currentDate
                    }
                }).then(function(res){
                    console.log(res)
                    let data = res.data.data.data
                    _this.monthSalesData = {
                        sales:_this.dataProcess(data.monthSales,'money').num,
                        reach:_this.dataProcess(data.monthReach,'percent').num+_this.dataProcess(data.monthReach,'percent').num
                    }
                    _this.yearSalesData = {
                        sales:_this.dataProcess(data.yearSales,'money').num,
                        reach:_this.dataProcess(data.yearReach,'percent').num+_this.dataProcess(data.yearReach,'percent').num
                    }
                })
            },
            //本月/年累计达成率历史趋势
            getMonthSalesHistoryData(){
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl+'/salesHistoryLineData',
                    method: 'POST',
                    data: {
                        dateTime:_this.currentDate
                    }
                }).then(function(res){
                    console.log(res)
                    let data = res.data.data.data
                    _this.monthBarData = {
                        id:'barIdMonthSales',
                        xAxisData:data.BusinessAxiax,
                        xAxis:{
                            isShowLine:false,
                            isShowSplit:false,
                            axisLabelColor:'#333',
                        },
                        yAxis:{
                            isShowLine:false,
                            isShowSplit:false,
                            axisLabelColor:'#D7D9E5',
                        },
                        label:{
                            isShow:true
                        },
                        type:'xAxis',
                        barData:[
                            {
                                name:'ABC',
                                data:data.monthData,
                                color:'#D7D9E5',
                                barWidth:11
                            },
                        ]
                    }
                    _this.yearBarData={
                        id:'barIdYearSales',
                        xAxisData:data.BusinessAxiax,
                        xAxis:{
                            isShowLine:false,
                            isShowSplit:false,
                            axisLabelColor:'#333',
                        },
                        yAxis:{
                            isShowLine:false,
                            isShowSplit:false,
                            axisLabelColor:'#D7D9E5',
                        },
                        label:{
                            isShow:true
                        },
                        type:'xAxis',
                        barData:[
                            {
                                name:'ABC',
                                data:data.yearData,
                                color:'#D7D9E5',
                                barWidth:11
                            },
                        ]
                    }
                })
            },
            //财务报表数据
            getFinanceTableData(){
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl+'/financeTableData',
                    method: 'POST',
                    data: {
                        dateTime:_this.currentDate
                    }
                }).then(function(res){
                    console.log(res)
                    let data =res.data.data.data
                    let list =[]
                    data.map(function(item,index){
                        item.val = _this.dataProcess(item.val,'money').num
                        list.push({name:item.name,val:item.val})
                    })
                    _this.financeData = list
                })
            },
            //应收账款
            getReceivableData(){
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl+'/receivableData',
                    method: 'POST',
                    data: {
                        dateTime:_this.currentDate
                    }
                }).then(function(res){
                    console.log(res)
                    let data = res.data.data.data
                    _this.receivableData = {
                        receivableTxt:'应收欠款（万元）',
                        receivableValUnit:'￥',
                        receivableVal:_this.dataProcess(data.receivableVal,'money').num,
                        receivableMonth:'当月已收（万元）',
                        receivableMonthValUnit:'￥',
                        receivableMonthVal:_this.dataProcess(data.monthReceivableVal,'money').num,
                        receivableAverage:'平均账龄（天数）',
                        receivableAverageVal:_this.dataProcess(data.averageAge,'day').num,
                        receivableDay:'应收账款周转天数（天）',
                        receivableDayVal:_this.dataProcess(data.receivableDayVal,'day').num,
                    }
                })
            },
            //逾期欠款
            getOverdueData(){
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl+'/overdueData',
                    method: 'POST',
                    data: {
                        dateTime:_this.currentDate
                    }
                }).then(function(res){
                    console.log(res)
                    let data = res.data.data.data
                    _this.overDueData = {
                        overDueTxt:'逾期账款(万元）',
                        overDueValUnit:'￥',
                        overDueval:_this.dataProcess(data.overdueVal,'money').num,
                        overDueRadioTxt:'逾期占比',
                        overDueRadio:_this.dataProcess(data.overduePercent,'percent').num+_this.dataProcess(data.overduePercent,'percent').unit
                    }
                })
            },
            //二帮卖-业务员数据
            getsalesman(){
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl+'/Salesman',
                    method: 'POST',
                    data: {
                        dateTime:_this.currentDate
                    }
                }).then(function(res){
                    var salesmanData = res.data.data[0];
                    salesmanData.reached = !salesmanData.reached ? '--' : _this.dataProcess(salesmanData.reached,'percent',1).num+'%';
                    salesmanData.perCapitaOutput = !salesmanData.perCapitaOutput ? '--' : _this.dataProcess(salesmanData.perCapitaOutput,'money').num;
                    salesmanData.totalNumber = !salesmanData.totalNumber ? '--' : _this.dataProcess(salesmanData.totalNumber,'day').num;
                    salesmanData.declinePerformance = !salesmanData.declinePerformance ? '--' : _this.dataProcess(salesmanData.declinePerformance,'day').num;
                    _this.salesmanData = salesmanData;
                })
            },
            //二帮卖-订单
            getsecondBand(){
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl+'/Analysis',
                    method: 'POST',
                    data: {
                        dateTime:_this.currentDate
                    }
                }).then(function(res){
                    var secondBandData = res.data.data[0];
                    secondBandData.orderAmount = !secondBandData.orderAmount ? '--' : _this.dataProcess(secondBandData.orderAmount,'money',1).num;
                    // 下单金额数据
                    _this.orderAmountData.orderAmountInteger = secondBandData.orderAmount.split(".")[0];
                    _this.orderAmountData.orderAmountDecimal = secondBandData.orderAmount.split(".")[1];
                    _this.orderAmountData.grossProfit = !secondBandData.grossProfit ? '--' : _this.dataProcess(secondBandData.grossProfit,'money',1).num;
                    _this.orderAmountData.grossInterestRate = !salesmanData.grossInterestRate ? '--' : _this.dataProcess(salesmanData.grossInterestRate,'percent').num+'%';
                    // 环比数据
                    _this.grossProfitData.orderAmount = !salesmanData.orderAmountRatio ? '--' : _this.dataProcess(salesmanData.orderAmountRatio,'percent').num+'%';
                    _this.grossProfitData.grossProfit = !salesmanData.grossProfitRatio ? '--' : _this.dataProcess(salesmanData.grossProfitRatio,'percent').num+'%';
                    _this.grossProfitData.grossInterestRate = !salesmanData.grossInterestRateRatio ? '--' : _this.dataProcess(salesmanData.grossInterestRateRatio,'percent').num+'%';
                    // 同比数据
                    _this.grossInterestRateData.orderAmount = !salesmanData.orderAmountTerms ? '--' : _this.dataProcess(salesmanData.orderAmountTerms,'percent').num+'%';
                    _this.grossInterestRateData.grossProfit = !salesmanData.grossProfitTerms ? '--' : _this.dataProcess(salesmanData.grossProfitTerms,'percent').num+'%';
                    _this.grossInterestRateData.grossInterestRate = !salesmanData.grossInterestRateTerms ? '--' : _this.dataProcess(salesmanData.grossInterestRateTerms,'percent').num+'%';

                })
            },
        },
        computed:{

        },
        watch: {

        },
        distroyed: function () {

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
