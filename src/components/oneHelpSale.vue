
<template>
    <div class="oneHelpSale">
        <div class="oneHelpSaleBox">
            <div class="oneHelpSaleTop">
                <div class="oneHelpSaleTopLeft">
                    <p :style="{background:salesData.bgColor}"></p><p>{{salesData.titleName}}</p>
                </div>
                <div></div>
                <div class="oneHelpSaleTopLeftBox" :style="{background:salesData.bgColor}">
                    <div class="flexMid">
                        <gauge-chart :gaugeChartData="gaugeChartData"></gauge-chart>
                        <div class="flexMidBox">
                            <div>
                                <p>{{salesData.reach}}%</p>
                                <p>总达成</p>
                            </div>
                        </div>
                    </div>
                    <div class="oneHelpSaleTopRight">
                        <Div>
                            <p>
                                <img :src="imgSrc" class="imgSrc">
                                <span class="rightTxt">下单金额（万）</span>
                            </p>
                            <p>
                                <span class="rightReachUnit">￥</span>
                                <span class="rightReach">{{salesData.sales}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="oneHelpSaleBottom">
                <div class="oneHelpSaleBottomTitle">达成率</div>
                <div class="oneHelpSaleBottomContent">
                    <bar-chart :barEchartsData="barData.config" :xAxis="barData.xAxis" :yAxis="barData.yAxis" :legendShow="barData.legendShow" :isShowMax="barData.isShowMax" :label="barData.label"></bar-chart>
                </div>
            </div>
        </div>
        <loading-data :isShow="isShow"></loading-data>
    </div>
</template>
<script>
    import pieChart from '../components/echarts/pie.vue'
    import barChart from '../components/echarts/bar.vue'
    import loadingData from '../components/base/loadingData.vue'
    import gaugeChart from '../components/echarts/gauge2.vue'
    export default {
        name : 'oneHelpSale',
        props:{
            //一帮卖本月/累计销量
            salesData:{
                type:Object,
            },
            //达成率柱状图数据
            barData:{
                type:Object
            },
            isShow:{
                type:Boolean,
                default:false,
            }
        },
        components : {
            pieChart,
            barChart,
            core,
            loadingData,
            gaugeChart
        },
        data () {
            return {
                imgSrc:require('../assets/img/jine-icon.png'),
                gaugeChartData:{
                    name:'总达成',
                    data:this.salesData.chartReach,
                    id:this.salesData.id,
                    color:this.salesData.color,
                }
            }
        },
        mounted () {
        },
        methods: {
        },
        computed:{

        },
        watch: {
            salesData(val){
                this.gaugeChartData = {
                    name:'总达成',
                    data:val.chartReach,
                    id:val.id,
                    color:val.color,
                }
            }
        },
        distroyed: function () {

        }
    }
</script>
<style scoped lang="less">
    .oneHelpSale{
        width:100%;
        position: relative;
        height:426px;
        .oneHelpSaleBox{
            background:rgba(255,255,255,1);
            border-radius:6px;
            height:100%;
            width:100%;
            p{
                margin:0;
            }
            /deep/.ant-progress-inner{
                width:95%!important;
            }
            .oneHelpSaleTop{
                height:212px;
                width:100%;
                display: flex;
                flex-wrap: wrap;
                .oneHelpSaleTopLeft{
                    height:100%;
                    width:15%;
                    display: flex;
                    p:first-child{
                        width:4px;
                        height:12px;
                        border-radius:2px;
                        margin-top: 32px;
                        margin-left:12px;
                    }
                    p:nth-child(2){
                        font-weight:500;
                        color:#333;
                        padding-left:5px;
                        font-size: 16px;
                        margin-top:28px;
                    }
                }
                .oneHelpSaleTopLeftBox{
                    width:80%;
                    height:185px;
                    border-radius:6px;
                    margin-top:21px;
                    display: flex;
                    flex-wrap: wrap;
                }
                .flexMid{
                    width:63%;
                    height:100%;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    position: relative;
                    .flexMidBox{
                        position: absolute;
                        width:100%;
                        height:100%;
                        display: flex;
                        align-items: flex-end;
                        justify-content: center;
                        padding-bottom:30px;
                        top:0;
                        left:0;
                        p:first-child{
                            font-size:24px;
                            color:#fff
                        }
                        p:nth-child(2){
                            font-size:18px;
                            color:#fff;
                            margin-top:0.2rem
                        }
                    }
                    .oneHelpSaleTopMid{
                        // border-radius:118px 118px 0 0;
                        // border:6px solid #fff;
                        // border-bottom:none;
                        // background:url("../assets/img/banhu-icon.png");
                        // background-repeat: no-repeat;
                        // background-size: 100%;
                        width:236px;
                        height: 100%;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .oneHelpSaleTopMidSales{
                            position: absolute;
                            width:100%;
                            height:100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            span{
                                color:#fff;
                            }
                            .salesTxt{
                                font-size: 14px;
                            }
                            .sales{
                                font-size: 18px;
                                font-weight: 600;
                            }
                            .salesMoney{
                                font-size: 30px;
                                font-weight: 600;
                            }
                        }
                    }
                }
                .oneHelpSaleTopRight{
                    height:100%;
                    width:37%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    .rightRadius{
                        width:12px;
                        height:12px;
                        border:3px solid rgba(45,146,252,1);
                        border-radius:50%;
                        margin-right:6px;
                    }
                    .rightTxt{
                        // font-size:0.5rem;
                        font-size:14px;
                        font-weight:500;
                        color:#fff;
                    }
                    .rightReach{
                        // font-size:1rem;
                        font-size:30px;
                        font-weight:600;
                        color:#fff;
                    }
                    .rightReachUnit{
                        // font-size:0.5rem;
                        font-size:18px;
                        font-weight:600;
                        color:#fff;
                    }
                }
            }
            .oneHelpSaleBottom{
                width:100%;
                height:212px;
                .oneHelpSaleBottomTitle{
                    font-weight:500;
                    color:#333;
                    // font-size: 0.4rem;
                    font-size: 16px;
                    margin-left:10px;
                    height: 30px;
                }
                .oneHelpSaleBottomContent{
                    height:182px;
                    width:100%;
                }
            }
            .imgSrc{
                // width: 0.5rem;
                width: 14px;
                margin-bottom: 0.1rem;
            }
        }
    }
</style>
