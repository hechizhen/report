
<template>
    <div class="gauge">
        <div :id="gaugeChartData.id" class="gaugeChart">

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
                    data:80,
                    id:'gauge2Id',
                    color:'#f9ad4b'
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
            var _this = this
            let echarts = _this.$echarts;
            _this.myChart = echarts.init(document.getElementById(_this.gaugeChartData.id))
            _this.setChartOption()
            $(window).resize(function() {
                _this.myChart.resize()
            });
        },
        methods: {
            setChartOption(){
                var _this = this
                var dataArr = [{
                    // show: false,
                    value: _this.gaugeChartData.data
                }];
                var value = dataArr[0].value;
                // var degrees = 180 - (180 * value / 15); //蓝色刻度尺计算
                var degrees = 180 - (180 * value / 100); //蓝色刻度尺计算
                // 蓝色背景
                var num = value / 100;
                var colorSet = [
                    [num, '#ffffff'],
                    [1, _this.gaugeChartData.color]
                ];
                var rich = {
                    gray: {
                        fontSize: 20,
                        color: '#fff',
                        padding: 8
                    },
                    white: {
                        fontSize: 30,
                        fontWeight: 700,
                        color: '#fff'
                    }
                }
                var option = {
                    series: [
                        // {
                        //     name: "白色圈刻度",
                        //     type: "gauge",
                        //     radius: "130%",
                        //     splitNumber: 5,
                        //     center: ["50%", "85%"],
                        //     startAngle: 180, //刻度起始
                        //     endAngle: 0, //刻度结束
                        //     z: 4,
                        //     axisTick: {
                        //         show: false
                        //     },
                        //     splitLine: {
                        //         length: 10, //刻度节点线长度
                        //         lineStyle: {
                        //             width: 2,
                        //             color: '#FFF'
                        //         } //刻度节点线
                        //     },
                        //     axisLabel: {
                        //         show: false,
                        //         color: '#',
                        //         fontSize: 12,
                        //     }, //刻度节点文字颜色
                        //     pointer: {
                        //         show: false
                        //     },
                        //     axisLine: {
                        //         lineStyle: {
                        //             opacity: 0
                        //         }
                        //     },
                        //     detail: {
                        //         show: false
                        //     },
                        //     data: [{
                        //         value: 0,
                        //         name: ""
                        //     }]
                        // },
                        // {
                        //     name: '外圈刻度m', //刻度背景
                        //     type: 'gauge',
                        //     z: 2,
                        //     radius: '174%',
                        //     splitNumber: 5,
                        //     startAngle: 180,
                        //     endAngle: 0,
                        //     min: 0,
                        //     max: 100,
                        //     center: ["52%", "85%"], //整体的位置设置
                        //     axisLine: { // 坐标轴线
                        //     show: true,
                        //         lineStyle: { // 属性lineStyle控制线条样式
                        //             color: [
                        //                 [0.8, '#5facfd'],
                        //                 [1, '#5facfd']
                        //             ],
                        //             width: 2,
                        //             opacity: 1, //刻度背景宽度
                        //         }
                        //     },
                        //     splitLine: {
                        //         show: false
                        //     },
                        //     data: [{
                        //         show: false,
                        //         value: '80'
                        //     }],
                        //     axisLabel: {
                        //         show: true,
                        //         distance: 0,
                        //         //   distance: 10,
                        //         formatter:function(value){
                        //             console.log(value)
                        //             return value+'%'
                        //         },
                        //         textStyle: {
                        //             color: '#fff',
                        //             fontSize: '12',
                        //         },
                        //     },
                        //     pointer: {
                        //         show: false
                        //     },
                        //     axisTick: {
                        //         show: false
                        //     },
                        //     detail: {
                        //         show: 0
                        //     }
                        // },
                        {
                            name: '蓝圈背景', //刻度背景
                            type: 'gauge',
                            z: 2,
                            radius: '120%',
                            splitNumber: 5,
                            startAngle: 180,
                            endAngle: 0,
                            min: 0,
                            max: 100,
                            center: ["50%", "80%"], //整体的位置设置
                            axisLine: { // 坐标轴线
                                lineStyle: { // 属性lineStyle控制线条样式
                                    color: colorSet,
                                    width: 5,
                                    opacity: 1, //刻度背景宽度
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            data: [{
                                show: false,
                                value: '80'
                            }],
                             axisLabel: {
                                show: true,
                                distance: -10,
                                //   distance: 10,
                                formatter:function(value){
                                    return value+'%'
                                },
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '12',
                                },
                            },
                            pointer: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            detail: {
                                show: 0
                            }
                        },
                        // {
                        //     name: '刻度尺', //刻度背景
                        //     type: 'gauge',
                        //     z: 2,
                        //     radius: '115%',
                        //     splitNumber: 5,
                        //     startAngle: 180,
                        //     endAngle: 0,
                        //     // min: 0,
                        //     // max: 15,
                        //     center: ["50%", "75%"], //整体的位置设置
                        //     axisLine: { // 坐标轴线
                        //         lineStyle: { // 属性lineStyle控制线条样式
                        //             color: [
                        //                 [0.8, '#5facfd'],
                        //                 [1, '#5facfd']
                        //             ],
                        //             width: 25,
                        //             opacity: 0, //刻度背景宽度
                        //         }
                        //     },
                        //     data: [{
                        //         show: false,
                        //         value: '80'
                        //     }],
                        //     axisLabel: {
                        //         show: false
                        //     },
                        //     pointer: {
                        //         show: false
                        //     },
                        //     axisTick: {
                        //         show: true,
                        //         lineStyle: {
                        //             color: '#222E48',
                        //             width: 3
                        //         },
                        //         length: 8,
                        //         splitNumber: 5,
                        //     },
                        //     detail: {
                        //         show: 0
                        //     },
                        //     splitLine: {
                        //         length: 25, //刻度节点线长度
                        //         lineStyle: {
                        //             width: 3,
                        //             color: '#222E48'

                        //         } //刻度节点线
                        //     },
                        // },
                        {
                            name: '蓝色刻度尺', //刻度背景
                            type: 'gauge',
                            z: 4,
                            radius: '115%',
                            splitNumber: 5,
                            startAngle: 180,
                            endAngle: degrees,
                            // min: 0,
                            // max: 15,
                            center: ["50%", "80%"], //整体的位置设置
                            axisLine: { // 坐标轴线
                                lineStyle: { // 属性lineStyle控制线条样式
                                    color: colorSet,
                                    width: 5,
                                    opacity: 0, //刻度背景宽度
                                }
                            },
                            data: dataArr,
                            axisLabel: {
                                show: false
                            },
                            pointer: {
                                show: false
                            },
                            axisTick: {
                                show: true,
                                lineStyle: {
                                    color: '#fff',
                                    width: 3
                                },
                                length: 6,
                                splitNumber: 5,
                            },
                            detail: {
                                formatter: function(params) {
                                    return '{gray|' + _this.gaugeChartData.name + '\n' + '}{white|' + _this.gaugeChartData.data+'%' + '}'
                                },
                                rich: rich,
                                offsetCenter: ['0', '-26%'],
                                show:false,
                            },
                            splitLine: {
                                length: 10, //刻度节点线长度
                                lineStyle: {
                                    width: 3,
                                    color: '#fff'
                                } //刻度节点线
                            },
                        },
                    ]
                };
                _this.myChart.setOption(option);
            }
        },
        computed:{

        },
        watch: {
            gaugeChartData(val){
                var _this = this
                let echarts = _this.$echarts;
                _this.myChart = echarts.init(document.getElementById(_this.gaugeChartData.id))
                _this.setChartOption()
           }
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
