<template>
    <div class="shopRight">
        <div class="shopRight-title">
        <div class="shop-active" v-for="(item,index) in ActiveDetail.shopActiveDetail" :key="index">
            <p>{{item.ActiveStores}}<span>{{item.ActiveStoresing}}</span></p>
            <span>{{item.NoSales}}</span>
            <new-button v-if="index==2" :defaultVal="detailHandleList.defaultVal" :buttonType="detailHandleList.buttonType" :isGhost="detailHandleList.isGhost" :buttonHandleClick="detailHandleClick"></new-button>
        </div>
        </div>
        <shopBase :shopDaseData="ActiveDetail.shopDaseData" :defaultVal="defaultVal" :detailHandleClick="dealHandleClick"></shopBase>
        <public-table v-if="isShowDetail" :close="closePopup" :tableHeader="tableData.header" :interfaceParams="tableData.params"></public-table>
        <public-table v-if="isShowreceivable" :close="dealClosePopup"  :tableHeader="dealTableData.header" :interfaceParams="dealTableData.params"></public-table>
    </div>
</template>

<script>
    import shopBase from './shopBase'
    import newButton from '../base/newButton.vue'
    import publicTable from '../base/publicTable.vue'
    export default {
        name: "shopRight",
        props:["ActiveDetail","tableData","dealTableData"],
        data(){
            return{
                defaultVal:"应收明细",
                // detailData:"",l
                //按钮样式
                detailHandleList:{
                    defaultVal:'门店详情',
                    isGhost:true,
                    buttonType:'default'
                },
                isShowDetail:false,
                isShowreceivable:false
            }
        },
        components:{
            shopBase,
            newButton,
            publicTable
        },
        watch:{
            // ActiveDetail(val){
            //   this.detailData = val
            // }
        },
        mounted() {
            // console.log(this.detailData)
        },
        methods:{
            //打开新增门店详情
            detailHandleClick(){
                this.isShowDetail = true
            },
            //关闭新增门店详情
            closePopup(){
                this.isShowDetail = false
            },
            //关闭应收明细
            dealClosePopup(){
                this.isShowreceivable = false
            },
            //打开应收明细
            dealHandleClick(){
                this.isShowreceivable = true
            }
        }
    }
</script>

<style lang="less" scoped>
    .shopRight {
        width: 49%;
        height: 100%;
        float: left;
        /*margin-left: 9%;*/
        .shopRight-title{
            height: 196px;
            display: flex;
            align-items: center;
        }
        .shop-active {
            width: 20%;
            height: 165px;
            background:linear-gradient(90deg,rgba(0,166,255,1),rgba(140,93,255,1));
            border-radius: 6px;
            font-family: PingFangSC-Medium;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            float: left;
            margin-left:10%;
            p {
                display: grid;
                font-size: 14px;
                font-weight: 500;
                padding-top: 20%;
                padding-bottom:5%;
                margin-bottom: 0;
                span{
                    font-size: 14px;
                    font-weight: 500;
                }
            }
            span {
                font-size: 26px;
                font-weight: 600;
            }
            .btn{
                cursor: pointer;
                width: 90px;
                text-align: center;
                padding: 6px 0;
                border: 1px solid #fff;
                border-radius: 3px;
                font-size: 14px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: #fff;
                margin: 10% auto 0;
            }

            .productLeft-btn {
                width: 72px;
                line-height: 26px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 6px;
                margin-left: 20%;
                margin-top: 20px;

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
    .shop-active:nth-child(2){
        background:linear-gradient(90deg,rgba(50,213,131,1),rgba(0,210,203,1));
    }
    .shop-active:last-child{
        background:linear-gradient(90deg,rgba(251,112,67,1),rgba(252,79,153,1));
    }
    .newButton{
        margin-top: 11%;
    }
    .shopRight .shop-active:first-child .btn{
        display: none;
    }
    .shopRight .shop-active:nth-child(2) .btn{
        display: none;
    }
</style>
