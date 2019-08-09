<template>
    <div class="productRight">
            <barChart :barEchartsData="CommodityBar"></barChart>
    </div>
</template>

<script>
    import barChart from  '../echarts/bar'
    export default {
        name: "productRight",
        props:{
            CommodityBar:{
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

    }
</style>
