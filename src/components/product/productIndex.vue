<template>
    <div class="cententindex" >
        <div class="product">
            <dataTitle :subtitlename="titName"></dataTitle>
            <div class="product-content">
                <a-Row >
                    <a-Col :span="10">
                        <productLeft :productdata="CommodityTurnoverRate"></productLeft>
                        <productRight :dataTxt="CommodityTurnoverRate.dataTxt" ></productRight>
                    </a-Col>
                    <a-Col :span="13" :push="1">
                        <commodityRight :commoditydata="commoditydata" :upraphy="upraphy" :downraphy="downraphy" :pieraphy="pieraphy" ></commodityRight>
                    </a-Col>
                </a-Row>
            </div>
        </div>
        <core :coretype="'产品得分'" :coretext="87" :evaluate="'较好'"></core>

        <upproductChart v-if="upShow" :trendChartClick="upClick"  :barEchartsData="barEchartsDataUp" ></upproductChart>  <!--下滑-->
        <downproductChart v-if="downShow" :trendChartClick="downClick" :barEchartsData="barEchartsDataDown" ></downproductChart>  <!--增长-->

        <productChartPie v-if="pieShow" :trendChartClick="pieClick" :pieEchartsData="pieEchartsData"
        ></productChartPie>
        <!--<productList  v-if="listShow"  :trendChartClick="listClick" ></productList>-->
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
    // import  productList from  './productList'
    export default {
        name: "cententindex",
        props:["CommodityTurnoverRate","commoditydata","GoodsDetail","VariabilityUpData","VariabilityDownData"],
        components:{
            productLeft,
            productRight,
            commodityRight,
            dataTitle,
            core,
            upproductChart,
            downproductChart,
            productChartPie,
            // productList
        },
        data(){
            return{
                goodsData:"",
                lityUpData:{},
                lityDownData:{},
                pieEchartsData:{},
                barEchartsDataDown:{},
                barEchartsDataUp:{},
                upShow: false,
                downShow:false,
                pieShow:false,
                listShow:false,
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
        },
        watch:{
            GoodsDetail(val){
                this.goodsData = val;
                this.pieEchartsData = {
                    id:'pieEchartsId',
                    colorList:['#66E3E2', '#89D6D7', '#8AD493', '#65BF6B',"#F2AB60","#F0D570","#8CA9F6","#AABBF7","#66D6FF","#9BDBEF","#61B8F6","#B4D8D0"],
                    labelType:2,
                    pieData:this.goodsData,
                    radius:['100%', '5%'],
                    borderWidth:0,
                }
            },
            VariabilityUpData(val){
                console.log(val)
                this.lityUpData = val;
                this.barEchartsDataUp = {
                    id:'barId',
                    unit:'%',
                    xAxisData:this.lityUpData.xAxisData,
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
                    barData:this.lityUpData.seriesData,
                    showType:0,//0横过来 1竖起来
                    markLineList:{
                        show:false
                    }
                }
            },
            VariabilityDownData(val){
                console.log(val)
                this.lityDownData = val;
                this.barEchartsDataDown = {
                    id:'barId',
                    unit:'%',
                    xAxisData:this.lityDownData.xAxisData,
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
                    barData:this.lityDownData.seriesData,
                    showType:0,//0横过来 1竖起来
                    markLineList:{
                        show:false
                    }
                }
            }
        },
        mounted() {
          console.log(this.goodsData)
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
                    height: 100%;
                }
            }
        }
    }

</style>
