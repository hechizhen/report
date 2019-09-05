<template>
	<div class="sameMonth">
		<loading-data :isShow="isShow"></loading-data>
		<div class="sameMonthcontent">
			<div class="title">
			   <div class="titleborder"></div>
			   <div class="titletext">当月</div>
			</div>
			<div class="record">
				<a-Row class="recordConten">
					<a-Col :span="24" class="recordLeft">
						<div>
							<p><img style="margin-right:5px;width:25px" src="./../../assets/img/jine-icon.png">下单金额(万元)</p>
							<p><span>￥</span>{{orderAmountData.moneyInteger}}<span>{{orderAmountData.moneyDecimal}}</span></p>
						</div>
					</a-Col>
				</a-Row>
			</div>
			<div class="grossProfit">
				<a-Row>
					<a-Col :span="12" class="recordLeft">
						<div><img src="./../../assets/img/jine.png">毛利额(万元)<span>￥</span><span class="txt">{{orderAmountData.gross_money}}</span></div>
					</a-Col>
					<a-Col :span="12" class="recordRight">
						<div><img src="./../../assets/img/maoli-icon.png">毛利率<span>{{orderAmountData.gross_money_rate}}</span></div>
					</a-Col>
				</a-Row>
			</div>
			<div class="proportion">
				<div class="proportion_title">占比</div>
				<div class="proportion_echarts">
					<pie :pieEchartsData="pieEcharts"></pie>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import pie from "./../echarts/pie.vue"
	import loadingData from '../base/loadingData'
	export default {
		name:'samaMonth',
		components:{
			pie,
			loadingData,

		},
		props:{
			orderAmountData:{
				type:Object,
			},
			isShow:{
				type:Boolean,
				default:false,
			}
		},
		data(){
			return {
				pieEcharts:this.orderAmountData.list
			}
		},
		mounted(){

		},
		methods:{
		},
		watch:{
			orderAmountData(val){
				this.pieEcharts = val.list
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
		position: relative;
		.sameMonthcontent {
			width: 100%;
			height: 735px;
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
						display: flex;
						align-items: center;
						justify-content: center;
						div {
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(255,255,255,1);
							p:nth-child(1) {
								font-size:20px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							p:nth-child(2) {
								font-size:56px;
								text-align: center;
								font-weight:600;
								span {
									font-size:36px;
								}
							}
						}
					}
				}
			}
			.grossProfit {
				.recordLeft {
					height: 85px;
					text-align: center;
					padding-top: 30px;
					div {
						font-size:20px;
						font-family:PingFangSC-Medium;
						font-weight:500;
						color:#98A2B4;
						span {
							margin-left: 10px;
							font-size:12px;
							font-family:PingFangSC-Medium;
							font-weight:bold;
							color:rgba(51,51,51,1);
						}
						.txt{
							color:rgba(51,51,51,1);
							font-size:20px;
							font-family:PingFangSC-Medium;
							font-weight:500;
							margin-left: 0;
						}
					}
					img {
						vertical-align:baseline;
						margin-right: 5px;
					}
				}
				.recordRight {
					height: 85px;
					text-align: center;
					padding-top: 30px;
					div {
						font-size:20px;
						font-family:PingFangSC-Medium;
						font-weight:500;
						color:#98A2B4;
						img{
							margin-right: 5px;
						}
						span {
							margin-left: 10px;
							font-size:20px;
							font-family:PingFangSC-Medium;
							font-weight:500;
							color:rgba(51,51,51,1);
						}
					}
					img {
						vertical-align:baseline;
					}
				}
			}
			.proportion {
				width: 100%;
				height: 500px;
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
					height: 400px;
				}
			}
		}
	}
</style>

