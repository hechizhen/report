
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
                        show:false,
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
            //数据过滤模式
            dataZoomShow:{
                type:Boolean,
                default:false
            },
            //树状图下面数据是否能点击
            selectedMode:{
                type:Boolean,
                default:false
            },
            grid:{
                type:Object,
                default: () => ({
                    top: 'middle',
                    left: '3%',
                    right: '6%',
                    height: '70%',
                    bottom:'3%',
                    containLabel: true
                })
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
                        fontSize:16,
                        height: '75%',
                    },
                    //网格线
                    splitLine:{
                        show:false,
                        color:'#e3e3e3'
                    },
                }),
            },
            yAxis:{
                type:Object,
                default: () => ({
                    //y轴
                    axisLine:{
                        show:true,
                        color:'#3699FF',
                    },
                    //y轴字体
                    axisLabel:{
                        show:true,
                        color:'#333333',
                        fontSize:16,
                    },
                    //网格线
                    splitLine:{
                        show:true,
                        color:'#e3e3e3'
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
            var _this = this
            let echarts = _this.$echarts;
            _this.myChart = echarts.init(document.getElementById(_this.barEchartsData.id))
            _this.setBarOptions()
            $(window).resize(function() {
                _this.myChart.resize()
            });
            console.log(this.barEchartsData)
        },
        methods: {
            setBarOptions(){
                var _this = this
                if(_this.barEchartsData.markLineList.show==true){
                    var markLineObj={
                        symbol:'none',
                        silent: true,
                        z:2,
                        data: [{
                            name:_this.barEchartsData.markLineList.name,
                            yAxis:_this.barEchartsData.markLineList.data,
                            lineStyle: {
                                normal: {
                                    color: '#c9cbd5',
                                    type: 'solid',
                                    width: 0.5
                                }
                            },
                            x: '',
                            label: {
                                normal: {
                                    color: '#D7D9E5',
                                    position: 'end',
                                    // padding: [-12, 10, 0, -12],
                                    formatter:function(params){
                                        if(_this.barEchartsData.id=="barIdMonthSales" || _this.barEchartsData.id=="barIdYearSales" ){
                                            params.value = (params.value*100).toFixed(0)+'%'
                                        }else{
                                            params.value = _this.dataProcess(params.value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num
                                        }
                                        return params.value
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
                    var barGap = 0
                }else{
                    var barGap = '-100%'
                }
                _this.barEchartsData.barData.map(function(item,index){
                        legendList.push(item.name)
                        seriesData.push({
                            name: item.name,
                            type: 'bar',
                            z:10,
                            zlevel:10,
                            data: item.data,
                            markLine:markLineObj,
                            // barGap:barGap,
                            // barWidth:item.barWidth,
                            silent: true,
                            // barMaxWidth:22,
                            itemStyle:{
                                normal:{
                                    color: item.color
                                },
                            },
                            label:{
                                normal:{
                                    show:_this.label.isShow,
                                    position: _this.label.position,
                                    color:_this.label.color,
                                    marginTop:15,
                                    formatter:function(params){
                                        return _this.dataProcess(params.value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num+_this.dataProcess(params.value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).unit
                                    },
                                }
                            }
                        })
                    })
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'cross',        // 默认为直线，可选为：'line' | 'shadow'
                            label:{
                                backgroundColor:'rgb(45, 146, 252)',
                                // formatter:function(params) {
                                //     if(params.seriesData.length==0){
                                //         params.value = _this.dataProcess(params.value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num+_this.dataProcess(params.value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).unit
                                //     }
                                //     return params.value
                                // }
                            },
                        },
                        formatter:function(params){
                            var relVal = '';
                            for (var i = 0; i < params.length; i++) {
                                relVal += params[i].marker+params[i].seriesName+':'+_this.dataProcess(params[i].value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num+_this.dataProcess(params[i].value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).unit+'</br>'
                            }
                            return relVal;
                        },
                        backgroundColor:'#fff',
                        textStyle:{
                            color:'#333',
                            fontSize:14
                        },
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
                    },
                    legend: {
                        itemHeight: 18,
                        itemWidth: 18,
                        show:_this.legendShow,
                        data: legendList,
                        icon:"rect",
                        bottom: "3%",
                        itemGap: 50,
                        selectedMode:_this.selectedMode,
                        textStyle: {
                            color: "#333333",
                            fontSize:14
                        }
                    },
                    grid: _this.grid,
                    xAxis: {
                        type: _this.xAxisType,
                        data: _this.xAxisData,
                        interval: _this.intervalData,
                        axisLine: {
                            show: _this.xAxis.axisLine.show,
                            lineStyle: {
                                color: _this.xAxis.axisLine.color,
                            }
                        },
                        axisLabel:{
                            show:_this.xAxis.axisLabel.show,
                            interval:0,
                            textStyle:{
                                color:_this.xAxis.axisLabel.color,
                                fontSize:_this.xAxis.axisLabel.fontSize,
                            },
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
                            },
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
                    },
                    series: [
        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
                };
                if(_this.barEchartsData.id=="barIdMonthSales" || _this.barEchartsData.id=="barIdYearSales" ){
                    option.yAxis.max= 2
                }
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
