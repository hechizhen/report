
<template>
    <div class="oneHelpSale">
        <div class="oneHelpSaleTop">
            <div class="oneHelpSaleTopLeft">
                <p>本月</p>
            </div>
            <div class="oneHelpSaleTopMid">
                <pie-chart :pieEchartsData="salesData.monthPieData"></pie-chart>
                <div class="">
                    <div>
                        <p>
                            <i></i>
                            <span>下单金额（万）</span>
                        </p>
                        <p>
                            <span>￥</span>
                            <span>123123</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="oneHelpSaleTopRight">
                <p></p>
                <span>总达成：</span>
                <span>134.25%</span>
            </div>
        </div>
        <div class="oneHelpSaleBottom">
            <div class="oneHelpSaleBottomTitle">达成率</div>
            <bar-chart :barEchartsData="salesData.monthBarData"></bar-chart>
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
            }
        },
        components : {
            pieChart,
            barChart
        },
        data () {
            return {
            }
        },
        mounted () {
            console.log(this.salesData)
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
        background:rgba(255,255,255,1);
        border-radius:6px;
        height:426px;
        width:100%;
        .oneHelpSaleTop{
            height:250px;
            width:100%;
            display: flex;
            flex-wrap: wrap;
            .oneHelpSaleTopLeft{
                height:100%;
                width:120px;
            }
            .oneHelpSaleTopMid{
                height:100%;
                width:250px;
            }
            .oneHelpSaleTopRight{
                height:100%;
                display: flex;
                align-items: center;
            }
        }
    }
</style>
