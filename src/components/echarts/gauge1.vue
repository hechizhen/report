
<template>
    <div class="gauge">
        <div id="gaugeId" class="gaugeChart">

        </div>
    </div>
</template>
<script>
    export default {
        name : 'index',
        props:{
            gaugeChartData:{
                type:Object,
                default:()=>({
                    name:'总得分',
                    data:80
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
            console.log(this.gaugeChartData)
            var _this = this
            let echarts = _this.$echarts;
            _this.myChart = echarts.init(document.getElementById("gaugeId"))
            _this.setChartOption()
            $(window).resize(function() {
                _this.myChart.resize()
            });
        },
        methods: {
            setChartOption(){
                var _this = this
                var option = {
                    // title: {
                    //     show: true,
                    //     x: "center",
                    //     y: "55%",
                    //     text: _this.gaugeChartData.name,
                    // },
                    tooltip: {
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    series: [{
                        name: '在岗职工、从业人数',
                        type: 'gauge',
                        center: ['50%', '55%'], // 默认全局居中
                        radius: '95%',
                        axisLine: {
                            show: false,
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [
                                    _this.gaugeChartData.data/100, 
                                    new _this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#005bea'
                                        },
                                        {
                                            offset: 1,
                                            color: '#00c6fb'
                                        }
                                    ])
                                    ],
                                    [1, '#eef0f5']
                                ],
                                width: 7
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: false,
                            length: '0',
                            width: '0'
                        },
                        detail: {
                            formatter: '{value}',
                            offsetCenter: [0, '-10%'],
                            show:false
                        },
                        data: [{
                            value: _this.gaugeChartData.data,
                            label: {
                                textStyle: {
                                    fontSize: '0.5rem'
                                }
                            }
                        }]
                    }]
                };
                _this.myChart.setOption(option);
            }
        },
        computed:{

        },
        watch: {

        },
        distroyed: function () {

        }
    }
</script>
<style lang="less">
    .gauge{
        width:100%;
        height:100%;
        .gaugeChart{
            width:100%;
            height:100%;
        }
    }
</style>
