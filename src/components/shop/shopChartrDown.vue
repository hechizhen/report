<template>
    <div class="shopChart">
        <div class="echarts">
            <div class="title">
                <a-Row class="thendChartRow">
                    <a-Col :span="12" class="thendChartCol1">
                       下滑门店
                    </a-Col>
                    <a-Col :span="12" class="thendChartCol2">
                        单位：万元
                        <newButton :defaultVal="defaultVal" :buttonHandleClick="exportData" :btnStyle="btnStyle" :txtStyle="txtStyle"> </newButton>
                        <span @click="thendChartClicks">
                            <i class="iconfont icon-guanbi"></i>
                        </span>
                    </a-Col>
                </a-Row>
            </div>
            <div class="lineEcharts">
                <barEcharts :barEchartsData="barEchartsData"></barEcharts>
            </div>
        </div>
        <loading-data :isShow="isShow"></loading-data>
    </div>
</template>
<script>
    import barEcharts from "../echarts/bar1"
    import  newButton from  '../button'
    import loadingData from '../base/loadingData'
    export default {
        name:'shopChartDown',
        components:{
            barEcharts,
            newButton,
            loadingData
        },
        props:{
            //关闭单击事件
            trendChartClick:{
                type:Function
            },
            //树状图数据
            barEchartsData:{
                type: Object
            },
            //looding效果
            isShow:{
                type:Boolean,
                default:false,
            },
            //导出数据
            downExportData:{
                type:Object
            }
        },

        data(){
            return {
                defaultVal:"导出数据",
                // isShow:true,
                btnStyle:{
                    width: '98px',
                    height: '30px',
                    border: '1px solid #959595',
                    marginLeft:'4%'
                },
                txtStyle:{
                    fontSize:'16px',
                    color:'#333333',
                    fontWeight:400,
                    hover:{
                        color:'#BEBEBE'
                    },
                },

            }
        },
        mounted(){
        },
        methods:{
            //关闭方法
            thendChartClicks(){
                this.trendChartClick()
            },
            //导出数据方法
            exportData(){
                this.exportHandleClick(this.downExportData.tableHeaderTxt,this.downExportData.tableHeaderKey,this.downExportData.tableData,this.downExportData.tableName)
            }
        }
    }
</script>
<style lang="less" scoped>
    .shopChart {
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 10;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.5);
        .echarts {
            height: 80%;
            width: 90%;
            background:rgba(255,255,255,1);
            .title {
                height: 10%;
                width: 100%;
                .thendChartRow {
                    height: 100%;
                    width: 100%;
                    border-bottom: 1px solid rgba(210,210,210,1);
                }
                .thendChartCol1 {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-left: 4%;
                    font-size:20px;
                    font-weight:700;
                    color:rgba(0,0,0,1);
                }
                .thendChartCol2 {
                    position: relative;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    justify-content: flex-end;
                    padding-right: 10%;
                    span {
                        position: absolute;
                        top: 0.1rem;
                        right: 15px;
                        color: rgba(180, 180, 180, 1);
                        cursor: pointer;
                    }
                    i{
                        font-size: 40px;
                    }
                }
            }
            .lineEcharts {
                height: 90%;
                width: 100%;
            }
        }
    }
    .newButton{
        padding-left: 6%;
    }
</style>
