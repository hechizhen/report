
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
                    ]
                })
            }
        },
        components : {

        },
        data () {
            return {

            }
        },
        mounted () {
            console.log('22222222222222222')
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
                _this.lineEchartsData.lineData.map(function(item,index){
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
                        data: _this.lineEchartsData.xAxisData,
                        axisLine: {
                            lineStyle: {
                                color: "#333333"
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'solid',
                                color: '#DDD'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#333333"
                            },
                        },
                        nameTextStyle: {
                            color: "#999"
                        },
                        splitArea: {
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
            lineEchartsData(val){
                var _this = this
                let echarts = _this.$echarts;
                _this.myChart = echarts.init(document.getElementById(_this.lineEchartsData.id))
                _this.setLineOptions()
            }
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
