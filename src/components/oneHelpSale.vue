
<template>
    <div class="oneHelpSale">
        <div class="oneHelpSaleBox">
            <div class="oneHelpSaleTop">
                <div class="oneHelpSaleTopLeft">
                    <p>本月</p>
                </div>
                <div class="oneHelpSaleTopMid">
                    <a-progress type="circle" :percent="75"  :width="200" :showInfo="false" />
                    <div class="oneHelpSaleTopMidSales">
                        <div>
                            <p>
                                <i></i>
                                <span class="salesTxt">下单金额（万）</span>
                            </p>
                            <p>
                                <span class="sales">￥</span>
                                <span class="salesMoney">{{salesData.sales}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="oneHelpSaleTopRight">
                    <p class="rightRadius"></p>
                    <span class="rightTxt">总达成：</span>
                    <span class="rightReach">{{salesData.reach}}</span>
                </div>
            </div>
            <div class="oneHelpSaleBottom">
                <div class="oneHelpSaleBottomTitle">达成率</div>
                <div class="oneHelpSaleBottomContent">
                    <bar-chart :barEchartsData="barData"></bar-chart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import pieChart from '../components/echarts/pie.vue'
    import barChart from '../components/echarts/bar.vue'
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
            }
        },
        components : {
            pieChart,
            barChart,
            core
        },
        data () {
            return {
            }
        },
        mounted () {
            console.log(this.barData)
        },
        methods: {
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
    .oneHelpSale{
        width:100%;
        .oneHelpSaleBox{
            background:rgba(255,255,255,1);
            border-radius:6px;
            height:426px;
            width:49%;
            p{
                margin:0;
            }
            /deep/.ant-progress-inner{
                width:95%!important;
            }
            .oneHelpSaleTop{
                height:250px;
                width:100%;
                display: flex;
                flex-wrap: wrap;
                .oneHelpSaleTopLeft{
                    height:100%;
                    width:120px;
                    p{
                        font-weight:500;
                        color:#333;
                        padding-left:10px;
                        font-size: 16px;
                        border-left:4px solid #2D92FC;
                        margin-left:10px;
                        margin-top:28px;
                    }
                }
                .oneHelpSaleTopMid{
                    height:100%;
                    width:250px;
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
                            color:rgba(51,51,51,1);
                        }
                        .salesTxt{
                            font-size: 14px;
                        }
                        .sales{
                            font-size: 18px;
                        }
                        .salesMoney{
                            font-size: 30px;
                            font-weight: 600;
                        }
                    }
                }
                .oneHelpSaleTopRight{
                    height:100%;
                    display: flex;
                    align-items: center;
                    .rightRadius{
                        width:12px;
                        height:12px;
                        border:3px solid rgba(45,146,252,1);
                        border-radius:50%;
                        margin-right:6px;
                    }
                    .rightTxt{
                        font-size:16px;
                        font-weight:500;
                        color:rgba(160,165,177,1);
                    }
                    .rightReach{
                        font-size:18px;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                    }
                }
            }
            .oneHelpSaleBottom{
                width:100%;
                height:176px;
                .oneHelpSaleBottomTitle{
                    font-weight:500;
                    color:#333;
                    font-size: 16px;
                    margin-left:10px;
                    line-height: 20px
                }
                .oneHelpSaleBottomContent{
                    height:156px;
                    width:100%;
                }
            }
        }
    }
</style>
