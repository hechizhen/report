<template>
	<div class="thendChart">
		<div class="echarts">
			<div class="title">
				<a-Row class="thendChartRow">
				  <a-Col :span="12" class="thendChartCol1">
				  	<div :class="{'active':switchedIndex == 1}" @click="switched('达成')">
				  		<p>达成</p>
				  		<p></p>
				  	</div>
				  	<div :class="{'active':switchedIndex == 2}" @click="switched('贡献')">
				  		<p>贡献</p>
				  		<p></p>
				  	</div>
				  </a-Col>
				  <a-Col :span="12" class="thendChartCol2">
				  			<div>单位：万元</div>
							<newbutton  :defaultVal="defaultVal" :buttonHandleClick ="exportClick" style="margin-left:4%" :txtStyle="txtStyle" :btnStyle="btnStyle"></newbutton>
				  			<span @click="thendChartClick('关闭')"><i class="iconfont icon-guanbi"></i></span>
				  </a-Col>
				</a-Row>
			</div>
			<div class="lineEcharts">
				<div style="height:100%;width:100%" v-if="isswitched">
					<barEcharts :barEchartsData="salesmanReachedData" :barType="salesmanReachedData.barType" :dataZoomShow="true" :selectedMode="false"></barEcharts>
					<loading-data :isShow="salesmanReachedBar"></loading-data>
				</div>
				<div style="height:100%;width:100%" v-if="!isswitched">
					<barEcharts :barEchartsData="salesmanContributionData" :barType="salesmanContributionData.barType" :dataZoomShow="true" :selectedMode="false"></barEcharts>
					<loading-data :isShow="salesmanContributionBar"></loading-data>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import barEcharts from "./../echarts/bar.vue"
	import loadingData from '../base/loadingData'
	import newbutton from '../button'
	export default {
		name:'thendChart',
		components:{
			barEcharts,
			loadingData,
			newbutton
		},
		props:{
			trendChartClick:{
				type:Function
			},
			salesmanReachedDetail:{
				type:Object,
				default:{}
			},
			salesmanContributionDetail:{
				type:Object,
				default:{}
			},
			salesmanContributionBar:{
				type:Boolean,
				default:false,
			},
			salesmanReachedBar:{
				type:Boolean,
				default:false,
			},
			exportData:{
				type:Object
			}
		},
		mounted(){
		},
		data(){
			return {
				//导出按钮样式
				defaultVal:"导出数据",
				// isShow:true,
				switchedIndex: 1,
				isswitched:true,
				salesmanReachedData:{
					id:'barSalesManId',
					unit:['money','tenth'],
					xAxisData:this.salesmanReachedDetail.xAxisData,
					label:{
						isShow:false
					},
					type:'xAxis',
					barData:this.salesmanReachedDetail.seriesData,
					showType:1,//0横过来 1竖起来
					markLineList:{
						show:false
					},
					barType:1
                },
                xAxis:{
	                axisLine:{
	                    show:true,
	                    color:'#3699FF'
	                },
	                axisLabel:{
	                    show:true,
	                    color:'#333333',
	                    fontSize:18
	                },
	                splitLine:{
	                    show:true,
	                    color:'#CCCCCC'
	                },
	            },
	            yAxis:{
	                axisLine:{
	                    show:true,
	                    color:'#3699FF'
	                },
	                axisLabel:{
	                    show:true,
	                    color:'#333333',
	                    fontSize:18
	                },
	                splitLine:{
	                    show:false,
	                    color:'#CCCCCC'
	                },
	            },
	            salesmanContributionData:{
					id:'barSalesManId',
					unit:['money','tenth'],
					xAxisData:this.salesmanContributionDetail.xAxisData,
					label:{
						isShow:false
					},
					type:'xAxis',
					barData:this.salesmanContributionDetail.seriesData,
					showType:1,//0横过来 1竖起来
					markLineList:{
						show:true
					},
					barType:1
                },
				// 按鈕樣式
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
		mounted(){
		},
		methods:{
			thendChartClick(a){
				this.trendChartClick(a)
			},
			switched(a){
				if( a == '达成'){
					this.switchedIndex = 1;
					this.isswitched = true;
				}else {
					this.switchedIndex = 2;
					this.isswitched = false;
				}
			},
			//导出数据
			exportClick(){
				this.exportHandleClick(this.exportData.headerTxt,this.exportData.headerKey,this.exportData.data,this.exportData.name)
			}
		},
		watch:{
            salesmanReachedDetail(value){
            	this.salesmanReachedData = {
					id:'barSalesManId',
					unit:['money','tenth'],
					xAxisData:value.xAxisData,
					label:{
						isShow:false
					},
					type:'xAxis',
					barData:value.seriesData,
					showType:1,//0横过来 1竖起来
					markLineList:{
						show:false
					},
					barType:1
				}
				deep:true
            },
            salesmanContributionDetail(value){
            	this.salesmanContributionData = {
					id:'barSalesManId',
					unit:['money','tenth'],
					xAxisData:value.xAxisData,
					label:{
						isShow:false
					},
					type:'xAxis',
					barData:value.seriesData,
					showType:1,//0横过来 1竖起来
					markLineList:{
						show:false
					},
					barType:1
				}
				deep:true
            }
        },
	}
</script>
<style lang="less" scoped>
	.thendChart {
		position: fixed;
		left: 0px;
		top: 0px;
		z-index: 120;
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
					padding-left: 4%;
					font-size:20px;
					font-weight:500;
					color:rgba(0,0,0,1);
					display: flex;
					align-items: center;
					div {
						height: 100%;
						padding: 0 20px;
						p {
							margin: 0px;
							font-size:24px;
							font-weight:500;
							color:rgba(51,51,51,1);
							display: flex;
							align-items: center;
							justify-content: center;
						}
						p:nth-child(1) {
							height: 94%;
							width: 100%;
						}
						p:nth-child(2) {
							height: 6%;
							width: 100%;
							background-color: #fff;
						}
					}
					.active {
						p:nth-child(1) {
							color:rgba(45,146,252,1);
						}
						p:nth-child(2) {
							background:rgba(45,146,252,1);
							border-radius:3px;
						}
					}
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
