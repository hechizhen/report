<template>
    <div class="inventoryindex">
        <div style="width: 100%;height: 100%;">
        <div class="inventory-table">
            <div class="table-head">
                <div class="table-headtxt">
                    <span class="yuan">{{Money}}</span>
                    <strong>{{inventoryaMount.amountTxt}}</strong>
                    <p> <span>{{Money}}</span>{{inventoryaMount.amount}}</p>
                    <span class="shu"></span>
                </div>
                <div class="table-headtxt">
                    <span class="yuan"></span>
                    <strong>{{inventoryaMount.quantityInventory}}</strong>
                    <p> <span></span>{{inventoryaMount.inventoryNumber}}</p>
                </div>
            </div>
            <div class="table-dase">
                <div class="table-base" v-for="(item,index) in inventoryaMount.noSales ":key="index">
                    <span>{{item.txt}}</span>
                    <span style="font-size:16px;font-family:PingFangSC-Semibold;font-weight:600;width: 74px">{{item.value}}</span>
                </div>
                <div class="tableLeft-btn">
                    <newButton :defaultVal="inventoryaMount.noSalesbtn"></newButton>
                </div>
            </div>
        </div>
        <inventoryCenten :turnoverTxt="inventoryaMount.turnoverTxt" :turnover="inventoryaMount.turnover"></inventoryCenten>
        <inventoryDase :inventoryTxt="inventoryData.inventoryTxt" :salesData="inventoryData" ></inventoryDase>
        </div>
        <core :coretype="'库存得分'" :coretext="87" :evaluate="'较好'"></core>
    </div>
</template>

<script>
    import inventoryCenten from './inventoryCenten'
    import inventoryDase from './inventoryDase'
    import  newButton from  '../base/newButton'
    import  core from  '../core'
    export default {
        name: "inventoryIndex",
        components:{
            inventoryCenten,
            inventoryDase,
            newButton,
            core
        },
        data(){
            return{
                Money:"￥",
                // 库存金额和周转次数
                inventoryaMount:{
                    amountTxt:"库存金额（万元）",
                    amount:"295.99",
                    quantityInventory:"库存件数（件）",
                    inventoryNumber:"2049",
                    noSales:[
                        {
                            txt:"6个月未销售商品金额（万元）",
                            value:"￥321.06"
                        },
                        {
                            txt:"6个月未销售商品数（件）",
                            value:"21"
                        }
                    ],
                    noSalesbtn:"无交易明细",
                    turnoverTxt:"库存周转次数 ",
                    turnover:"99次",
                },

                // 库存详细
                inventoryData:{
                    // 库存数据
                    inventoryTxt:{
                        inventoryDay:"库存可销天数（天）",
                        inventoryVal:"234",
                        inventoryChain:"环比增长：",
                        inventoryChainVal:"46.03%",
                        inventoryYear:"同比增长：",
                        inventoryYearVal:"-23.23%",
                    },
                    //库存详细柱狀圖
                    inventoryBarData:{
                        id:'barIdinventory',
                        xAxisData:["立白","立白","立白","立白","立白","立白"],
                        xAxis:{
                            isShowLine:false,
                            isShowSplit:false,
                            axisLabelColor:'#333',
                        },
                        yAxis:{
                            isShowLine:false,
                            isShowSplit:false,
                            axisLabelColor:'#D7D9E5',
                        },
                        label:{
                            isShow:true
                        },
                        type:'xAxis',
                        barData:[
                            {
                                name:'ABC',
                                data:[23,43,83,111,213,400],
                                color:'#6BBCFF',
                                barWidth:5
                            },
                        ],
                        showType:0
                    },
                },
            }
        },
        // props:{
        //     salesData:{
        //         type:Object,
        //     }
        // },
    }
</script>

<style lang="less" scoped>
.inventoryindex{
    width: 100%;
    height:220px;
    margin-bottom: 4%;
}
.table-headtxt:last-child  .yuan{
    display: none !important;
}
.inventory-table .table-head .table-headtxt:first-child{
    padding-left: 10%;
}
.inventory-table .table-dase .table-base:first-child span{
    border-bottom: 1px solid rgba(229,229,229,1);
    padding-bottom: 2%;
}
.shu{
    width:1px;
    height:94px;
    border:1px solid rgba(255,255,255,1);
    float: right;
    position: absolute;
    right: 0;
    bottom: 10%;
}
    .inventory-table{
        width: 30%;
        float: left;
        .table-head{
            width: 100%;
            height:120px;
            background:linear-gradient(90deg,rgba(71,79,231,1),rgba(29,145,240,1),rgba(71,79,231,1));
            box-shadow:0px 2px 15px 0px rgba(255,182,2,0.13);
            border-radius:10px;
            .table-headtxt{
                width: 50%;
                 height: 77%;
                float: left;
                margin-top: 5%;
                padding-left: 20%;
                font-size:14px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                position: relative;
                .yuan{
                    width:15px;
                    height:15px;
                    background-color: #fff;
                    color: #474FE7;
                    display: inline-block;
                    border-radius: 50%;
                    text-align: center;
                }
                p{
                    display: flex;
                    line-height: 33px;
                    margin-top: 21px;
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 0;
                    float: left;
                    span{
                        font-size: 18px;
                    }
                }
            }
        }
        .table-dase{
            width: 100%;
            float: left;
            position: relative;
            background:rgba(255,255,255,1);
            opacity:0.5;
            border-radius:6px 6px 0px 0px;
               .table-base {
                width: 80%;
                height: 44px;
                line-height: 44px;
                margin-left: 49px;
                span {
                    line-height: 28px;
                    font-size:16px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(0,0,0,1);
                    display: inline-block;
                    width: 56%;
                }
            }
                .tableLeft-btn {
                    position: absolute;
                    top: 30%;
                    right: 5%;
                    width:88px;
                    height:32px;
                    line-height: 26px;
                    text-align: center;
                    float: right;

                    span {
                        width: 48px;
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:600;
                        color:rgba(0,0,0,1);
                    }
                }
        }
    }
</style>
