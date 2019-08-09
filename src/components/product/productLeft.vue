<template>
        <div class="productLeft">
             <div class="productLeft-img">
                 <img :src="productdata.productimg">
             </div>
            <div class="productLeft-txt">
                <p>{{productdata.name}}</p>
                <span>{{productdata.RatePin}}</span>
            </div>
            <div class="productLeft-btn">
                <newButton  :buttonType="buttonType"  :type="primary"
                            :isGhost="true" :defaultVal="productdata.btn"></newButton>
            </div>
        </div>
</template>

<script>
    import  newButton from  '../base/newButton'
    export default {
        name: "productLeft",
        props:["productdata"],
        data(){
            return{
                buttonType:"default"
            }
        },
        mounted() {
           // console.log(this.productdata.RatePin)
        },
        components:{
            newButton
        }
    }
</script>

<style lang="less" scoped>
    .productLeft{
        width: 30%;
        float: left;
        .productLeft-img{
            width: 46px;
            height: 46px;
            margin: auto;
            margin-top: 17%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .productLeft-txt{
            margin-top: 10px;
            p{
                width:71px;
                font-size:14px;
                font-family:PingFangSC-Medium;
                font-weight:bold;
                color:rgba(255,255,255,1);
                margin: 0 auto;
            }
            span{
                width:99px;
                font-size:28px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(255,216,110,1);
                margin: 0 auto;
                display: block;
                margin-top: 12px;
                text-align: center;
            }
        }
        .productLeft-btn{
            height:100%;
            line-height: 26px;
            margin: 22px  auto  51px;
            text-align: center;
            span{
                width:48px;
                font-size:12px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
        }
    }
</style>
