<template>
    <div class="shopRight">
        <div class="shopRight-title">
        <div class="shop-active" v-for="(item,index) in ActiveDetail.shopActiveDetail" :key="index">
            <p>{{item.ActiveStores}}<span>{{item.ActiveStoresing}}</span></p>
            <span>{{item.NoSales}}</span>
            <new-button :defaultVal="detailHandleList.defaultVal"  :buttonHandleClick="detailHandleClick"
                        :btnStyle="btnStyle"  :txtStyle="txtStyle" v-if="index==2"
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
                    border: '1px solid #FFFFFF',
                    margin:'0 auto',
                    marginTop:'8px',
                    width: '88px',
                    height: '26px',
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle:{
                    fontSize:'12px',
                    color:'#ffffff',
                    fontWeight:400
                },
                monitorData:this.$store.state.monitorData,
				originSource:this.$store.state.originSource
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
        },
        methods:{
            //插入监控数据
            setMonitorData(){
				if(!this.originSource){
					var _this = this
                	_this.$http({
						url: _this.$store.state.isLandUrl + '/userlog/insertCommonUserLog',
						method: 'POST',
						params: _this.monitorData
					}).then(function (res) {
					})
				}
            },
            //打开新增门店详情
            detailHandleClick(){
                this.monitorData.page_text = '新增门店'
                this.setMonitorData()
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
                this.monitorData.page_text = '应收明细'
                this.setMonitorData()
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
            height: 196px;
            display: flex;
            align-items: center;
        }
        .shop-active {
            width: 23%;
            height: 154px;
            background:linear-gradient(90deg,rgba(0,166,255,1),rgba(140,93,255,1));
            border-radius: 6px;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            float: left;
            margin-left:10%;
            p {
                display: grid;
                font-size: 14px;
                font-weight: 500;
                padding-top: 28px;
                padding-bottom:10px;
                margin-bottom: 0;
                span{
                    font-size: 12px;
                    font-weight: 500;
                    margin-top: 4%;
                }
            }
            span {
                font-size: 24px;
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
        margin-top: 7%;
    }
    .shopRight .shop-active:first-child{
        margin-left: 3% !important;
    }
    .shopRight .shop-active:first-child .btn{
        display: none;
    }
    .shopRight .shop-active:nth-child(2) .btn{
        display: none;
    }
</style>

