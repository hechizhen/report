<template>
    <div class="inventoryindex">
        <div class="inventory-table">
            <div class="table-head">
                <div class="table-headtxt">
                    <span class="yuan">￥</span>
                    <strong>库存金额（万元）</strong>
                    <p> <span>￥</span>295.99</p>
                    <span class="shu"></span>
                </div>
                <div class="table-headtxt">
                    <span class="yuan"></span>
                    <strong>库存件数（件）</strong>
                    <p> <span></span>2049</p>
                </div>
            </div>
            <div class="table-dase">
                <div class="table-base">
                    <span>6个月未销售商品金额（万元）</span>
                    <span style="font-size:16px;font-family:PingFangSC-Semibold;font-weight:600;width: 74px">￥321.06</span>
                </div>
                <div class="table-base">
                    <span>6个月未销售商品数（件）</span>
                    <span style="font-size:18px;font-family:PingFangSC-Semibold;font-weight:500;width: 74px;text-align: left">&nbsp23</span>
                </div>
                <div class="tableLeft-btn">
                    <span>未销明细</span>
                </div>
            </div>
        </div>
        <inventoryCenten></inventoryCenten>
        <inventoryDase :salesData="salesData"></inventoryDase>
    </div>
</template>

<script>
    import inventoryCenten from  './inventory/inventoryCenten'
    import inventoryDase from  './inventory/inventoryDase'
    export default {
        name: "inventoryIndex",
        components:{
            inventoryCenten,
            inventoryDase
        },
        props:{
            salesData:{
                type:Object,
            }
        },
    }
</script>

<style lang="less" scoped>
.inventoryindex{
    width: 100%;
    height:234px;
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
                    top: 20%;
                    right: 5%;
                    width:88px;
                    height:32px;
                    line-height: 26px;
                    text-align: center;
                    border:1px solid rgba(220,220,220,1);
                    border-radius:6px;
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
