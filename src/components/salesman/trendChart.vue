<template>
	<div class="thendChart">
		<div class="echarts">
			<div class="title">
				<a-Row class="thendChartRow">
				  <a-Col :span="12" class="thendChartCol1">
				  	走势图
				  </a-Col>
				  <a-Col :span="12" class="thendChartCol2">
				  	单位：万元  <span @click="thendChartClick">
						  <i class="iconfont icon-guanbi"></i>
					  </span>
				  </a-Col>
				</a-Row>
			</div>
			<div class="lineEcharts">
				<echartsline :lineEchartsData="direction"></echartsline>
			</div>
		</div>
		<loading-data :isShow="isShow"></loading-data>
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
				// isShow:true
			}
		},
		mounted(){
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
			height: 70%;
			width: 80%;
			background:rgba(255,255,255,1);
			border-radius: 5px;
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
					padding-right: 10%;
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
				height: 90%;
				width: 100%;
			}
		}
	}
</style>
