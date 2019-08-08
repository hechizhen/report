<template>
	<div class="thendChart">
		<div class="echarts">
			<div class="title">
				<a-Row class="thendChartRow">
				  <a-Col :span="12" class="thendChartCol1">
				  	下滑人员
				  </a-Col>
				  <a-Col :span="12" class="thendChartCol2">
				  	单位：万元  <span @click="thendChartClick">X</span>
				  </a-Col>
				</a-Row>
			</div>
			<div class="lineEcharts">
				<barEcharts :barEchartsData="barEchartsData"></barEcharts>
			</div>
		</div>
	</div>
</template>
<script>
	import barEcharts from "./../echarts/bar.vue"
	export default {
		name:'thendChart',
		components:{
			barEcharts
		},
		props:{
			trendChartClick:{
				type:Function
			},
			salesmandownward:{
				type:Object,
				default:{}
			}
		},

		data(){
			return {
				barEchartsData:{}
			}
		},
		mounted () {
			this.barEchartsData = {
                    id:'barId',
                    unit:'%',
                    xAxisData:this.salesmandownward.xAxisData,
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
                    barData:this.salesmandownward.seriesData,
                    showType:0,//0横过来 1竖起来
                    markLineList:{
                        show:false
                    }
                }
		},
		methods:{
			thendChartClick(){
				this.trendChartClick()
			}
		},
		watch:{
            salesmandownward(val){
            	this.barEchartsData = {
                    id:'barId',
                    unit:'%',
                    xAxisData:val.xAxisData,
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
                    barData:val.seriesData,
                    showType:0,//0横过来 1竖起来
                    markLineList:{
                        show:false
                    }
                }
        	},
        },
	}
</script>
<style lang="less" scoped>
	.thendChart {
		position: fixed;
		left: 0px;
		top: 0px;
		z-index: 10;
		height: 100%;
		width: 100%;
		display: flex;
	    align-items: center;
	    justify-content: center;
		background-color: RGBA(69, 72, 90, 0.5);
		.echarts {
			height: 50%;
			width: 50%;
			background:rgba(255,255,255,1);
			.title {
				height: 10%;
				width: 100%;
				.thendChartRow {
					height: 100%;
					width: 100%;
					border-bottom: 1px solid rgba(210,210,210,1);
				}
				.thendChartCol1 {
					height: 100%;
					display: flex;
					align-items: center;
					padding-left: 10px;
					font-size:20px;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
				.thendChartCol2 {
					position: relative;
					height: 100%;
					display: flex;
					align-items: center;
					font-size:16px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					justify-content: flex-end;
					padding-right: 40px;
					span {
						position: absolute;
						top: 8px;
						right: 8px;
						color: rgba(180, 180, 180, 1);
						cursor: pointer;
					}
				}
			}
			.lineEcharts {
				height: 90%;
				width: 100%;
			}
		}
	}
</style>