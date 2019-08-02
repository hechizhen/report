<template>
    <div class="shopLeft">
      <div class="shop-active">
          <p>活跃门店数 <span>（家）</span></p>
          <span>35</span>
          <div class="productLeft-btn">
              <span>门店详情</span>
          </div>
      </div>
      <div class="shop-data">
          <div class="shop-data-title"    >
              <div class="shop-data-title1">
                  <span>环比: </span>
                  <p>-59%</p>
              </div>
              <div class="shop-data-title1">
                  <span>同比: </span>
                  <p>-59%</p>
              </div>
          </div>
          <div class="shop-data-base">
              <span>销量下滑门店数（家）：</span>
              <span>16.67%</span>
              <div class="productLeft-btn">
                  <newButton></newButton>
              </div>
          </div>
          <div class="shop-data-base">
              <span>销量下滑门店数（家）：</span>
              <span>16.67%</span>
              <div class="productLeft-btn">
                  <newButton></newButton>
              </div>
          </div>
      </div>
        <span class="shu"></span>
         <shopBase></shopBase>
    </div>
</template>

<script>
    import  newButton from  '../base/newButton'
    import shopBase from  './shopBase'
    export default {
        name: "shopLeft",
        components:{
            shopBase,
            newButton
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
            width: 80%;
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
            width: 72px;
            line-height: 26px;
            text-align: center;
            border:1px solid rgba(255,255,255,1);
            border-radius:6px;
            margin-left: 20%;
            margin-top: 20px;
            span{
                width:48px;
                font-size:12px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
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
            margin-top: 16px;
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
                span{
                    width:48px;
                    font-size:12px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
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
</style>
