
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
        <one-help-sale :salesData="monthSalesData"></one-help-sale>
        <!-- 二帮卖分析 -->
        <secondBand></secondBand>
    </div>
</template>
<script>
    import headerTitle from '../components/headerTitle.vue'//头部标题
    import secondTitle from '../components/secondTitle.vue'//模块标题
    import oneHelpSale from '../components/oneHelpSale.vue'
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
                //一帮卖本月销量
                monthSalesData:{
                    sales:39989.7,
                    reach:0.98,
                    monthPieData:{
                        id:'pieIdSales',
                        colorList:['#FF8352', '#E271DE', '#00FFFF', '#4AEAB0'],
                        labelType:2,
                        //本月饼图
                        pieData:[
                            {
                                value: 111,
                                name: 'TV'
                            }, {
                                value: 1234,
                                name: '盒子'
                            }, {
                                value: 333,
                                name: '基础盒子'
                            }, {
                                value: 444,
                                name: '高级盒子'
                            }, {
                                value: 555,
                                name: 'PC'
                            }
                        ],
                        radius:['52%', '60%'],
                        borderWidth:0,
                    },
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
                            axisLabelColor:'#333',
                        },
                        label:{
                            isShow:false
                        },
                        type:'xAxis',
                        barData:[ 
                            {
                                name:'ABC',
                                data:[200,300,400,500,600],
                                color:'red'
                            },
                            {
                                name:'ABC11',
                                data:[300,400,500,100,123],
                                color:'blue'
                            },
                            {
                                name:'ABC33',
                                data:[333,444,555,666,777],
                                color:'yellow'
                            }
                        ]
                    },
                },
                yearPieData:'',//本月饼图
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
       padding:0 20px;
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
    }
</style>
