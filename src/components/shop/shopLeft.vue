<template>
    <div class="shopLeft">
      <div class="shopLeft-centen" style="height: 178px;">
      <div class="shop-active">
          <p>{{shopActives.ActiveStoresTxt}}<span>{{shopActives.ActiveStoresing}}</span></p>
          <span>{{shopActives.ActiveStores}}</span>
          <div class="productLeft-btn">
              <newButton :defaultVal="shopActives.detailbtn" :isGhost="true"
              ></newButton>
          </div>
      </div>
      <div class="shop-data">
          <div class="shop-data-title" >
              <div class="shop-data-title1" v-for="(item,index) in shopActives.shopActiveTitle " :key="index"   >
                  <span>{{item.name}} </span>
                  <p>{{item.NoSales}}</p>
              </div>
          </div>
          <div class="shop-data-base" >
              <span>{{ shopActives.downSales.name}}</span>
              <span>{{ shopActives.downSales.NoSales}}</span>
              <div class="productLeft-btn">
                  <newButton :defaultVal="shopActives.downSales.btn" :buttonHandleClick="upbuttonHandleClick"
                  ></newButton>
              </div>
          </div>
          <div class="shop-data-base" >
              <span>{{ shopActives.upSales.name}}</span>
              <span>{{ shopActives.upSales.NoSales}}</span>
              <div class="productLeft-btn">
                  <newButton :defaultVal="shopActives.upSales.btn" :buttonHandleClick="downbuttonHandleClick"
                  ></newButton>
              </div>
          </div>
      </div>
        <span class="shu"></span>
      </div>
         <shopBase :shopDaseData="shopActives.shopDaseData" :defaultVal="defaultVal"></shopBase>
    </div>
</template>

<script>
    import  newButton from  '../base/newButton'
    import shopBase from  './shopBase'
    export default {
        name: "shopLeft",
        props:{
            shopActives:{
                type:Object
            },
            upraphy:{
                type:Function
            },
            downraphy:{
                type:Function
            }
        },
        data(){
            return{
                defaultVal:"无交易明细",
                downData:"下滑门店",
                upData:"增长门店",
                unit:"单位：万元"
            }
        },
        components:{
            shopBase,
            newButton
        },
        methods:{
            upbuttonHandleClick(val){
                this.upraphy()
            },
            downbuttonHandleClick(val){
                this.downraphy()
            }
        }
    }
</script>

<style lang="less" scoped>
.shopLeft{
    width: 51%;
    float: left;

    .shop-active{
        width:15%;
        height:165px;
        background:rgba(0,166,255,1);
        border-radius:6px;
        font-family:PingFangSC-Medium;
        color:rgba(255,255,255,1);
        text-align: center;
        float: left;
        margin-left: 33px;
        p{
            width: 79%;
            margin-left: 10%;
            font-size:12px;
            font-weight:500;
            padding-top: 26px;
            display: grid;
            span{
                font-size:12px;
                font-weight:500;
                padding-top: 0;
            }
        }
        span{
            font-size:26px;
            font-weight:600;
            padding-top: 12px;
        }
        .productLeft-btn{
            line-height: 26px;
            text-align: center;
            margin: auto;
            margin-top: 20px;

        }
    }
    .shop-data{
        width: 60%;
        float: left;
      .shop-data-title {
        width: 80%;
        line-height: 32px;
        background:rgba(238,240,245,1);
        border-radius:6px;
        margin-top: 7%;
        margin-left: 10%;
        margin-bottom:12px ;
        display: inline-block;
        .shop-data-title1 {
            float: left;
            width: 49%;
            text-align: center;
            span{
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(51, 51, 51, 1);
            }
            p{
                color:rgba(255, 0, 72, 1);
                margin-bottom: 0;
                display: inline-block;
            }
        }
    }
      .shop-data-base{
            width: 80%;
            height: 12%;
            margin-top: 2%;
            margin-left: 11%;
            span{
                line-height: 28px;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(152,162,180,1);
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
