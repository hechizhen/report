<template>
    <div class="cententindex" style="width: 100%;margin-top: 5%">
        <div class="product">
            <dataTitle></dataTitle>
            <div class="product-content">
                <a-Row >
                    <a-Col :span="10">
                        <productLeft :productdata="productData.productlist[0]"></productLeft>
                        <productRight></productRight>

                    </a-Col>
                    <a-Col :span="13" :push="1">
                        <productLeft  :productdata="productData.productlist[1]"></productLeft>
                        <commodityRight></commodityRight>
                    </a-Col>
                </a-Row>
            </div>
        </div>
    </div>
</template>

<script>
    import productLeft from './productLeft'
    import productRight from './productRight'
    import  commodityRight from './commodityRight'
    import  dataTitle from '../dataTitle'
    export default {
        name: "cententindex",
        components:{
            productLeft,
            productRight,
            commodityRight,
            dataTitle
        },
        data(){
            return{
                // 产品
                productData:{
                    productlist:[
                        {
                            productimg:  require("../../assets/img/dongxiao.png"),
                            name:"商品动销率",
                            sales:"58.75%",
                            btn:"动销清单"
                        },
                        {
                            productimg: require("../../assets/img/shangpinshu.png"),
                            name:"动销商品数",
                            sales:344,
                            btn:"商品明细"
                        }
                    ],
                    bardata:[
                        {
                            name:"立白",
                            jindu:"88%",
                            txt:88},
                        {
                            name:"立白",
                            jindu:"68%",
                            txt:68},
                        {
                            name:"立白",
                            jindu:"58%",
                            txt:58},
                        {
                            name:"立白",
                            jindu:"48%",
                            txt:48},
                        {
                            name:"立白",
                            jindu:"38%",
                            txt:38},
                    ],
                    commoditydata: {
                        commoditytitle:[
                            {
                                name:"环比: ",
                                sales:" -59%"
                            },
                            {
                                name:"同比: ",
                                sales:" -59%"
                            }
                        ],
                        commoditylink:[
                            {
                                name:"销量增长商品数：",
                                nunbers:"20个",
                                btn:"下滑商品"
                            },
                            {
                                name:"销量下滑商品数：",
                                nunbers:"30个",
                                btn:"增长商品"
                            }
                        ],
                        commodityname:"总商品数",
                        commoditysum:3445
                    }
                },
            }
        }
    }
</script>

<style lang="less" scoped>
    .product{
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
