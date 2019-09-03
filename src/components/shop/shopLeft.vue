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
                    width:'2.8rem',
                    height:'1rem',
                    border: '1px solid #DCDCDC',
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle:{
                    fontSize:'.4rem',
                    color:'#333333',
                    fontWeight:500
                },
                btnStyle2:{
                    width: '2.6rem',
                    height: '.9rem',
                    border: '1px solid #fff',
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle2:{
                    fontSize:'.35rem',
                    color:'#fff',
                    fontWeight:400
                },
            }
        },
        components:{
            shopBase,
            newButton,
            publicTable
        },
        methods:{
            //打开下滑树状图数据
            upbuttonHandleClick(val){
                this.upraphy()
            },
            //打开增长树状图数据
            downbuttonHandleClick(val){
                this.downraphy()
            },
            //点击门店详情
            storeDetailHandleClick(){
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
        height: 5.51rem;
        display: flex;
        align-items: center;
    }
    .shop-active{
        width:17%;
        height: 4.64rem;
        background:rgba(0,166,255,1);
        border-radius:6px;
        font-family:PingFangSC-Medium;
        color:rgba(255,255,255,1);
        text-align: center;
        float: left;
        margin-left: 6%;
        p{
            width: 79%;
            margin-left: 10%;
            font-size:.3rem;
            font-weight:500;
            padding-top: 26px;
            padding-bottom: 7%;
            display: grid;

            span{
                font-size:.3rem;
                font-weight:500;
                margin-top: 5%;
            }
        }
        span{
            font-size:0.65rem;
            font-weight:600;
        }
        .productLeft-btn{
            text-align: center;
            margin: auto;
            margin-top: 8%;
            display: flex;
            justify-content: center;
            align-items: center;

        }
    }
    .shop-data{
        width: 70%;
        float: left;
      .shop-data-title {
        width: 80%;
        line-height: 1.11rem;
        background:rgba(238,240,245,1);
        border-radius:6px;
        margin: 3% 0 3% 7%;
        display: inline-block;
        .shop-data-title1 {
            float: left;
            width: 49%;
            text-align: center;
            span{
                font-size:.4rem;
                font-family:PingFangSC-Regular;
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
                line-height: .8rem;
                font-size:.4rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(152,162,180,1);
            }
            .productLeft-btn{
                height:100%;
                text-align: center;
                float: right;
            }
        }
    }
    .shu{
        width:1px;
        height:3rem;
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
