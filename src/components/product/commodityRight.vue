<template>
    <div>
        <div class="productLeft">
            <div class="productLeft-img">
                <img :src="commoditydata.productimg">
            </div>
            <div class="productLeft-txt">
                <p>{{commoditydata.name}}</p>
                <span>{{commoditydata.RatePin}}</span>
            </div>
            <div class="productLeft-btn">
                <newButton :isGhost="true" :defaultVal="commoditydata.btn"  :buttonHandleClick="piebuttonHandleClick"></newButton>
            </div>
        </div>
        <div class="commodityRight">
            <div class="commodityR-centen">
                <div class="commodityR-title"  >
                    <div class="commodityR-title1" v-for="(item,index) in commoditydata.commoditytitle" :key="index">
                        <span>{{item.name}}</span>
                        <p>{{item.NoSales}}</p>
                    </div>
                </div>
                <div class="commodityR-base">
                    <div class="commodityR-baseone">
                    <div class="quan"></div>
                    <span>{{commoditydata.downGoods.name}}</span>
                    </div>
                    <div class="commodityR-basetwo">
                    <span style="font-size:16px;font-family:PingFangSC-Semibold;font-weight:600;">{{commoditydata.downGoods.NoSales}}</span>
                    </div>
                    <div class="productLeft-btn">
                        <newButton :isGhost="true" :defaultVal="commoditydata.downGoods.btn"
                                   :buttonHandleClick="upbuttonHandleClick"
                        ></newButton>
                    </div>
                </div>
                <div class="commodityR-base">
                    <div class="commodityR-baseone">
                    <div class="quan"></div>
                    <span>{{commoditydata.upGoods.name}}</span>
                    </div>
                    <div class="commodityR-basetwo">
                    <span style="font-size:16px;font-family:PingFangSC-Semibold;font-weight:600;">{{commoditydata.upGoods.NoSales}}</span>
                    </div>
                    <div class="productLeft-btn">
                        <newButton :isGhost="true" :defaultVal="commoditydata.upGoods.btn"
                                   :buttonHandleClick="downbuttonHandleClick"
                        ></newButton>
                    </div>
                </div>
            </div>
            <div class="commodityRight-sum">
                <div class="commodityRight-sumbor">
                    <div class="commodityRight-sumtxt">
                    <p>{{commoditydata.commodityname}}</p>
                    <span>{{commoditydata.commoditysum}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import  newButton from  '../base/newButton'
    export default {
        name: "commodityRight",
        props:{
            commoditydata:{
              type:Object,Array
            },
            upraphy:{
                type:Function
            },
            downraphy:{
                type:Function
            },
            pieraphy:{
                type:Function
            },
        },
        data(){
            return{

            }
        },
        methods:{
            upbuttonHandleClick(val){
                this.upraphy()
            },
            downbuttonHandleClick(val){
                this.downraphy()
            },
            piebuttonHandleClick(val){
                this.pieraphy()
            }
        },
        components:{
            newButton
        },
        mounted() {
            console.log(this.commoditydata)
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
    .commodityRight{
        /*background-color: bisque;*/
        width: 70%;
        float: right;
        .commodityR-centen {
            width: 60%;
            float: left;
            text-align: center;
            .commodityR-title {
                width: 90%;
                line-height: 32px;
                background: rgba(126, 165, 254, 1);
                border-radius: 6px;
                margin-top: 17%;
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
                    width: 90%;
                    height: 34px;
                    margin: 6% auto;
                .quan{
                    float: left;
                    width:12px;
                    height:12px;
                    border:4px solid rgba(255,255,255,1);
                    border-radius:50%;
                }
                span{
                    line-height: 28px;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    padding-left: 4%;
                }
                .productLeft-btn{
                    width: 30%;
                    height:100%;
                    line-height: 26px;
                    text-align: center;
                    float: right;
                    span{
                        width:48px;
                        font-size:12px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }
        .commodityRight-sum{
            float: right;
            width: 40%;
            .commodityRight-sumbor {
                width: 165px;
                height: 165px;
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 50%;
                margin: 14%  auto;
                position: relative;

                .commodityRight-sumtxt {
                    position: absolute;
                    top: 30%;
                    left: 30%;
                    font-family: PingFangSC-Medium;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    text-align: center;
                    p {
                        font-size: 16px;
                    }

                    span {
                        font-size: 24px;
                    }
                }
            }
        }
    }
    .commodityRight .commodityR-centen .commodityR-title .commodityR-title1:nth-child(2) p{
        color: #fff;
    }
    .commodityR-baseone{
        width: 60%;
        float: left;
        display: flex;
        align-items: center;
    }
    .commodityR-basetwo{
        width: 10%;
        float: left;
        display: flex;
        align-items: center;
    }
</style>
