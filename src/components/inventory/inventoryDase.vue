<template>
    <div class="inventoryDase">
        <div class="inventoryDase-left">
            <span>{{inventoryTxt.receivableAverage}}</span>
            <b>{{inventoryTxt.inventoryVal}}</b>
            <div class="left-txt">
                <div class="left-txt-title" v-for="(item,index) in inventoryTxt.inventorycompare" :key="index">
                    <span>{{item.name}}</span>
                    <p>{{item.inventoryChainVal}}</p>
                </div>
                </div>
            <span class="shu"></span>
            </div>
        <div class="inventoryDase-right">
            <barChart :barEchartsData="barData"></barChart>
        </div>
    </div>
</template>

<script>
    import barChart from '../../components/echarts/bar'
    export default {
        name: "inventoryDase",
        props:{
            inventoryTxt:{
                type: Object,String
            },
            barData:{
                type: Object
            }
        },
        components:{
            barChart
        },
        mounted () {
            console.log(this.inventoryTxt)
        },
    }
</script>

<style lang="less" scoped>
.shu{
    width:1px;
    height:137px;
    border:1px solid rgba(229,229,229,1);
    float: right;
    margin-top: 5%;
    position: absolute;
    top: 10%;
    right: 0;
}
.inventoryDase{
    width:50%;
    height:208px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    float: left;
    margin-left: 1%;
    .inventoryDase-left{
        width: 30%;
        height: 100%;
        margin-left: 15px;
        float: left;
        position: relative;
        span{
            display: block;
            font-size:14px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            margin-top: 17px;
        }
        b{
            font-size:28px;
            font-family:PingFangSC-Medium;
            font-weight:bold;
            color:rgba(29,145,240,1);
            margin-top: 19px;
            display: block;
        }
        .left-txt{
            width: 65%;
            height:69px;
            background:rgba(238,240,245,1);
            margin-top: 39px;
                .left-txt-title {
                    float: left;
                    width: 100%;
                    text-align: center;
                    display: flex;
                    margin-top: 14px;
                    span{
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:#98A2B4;
                        margin-top: 0;
                        margin-left: 6%;
                    }
                    p{
                        color:rgba(255, 0, 72, 1);
                        margin-bottom: 0;
                        display: inline-block;
                        font-size: 14px;
                        margin-left: 5%;
                        font-weight:600;
                    }
            }
        }
    }
    .inventoryDase-right{
        width: 66%;
        height: 100%;
        float: left;
        margin-left: 1%;
        /*background-color: bisque;*/
    }
}
</style>
