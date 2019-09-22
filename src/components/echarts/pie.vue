
<template>
    <div class="pie">
        <div :id="pieEchartsData.id" class="pieChart">
            
        </div>
        <div class="pieBox">
            <p :style="{color:defaultColor}">{{defaultTxt}}</p>
            <p>{{defaultVal}}</p>
        </div>
        <ul>
            <li v-for="(item,index) in pieEchartsData.pieData" :key="index" @mouseover="limouseover(item,index)">
                <p :style="{background:pieEchartsData.colorList[index]}"></p>
                <p>{{item.name}}</p>
            </li>
        </ul>
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
            },
            //图例是否可点击
            selectedMode:{
                type:Boolean,
                default:false
            }
        },
        components : {

        },
        data () {
            return {
                defaultTxt:this.pieEchartsData.pieData[0].name,
                defaultVal:'',
                defaultColor:this.pieEchartsData.colorList[0],
                sumData:''
            }
        },
        mounted () {
            var _this = this
            var sum = []
            _this.pieEchartsData.pieData.map((item,index) => {
                sum.push(item.value)
            })
            this.sumData = sum.reduce(function(prev,cur,index,array){
                return prev + cur
            })
            this.defaultVal = (((this.pieEchartsData.pieData[0].value)/this.sumData)*100).toFixed(2)+'%'
            let echarts = _this.$echarts;
            _this.myChart = echarts.init(document.getElementById(_this.pieEchartsData.id))
            _this.setPieOptions()
            $(window).resize(function() {
                _this.myChart.resize()
            });
        },
        methods: {
            limouseover(item,index){
                this.defaultTxt = item.name
                this.defaultColor = this.pieEchartsData.colorList[index]
                this.defaultVal = ((item.value)/this.sumData*100).toFixed(2)+'%'
            },
            remToPx(rem) {
                var width = window.screen.width
                if(width<=1400){
                    var fontSize = 14
                    var fontSize1 = 16
                }else{
                    var fontSize = 18
                    var fontSize1 = 22
                }
                return {
                    fontSize,fontSize1
                }
            },
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
                    // legend: {
                    //     orient: "horizontal",
                    //     icon:"rect",
                    //     bottom: "8%",
                    //     itemGap: 10,
                    //     data: legendList,
                    //     itemWidth: 18,
                    //     itemHeight: 18,
                    //     formatter :function(name){
                    //         return ''+name
                    //     },
                    //     textStyle: {
                    //         color: "#333333",
                    //         fontSize:14
                    //     },
                    //     // selectedMode:_this.selectedMode,
                    // },
                    series: [{
                        type: 'pie',
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        // minAngle: 10, //最小的扇区角度（0 ~ 360）
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
                            //     position: 'center',
                            //     // formatter: '{text|{b}}\n{c} ({d}%)',
                            //     formatter: '{text|{b}}\n{d}%',
                            //     rich: {
                            //         text: {
                            //             color: "#666",
                            //             fontSize: _this.remToPx().fontSize,
                            //             align: 'center',
                            //             verticalAlign: 'middle',
                            //             padding: 8
                            //         },
                            //         value: {
                            //             color: "#8693F3",
                            //             fontSize: _this.remToPx().fontSize1,
                            //             align: 'center',
                            //             verticalAlign: 'middle',
                            //         },
                            //     }
                            // },
                            // emphasis: {
                            //     show: true,
                            //     textStyle: {
                            //         fontSize: 24,
                            //     }
                            // }
                            }
                        },
                        data: _this.pieEchartsData.pieData
                    }]
                };
                _this.myChart.setOption(option);
                _this.myChart.on('mouseover', function(params) {
                    console.log(params)
                    _this.defaultTxt=params.name
                    _this.defaultVal=params.percent+'%'
                    _this.defaultColor = params.color
                });
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
        position: relative;
        .pieChart{
            width:100%;
            height:100%;
        }
        .pieBox{
            position: absolute;
            right:0;
            top:140px;
            left: 0;
            margin:0 auto;
            text-align: center;
            p:first-child{
                font-size: 24px;
            }
            p:nth-child(2){
                font-size: 20px;
                color:#333
            }
        }
        ul{
            width:100%;
            height:40px;
            position: absolute;
            bottom:20px;
            display: flex;
            align-items: center;
            justify-content: center;
            li{
                display: flex;
                align-items: center;
                margin-left:15px;
                cursor: pointer;
                float: left;
                text-align: center;
                p:first-child{
                    width:12px;
                    height:12px;
                }
                p:nth-child(2){
                    color:rgba(152,162,180,1);
                    font-size: 16px;
                    margin-left:5px;
                }
            }
        }
    }
</style>
