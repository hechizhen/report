<template>
    <div class="inventoryCenten">
         <div class="inventoryCenten-bor">
             <div class="inventoryCenten-txt">
                 <p>库存周转次数 </p>
                 <span>3次</span>
             </div>
         </div>
    </div>
</template>

<script>
    export default {
        name: "inventoryCenten"
    }
</script>

<style lang="less" scoped>
.inventoryCenten{
    width: 17%;
    height:208px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    float: left;
    margin-left: 1%;
    .inventoryCenten-bor{
        width:180px;
        height:180px;
        border:23px solid rgba(238,240,245,1);
        border-radius:50%;
        margin: 14px auto;
        .inventoryCenten-txt{
            text-align: center;
            margin-top: 34%;
            p{
                font-size:14px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(152,162,180,1);
            }
            span{
                font-size:26px;
                font-family:PingFangSC-Medium;
                font-weight:bold;
                color:rgba(51,51,51,1);
            }
        }
    }
}
</style>
