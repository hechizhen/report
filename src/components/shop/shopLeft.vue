<template>
    <div class="shopLeft">
      <div class="shopLeft-centen">
      <div class="shop-active">
          <p>{{shopActives.ActiveStoresTxt}}<span>{{shopActives.ActiveStoresing}}</span></p>
          <span>{{shopActives.ActiveStores}}</span>
          <div class="productLeft-btn">
              <newButton :defaultVal="shopActives.detailbtn" :isGhost="true" :buttonHandleClick="storeDetailHandleClick" :btnStyle="btnStyle2"    :txtStyle="txtStyle2"
              ></newButton>
          </div>
      </div>
      <div class="shop-data">
          <div class="shop-data-title" >
              <div class="shop-data-title1" v-for="(item,index) in shopActives.shopActiveTitle " :key="index"   >
                  <span>{{item.name}} </span>
                  <p :class="item.classNameNoSales">{{item.NoSales}}</p>
              </div>
          </div>
          <div class="shop-data-base" >
              <span>{{ shopActives.downSales.name}}</span>
              <span>{{ shopActives.downSales.NoSales}}</span>
              <div class="productLeft-btn">
                  <newButton :defaultVal="shopActives.downSales.btn" :buttonHandleClick="downbuttonHandleClick" :btnStyle="btnStyle"    :txtStyle="txtStyle"
                  ></newButton>
              </div>
          </div>
          <div class="shop-data-base" >
              <span>{{ shopActives.upSales.name}}</span>
              <span >{{ shopActives.upSales.NoSales}}</span>
              <div class="productLeft-btn">
                  <newButton :defaultVal="shopActives.upSales.btn" :buttonHandleClick="upbuttonHandleClick" :btnStyle="btnStyle"
                             :txtStyle="txtStyle"
                  ></newButton>
              </div>
          </div>
      </div>
        <span class="shu"></span>
      </div>
         <shopBase :shopDaseData="shopActives.shopDaseData" :defaultVal="defaultVal" :detailHandleClick="tradeDetailHandleClick"></shopBase>
         <public-table v-if="isShowDetail" :close="closePopup" :tableHeader="tableData.header" :interfaceParams="tableData.params" :titleName="tableData.titleName"></public-table>
         <public-table v-if="isShowTrade" :close="closePopupTrade" :tableHeader="tradeTableData.header" :interfaceParams="tradeTableData.params" :titleName="tradeTableData.titleName"></public-table>
    </div>
</template>

<script>
    import  newButton from  '../button'
    import shopBase from  './shopBase'
    import publicTable from '../base/publicTable.vue'
    export default {
        name: "shopLeft",
        props:{
            shopActives:{  //门店页面概览数据
                type:Object
            },
            upraphy:{  //下滑树状图数据
                type:Function
            },
            downraphy:{  //增长树状图数据
                type:Function
            },
            tableData:{   //无交易明细表格数据
                type:Object,String,
                default:""
            },
            tradeTableData:{   //应收明细表格数据
                type:Object,String,
            },
            exportData:{  //导出数据功能
                type:Object
            }
        },
        data(){
            return{
                defaultVal:"无交易明细",
                downData:"下滑门店",
                upData:"增长门店",
                unit:"单位：万元",
                isShowDetail:false,
                isShowTrade:false,
                buttonGroup:{
                    type:Object,
                    default:()=>({
                        show:true,
                        list:['品类','系列','商品']
                    })
                },
                // 按鈕樣式
                btnStyle:{
                    width:'88px',
                    height:'26px',
                    border: '1px solid #DCDCDC',
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle:{
                    fontSize:'14px',
                    color:'#333333',
                    fontWeight:500
                },
                btnStyle2:{
                    width: '88px',
                    height: '26px',
                    border: '1px solid #fff',
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle2:{
                    fontSize:'14px',
                    color:'#fff',
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
            //打开增长门店
            upbuttonHandleClick(val){
                this.monitorData.page_text = '增长门店'
                this.setMonitorData()
                this.upraphy()
            },
            //打开下滑门店
            downbuttonHandleClick(val){
                this.monitorData.page_text = '下滑门店'
                this.setMonitorData()
                this.downraphy()
            },
            //点击门店详情
            storeDetailHandleClick(){
                this.monitorData.page_text = '门店详情'
                this.setMonitorData()
                this.isShowDetail = true
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭弹窗
            closePopup(){
                this.isShowDetail = false
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },
            //点击无交易明细
            tradeDetailHandleClick(){
                this.monitorData.page_text = '无交易明细'
                this.setMonitorData()
                this.isShowTrade = true
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭无交易明细
            closePopupTrade(){
                this.isShowTrade = false
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            }
        }
    }
</script>

<style lang="less" scoped>
    .shopLeft{
        width: 51%;
        float: left;
        .shopLeft-centen{
            height: 196px;
            display: flex;
            align-items: center;
        }
        .shop-active{
            width:23%;
            height:154px;
            background:rgba(0,166,255,1);
            border-radius:6px;
            color:rgba(255,255,255,1);
            text-align: center;
            float: left;
            margin-left: 6%;
            p{
                width: 79%;
                margin-left: 10%;
                font-size:14px;
                font-weight:500;
                padding-top: 28px;
                padding-bottom: 10px;
                display: grid;

                span{
                    font-size:12px;
                    font-weight:500;
                    margin-top: 5%;
                }
            }
            span{
                font-size:24px;
                font-weight:600;
            }
            .productLeft-btn{
                line-height: 26px;
                text-align: center;
                margin: auto;
                margin-top: 8px;
                display: flex;
                justify-content: center;

            }
        }
        .shop-data{
            width: 70%;
            float: left;
            .shop-data-title {
                width: 80%;
                line-height: 41px;
                background:rgba(238,240,245,1);
                border-radius:6px;
                margin: 3% 0 3% 7%;
                display: inline-block;
                .shop-data-title1 {
                    float: left;
                    width: 49%;
                    text-align: center;
                    span{
                        font-size:14px;
                        font-weight:400;
                        color:rgba(51, 51, 51, 1);
                    }
                    p{
                        /*color:rgba(255, 0, 72, 1);*/
                        color:rgba(51, 51, 51, 1);
                        margin-bottom: 0;
                        display: inline-block;
                    }
                }
            }
            .shop-data-base{
                width: 79%;
                height: 12%;
                margin-top: 2%;
                margin-left: 8%;
                span{
                    line-height: 28px;
                    font-size:14px;
                    font-weight:400;
                    color:#737d8f;
                }
                .productLeft-btn{
                    height:100%;
                    line-height: 26px;
                    text-align: center;
                    float: right;
                }
            }
        }
        .shu{
            width:1px;
            height:101px;
            background:rgba(221,232,255,1);
            border:1px solid rgba(229,229,229,1);
            float: right;
            margin-top: 5%;
        }
    }
    .shopLeft .shop-data .shop-data-title .shop-data-title1:nth-child(2) p{
        color: rgba(51, 51, 51, 1);
    }
</style>

