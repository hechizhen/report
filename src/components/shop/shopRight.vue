<template>
    <div class="shopRight">
        <div class="shopRight-title">
        <div class="shop-active" v-for="(item,index) in ActiveDetail.shopActiveDetail" :key="index">
            <p>{{item.ActiveStores}}<span>{{item.ActiveStoresing}}</span></p>
            <span>{{item.NoSales}}</span>
            <new-button :defaultVal="detailHandleList.defaultVal"  :buttonHandleClick="detailHandleClick"
                        :btnStyle="btnStyle"  :txtStyle="txtStyle"
            ></new-button>
        </div>
        </div>
        <shopBase :shopDaseData="ActiveDetail.shopDaseData" :defaultVal="defaultVal" :detailHandleClick="dealHandleClick"></shopBase>
        <public-table v-if="isShowDetail" :close="closePopup" :tableHeader="tableData.header" :interfaceParams="tableData.params" :titleName="tableData.titleName"></public-table>
        <public-table v-if="isShowreceivable" :close="dealClosePopup"  :tableHeader="dealTableData.header" :interfaceParams="dealTableData.params" :titleName="dealTableData.titleName"></public-table>
    </div>
</template>

<script>
    import shopBase from './shopBase'
    import newButton from '../button'
    import publicTable from '../base/publicTable.vue'
    export default {
        name: "shopRight",
        props:{
            ActiveDetail:{   //门店页面概览数据
                type:Object
            },
            tableData:{   //新增门店数，门店详情
                type:Object
            },
            dealTableData:{  //门店应收明细
                type:Object
            },
        },
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
                isShowreceivable:false,
                btnStyle:{
                    width: '72px',
                    height: '26px',
                    border: '1px solid #FFFFFF',
                    margin:'auto',
                    marginTop:'.25rem'
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle:{
                    fontSize:'12px',
                    color:'#ffffff',
                    fontWeight:400
                },
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
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭新增门店详情
            closePopup(){
                this.isShowDetail = false
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },
            //关闭应收明细
            dealClosePopup(){
                this.isShowreceivable = false
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },
            //打开应收明细
            dealHandleClick(){
                this.isShowreceivable = true
                //页面出现弹框页面禁止滚动
                this.stopScoll()
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
            height: 5.51rem;
            display: flex;
            align-items: center;
        }
        .shop-active {
            width: 20%;
            height: 4.64rem;
            background:linear-gradient(90deg,rgba(0,166,255,1),rgba(140,93,255,1));
            border-radius: 6px;
            font-family: PingFangSC-Medium;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            float: left;
            margin-left:10%;
            p {
                display: grid;
                font-size: .4rem;
                font-weight: 500;
                padding-top: 16%;
                padding-bottom:5%;
                margin-bottom: 0;
                span{
                    font-size: .4rem;
                    font-weight: 500;
                    margin-top: 5%;
                }
            }
            span {
                font-size: .6rem;
                font-weight: 600;
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
        margin-top: 7%;
    }
    .shopRight .shop-active:first-child{
        margin-left: 3% !important;
    }
    .shopRight .shop-active:first-child .new-button{
        display: none;
    }
    .shopRight .shop-active:nth-child(2) .new-button{
        display: none;
    }
</style>
