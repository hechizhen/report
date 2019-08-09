
<template>
    <div class="bar">
        <div :id="barEchartsData.id" class="barChart">

        </div>
    </div>
</template>
<script>

    export default {

        name : 'bar',
        props:{
            barEchartsData:{
                type:Object,
                default: () => ({
                    //id
                    id:'barId',
                    //数据单位
                    unit:'%',
                    //x轴单位
                    xAxisData:[1,2,3,4,5,6,7,8,9,10],
                    type:'xAxis',
                    //柱状图数据
                    barData:[
                        {
                            name:'ABC',
                            data:[20,30,40,50,120],
                            color:'red',
                            barWidth:11,
                        },
                    ],
                    showType:0,//0横过来 1竖起来
                    //markline
                    markLineList:{
                        show:false
                    },
                })
            },
            //柱状图上方文字
            label:{
                type:Object,
                default: () => ({
                    isShow:false,
                    position:'top',
                    color:'#A0A5B1'
                })
            },
            //是否显示图标
            legendShow:{
                type:Boolean,
                default: true
            },
            //是否显示最大值
            isShowMax:{
                type:Boolean,
                default: false
            },
            //柱状图类型，平行或者重合 0平行 1重合
            barType:{
                type:Number,
                default:0,
            },
            //x轴参数
            xAxis:{
                type:Object,
                default: () => ({
                    //x轴
                    axisLine:{
                        show:true,
                        color:'#3699FF'
                    },
                    //x轴字体
                    axisLabel:{
                        show:true,
                        color:'#333333',
                        fontSize:18
                    },
                    //网格线
                    splitLine:{
                        show:false,
                        color:'#CCCCCC'
                    },
                }),
            },
            yAxis:{
                type:Object,
                default: () => ({
                    //y轴
                    axisLine:{
                        show:true,
                        color:'#3699FF'
                    },
                    //y轴字体
                    axisLabel:{
                        show:true,
                        color:'#333333',
                        fontSize:18
                    },
                    //网格线
                    splitLine:{
                        show:true,
                        color:'#CCCCCC'
                    },
                }),
            },
        },
        components : {

        },
        data () {
            return {
                xAxisType:'',
                yAxisType:'',
                xAxisData:'',
                yAxisData:'',
                intervalData:'',
            }
        },
        mounted () {
            console.log(this.barEchartsData)
            var _this = this
            let echarts = _this.$echarts;
            _this.myChart = echarts.init(document.getElementById(_this.barEchartsData.id))
            _this.setBarOptions()
            $(window).resize(function() {
                _this.myChart.resize()
            });
        },
        methods: {
            setBarOptions(){
                var _this = this
                if(_this.barEchartsData.markLineList.show==true){
                    var markLineObj={
                        data: [{
                            name:_this.barEchartsData.markLineList.name,
                            yAxis:_this.barEchartsData.markLineList.data,
                            symbol:'none',
                            lineStyle: {
                                normal: {
                                    color: '#D7D9E5',
                                    type: 'solid',
                                    width: 1
                                }
                            },
                            x: '',
                            label: {
                                normal: {
                                    color: '#D7D9E5',
                                    position: 'start',
                                    // padding: [-12, 10, 0, -12],
                                    formatter:function(params){
                                        // return params.name+':'
                                        // +params.value+markLineConfiguration.unit
                                    },
                                    fontSize:12,
                                }
                            },
                            type: 'average'
                        }]
                    };
                }else{
                    var markLineObj={}
                }
                let seriesData = []
                let legendList = []
                if(_this.barType==0){
                    _this.barEchartsData.barData.map(function(item,index){
                        legendList.push(item.name)
                        seriesData.push({
                            name: item.name,
                            type: 'bar',
                            data: item.data,
                            markLine:markLineObj,
                            barWidth:item.barWidth,
                            itemStyle:{
                                normal:{
                                    color: item.color,
                                },
                            },
                            label:{
                                normal:{
                                    show:_this.label.isShow,
                                    position: _this.label.position,
                                    color:_this.label.color,
                                    formatter:function(params){
                                        return params.value+_this.barEchartsData.unit
                                    }
                                }
                            }
                        })
                    })
                }else{
                    _this.barEchartsData.barData.map(function(item,index){
                        legendList.push(item.name)
                        seriesData.push({
                            name: item.name,
                            type: 'bar',
                            data: item.data,
                            stack: "总量",
                            markLine:markLineObj,
                            barWidth:item.barWidth,
                            itemStyle:{
                                normal:{
                                    color: item.color,
                                },
                            },
                            label:{
                                normal:{
                                    show:_this.label.isShow,
                                    position: _this.label.position,
                                    color:_this.label.color,
                                    formatter:function(params){
                                        return params.value+_this.barEchartsData.unit
                                    }
                                }
                            }
                        })
                    })
                }
                if(_this.barEchartsData.showType==0){
                    _this.xAxisType = 'category'
                    _this.xAxisData = _this.barEchartsData.xAxisData
                    _this.yAxisType = 'value'
                    _this.yAxisData = ''
                }else{
                    _this.xAxisType = 'value'
                    _this.xAxisData = ''
                    _this.yAxisType = 'category'
                    _this.yAxisData = _this.barEchartsData.xAxisData
                }
                if(_this.isShowMax){
                    _this.intervalData = 10000
                }else{
                    _this.intervalData = null
                }
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        show:_this.legendShow,
                        data: legendList,
                        bottom: "5%",
                        itemGap: 50,
                        textStyle: {
                            color: "#333333",
                            fontSize:14
                        }
                    },
                    grid: {
                        top: 'middle',
                        left: '3%',
                        right: '4%',
                        height: '75%',
                        bottom:'3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: _this.xAxisType,
                        data: _this.xAxisData,
                        // min:_this.minData,
                        // max:_this.maxData,
                        interval: _this.intervalData,
                        axisLine: {
                            show: _this.xAxis.axisLine.show,
                            lineStyle: {
                                color: _this.xAxis.axisLine.color,
                            }
                        },
                        axisLabel:{
                            show:_this.xAxis.axisLabel.show,
                            textStyle:{
                                color:_this.xAxis.axisLabel.color,
                                fontSize:_this.xAxis.axisLabel.fontSize,
                            }
                        },
                        splitLine: {
                            show: _this.xAxis.splitLine.show,
                            lineStyle: {
                                color: _this.xAxis.splitLine.color,
                            }
                        },
                        axisTick:{
                            show: false
                        }
                    },
                    yAxis: {
                        type: _this.yAxisType,
                        data: _this.yAxisData,
                        interval: _this.intervalData,
                        splitLine: {
                            show:_this.yAxis.splitLine.show,
                            lineStyle: {
                                color: _this.yAxis.splitLine.color,
                            }
                        },
                        axisLabel:{
                            show:_this.yAxis.axisLabel.show,
                            textStyle:{
                                color:_this.yAxis.axisLabel.color,
                                fontSize:_this.yAxis.axisLabel.fontSize,
                            }
                        },
                        axisLine: {
                            show: _this.yAxis.axisLine.show,
                            lineStyle: {
                                color: _this.yAxis.axisLine.color,
                            },
                        },
                        nameTextStyle: {
                            color: "#999"
                        },
                        splitArea: {
                            show: false
                        },
                        axisTick:{
                            show: false
                        },
                        // min:_this.minData,
                        // max:_this.maxData,
                    },
                    series: seriesData
                };
                this.myChart.setOption(option);
            }
        },
        computed:{

        },
        watch: {
            barEchartsData(val){
                var _this = this
                let echarts = _this.$echarts;
                _this.myChart = echarts.init(document.getElementById(_this.barEchartsData.id))
                _this.setBarOptions()
           }
        },
        distroyed: function () {

        }
    }
</script>
<style scoped lang="less">
    .bar{
        width:100%;
        height:100%;
        .barChart{
            width:100%;
            height:100%;
        }
    }
</style>
