
<template>
    <div class="line">
        <div :id="lineEchartsData.id" :class="legendShow ? 'lineChart' : 'lineChart1'">

        </div>
        <div v-if="legendShow" class="checkBoxList">
            <!-- <a-checkbox-group @change="onChange">
                <a-checkbox v-for="(item,index) in legendList" :key="index" :value="item">{{item}}</a-checkbox>
            </a-checkbox-group> --> 
            <!-- <a-checkbox v-for="(item,index) in legendList" :key="index" :value="item" @change="onChange" :defaultChecked="index==0 ? true : false">{{item}}</a-checkbox> -->
            <ul>
                <li v-for="(item,index) in legendList" :key="index" :value="item" @change="onChange" :defaultChecked="index==0 ? true : false">
                    <p @click="onChange(item.name,index)">
                        <i class="iconfont icon-gou" v-if="item.flag" :style="{color:colorList[index]}"></i>
                    </p>
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <!-- :defaultChecked="index==0 ? true : false" -->
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
                    //id
                    id:'lineId',
                    //x轴数据
                    xAxisData:[1,2,3,4,5,6,7,8,9,10],
                    //折线图数据
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
            //是否显示图例
            legendShow:{
                type:Boolean,
                default:true,
            },
            //数据过滤模式
            dataZoomShow:{
                type:Boolean,
                default:false
            },
            //x轴数据
            xAxis:{
                default: () => ({

                    //x轴
                    axisLine:{
                        show:true,
                        color:'#3699FF'
                    },
                    //x轴文字
                    axisLabel:{
                        show:true,
                        color:'#333333',
                        fontSize:14,
                        rotate:0
                    },
                    //网格线
                    splitLine:{
                        show:false,
                        color:'#e3e3e3'
                    },
                })
            },
            //y轴
            yAxis:{
                default: () => ({
                    //y轴
                    axisLine:{
                        show:true,
                        color:'#3699FF'
                    },
                    //y轴文字
                    axisLabel:{
                        show:true,
                        color:'#333333',
                        fontSize:14
                    },
                    //网格线
                    splitLine:{
                        show:true,
                        color:'#e3e3e3'
                    },
                })
            },
            grid: {
                default: () => ({
                    // top: 'middle',
                    left: '6%',
                    right: '6%',
                    bottom: '5%',
                    // height: '70%',
                    // containLabel: true
                })
            },

        },
        components : {

        },
        data () {
            return {
                legendList:'',
                colorList:''
            }
        },
        mounted () {
            var _this = this
            let echarts = _this.$echarts;
            _this.myChart = echarts.init(document.getElementById(_this.lineEchartsData.id))
            _this.setLineOptions()
            $(window).resize(function() {
                _this.myChart.resize()
            });
        },
        methods: {
            //选择checkbox
            onChange (checkedValues,index) {
                this.legendList[index].flag = !this.legendList[index].flag
                this.myChart.dispatchAction({
                    type:'legendToggleSelect',
                    name:checkedValues
                })
            },
            setLineOptions(){
                var _this = this
                let seriesData = []
                let legendList = []
                let legendChartList = []
                let colorList = []
                _this.lineEchartsData.lineData.map(function(item,index){
                    legendList.push({name:item.name,flag:index==0?true:false})
                    legendChartList.push(item.name)
                    colorList.push(item.color)
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
                        symbolSize:6,
                    })
                })
                _this.legendList = legendList
                _this.colorList = colorList
                //数据处理默认只展示第一条
                var legendSelect={}
                legendChartList.map(function(item,index){
                    if(index==0){
                        legendSelect[item]=true
                    }else{
                        legendSelect[item]=false
                    }
                })
                if(_this.dataZoomShow){
                    var dataZoom =[{
                        height: 12,
                        xAxisIndex: [
                            0
                        ],
                        bottom:'8%',
                        start: 10,
                        end: 90,
                        handleStyle:{
                            color:"#d3dee5",

                        },
                        textStyle:{
                            color:"#418eff"
                        },
                        borderColor:"#90979c"
                        }, {
                        type: "inside",
                    }]
                }else{
                    var dataZoom= ''
                }
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        //     type : 'cross',        // 默认为直线，可选为：'line' | 'shadow'
                        //     // label:{
                        //     //     backgroundColor:'rgb(45, 146, 252)',
                        //     //     formatter:function(params) {
                        //     //         console.log(params)
                        //     //         if(typeof(params.value)!='string'){
                        //     //             params.value = _this.dataProcess(params.value,_this.lineEchartsData.unit[0],_this.lineEchartsData.unit[1]).num+_this.dataProcess(params.value,_this.lineEchartsData.unit[0],_this.lineEchartsData.unit[1]).unit
                        //     //         }
                        //     //         return params.value
                        //     //     }
                        //     // }
                        // },
                        formatter:function(params){
                            var relVal = params[0].name+'<br/>';
                            for (var i = 0; i < params.length; i++) {
                                relVal += params[i].marker+params[i].seriesName+':'+_this.dataProcess(params[i].value,_this.lineEchartsData.unit[0],_this.lineEchartsData.unit[1]).num+_this.dataProcess(params[i].value,_this.lineEchartsData.unit[0],_this.lineEchartsData.unit[1]).unit+'</br>'
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
                        show:false,
                        data: legendChartList,
                        bottom: "5%",
                        itemGap: 50,
                        textStyle: {
                            color: "#333333",
                            fontSize:14
                        },
                        selected: legendSelect
                    },
                    dataZoom: dataZoom,
                    grid:_this.grid,
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
                            rotate:_this.xAxis.axisLabel.rotate,
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
                            },
                            formatter:function(value) {
                                if(_this.lineEchartsData.unit[0]=='percent'){
                                    value = _this.chartDataProcess(value,_this.lineEchartsData.unit[0],_this.lineEchartsData.unit[1]).num+_this.chartDataProcess(value,_this.lineEchartsData.unit[0],_this.lineEchartsData.unit[1]).unit
                                }else{
                                    value = _this.chartDataProcess(value,_this.lineEchartsData.unit[0],_this.lineEchartsData.unit[1]).num
                                }
                                return value
                            },
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
                if(_this.legendShow){
                    option.grid.bottom = '7%'
                }
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
<style lang="less">
</style>
<style scoped lang="less">
    .line{
        width:100%;
        height:100%;
        .lineChart{
            width:100%;
            height:80%;
        }
        .lineChart1{
            width:100%;
            height:100%;
        }
        .checkBoxList{
            width:100%;
            height:20%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            overflow: auto;
            ul{
                li{
                    padding:10px;
                    float: left;
                    display: flex;
                    align-items: center;
                    p{
                        width:16px;
                        height:16px;
                        border:1px solid rgba(220,220,220,1);
                        border-radius: 2px;
                        position: relative;
                        cursor:pointer;
                        i{
                            position: absolute;
                            top:-2px;
                            left:0;
                            font-weight: bold;
                            font-size: 16px;
                        }
                    }
                    span{
                        margin-left:10px;
                    }
                }
            }
        }
    }
</style>
