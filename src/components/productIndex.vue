<template>
    <div class="cententindex" style="width: 100%;margin-top: 5%">
        <div class="product">
            <dataTitle></dataTitle>
            <div class="product-content">
                <a-Row >
                    <a-Col :span="10">
                        <productLeft ></productLeft>
                        <productRight></productRight>

                    </a-Col>
                    <a-Col :span="13" :push="1">
                        <productLeft  ></productLeft>
                        <commodityRight></commodityRight>
                    </a-Col>
                </a-Row>
            </div>
        </div>
    </div>
</template>

<script>
    import productLeft from  '../components/product/productLeft'
    import productRight from  './product/productRight'
    import  commodityRight from  './product/commodityRight'
    import  dataTitle from  './dataTitle'
    export default {
        name: "cententindex",
        components:{
            productLeft,
            productRight,
            commodityRight,
            dataTitle
        }
    }
</script>

<style lang="less" scoped>
    .product{
        .product-content{
            width: 90%;
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
