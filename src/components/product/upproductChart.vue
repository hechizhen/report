<template>
    <div class="shopChart">
        <div class="echarts">
            <div class="title">
                <a-Row class="thendChartRow">
                    <a-Col :span="12" class="thendChartCol1">
                        增长商品
                    </a-Col>
                    <a-Col :span="12" class="thendChartCol2">
                        单位：万元
                        <newButton :defaultVal="defaultVal" :buttonHandleClick="exportData"> </newButton>
                        <span @click="thendChartClick">
                            <i class="iconfont icon-guanbi"></i>
                        </span>
                    </a-Col>
                </a-Row>
            </div>
            <div class="lineEcharts">
                <barEcharts :barEchartsData="VariabilityUp"></barEcharts>
            </div>
        </div>
        <loading-data :isShow="isShow"></loading-data>
    </div>
</template>
<script>
    import barEcharts from "../echarts/bar"
    import  newButton from  '../base/newButton'
    import loadingData from '../base/loadingData'
    export default {
        name:'shopChart',
        components:{
            barEcharts,
            newButton,
            loadingData
        },
        props:{
            trendChartClick:{
                type:Function
            },
            VariabilityUp:{
                type:Object
            },
            isShow:{
                type:Boolean,
                default:false,
            },
            //导出数据
            raiseExportData:{
                type:Object,
            }
        },
        mounted(){
            console.log(this.raiseExportData)
        },

        data(){
            return {
                defaultVal:"导出数据",
                // barEcharts:{
                //     id:'barIdUp',
                //     unit:'%',
                //     xAxisData:this.VariabilityUp.xAxisData,
                //     label:{
                //         isShow:false
                //     },
                //     type:'xAxis',
                //     barData:this.VariabilityUp.seriesData,
                //     showType:0,//0横过来 1竖起来
                //     markLineList:{
                //         show:false
                //     }
                // }
            }
        },
        methods:{
            thendChartClick(){
                this.trendChartClick()
            },
            exportData(){
                this.exportHandleClick(this.raiseExportData.tableHeaderTxt,this.raiseExportData.tableHeaderKey,this.raiseExportData.tableData,this.raiseExportData.tableName)
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
        background-color: RGBA(69, 72, 90, 0.5);
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
                    font-family:PingFangSC-Medium;
                    font-weight:700;
                    color:rgba(0,0,0,1);
                }
                .thendChartCol2 {
                    position: relative;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    font-size:16px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    justify-content: flex-end;
                    padding-right: 10%;
                    span {
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        color: rgba(180, 180, 180, 1);
                        cursor: pointer;
                    }
                }
            }
            .lineEcharts {
                height: 90%;
                width: 96%;
                margin-left: 4%;
            }
        }
    }
    .newButton{
        padding-left: 6%;
    }
</style>
