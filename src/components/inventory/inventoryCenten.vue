<template>
    <div class="inventoryCenten">
         <div class="inventoryCenten-bor">
             <div class="inventoryCenten-txt">
                 <p>{{turnoverTxt}} </p>
                 <span>{{turnover}}</span>
             </div>
         </div>
        <loading-data :isShow="isShow"></loading-data>
    </div>
</template>

<script>
    import loadingData from '../base/loadingData'
    export default {
        name: "inventoryCenten",
        props:["turnoverTxt","turnover"],
        data(){
            return{
                // isShow:true
            }
        },
        components:{
            loadingData
        }
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
    position: relative;
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
