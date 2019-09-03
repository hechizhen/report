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
                    width: '2.6rem',
                    height: '.9rem',
                    border: '1px solid #FFFFFF',
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle:{
                    fontSize:'.4rem',
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
           console.log(this.tableData)
            console.log(this.selectButtonClick)
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
            width: 1.3rem;
            height: 1.3rem;
            margin: auto;
            margin-top: 17%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .productLeft-txt{
            margin-top: .3rem;
            p{
               display: flex;
                justify-content: center;
                font-size:14px;
                font-family:PingFangSC-Medium;
                font-weight:bold;
                color:rgba(255,255,255,1);
                white-space : nowrap

            }
            span{
                font-size:0.7rem;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(255,216,110,1);
                display: flex;
                justify-content: center;
                margin-top: 12px;
            }
        }
        .productLeft-btn{
            height:100%;
            margin: .5rem auto 0;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

</style>
