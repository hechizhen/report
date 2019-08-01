
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
        <!-- 财务 -->
        <second-title :titleName="financeTitle"></second-title>
        <finance :financeData="financeData" :receivableData="receivableData" :overDueData="overDueData"></finance>
        <!-- 二帮卖分析 -->
        <secondBand></secondBand>
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
    import secondBand from "./../components/secondBand/index.vue"  //二帮卖分析
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
            secondBand
        },
        data () {
            return {
                indexDealName:'吴凌云',//经销商名称
                indexScore:97,//体检评分
                indexSummary:'很好',//总结
                indexDefaultDate:'2017/07',//默认时间
                currentDate:'201907',//当前时间
                oneHelpSaleTitle:'一帮卖分析',//一帮卖分析标题
                financeTitle:'财务',//财务标题
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
            }
        },
        mounted () {
            this.getOverViewData()
            this.getSalesData()
            this.getMonthSalesHistoryData()
            this.getFinanceTableData()
            this.getReceivableData()
            this.getOverdueData()
        },
        methods: {
            //修改时间
            indexChangeDate(val){
                this.currentDate = val
                this.getOverViewData()
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
        margin-bottom: 10%;
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
