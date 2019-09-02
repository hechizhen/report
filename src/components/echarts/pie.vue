
<template>
    <div class="pie">
        <div :id="pieEchartsData.id" class="pieChart">

        </div>
    </div>
</template>
<script>

    export default {
        name : 'pie',
        props:{
            pieEchartsData:{
                type:Object,
                default: () => ({
                    id:'pieId',
                    colorList:['#FF8352', '#E271DE', '#00FFFF', '#4AEAB0'],
                    pieData:[{
                                value: 2154,
                                name: 'TV'
                            }, {
                                value: 3854,
                                name: '盒子'
                            }, {
                                value: 3854,
                                name: '基础盒子'
                            }, {
                                value: 3515,
                                name: '高级盒子'
                            }, {
                                value: 3515,
                                name: 'PC'
                            }],
                    radius:['40%', '60%'],
                    borderWidth:0,
                })
            },
            //是否显示图标
            legendShow:{
                type:Boolean,
                default: false
            },
            //饼图点击事件
            chartHandleClick:{
                type:Function
            },
            position:{
                type:Array,
                default:()=>['50%','50%']
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
            _this.myChart = echarts.init(document.getElementById(_this.pieEchartsData.id))
            _this.setPieOptions()
            $(window).resize(function() {
                _this.myChart.resize()
            });
        },
        methods: {
            setPieOptions(){
                var _this = this
                var scale = 1;
                var rich = {
                    yellow: {
                        color: "#98A2B4",
                        fontSize: 16 * scale,
                        padding: [5, 4],
                        align: 'center'
                    },
                    blue: {
                        color: '#333333',
                        fontSize: 18 * scale,
                        align: 'center'
                    },
                };
                let legendList=[]
                _this.pieEchartsData.pieData.map(function(item){
                    legendList.push(item.name)
                })
                var option = {
                    color:_this.pieEchartsData.colorList,
                    legend: {
                        orient: "horizontal",
                        icon:"rect",
                        bottom: "8%",
                        itemGap: 40,
                        data: legendList,
                        itemWidth: 18,
                        itemHeight: 18,
                        formatter :function(name){
                            return ''+name
                        },
                        textStyle: {
                            color: "#333333",
                            fontSize:14
                        }
                    },
                    series: [{
                        type: 'pie',
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        minAngle: 10, //最小的扇区角度（0 ~ 360）
                        radius: ["40%", "70%"],
                        center: ["50%", "40%"],
                        avoidLabelOverlap: false,
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#ffffff',
                                borderWidth: _this.pieEchartsData.borderWidth,
                            },
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                // formatter: '{text|{b}}\n{c} ({d}%)',
                                formatter: '{text|{b}}\n{d}%',
                                rich: {
                                    text: {
                                        color: "#666",
                                        fontSize: 18,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        padding: 8
                                    },
                                    value: {
                                        color: "#8693F3",
                                        fontSize: 24,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                    },
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 24,
                                }
                            }
                        },
                        data: _this.pieEchartsData.pieData
                    }]
                };
                _this.myChart.setOption(option);
                setTimeout(function() {
                    _this.myChart.on('mouseover', function(params) {
                        if (params.name == _this.pieEchartsData.pieData[0].name) {
                            _this.myChart.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 0,
                                dataIndex: 0
                            });
                        } else {
                            _this.myChart.dispatchAction({
                                type: 'downplay',
                                seriesIndex: 0,
                                dataIndex: 0
                            });
                        }
                    });

                    _this.myChart.on('mouseout', function(params) {
                        _this.myChart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: 0
                        });
                    });
                    _this.myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: 0
                    }); 
                }, 1000);
            }
        },
        computed:{

        },
        watch:{
            pieEchartsData(val){
                var _this = this
                let echarts = _this.$echarts;
                _this.myChart = echarts.init(document.getElementById(_this.pieEchartsData.id))
                _this.setPieOptions()
            }
        },
        distroyed: function () {

        }
    }
</script>
<style scoped lang="less">
    .pie{
        width:100%;
        height:100%;
        .pieChart{
            width:100%;
            height:100%;
        }
    }
</style>
