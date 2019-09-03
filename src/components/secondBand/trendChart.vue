<template>
	<div class="thendChart">
		<div class="echarts">
			<loading-data :isShow="isShow"></loading-data>
			<div class="title">
				<a-Row class="thendChartRow">
				  <a-Col :span="12" class="thendChartCol1">
				  	<div class="echartstitle">
				  		<div></div>
				  		<div>订单走势图</div>
				  	</div>
				  </a-Col>
				  <a-Col :span="12" class="thendChartCol2">
				  	单位：万元
				  </a-Col>
				</a-Row>
			</div>
			<div class="lineEcharts">
				<echartsline :lineEchartsData="direction.config" :xAxis="direction.xAxis" :yAxis="direction.yAxis" :legendShow="false" :grid="grid" v-if="direction.length != 0" :dataZoomShow="false"></echartsline>
			</div>
		</div>
	</div>
</template>
<script>
	import echartsline from "./../echarts/line.vue"
	import loadingData from '../base/loadingData'
	export default {
		name:'thendChart',
		components:{
			echartsline,
			loadingData
		},
		props:{
			trendChartClick:{
				type:Function
			},
			lineEchartsData:{
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
				direction:this.lineEchartsData,
				grid:{
					top: '5%',
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    // height: '100%',
                    containLabel: true
				}
			}
		},
		mounted(){
			console.log(this.lineEchartsData)
		},
		methods:{
			thendChartClick(){
				this.trendChartClick()
			},
		},
		watch:{
            lineEchartsData(val){
                this.direction = val;
            }
        },
	}
</script>
<style lang="less" scoped>
	.thendChart {
		margin-top: .7rem;
		height: 6.83rem;
		width: 100%;
		.echarts {
			height: 100%;
			width: 100%;
			padding: 0 20px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			position: relative;
			.title {
				height: 15%;
				width: 100%;
				.thendChartRow {
					height: 100%;
					width: 100%;
					.echartstitle {
						display: flex;
						align-items: center;
						div:nth-child(1) {
							margin-right: 5px;
							width: 12px;
						    height: 4px;
						    background: #2d92fc;
						    border-radius: 2px;
						}
					}
				}
				.thendChartCol1 {
					height: 100%;
					display: flex;
					align-items: center;
					font-size:16px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				.thendChartCol2 {
					position: relative;
					height: 100%;
					display: flex;
					align-items: center;
					nt-size:14px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					justify-content: flex-end;
					padding-right: 5%;
					span {
						position: absolute;
						top: 8px;
						right: 8px;
						color: rgba(180, 180, 180, 1);
						cursor: pointer;
					}
					i{
						font-size: 20px;
					}
				}
			}
			.lineEcharts {
				height: 85%;
				width: 100%;
			}
		}
	}
</style>
