<template>
    <div>
        <div class="productLeft">
             <div class="productLeft-img">
                 <img :src="productdata.productimg">
             </div>
            <div class="productLeft-txt">
                <p>{{productdata.name}}</p>
                <span>{{productdata.sales}}</span>
            </div>
            <div class="productLeft-btn">
                <newButton :isGhost="true"></newButton>
            </div>
        </div>
    </div>
</template>

<script>
    import  newButton from  '../base/newButton'
    export default {
        name: "productLeft",
        props:["productdata"],
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
            margin-top: 38px;
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
    .pinRight{
        width: 60%;
        float: right;
        margin-top: 6%;
        .pinRight-centen{
            width: 80%;
            .product-centen {
                margin-top: 19px;
                transform-style: preserve-3d;
                perspective: 200px;
                span{
                    font-size:12px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    float: left;
                }
                .w {
                    margin-left: 8%;
                    text-align: left;
                    height: 14px;
                    background-color: #fff;
                    position: relative;
                    .q {
                        position: absolute;
                        top: 0;
                        right: -50px;
                        font-size: 14px;
                        color: #fff;
                    }
                }
            }
        }
    }
    .commodityRight{
        /*background-color: bisque;*/
        width: 70%;
        float: right;
        .commodityR-centen {
            width: 100%;
            height: 250px;
            .commodityR-title {
                width: 284px;
                height: 32px;
                line-height: 32px;
                background: rgba(126, 165, 254, 1);
                border-radius: 6px;
                margin-top: 10%;
                display: inline-block;
                .commodityR-title1 {
                    float: left;
                    width: 49%;
                    text-align: center;
                    span{
                        font-size:16px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                    }
                    p{
                        color:rgba(255, 0, 72, 1);
                        margin-bottom: 0;
                        display: inline-block;
                    }
                }
            }
            .commodityR-base{

            }
        }
    }
</style>
