<template>
    <div class="shopChart" >
        <!--饼图-->
        <div class="echarts" v-if="pieShows">
            <div class="title">
                <a-Row class="thendChartRow">
                    <a-Col :span="12" class="thendChartCol1">
                        品类销售占比
                    </a-Col>
                    <a-Col :span="12" class="thendChartCol2">
                        <span @click="thendChartClicks">
                            <i class="iconfont icon-guanbi"></i>
                        </span>
                    </a-Col>
                </a-Row>
            </div>
            <div class="lineEcharts">
                <pieEcharts :pieEchartsData="pieEchartsData"  :chartHandleClick="chartHandleClick" ></pieEcharts>
            </div>
        </div>

        <!--表格-->
        <div class="lists"  v-if="listShows">
            <div class="title">
                <a-Row class="thendChartRow">
                    <a-Col :span="12" class="thendChartCol1">
                    </a-Col>
                    <a-Col :span="12" class="thendChartCol2">
                        <a-button>导出当前商品</a-button>
                        <a-button>导出全部商品</a-button>
                        <span @click="thendChartClicks">
                            <i class="iconfont icon-guanbi"></i>
                        </span>
                    </a-Col>
                </a-Row>
            </div>
            <div class="lineEcharts">
                <div class="lineEcharts-left">
                    <a-radio-group @change="onChange" v-model="value">
                        <a-radio class="radioStyle" :value="1">立白洗衣粉</a-radio>
                        <a-radio class="radioStyle" :value="2">立白洗洁精</a-radio>
                        <a-radio class="radioStyle" :value="3">立白洗衣液</a-radio>
                        <a-radio class="radioStyle" :value="4">好爸爸</a-radio>
                        <a-radio class="radioStyle" :value="5">消杀</a-radio>
                        <a-radio class="radioStyle" :value="6">家居</a-radio>
                    </a-radio-group>
                </div>
                <div class="lineEcharts-right">
                </div>
            </div>
        </div>
        <loading-data :isShow="isShow"></loading-data>
    </div>
</template>
<script>
    import pieEcharts from "../echarts/pie"
    import loadingData from '../base/loadingData'
    export default {
        name:'shopChartDown',
        components:{
            pieEcharts,
            loadingData
        },
        props:{
            trendChartClick:{
                type:Function
            },
            pieEchartsData:{
                type:Array,
                default:[]
            },
            listraphy:{
                type:Function
            },
        },

        data(){
            return {
                listShows:false,
                pieShows:true,
                value: 1,
                // isShow:true,
            }
        },
        mounted(){
       console.log(this.pieEchartsData)
        },

        methods:{
            thendChartClicks(){
                this.trendChartClick()
            },
            chartHandleClick(){
                this.pieShows = false;
                this.listShows =true
            },
            slital(){
                alert(1111)
            },
            onChange (e) {
                console.log('radio checked', e.target.value)
            },
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
            border-radius:5px;
            .title {
                height: 10%;
                width: 100%;
                .thendChartRow {
                    height: 100%;
                    width: 100%;
                }
                .thendChartCol1 {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-left: 10px;
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
                    padding-right: 40px;
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
                width: 100%;
            }
        }
        .radioStyle{
            height: 60px;
            line-height: 60px;
            text-align:left;
            width:100%;
            padding-left:5%;
        }
        .lists {
            height: 90%;
            width: 90%;
            border-radius:5px;
            background:rgba(255,255,255,1);
            .title {
                height: 10%;
                width: 100%;
                .thendChartRow {
                    height: 100%;
                    width: 100%;
                }
                .thendChartCol1 {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-left: 10px;
                    font-size:20px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
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
                    padding-right: 40px;
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
                width: 100%;
                .lineEcharts-left{
                    width: 12%;
                    float: left;
                    .lineEcharts-box {
                        margin-top: 80%;
                        margin-left: 30%;
                        div{
                            display: inline-block;
                            width: 100%;
                            margin-bottom: 35%;
                        }
                        input {
                            width:15px;
                            height: 15px;
                            background: rgba(45, 146, 252, 1);
                            padding-top: 2%;
                            vertical-align:bottom;
                            _vertical-align:middle;
                        }
                    }
                }
                .lineEcharts-right{
                    width: 88%;
                    float: right;
                }
            }
        }
        .partyTable {
            width: 100%;
            height: 98%;
            padding: .5% 7% .5% .5%;
            .tabletitle {
                width: 100%;
                height: 8%;
                tr {
                    width: 100%;
                    height: 100%;
                    td {
                        width: 10%;
                    }
                    div {
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        font-size:12px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        background:rgba(242,244,247,1);
                        border:1px solid rgba(220,220,220,1);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
            .packagimgtable {
                height: 92%;
                width: 100%;
                overflow: auto;
                table {
                    width: 100%;
                    td {
                        width: 10%;
                        height: 50px;
                        line-height: 50px;
                        display: flex;
                        font-size:10px;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        align-items: center;
                        justify-content: center;
                        border:1px solid rgba(220,220,220,1);
                        float: left;
                    }
                    div {
                        span {
                            color: #D7DBEF;
                        }
                    }
                }
            }
            .packagimgtable::-webkit-scrollbar {
                width: 0px;
            }

            .partybotm{
                margin-top: 2%;
                span{
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
                p{
                    margin-bottom: 0;
                    display: inline-block;
                    width: 46%;
                    height: 32px;
                    line-height: 32px;
                    text-align: right;
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                }
                .ant-pagination{
                    float: right;
                }
            }
        }
        .ant-btn-default{
            margin-right: 8%;
        }
        label{
            padding-left:5%;
        }
    }
</style>
