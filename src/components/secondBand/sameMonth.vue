<template>
	<div class="sameMonth">
		<div class="sameMonthcontent">
			<div class="title">
			   <div class="titleborder"></div>
			   <div class="titletext">当月</div>
			   <div class="titleclick" @click="topographyClick">走势图</div>
			</div>
			<div class="record">
				<a-Row class="recordConten">
				  <a-Col :span="14" class="recordLeft">
				  	<div><img src="./../../assets/img/dkw_jine.png">下单金额（万元）</div>
					<div>(以创建订单日期统计)</div>
					<div><span>￥</span>{{orderAmountData.orderAmountInteger}}<span>.{{orderAmountData.orderAmountDecimal}}</span></div>
				  </a-Col>
				  <a-Col :span="10" class="recordRight">
				  	<div><img src="./../../assets/img/jine.png">毛利额（万元）</div>
					<div><span>￥</span>{{orderAmountData.grossProfit}}</div>
					<div><img src="./../../assets/img/jine.png">毛利率</div>
					<div>{{orderAmountData.grossInterestRate}}</div>
				  </a-Col>
				</a-Row>
			</div>
			<div class="proportion">
				<div class="proportion_title">占比</div>
				<div class="proportion_echarts">
					<pie :pieEchartsData="pieEchartsData"></pie>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import pie from "./../echarts/pie.vue" 
	export default {
		name:'samaMonth',
		components:{
			pie
		},
		props:{
			orderAmountData:{
				type:Object,
				default:{}
			},
			proportioData:{
				type:Array,
				default:[]
			},
			topography:{
				type:Function
			}
		},
		data(){
			return {
				pieEchartsData:{}
			}
		},
		mounted(){
			this.pieEchartsData = {
				id:'pieId',
                colorList:['#FF8352', '#E271DE', '#00FFFF', '#4AEAB0'],
                labelType:1,
                pieData:[],
                radius:['40%', '60%'],
                borderWidth:0,
			}
		},
		methods:{
			topographyClick(){
				this.topography()
			}
		},
		watch:{
            proportioData(val){
                this.pieEchartsData = {
				id:'pieId',
                colorList:['#FF8352', '#E271DE', '#00FFFF', '#4AEAB0'],
                labelType:1,
                pieData:val,
                radius:['40%', '60%'],
                borderWidth:0,
			}
            }
        },
	}
</script>
<style lang="less" scoped>
	.sameMonth {
		width: 100%;
		padding: 5px;
		background:rgba(255,255,255,1);
		border-radius:10px; 
		margin-bottom: 20px;
		.sameMonthcontent {
			width: 100%;
			height: 545px;
			border:4px solid #00A6FF;
			border-radius:10px;
			padding: 0 20px;
			.title {
				height: 50px;
				display: flex;
	    		align-items: center;
	    		.titleborder {
	    			width:12px;
					height:4px;
					background:rgba(45,146,252,1);
					border-radius:2px;
	    		}
	    		.titletext {
	    			padding-left: 5px;
	    			font-size:16px;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(51,51,51,1);
	    		}
	    		.titleclick {
	    			cursor: pointer;
	    			padding: 3px 0;
	    			font-size:14px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
	    			margin-left: 6px;
	    			width:68px;
					text-align: center;
					border:1px solid rgba(220,220,220,1);
					border-radius:6px;
	    		}
			}
			.record {
				width: 100%;
				height: 145px;
				.recordConten {
					height: 100%;
					width: 100%;
					.recordLeft {
						height: 100%;
						background:linear-gradient(90deg,rgba(0,91,234,1),rgba(0,198,251,1));
						border-radius:8px;
						div {
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(255,255,255,1);		
						}
						div:nth-child(1) {
							height: 35%;
							font-size:20px;
							display: flex;
						    align-items: center;
						    justify-content: center;
						}
						div:nth-child(2) {
							height: 15%;
							font-size:12px;
							display: flex;
						    align-items: center;
						    justify-content: center;
						}
						div:nth-child(3) {
							height: 50%;
							font-size:56px;
							text-align: center;
							span {
								font-size:36px;
							}
						}
					}
					.recordRight {
						height: 100%;
						div {
							font-family:PingFangSC-Medium;
							font-weight:500;
							height: 25%;
							display: flex;
						    align-items: center;
							color:rgba(152,162,180,1);
							span {
								font-size:12px;
							}
							img {
								vertical-align:middle;
								margin-right: 6px;
							}
						}
						div:nth-child(1),
						div:nth-child(3) {
							margin-left: 10%;
						}
						div:nth-child(2),
						div:nth-child(4) {
							font-size:20px;
							font-family:PingFangSC-Medium;
							font-weight:bold;
							color:rgba(51,51,51,1);
						    justify-content: center;
						}
					}
				}
			}
			.proportion {
				width: 100%;
				height: 345px;
				.proportion_title {
					width: 100%;
					height: 45px;
					padding-top: 20px;
					font-size:18px;
					font-family:PingFangSC-Semibold;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
				.proportion_echarts {
					width: 100%;
					height: 300px;
				}
			}
		}
	}
</style>