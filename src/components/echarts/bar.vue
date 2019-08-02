
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
                default:{
                    id:'barId',
                    xAxisData:[1,2,3,4,5,6,7,8,9,10],
                    xAxis:{
                        isShowLine:false,
                        isShowSplit:false,
                        axisLabelColor:'#333',
                    },
                    yAxis:{
                        isShowLine:false,
                        isShowSplit:false,
                        axisLabelColor:'#333',
                    },
                    label:{
                        isShow:false
                    },
                    type:'xAxis',
                    barData:[ 
                        {
                            name:'ABC',
                            data:[200,300,400,500,600],
                            color:'red',
                            barWidth:11,
                        },
                        {
                            name:'ABC11',
                            data:[300,400,500,100,123],
                            color:'blue',
                            barWidth:11,
                        },
                        {
                            name:'ABC33',
                            data:[333,444,555,666,777],
                            color:'yellow',
                            barWidth:11,
                        }
                    ]
                }
            }
        },
        components : {
   
        },
        data () {
            return {
                
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
                let seriesData = []
                _this.barEchartsData.barData.map(function(item,index){
                    seriesData.push({
                        name: item.name,
                        type: 'bar',
                        data: item.data,
                        itemStyle:{
                            normal:{
                                color: item.color,
                            },
                        },
                        barWidth:item.barWidth,
                        label:{
                            normal:{
                                show:_this.barEchartsData.label.isShow,
                                position: 'top'
                            }
                        }
                    })
                })
                console.log(seriesData)
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        color: ["#F58080", "#47D8BE", "#F9A589"],
                        data: ['新报', '流失', '续费'],
                        left: 'center',
                        bottom: 'bottom'
                    },
                    grid: {
                        top: 'middle',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        height: '80%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: _this.barEchartsData.xAxisData,
                        axisLine: {
                            show: _this.barEchartsData.xAxis.isShowLine,
                            lineStyle: {
                                color: "#65E6F5"
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                color:_this.barEchartsData.xAxis.axisLabelColor
                            }
                        },
                        splitLine: {
                            show: _this.barEchartsData.xAxis.isShowSplit,
                            lineStyle: {
                                color: '#DDD'
                            }
                        },
                        axisTick:{
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show:_this.barEchartsData.yAxis.isShowSplit,
                            lineStyle: {
                                color: '#DDD'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                color:_this.barEchartsData.yAxis.axisLabelColor
                            }
                        },
                        axisLine: {
                            show: _this.barEchartsData.yAxis.isShowLine,
                            lineStyle: {
                                color: "#65E6F5"
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
           barEchartsData(val){
                var _this = this  
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
