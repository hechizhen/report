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
    .inventoryCenten {
        width: 16%;
        height: 208px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        float: left;
        margin-left: 2%;
        position: relative;
        display: flex;
        align-items: center;
        .inventoryCenten-bor {
            width: 160px;
            height: 160px;
            border: 23px solid rgba(238, 240, 245, 1);
            border-radius: 50%;
            margin: 14px auto;

            .inventoryCenten-txt {
                text-align: center;
                margin-top: 34%;

                p {
                    font-size: 14px;
                    font-weight: 500;
                    color: #737d8f;
                }

                span {
                    font-size: 26px;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                }
            }
        }
    }
</style>
