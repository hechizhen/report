<template>
<div class="shopBase">
    <div style="height: 100%;float: left;width: 70%">
        <a-Row  class="commodityR-base" v-for="(item,index) in shopDaseData" :key="index">
            <a-Col :span="18">
                <div class="onetxt">
                <div class="quan"></div>
                {{item.name}}
                </div>
            </a-Col>
            <a-Col :span="6">
                {{item.NoSales}}
            </a-Col>
        </a-Row>
    </div>
    <div class="productLeft-btn">
        <newButton :defaultVal="defaultVal" :buttonHandleClick="detailHandleClick"></newButton>
    </div>
            <!--<a-Row>-->
                <!--<div class="productLeft-btn">-->
                    <!--<newButton :defaultVal="defaultVal"></newButton>-->
                <!--</div>-->
            <!--</a-Row>-->
        <!--<div class="commodityR-base" v-for="(item,index) in shopDaseData" :key="index">-->
            <!--<div class="quan"></div>-->
            <!--<span>{{item.name}}</span>-->
            <!--<p>{{item.NoSales}}</p>-->
        <!--</div>-->
        <!--<div class="productLeft-btn">-->
            <!--<newButton :defaultVal="defaultVal"></newButton>-->
        <!--</div>-->
</div>
</template>

<script>
    import  newButton from  '../base/newButton'
    import publicTable from '../base/publicTable.vue'
    export default {
        name: "shopBase",
        props:{
            shopDaseData:{  //门店底部展示数据
                type:Object
            },
            defaultVal:{     //门店底部按钮名称
                type:String
            },
            detailHandleClick:{  //打开门店底部按钮显示表格
                type:Object
            },
        },
        components:{
            newButton,
            publicTable
        },
        mounted(){

        },
        methods:{

        },
    }
</script>

<style lang="less" scoped>
    .shopBase {
        width: 100%;
        float: left;
        background:rgba(238,240,245,.5);
        border-radius:6px 6px 0px 0px;
        padding-left: 3%;
        .commodityR-base {
            width: 100%;
            float: left;
            .quan {
                width:10px;
                height:10px;
                border:2px solid rgba(152,162,180,1);
                border-radius:50%;
                display: inline-block;
                float: inherit;
            }

            .ant-col-18{
                line-height: 44px;
                font-size:16px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(152,162,180,1);
                display: inline-block;
            }
            .ant-col-6{
                line-height: 44px;
                font-size:20px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                margin-bottom: 0;
                display: inline-block;
                color: rgba(152, 162, 180, 1);
            }
        }
        .productLeft-btn {
            width:30%;
            height:88px;
            float: left;
            display:flex;
            justify-content: center;//子元素水平居中
            align-items: center;//子元素垂直居中
            .newButton {

                span {
                    width: 48px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-weight: 600;
                    color: rgba(51, 51, 51, 1);
                }
            }
        }
    }
    .onetxt{
        text-align: left;
        padding-left: 10%;
    }
  .shopLeft .shopBase .productLeft-btn{
        justify-content: left;
    }
</style>
