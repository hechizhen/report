<template>
	<div class="totalAmount">
		<div class="totalAmountcontent">
			<div class="title">
			   <div class="titleborder"></div>
			   <div class="titletext">{{displayData.name}}</div>
			</div>
			<div class="record">
				<p><img src="./../../assets/img/dkw_jine.png">下单总金额{{displayData.name}}</p>
				<p>{{displayData.moneymonthly}}</p>
			</div>
			<a-Row class="proportion">
				<a-Col :span="12" class="proportionitmes">
				  	<div class="proportiondiv">
				  		<p><img src="./../../assets/img/jine.png">毛利额{{displayData.name}}</p>
				  		<p>{{displayData.grossmoneymonthly}}</p>
				  	</div>
				</a-Col>
				<a-Col :span="12" class="proportionitmes">
				  	<div class="proportiondiv">
				  		<p><img src="./../../assets/img/maol-icon-2.png">毛利率{{displayData.name}}</p>
				  		<p>{{displayData.rossmoneyratemonthly}}</p>
				  	</div>
				</a-Col>
			</a-Row>
			<div class="brand">
				<div class="brandtitle">下单{{displayData.name}}</div>
				<ul class="cleatfix">
					<li v-for="(item,index) in displayData.list" :key="index">
						<div>{{item.name}}</div>
						<div>{{item.value}}</div>
					</li>
				</ul>
			</div>
		</div>
		<loading-data :isShow="isShow"></loading-data>
	</div>
</template>
<script>
	import loadingData from '../base/loadingData'
	export default {
		name:'samaMonth',
		components:{
			loadingData
		},
		props:{
			displayData:{
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

			}
		},
		mounted(){

		},
		methods:{

		},
	}
</script>
<style lang="less" scoped>
	.totalAmount {
		width: 100%;
		padding: 5px;
		background:rgba(255,255,255,1);
		border-radius:10px;
		.totalAmountcontent {
			width: 100%;
			height: 450px;
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
			}
			.record {
				width: 100%;
				height: 110px;
				display: flex;
			    align-items: center;
				justify-content: center;
				flex-direction:column;
				p {
					margin: 0px;
					img {
						margin-bottom: 2px;
						margin-right: 6px;
					}
				}
				p:nth-child(1) {
					font-size:16px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				p:nth-child(2) {
					font-size:44px;
					font-family:PingFangSC-Semibold;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
			}
			.proportion {
				width: 100%;
				height: 80px;
				.proportionitmes {
					height: 100%;
					.proportiondiv {
						height: 100%;
						width: 100%;
						display: flex;
					    align-items: center;
						flex-direction:column;
			    		p {
			    			margin: 0px;
			    			font-size:16px;
							font-family:PingFangSC-Regular;
							font-weight:bold;
							img {
								margin-bottom:2px;
								margin-right: 6px;
							}
			    		}
			    		p:nth-child(1) {
							color:rgba(152,162,180,1);
			    		}
			    		p:nth-child(2) {
			    			padding-top: 10px;
							color:rgba(51,51,51,1);
			    		}
					}
				}
			}
			.brand {
				height: 265px;
				width: 100%;
				.brandtitle {
					height: 32px;
					font-size:16px;
					font-family:PingFangSC-Semibold;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
				ul {
					margin: 0px;
					padding: 0px;
					width: 100%;
					li {
						width: 33.33%;
						height: 86px;
						float: left;
						border-right: 2px solid #fff;
						div:nth-child(1){
							font-size:14px;
							font-family:PingFangSC-Medium;
							font-weight:500;
							color:rgba(152,162,180,1);
							height: 50px;
							width: 100%;
							background:rgba(0,166,255,0.1);
							display: flex;
						    align-items: center;
						    justify-content: center;
						}
						div:nth-child(2){
							height: 36px;
							font-size:12px;
							font-family:PingFangSC-Semibold;
							font-weight:600;
							color:rgba(51,51,51,1);
							display: flex;
							align-items: center;
						    justify-content: center;
						}
					}
					li:nth-child(3n) {
						border-right: none;
					}
				}
			}
		}
	}
</style>
