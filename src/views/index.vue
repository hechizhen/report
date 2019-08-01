
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
            <one-help-sale :salesData="monthSalesData" style="margin-right:2%;"></one-help-sale>
            <one-help-sale :salesData="yearSalesData"></one-help-sale>
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
                currentDate:'',//当前时间
                oneHelpSaleTitle:'一帮卖分析',//一帮卖分析标题
                financeTitle:'财务',//财务标题
                //一帮卖本月销量
                monthSalesData:{
                    sales:39989.7,
                    reach:'98%',
                    //本月柱狀圖
                    monthBarData:{
                        id:'barIdSales',
                        xAxisData:[1,2,3,4,5,6,7,8,9,10],
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
                                data:[200,300,400,500,600],
                                color:'#D7D9E5',
                                barWidth:11
                            },
                        ]
                    },
                },
                //一帮卖本月销量
                yearSalesData:{
                    sales:39989.7,
                    reach:'98%',
                    //本月柱狀圖
                    monthBarData:{
                        id:'barIdSalesYear',
                        xAxisData:[1,2,3,4,5,6,7,8,9,10],
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
                                data:[200,300,400,500,600],
                                color:'#D7D9E5',
                                barWidth:11
                            },
                        ]
                    },
                },
                //财务数据
                financeData:[
                    {name:'收入（万元）',val:'43321'},
                    {name:'成本（万元）',val:'43321'},
                    {name:'毛利（万元）',val:'43321'},
                    {name:'厂家费用（万元）',val:'43321'},
                    {name:'支出费用（万元）',val:'43321'},
                    {name:'利润（万元）',val:'43321'},
                ],
                //应收账款
                receivableData:{
                    receivableTxt:'应收欠款（万元）',
                    receivableValUnit:'￥',
                    receivableVal:'12345',
                    receivableMonth:'当月已收（万元）',
                    receivableMonthValUnit:'￥',
                    receivableMonthVal:'1111',
                    receivableAverage:'平均账龄（天数）',
                    receivableAverageVal:'300',
                    receivableDay:'应收账款周转天数（天）',
                    receivableDayVal:'333',
                },
                //逾期账款
                overDueData:{
                    overDueTxt:'逾期账款(万元）',
                    overDueValUnit:'￥',
                    overDueval:'3345',
                    overDueRadioTxt:'逾期占比',
                    overDueRadio:'3345',
                }
            }
        },
        mounted () {
          
        },
        methods: {
            //修改时间
            indexChangeDate(val){
                this.currentDate = val
            }
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
