
<template>
    <div class="line">
        <div :id="lineEchartsData.id" class="lineChart">
            
        </div>
    </div>
</template>
<script>
  
    export default {
        name : 'pie',
        props:{
            lineEchartsData:{
                type:Object,
                default: () => ({
                    id:'lineId',
                    xAxisData:[1,2,3,4,5,6,7,8,9,10],
                    lineData:[ 
                        {
                            name:'ABC',
                            data:[200,300,400,500,600],
                            color:'red'
                        },
                        {
                            name:'ABC11',
                            data:[300,400,500,100,123],
                            color:'black'
                        },
                        {
                            name:'ABC33',
                            data:[333,444,555,666,777],
                            color:'grey'
                        }
                    ],
                })
            },
            legendShow:{
                type:Boolean,
                default:true,
            },
            xAxis:{
                default: () => ({
                    axisLine:{
                        show:true,
                        color:'#3699FF'
                    },
                    axisLabel:{
                        show:true,
                        color:'#333333',
                        fontSize:18
                    },
                    splitLine:{
                        show:false,
                        color:'#CCCCCC'
                    },
                })
            },
            yAxis:{
                default: () => ({
                    axisLine:{
                        show:true,
                        color:'#3699FF'
                    },
                    axisLabel:{
                        show:true,
                        color:'#333333',
                        fontSize:18
                    },
                    splitLine:{
                        show:true,
                        color:'#CCCCCC'
                    },
                })
            },
        },
        components : {
   
        },
        data () {
            return {

            }
        },
        mounted () {
             console.log(this.lineEchartsData)
            var _this = this  
            let echarts = _this.$echarts;
            _this.myChart = echarts.init(document.getElementById(_this.lineEchartsData.id))
            _this.setLineOptions()
            $(window).resize(function() {
                _this.myChart.resize()
            });
        },
        methods: {
            setLineOptions(){
                var _this = this
                let seriesData = []
                let legendList = []
                _this.lineEchartsData.lineData.map(function(item,index){
                    legendList.push(item.name)
                    seriesData.push({
                        name: item.name,
                        type: 'line',
                        data: item.data,
                        itemStyle:{
                            normal:{
                                color: item.color,
                            }
                        },
                        symbol: "circle",
                    })
                })
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
                        bottom: '3%',
                        height: '75%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: _this.lineEchartsData.xAxisData,
                        axisLine: {
                            show: _this.xAxis.axisLine.show,
                            lineStyle: {
                                color: _this.xAxis.axisLine.color
                            }
                        },
                        axisLabel:{
                            show:_this.xAxis.axisLabel.show,
                            textStyle:{
                                color:_this.xAxis.axisLabel.color,
                                fontSize:_this.xAxis.axisLabel.fontSize
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
                        type: 'value',
                        nameTextStyle: {
                            color: "#999"
                        },
                        splitArea: {
                            show: false
                        },
                        axisLine: {
                            show: _this.yAxis.axisLine.show,
                            lineStyle: {
                                color: _this.yAxis.axisLine.color,
                            }
                        },
                        axisLabel:{
                            show:_this.yAxis.axisLabel.show,
                            textStyle:{
                                color:_this.yAxis.axisLabel.color,
                                fontSize:_this.yAxis.axisLabel.fontSize
                            }
                        },
                        splitLine: {
                            show: _this.yAxis.splitLine.show,
                            lineStyle: {
                                color: _this.yAxis.splitLine.color,
                            }
                        },
                        axisTick:{
                            show: false
                        }
                    },
                    series: seriesData
                };
                this.myChart.setOption(option);
            }
        },
        computed:{
          
        },
        watch: {
            // lineEchartsData(val){
            //     var _this = this  
            //     let echarts = _this.$echarts;
            //     _this.myChart = echarts.init(document.getElementById(_this.lineEchartsData.id))
            //     _this.setLineOptions()
            // }
        },
        distroyed: function () {
            
        }
    }
</script>
<style scoped lang="less">
    .line{
        width:100%;
        height:100%;
        .lineChart{
            width:100%;
            height:100%;  
        }
    }
</style>
