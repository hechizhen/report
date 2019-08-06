<template>
    <div class="cententindex" style="width: 100%;margin:4% 0 ">
        <div class="product">
            <dataTitle :subtitlename="titName"></dataTitle>
            <div class="product-content">
                <a-Row >
                    <a-Col :span="10">
                        <productLeft :productdata="CommodityTurnoverRate"></productLeft>
                        <productRight  ></productRight>

                    </a-Col>
                    <a-Col :span="13" :push="1">
                        <productLeft  :productdata="commoditydata"></productLeft>
                        <commodityRight :commoditydata="commoditydata" ></commodityRight>
                    </a-Col>
                </a-Row>
            </div>
        </div>
        <core :coretype="'产品得分'" :coretext="87" :evaluate="'较好'"></core>
    </div>
</template>

<script>
    import productLeft from './productLeft'
    import productRight from './productRight'
    import  commodityRight from './commodityRight'
    import  dataTitle from '../dataTitle'
    import  core from  '../core'
    export default {
        name: "cententindex",
        props:["CommodityTurnoverRate","commoditydata"],
        components:{
            productLeft,
            productRight,
            commodityRight,
            dataTitle,
            core
        },
        data(){
            return{
                titName:"产品",
                // 产品
            }
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
