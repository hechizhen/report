
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
                    labelType:1,
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
            }
        },
        components : {
   
        },
        data () {
            return {
            }
        },
        mounted () {
            console.log(this.pieEchartsData)
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
                if(_this.pieEchartsData.labelType==1){
                    var labelStyle= {
                        normal: {
                            textStyle: {
                                fontSize: 12 * scale,
                            },
                            formatter: function(params, ticket, callback) {
                                console.log(params)
                                var total = 0; //考生总数量
                                var percent = 0; //考生占比
                                _this.pieEchartsData.pieData.forEach(function(value, index, array) {
                                    total += value.value;
                                });
                                percent = ((params.value / total) * 100).toFixed(1);
                                return '{yellow|' + params.name + '}\n{blue|' + percent + '%}';
                            },
                            rich: rich
                        },
                    }
                }else if(_this.pieEchartsData.labelType==2){
                    var labelStyle =  { //标签的位置
                        normal: {
                            show: true,
                            position: 'inside', //标签的位置
                            formatter: "{d}%",
                            textStyle: {
                                color: '#fff',
                            }
                        },
                    }
                }else{
                    var labelStyle =  {
                        normal: {
                            show: false,
                        },
                    }
                }
                var option = {
                    series: [{
                        name: '在线数量',
                        type: 'pie',
                        radius: _this.pieEchartsData.radius,
                        hoverAnimation: true,
                        color: _this.pieEchartsData.colorList,
                        label: labelStyle,
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#ffffff',
                                borderWidth: _this.pieEchartsData.borderWidth,
                            },
                        },
                        labelLine: {
                            normal: {
                                length: 30 * scale,
                                length2: 20,
                                lineStyle: {
                                    color: '#C3C6CD'
                                }
                            }
                        },
                        data: _this.pieEchartsData.pieData
                    }]
                };
                this.myChart.setOption(option);
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
