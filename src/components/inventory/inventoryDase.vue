<template>
    <div class="inventoryDase">
        <div class="inventoryDase-left">
            <span>库存可销天数（天） </span>
            <b>234</b>
        </div>
    </div>
</template>

<script>
    export default {
        name: "inventoryDase"
    }
</script>

<style lang="less" scoped>
.inventoryDase{
    width:50%;
    height:208px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    float: left;
    margin-left: 24px;
    .inventoryDase-left{
        width: 30%;
        height: 100%;
        margin-left: 15px;
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
    }
}
</style>
