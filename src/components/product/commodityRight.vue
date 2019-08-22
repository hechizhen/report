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
                <newButton :isGhost="true" :defaultVal="commoditydata.btn"  :buttonHandleClick="ListbuttonHandleClick"></newButton>
            </div>
        </div>
        <div class="commodityRight">
            <div class="commodityR-centen">
                <div class="commodityR-title"  >
                    <div class="commodityR-title1" v-for="(item,index) in commoditydata.commoditytitle" :key="index">
                        <span>{{item.name}}</span>
                        <p :class="item.classNameNoSales">{{item.NoSales}}</p>
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
        </div>
        <div class="commodityRight-sum">
            <div class="commodityRight-sumbor">
                <div class="commodityRight-sumtxt">
                    <p>{{commoditydata.commodityname}}</p>
                    <span>{{commoditydata.commoditysum}}</span>
                </div>
            </div>
        </div>
        <public-table v-if="isShowDetail" :close="closePopup" :tableHeader="tableData.header" :interfaceParams="tableData.params"  :titleName="tableData.titleName"
                      :buttonGroup="buttonGroup" :selectButtonClick="selectButtonClick"
        ></public-table>
    </div>
</template>

<script>
    import  newButton from  '../base/newButton'
    import publicTable from '../base/publicTable.vue'
    export default {
        name: "commodityRight",
        props:{
            commoditydata:{   //产品页面概览数据
              type:Object,Array
            },
            upraphy:{   //打开下滑树状图
                type:Function
            },
            downraphy:{  //打开增长树状图
                type:Function
            },
            pieraphy:{  //打开饼图
                type:Function
            },
            tableData:{  //表格数据
                type:Object,String,
            },
            selectButtonClick:{  //商品明细表格切换维度
                type:Function
            },
            goodHandleClick:{//点击商品明细
                type:Function
            }
        },
        data(){
            return{
                //商品明细表格
                isShowDetail:false,
                buttonGroup:{
                    show:true,
                    list:['事业部','品类','系列','商品']
                },

            }
        },
        methods:{
            //打开下滑树状图
            upbuttonHandleClick(val){
                this.upraphy()
            },
            //打开增长树状图
            downbuttonHandleClick(val){
                this.downraphy()
            },
            //点击商品明细
            ListbuttonHandleClick(val){
                this.goodHandleClick()
                this.isShowDetail=true
            },
            //退出商品明细
            closePopup(){
                this.isShowDetail=false
            }
        },
        components:{
            newButton,
            publicTable
        },
        mounted() {
            console.log(this.commoditydata)
        }
    }
</script>

<style lang="less" scoped>
    .productLeft{
        width: 22%;
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
                white-space : nowrap
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
    .commodityRight {
        width: 49%;
        float: left;
        height: 260px;
        display: flex;
        justify-content: center;
        align-items: center;
        .commodityR-centen {
            width:100%;
            float: left;
            text-align: center;
            .commodityR-title {
                width: 100%;
                line-height: 32px;
                background: rgba(255,255,255,0.2);
                border-radius: 6px;
                display: inline-block;

                .commodityR-title1 {
                    float: left;
                    width: 49%;
                    text-align: center;

                    span {
                        font-size: 16px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                    }

                    p {
                        color: rgba(255, 255, 255, 1);
                        margin-bottom: 0;
                        display: inline-block;
                    }
                }
            }

            .commodityR-base {
                width: 100%;
                height: 34px;
                margin: 6% auto 0;
                .quan {
                    float: left;
                    width: 12px;
                    height: 12px;
                    border: 4px solid rgba(255, 255, 255, 1);
                    border-radius: 50%;
                    display: inline-block;
                }

                span {
                    line-height: 34px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    padding-left: 4%;
                    white-space: nowrap;
                }

                .productLeft-btn {
                    width: 32%;
                    height: 100%;
                    line-height: 26px;
                    text-align: right;
                    float: right;

                    span {
                        width: 48px;
                        font-size: 12px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                    }
                }
            }
        }
    }
        .commodityRight-sum{
            float: left;
            width: 29%;
            height: 260px;
            display: flex;
            justify-content: center;
            align-items: center;
            .commodityRight-sumbor {
                width: 130px;
                height: 130px;
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;

                .commodityRight-sumtxt {
                    font-family: PingFangSC-Medium;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    text-align: center;
                    p {
                        font-size: 16px;
                        margin-bottom: 10%;
                    }

                    span {
                        font-size: 24px;
                    }
                }
            }
      }
    .commodityRight .commodityR-centen .commodityR-title .commodityR-title1:nth-child(2) p{
        color: #fff;
    }
    .commodityR-baseone{
        width: 54%;
        float: left;
        display: flex;
        align-items: center;
    }
    .commodityR-basetwo{
        width: 14%;
        float: left;
        display: flex;
        align-items: center;
        text-align: left;
    }
    .commodityRight .commodityR-centen .commodityR-base:last-child{
        margin: 2% auto 0;
    }
</style>
