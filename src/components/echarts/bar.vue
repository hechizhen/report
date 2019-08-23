
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
            grid:{
                type:Object,
                default: () => ({
                    top: 'middle',
                    left: '3%',
                    right: '4%',
                    height: '75%',
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
                        fontSize:14
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
                        fontSize:14
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
                                        params.value = _this.dataProcess(params.value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num
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
                            data: item.data,
                            markLine:markLineObj,
                            barGap:barGap,
                            barWidth:item.barWidth,
                            itemStyle:{
                                normal:{
                                    color: function(params) {
                                        if(params.seriesName=='达成率' && (_this.barEchartsData.id=="barIdMonthSales" || _this.barEchartsData.id=="barIdYearSales")){
                                            if(params.value<1){
                                                var barColor = "#FF0048"
                                            }else{
                                                var barColor = "#D7D9E5"
                                            }
                                        }else{
                                            var barColor = item.color
                                        }
                                        return barColor;
                                    },
                                },
                            },
                            label:{
                                normal:{
                                    show:_this.label.isShow,
                                    position: _this.label.position,
                                    color:_this.label.color,
                                    formatter:function(params){
                                        return _this.dataProcess(params.value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num+_this.dataProcess(params.value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).unit
                                    }
                                }
                            }
                        })
                    })
                if(_this.barEchartsData.showType==0){
                    _this.xAxisType = 'category'
                    _this.xAxisData = _this.barEchartsData.xAxisData
                    _this.yAxisType = 'value'
                    _this.yAxisData = ''
                    var yAxisLabel = {
                        show:_this.yAxis.axisLabel.show,
                        textStyle:{
                            color:_this.yAxis.axisLabel.color,
                            fontSize:_this.yAxis.axisLabel.fontSize,
                        },
                        formatter:function(value) {
                            value = _this.dataProcess(value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num
                            return value
                        },
                    }
                    var xAxisLabel = {
                        show:_this.xAxis.axisLabel.show,
                        formatter : function(params){
                            var newParamsName = "";// 最终拼接成的字符串
                            var paramsNameNumber = params.length;// 实际标签的个数
                            var provideNumber = 10;// 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                            /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = "";// 表示每一次截取的字符串
                                    var start = p * provideNumber;// 开始截取的位置
                                    var end = start + provideNumber;// 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr;// 最终拼成的字符串
                                }

                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName
                        },
                        textStyle:{
                            color:_this.xAxis.axisLabel.color,
                            fontSize:_this.xAxis.axisLabel.fontSize,
                        },
                    }
                    if(_this.dataZoomShow){
                        var dataZoom = [{
                            height: 12,
                            xAxisIndex: [
                                0
                            ],
                            bottom:'8%',
                            orient: 'vertical',
                            start: 40,
                            end: 90,
                            handleStyle:{
                                color:"#d3dee5",
                            },
                            textStyle:{
                                color:"#418eff"},
                            borderColor:"#90979c"
                        }]
                    }else{
                        var dataZoom = ''
                    }
                }else{
                    _this.xAxisType = 'value'
                    _this.xAxisData = ''
                    _this.yAxisType = 'category'
                    _this.yAxisData = _this.barEchartsData.xAxisData
                    var xAxisLabel = {
                        show:_this.xAxis.axisLabel.show,
                        textStyle:{
                            color:_this.xAxis.axisLabel.color,
                            fontSize:_this.xAxis.axisLabel.fontSize,
                        },
                        formatter:function(value) {
                            value = _this.dataProcess(value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num
                            return value
                        },
                    }
                    var yAxisLabel = {
                        show:_this.yAxis.axisLabel.show,
                        textStyle:{
                            color:_this.yAxis.axisLabel.color,
                            fontSize:_this.yAxis.axisLabel.fontSize,
                        },
                    }
                    if(_this.dataZoomShow){
                        var dataZoom = [{
                            height: '70%',
                            yAxisIndex: [
                                0
                            ],
                            left:'1%',
                            orient: 'vertical',
                            start: 40,
                            end: 90,
                            handleStyle:{
                                color:"#d3dee5",
                            },
                            textStyle:{
                                color:"#418eff"},
                            borderColor:"#90979c"
                        }]
                    }else{
                        var dataZoom = ''
                    }
                }
                if(_this.isShowMax){
                    _this.intervalData = 'max'
                }else{
                    _this.intervalData = null
                }
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter:function(params){
                            var relVal = '';
                            for (var i = 0; i < params.length; i++) {
                                if(params[i].seriesName=='达成率' || params[i].seriesName=='贡献率'){
                                    relVal += params[i].marker+params[i].seriesName+':'+_this.dataProcess(params[i].value,'percent').num+_this.dataProcess(params[i].value,'percent').unit+'</br>'
                                }else{
                                    console.log(_this.dataProcess(params[i].value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num)
                                    relVal += params[i].marker+params[i].seriesName+':'+_this.dataProcess(params[i].value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).num+_this.dataProcess(params[i].value,_this.barEchartsData.unit[0],_this.barEchartsData.unit[1]).unit+'</br>'
                                }
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
                        show:_this.legendShow,
                        data: legendList,
                        bottom: "3%",
                        itemGap: 50,
                        textStyle: {
                            color: "#333333",
                            fontSize:14
                        }
                    },
                    dataZoom: dataZoom,
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
                        axisLabel:xAxisLabel,
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
                        axisLabel:yAxisLabel,
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
