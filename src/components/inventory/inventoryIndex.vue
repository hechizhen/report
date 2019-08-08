<template>
    <div class="inventoryindex">
        <div style="width: 100%;height: 100%;">
        <div class="inventory-table">
            <div class="table-head">
                <div class="table-headtxt">
                    <span class="yuan">{{Money}}</span>
                    <strong>{{inventoryDetails.amountTxt}}</strong>
                    <p> <span>{{Money}}</span>{{inventoryDetails.amount}}</p>
                    <span class="shu"></span>
                </div>
                <div class="table-headtxt">
                    <span class="yuan"></span>
                    <strong style="display: block;">{{inventoryDetails.inventoryNumberTxt}}</strong>
                    <p> <span></span>{{inventoryDetails.inventoryNumber}}</p>
                </div>
            </div>
            <div class="table-dase">
                <div class="table-base" v-for="(item,index) in inventoryDetails.noSalesDetail ":key="index">
                    <span>{{item.name}}</span>
                    <span style="font-size:16px;font-family:PingFangSC-Semibold;font-weight:600;width: 74px">{{item.NoSales}}</span>
                </div>
                <div class="tableLeft-btn">
                    <newButton :defaultVal="inventoryDetails.noSalesbtn"></newButton>
                </div>
            </div>
        </div>
        <inventoryCenten :turnoverTxt="inventoryDetails.turnoverTxt" :turnover="inventoryDetails.turnover"></inventoryCenten>
        <inventoryDase v-if="inventoryDay.length!=0" :inventoryTxt="inventoryDay"
                       :invtopography="invtopography"  :barData="inventoryDay.inventoryBarData"
        ></inventoryDase>
        </div>
        <core :coretype="'库存得分'" :coretext="87" :evaluate="'较好'"></core>
        <inventoryChart v-if="invechartsShow" :trendChartClick="trendChartClick" :lineEchartsData="lineEchartsData"></inventoryChart>
    </div>
</template>

<script>
    import inventoryCenten from './inventoryCenten'
    import inventoryDase from './inventoryDase'
    import  newButton from  '../base/newButton'
    import  core from  '../core'
    import  inventoryChart  from  './inventoryChart'
    export default {
        name: "inventoryIndex",
        props:["inventoryDay","inventoryDetails","marketableDayChart"],
        components:{
            inventoryCenten,
            inventoryDase,
            newButton,
            core,
            inventoryChart
        },
        data(){
            return{
                Money:"￥",
                invechartsShow: false,
                marketableDay:[],
                lineEchartsData:{},
            }
        },
        methods:{
            invtopography(){
                this.invechartsShow = true;
            },
            trendChartClick(){
                this.invechartsShow = false;
            }
        },
        watch:{
            marketableDayChart(val) {
                console.log(val)
                this.marketableDay = val;
                this.lineEchartsData = {
                    id: 'lineIdMarketableDay',
                    xAxisData: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                    lineData: this.marketableDay
                }
            }
        },
         mounted() {
               console.log(this.inventoryDay)
         }
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
        width: 35%;
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
