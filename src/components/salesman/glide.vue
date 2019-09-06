<template>
	<div class="thendChart">
		<div class="echarts">
			<div class="title">
				<a-Row class="thendChartRow">
				  <a-Col :span="12" class="thendChartCol1">
				  	下滑人员
				  </a-Col>
				  <a-Col :span="12" class="thendChartCol2">
				  	<div>单位：万元</div>
					<!-- <div @click="thendChartClick('导出')">导出数据</div> -->
					<newButton defaultVal="导出数据" :buttonHandleClick="thendChartClick" style="margin-left:4%" :btnStyle="btnStyle" :txtStyle="txtStyle"></newButton>
				  	<span @click="thendChartClick('关闭')"><i class="iconfont icon-guanbi"></i></span>
				  </a-Col>
				</a-Row>
			</div>
			<div class="lineEcharts">
				<barEcharts :barEchartsData="barEcharts"></barEcharts>
			</div>
			<loading-data :isShow="isShow"></loading-data>
		</div>
	</div>
</template>
<script>
	import barEcharts from "./../echarts/bar1.vue"
	import loadingData from '../base/loadingData'
	import newButton from '../button'
	export default {
		name:'thendChart',
		components:{
			barEcharts,
			loadingData,
			newButton
		},
		props:{
			trendChartClick:{
				type:Function
			},
			salesmandownward:{
				type:Object,
				default:{}
			},
			isShow:{
				type:Boolean,
				default:false,
			}
		},

		data(){
			return {
				// isShow:true,
				barEcharts:{
                    id:'barDownManId',
                    unit:['money','tenth'],
                    xAxisData:this.salesmandownward.xAxisData,
                    label:{
                        isShow:false
                    },
                    type:'xAxis',
                    barData:this.salesmandownward.seriesData,
                    showType:0,//0横过来 1竖起来
                    markLineList:{
                        show:false
                    }
                },
				btnStyle:{
					width: '98px',
					height: '30px',
					border: '1px solid #959595',
					// hover:{
					// 	color:'red'
					// }
				},
				txtStyle:{
					fontSize:'16px',
					color:'#333333',
					fontWeight:400
				},
			}
		},
		mounted () {
		},
		methods:{
			thendChartClick(a){
				this.trendChartClick(a)
			}
		},
		watch:{
            salesmandownward(val){
            	this.barEcharts = {
                    id:'barDownManId',
                    unit:['money','tenth'],
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
		background-color: rgba(0,0,0,0.5);
		.echarts {
			height: 70%;
			width: 80%;
			background:rgba(255,255,255,1);
			border-radius: 5px;
			position: relative;
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
					padding-left: 4%;
					font-size:20px;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
				.thendChartCol2 {
					position: relative;
					height: 100%;
					display: flex;
					align-items: center;
					font-size:16px;
					font-weight:400;
					color:rgba(51,51,51,1);
					justify-content: flex-end;
					padding-right: 10%;
					// div:nth-child(2) {
					// 	padding: 4px 20px;
					// 	border: 1px solid #ccc;
					// 	margin-left: 6%;
					// }
					span {
						position: absolute;
						top: 0.1rem;
						right: 15px;
						color: rgba(180, 180, 180, 1);
						cursor: pointer;
					}
					i{
						font-size: 40px;
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
