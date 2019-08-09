<template>
    <div class="inventoryDase">
        <div class="inventoryDase-left">
            <div style="width: 100%; height: 16%; margin-top: 5%;">
                <span style=" width: 60%;">{{inventoryTxt.receivableAverage}}</span>
                <newButton :defaultVal="defaultVal"  :buttonHandleClick="buttonHandleClickinv"  ></newButton>
            </div>
            <b>{{inventoryTxt.inventoryVal}}</b>
            <div class="left-txt">
                <div class="left-txt-title" v-for="(item,index) in inventoryTxt.inventorycompare" :key="index">
                    <div style="width: 50%; text-align: center">
                    <span>{{item.name}}</span>
                    </div>
                    <div style="width: 50%; text-align: left">
                    <p>{{item.inventoryChainVal}}</p>
                    </div>
                </div>
                </div>
            <span class="shu"></span>
            </div>
        <div class="inventoryDase-right">
            <div class="btn">
                <newButton :defaultVal="defaultValdown" ></newButton>
            </div>
            <div class="bartu">
             <barChart :barEchartsData="barData" ></barChart>
            </div>
        </div>
    </div>
</template>

<script>
    import barChart from '../../components/echarts/bar'
    import  newButton from  '../base/newButton'
    export default {
        name: "inventoryDase",
        data(){
            return{
                defaultVal:"走势图",
                defaultValdown:"库存详情"
            }
        },
        props:{
            inventoryTxt:{
                type: Object,String
            },
            barData:{
                type: Object
            },
            invtopography:{
                type:Function
            }
        },
        methods:{
            buttonHandleClickinv(val){
                this.invtopography()
            },
        },
        components:{
            barChart,
            newButton
        },
        watch:{

        },
        mounted () {
            console.log(this.inventoryBarData)
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
}
.inventoryDase{
    width:45%;
    height:208px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    float: left;
    margin-left: 1%;
    .inventoryDase-left{
        width: 38%;
        height: 100%;
        margin-left: 1%;
        float: left;
        position: relative;
        span{
            display: inline-block;
            font-size:14px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            height: 32px;
            line-height:32px;
            float: left;
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
                        color:rgba(255, 0, 72, 1);
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
