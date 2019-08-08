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
                        X</span>
                    </a-Col>
                </a-Row>
            </div>
            <div class="lineEcharts">
                <div class="lineEcharts-left">
                    <div class="lineEcharts-box">
                        <div>
                            <input type="radio" name="radios" value="立白洗衣粉" v-model="param"><label>立白洗衣粉</label>
                        </div>
                        <div>
                            <input type="radio" name="radios" value="立白洗洁精" v-model="param"><label>立白洗洁精</label>
                        </div>
                        <div>
                            <input type="radio" name="radios" value="立白洗衣液" v-model="param"><label>立白洗衣液</label>
                        </div>
                        <div>
                            <input type="radio" name="radios" value="好爸爸" v-model="param"><label>好爸爸</label>
                        </div>
                        <div>
                            <input type="radio" name="radios" value="消杀" v-model="param"><label>消杀</label>
                        </div>
                        <div>
                            <input type="radio" name="radios" value="家居" v-model="param"><label>家居</label>
                        </div>
                    </div>
                </div>
                <div class="lineEcharts-right">
                    <div class="partyTable">
                        <table border="0" cellpadding="0" cellspacing="0" class="tabletitle">
                            <tr>
                                <td>
                                    <div>商品编码</div>
                                </td>
                                <td>
                                    <div>事业部</div>
                                </td>
                                <td>
                                    <div>品类</div>
                                </td>
                                <td>
                                    <div>系列</div>
                                </td>
                                <td>
                                    <div>商品名称</div>
                                </td>
                                <td>
                                    <div>销量（元）</div>
                                </td>
                                <td>
                                    <div>销售占比</div>
                                </td>
                            </tr>
                        </table>
                        <div class="packagimgtable">
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                            <table  border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td>
                                        <div>7920176920176</div>
                                    </td>
                                    <td>
                                        <div>立白 </div>
                                    </td>
                                    <td>
                                        <div>立白洗衣粉 </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                    <td>
                                        <div>xxxxxxxxx </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="partybotm">
                            <span>当前显示12个商品/共42个商品  第2页/共5页</span>
                            <p>共100条</p>
                            <a-pagination showQuickJumper :defaultCurrent="2" :total="50" @change="onChange" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import pieEcharts from "../echarts/pie"
    export default {
        name:'shopChartDown',
        components:{
            pieEcharts
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
                pieShows:true
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
            }
        }
        .lists {
            height: 90%;
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
                    }
                    div {
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
