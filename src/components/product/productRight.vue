<template>
    <div class="productRight">
            <barChart :barEchartsData="barData.config" :xAxis="barData.xAxis"
                      :yAxis="barData.yAxis" :legendShow="barData.legendShow"
                      :isShowMax="barData.isShowMax" :label="barData.label"
            ></barChart>
    </div>
</template>

<script>
    import barChart from  '../echarts/bar'
    export default {
        name: "productRight",
        props:{
            barData:{
                type:Object
            }
        },
        data(){
            return{
                productRight:false,
            }
        },
        components:{
            barChart
        },
        mounted() {
            console.log(this.CommodityBar)
        }
    }
</script>

<style lang="less" scoped>
    .productRight {
        width: 60%;
        height: 260px !important;
        float: left;
        /*.barChart >div canvas{*/
            /*width: 90%;*/
        /*}*/

    }
</style>
