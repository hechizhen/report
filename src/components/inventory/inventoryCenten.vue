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
        props:{
            turnoverTxt:{  //库存周转次数文字
                type:String
            },
            turnover:{   //库存周转次数
                type:String
            },
            isShow:{   //库存周转次数加载效果
                type:Boolean
            },
        },
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
    width: 16%;
    height:5.53rem;
    background:rgba(255,255,255,1);
    border-radius:10px;
    float: left;
    margin-left: 2%;
    position: relative;
    .inventoryCenten-bor{
        width: 5.2rem;
        height: 5.2rem;
        border: 23px solid #eef0f5;
        border-radius: 50%;
        margin: .17rem auto;
        .inventoryCenten-txt{
            text-align: center;
            margin-top: 34%;
            p{
                font-size:.4rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(152,162,180,1);
            }
            span{
                font-size:.7rem;
                font-family:PingFangSC-Medium;
                font-weight:bold;
                color:rgba(51,51,51,1);
            }
        }
    }
}
</style>
