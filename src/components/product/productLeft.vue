<template>
        <div class="productLeft">
             <div class="productLeft-img">
                 <img :src="productdata.productimg">
             </div>
            <div class="productLeft-txt">
                <p>{{productdata.name}}</p>
                <span>{{productdata.RatePin}}</span>
            </div>
            <div class="productLeft-btn">
                <newButton  :buttonType="buttonType"  :buttonHandleClick="storeDetailHandleClick" :txtStyle="txtStyle" :btnStyle="btnStyle"
                            :defaultVal="productdata.btn"></newButton>
            </div>
            <public-table v-if="isShowDetail" :close="closePopup" :tableHeader="tableData.header" :interfaceParams="tableData.params"
                            :buttonGroup="buttonGroup" :selectButtonClick="selectButtonClick"    :titleName="tableData.titleName"
            ></public-table>
        </div>
</template>

<script>
    import  newButton from  '../button'
    import publicTable from '../base/publicTable.vue'
    export default {
        name: "productLeft",
        props:{
            productdata:{    //概览数据
                type: Object
            },
            tableData:{    //动销清单表格数据
                type:Object,
                default:{}
            },
            selectButtonClick:{  //切换维度点击事件
                type:Function
            },
            //分销清单点击
            storeHandleClick:{
                type:Function
            }
        },
        data(){
            return{
                buttonType:"default",//按钮样式
                isShowDetail:false,  //表格隐藏
                //多维度单选
                buttonGroup:{
                    show:true,
                    list:['品类','系列','商品']
                },
                btnStyle:{
                    width: '88px',
                    height: '26px',
                    border: '1px solid #FFFFFF',
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle:{
                    fontSize:'14px',
                    color:'#ffffff',
                    fontWeight:400
                },
            }
        },
        methods:{
            //打开动销清单
            storeDetailHandleClick(){
                this.storeHandleClick()
                this.isShowDetail = true
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭动销清单
            closePopup(){
                this.isShowDetail = false
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },

        },
        mounted() {
        },
        components:{
            newButton,
            publicTable
        }
    }
</script>

<style lang="less" scoped>
    .productLeft{
        width: 30%;
        float: left;
        .productLeft-img{
            width: 46px;
            height: 46px;
            margin: auto;
            margin-top: 40px;
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
                font-weight:bold;
                color:rgba(255,255,255,1);
                margin: 0 auto;
                white-space : nowrap

            }
            span{
                width:99px;
                font-size:28px;
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
            display: flex;
            justify-content: center;
        }
    }

</style>

