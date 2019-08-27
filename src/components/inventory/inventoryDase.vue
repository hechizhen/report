<template>
    <div class="inventoryDase">
        <div class="inventoryDase-left">
            <div style="width: 100%; height: 16%; margin-top: 5%;">
                <span >{{inventoryTxt.receivableAverage}}</span>
                <!--<newButton :defaultVal="defaultVal"  :buttonHandleClick="buttonHandleClickinv"  ></newButton>-->
            </div>
            <b>{{inventoryTxt.inventoryVal}}</b>
            <div class="left-txt">
                <div class="left-txt-title" v-for="(item,index) in inventoryTxt.inventorycompare" :key="index">
                    <div style="width: 50%; text-align: center">
                    <span>{{item.name}}</span>
                    </div>
                    <div style="width: 50%; text-align: left">
                    <p :class="item.inventoryChainValColor">{{item.inventoryChainVal}}</p>
                    </div>
                </div>
                </div>
            <span class="shu"></span>
            </div>
        <div class="inventoryDase-right">
            <div class="btn">
                <newButton :defaultVal="defaultValdown" :buttonHandleClick="dealHandleClick"></newButton>
            </div>
            <div class="bartu">
             <barChart :barEchartsData="barData.config" :xAxis="barData.xAxis"
                       :yAxis="barData.yAxis" :legendShow="barData.legendShow"
                       :isShowMax="barData.isShowMax" :label="barData.label"
             ></barChart>
            </div>
        </div>
        <loading-data :isShow="isShow"></loading-data>
    </div>
</template>

<script>
    import barChart from '../../components/echarts/bar'
    import  newButton from  '../base/newButton'
    import loadingData from '../base/loadingData'
    export default {
        name: "inventoryDase",
        data(){
            return{
                defaultVal:"走势图",
                defaultValdown:"库存详情",
                isShowDetail:false,
            }
        },
        props:{
            inventoryTxt:{   //库存可销天数
                type: Object,String
            },
            barData:{      //库存可销天数树状图
                type: Object
            },
            isShow:{     //库存可销天数加载效果
                type:Boolean,
                default:false,
            },
            dealHandleClick:{   //库存可销天数库存详情
                type:Function
            }
        },
        methods:{

        },
        components:{
            barChart,
            newButton,
            loadingData,
        },
        watch:{

        },
        mounted () {
            console.log(this.barData)
        },
    }
</script>

<style lang="less" scoped>
.shu{
    width:1px;
    height:137px !important;
    border:1px solid rgba(229,229,229,1);
    float: right;
    margin-top: 5%;
    position: absolute;
    top: 10%;
    right: 0;
    margin-right:0 !important;
    padding-left: 0 !important;
}
.inventoryDase{
    width:45%;
    height:208px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    float: left;
    margin-left: 2%;
    position: relative;
    .inventoryDase-left{
        width: 38%;
        height: 100%;
        float: left;
        position: relative;
        span{
            display: inline-block;
            font-size:14px;
            font-family:PingFangSC-Medium;
            font-weight:600;
            color:rgba(51,51,51,1);
            height: 32px;
            line-height:32px;
            float: left;
            padding-left: 6%;
        }
        .newButton{
            width:40% ;
            float: left;
        }
        b{
            font-size:32px;
            font-family:PingFangSC-Medium;
            font-weight:bold;
            color:rgba(29,145,240,1);
            margin-top: 5%;
            display: block;
            text-align: center;
            height: 27%;
        }
        .left-txt{
            width: 90%;
            height: 36%;
            background:rgba(238,240,245,1);
            margin: 0 auto;
                .left-txt-title {
                    float: left;
                    width: 100%;
                    text-align: center;
                    display: flex;
                    span{
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:#98A2B4;
                        margin-top: 0;
                        display: contents;
                    }
                    p{
                        color:#98A2B4;
                        margin-bottom: 0;
                        display: inline-block;
                        font-size: 14px;
                        font-weight:600;
                        line-height: 32px;
                    }
            }
        }
    }
    .inventoryDase-right{
        width: 60%;
        height: 100%;
        float: left;
        margin-left: 1%;
        /*background-color: bisque;*/
        .btn{
            height: 19%;
            margin-bottom: 2%;
            .newButton{
                float: right;
                margin-top: 2%;
                margin-right: 5%;
            }
        }
        .bartu{
            height: 77%;
        }
    }
}

 .ant-btn-default{
    height: 20px;
}
.inventoryDase .inventoryDase-left .left-txt .left-txt-title:first-child{
    margin-top: 2%;
}
.inventoryDase .inventoryDase-left .left-txt .left-txt-title:nth-child(2) p{
    color: rgba(152, 162, 180, 1);
}
</style>
