<template>
    <div class="cententindex" >
        <div class="product">
            <dataTitle :subtitlename="titName"></dataTitle>
            <div class="product-content">
                <a-Row >
                    <a-Col :span="10">
                        <productLeft :productdata="CommodityTurnoverRate"></productLeft>
                        <productRight  ></productRight>

                    </a-Col>
                    <a-Col :span="13" :push="1">
                        <commodityRight :commoditydata="commoditydata" :upraphy="upraphy" :downraphy="downraphy" :pieraphy="pieraphy" ></commodityRight>
                    </a-Col>
                </a-Row>
            </div>
        </div>
        <core :coretype="'产品得分'" :coretext="87" :evaluate="'较好'"></core>

        <upproductChart v-if="upShow" :trendChartClick="upClick" ></upproductChart>
        <downproductChart v-if="downShow" :trendChartClick="downClick" ></downproductChart>

        <productChartPie v-if="pieShow" :trendChartClick="pieClick"></productChartPie>
    </div>
</template>

<script>
    import productLeft from './productLeft'
    import productRight from './productRight'
    import  commodityRight from './commodityRight'
    import  dataTitle from '../dataTitle'
    import  core from  '../core'
    import  upproductChart from  './upproductChart'
    import  downproductChart from  './downproductChart'
    import  productChartPie  from  './productChartPie'
    export default {
        name: "cententindex",
        props:["CommodityTurnoverRate","commoditydata"],
        components:{
            productLeft,
            productRight,
            commodityRight,
            dataTitle,
            core,
            upproductChart,
            downproductChart,
            productChartPie
        },
        data(){
            return{
                upShow: false,
                downShow:false,
                pieShow:false,
                titName:"产品",
                // 产品
            }
        },
        methods:{
            upraphy(){
                this.upShow = true;
            },
            upClick(){
                this.upShow = false;
            },
            downraphy(){
                this.downShow = true;
            },
            downClick(){
                this.downShow = false;
            },
            pieraphy(){
                this.pieShow = true;
            },
            pieClick(){
                this.pieShow = false;
            },
        }
    }
</script>

<style lang="less" scoped>
    .product{
        margin-bottom: 1%;
        .product-content{
            width: 100%;
            margin: 0 auto;
            .ant-row{
                div{
                    background:rgba(105,151,255,1);
                    border:1px solid rgba(105,151,255,1);
                    border-radius:6px;
                }
            }
        }
    }

</style>
