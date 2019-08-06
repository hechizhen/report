<template>
    <div>
        <div class="commodityRight">
            <div class="commodityR-centen">
                <div class="commodityR-title"    >
                    <div class="commodityR-title1" v-for="(item,index) in commoditydata.commoditytitle" :key="index">
                        <span>{{item.name}}</span>
                        <p>{{item.NoSales}}</p>
                    </div>
                </div>
                <div class="commodityR-base" v-for="(em,i) in commoditydata.commoditylink" :key="i">
                    <div class="quan"></div>
                    <span>{{em.name}}</span>
                    <span style="font-size:16px;font-family:PingFangSC-Semibold;font-weight:600;">{{em.NoSales}}</span>
                    <div class="productLeft-btn">
                        <newButton :isGhost="true" :defaultVal="em.btn"></newButton>
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
        props:["commoditydata"],
        data(){
            return{

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
    .commodityRight{
        /*background-color: bisque;*/
        width: 70%;
        float: right;
        .commodityR-centen {
            width: 60%;
            float: left;
            /*margin-bottom: 6.6%;*/
            .commodityR-title {
                width: 80%;
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
                    width: 80%;
                    height: 12%;
                    margin-top: 6%;
                .quan{
                    float: left;
                    width:12px;
                    height:12px;
                    border:4px solid rgba(255,255,255,1);
                    border-radius:50%;
                    margin-top: 3%;
                    margin-right: 2%;
                }
                span{
                    line-height: 28px;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }
                .productLeft-btn{
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
                margin-top: 14%;
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
</style>
