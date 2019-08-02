<template>
	<div class="manager">
		<a-Row :gutter="20" class="managerRow">
		  <a-Col :span="8" class="managerCol">
		  	<div class="conclude">
		  		<a-Row class="managerRow">
				  <a-Col :span="6" class="managerCol">
				  	<div class="icon">
				  		<img src="./../../assets/img/yewuyaun.png">
				  	</div>
				  </a-Col>
				  <a-Col :span="12" class="managerCol">
				  	<p>业务员达成</p>
				  	<p>80%</p>
				  </a-Col>
				  <a-Col :span="6" class="managerCol">
				  	<p>达成与贡献</p>
				  	<p>走势图</p>
				  </a-Col>
				</a-Row>
		  	</div>
		  </a-Col>
		  <a-Col :span="8" class="managerCol">
		  	<div  class="produce">
		  		<a-Row class="managerRow">
				  <a-Col :span="6" class="managerCol">
				  	<div class="icon">
				  		<img src="./../../assets/img/chanchu.png">
				  	</div>
				  </a-Col>
				  <a-Col :span="12" class="managerCol">
				  	<p>人均产出(万元)</p>
				  </a-Col>
				  <a-Col :span="6" class="managerCol">
				  	<p>￥<span>3828</span></p>
				  </a-Col>
				</a-Row>
		  	</div>
		  </a-Col>
		  <a-Col :span="8" class="managerCol">
		  	<div  class="compare">
		  		<a-Row class="managerRow">
				  <a-Col :span="6" class="managerCol">
				  	<div class="icon">
				  		<img src="./../../assets/img/yewu.png">
				  	</div>
				  </a-Col>
				  <a-Col :span="12" class="managerCol">
				  	<p>总业务员人数<span>12</span>人</p>
				  	<p>业绩下滑人数<span>12</span>人</p>
				  </a-Col>
				  <a-Col :span="6" class="managerCol">
				  	<p>达成与贡献</p>
				  </a-Col>
				</a-Row>
		  	</div>
		  </a-Col>
		</a-Row>
	</div>
</template>
<script>
	export default {
		name:'manager',
		components:{

		},
		props:{

		},
		data(){
			return {

			}
		},
		mounted(){

		},
		methods:{

		},
		computd:{

		},
		distroyed:{

		}
	}
</script>
<style lang="less" scoped>
	.manager {
		width: 100%;
		height: 130px;
		background:rgba(255,255,255,1);
		border-radius:10px;
		padding: 15px 10px;
		.managerRow {
			width: 100%;
			height: 100%;
			.managerCol {
				height: 100%;
			}
		}
		.conclude {
			width: 100%;
			height: 100%;
			background:linear-gradient(90deg,rgba(0,210,203,1),rgba(50,213,131,1));
			box-shadow:0px 2px 15px 0px rgba(255,182,2,0.13);
			border-radius:6px;
			.managerCol:nth-child(2) {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
			    p {
			     	margin: 0px;
				    font-size:16px;
					font-family:PingFangSC-Medium;
					font-weight:bold;
					color:rgba(255,255,255,1);
				}
				p:nth-child(2) {
					margin-top: 6px;
					font-size:24px;
				}
			}
			.managerCol:nth-child(3)  {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
			    p {
			    	margin: 0px;
			    	width: 90px;
			    	text-align: center;
			    	padding: 6px 0;
			    	border:1px solid rgba(255,255,255,1);
					border-radius:3px;
					font-size:14px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(255,255,255,1);
			    }
			    p:nth-child(2) {
			    	margin-top: 6px;
			    }
			}
		} 
		.produce {
			width: 100%;
			height: 100%;
			background:linear-gradient(90deg,rgba(95,188,255,1),rgba(65,142,255,1));
			box-shadow:0px 2px 15px 0px rgba(255,182,2,0.13);
			border-radius:6px;
			.managerCol {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
			    p {
			    	margin: 0px;
			    	font-size:16px;
					font-family:PingFangSC-Medium;
					font-weight:bold;
					color:rgba(255,255,255,1);
			    }
			}
			.managerCol:nth-child(3) {
				p {
					font-size: 16px;
					span {
						font-size: 24px;
					}
				}
			}
		}
		.compare {
			width: 100%;
			height: 100%;
			background:linear-gradient(90deg,rgba(255,149,0,1),rgba(255,198,43,1));
			box-shadow:0px 2px 15px 0px rgba(255,182,2,0.13);
			border-radius:6px;
			.managerCol:nth-child(2) {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
			    p {
			     	margin: 0px;
				    font-size:14px;
					font-family:PingFangSC-Medium;
					font-weight:bold;
					color:rgba(255,255,255,1);
					span {
						margin-left: 6px;
					}
				}
				p:nth-child(2) {
					margin-top: 6px;
					font-size:14px;
				}
			}
			.managerCol:nth-child(3)  {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
			    p {
			    	margin: 0px;
			    	width: 90px;
			    	text-align: center;
			    	padding: 6px 0;
			    	border:1px solid rgba(255,255,255,1);
					border-radius:3px;
					font-size:14px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(255,255,255,1);
			    }
			}
		}
		.icon {
			width: 100%;
			height: 100%;
			display: flex;
		    align-items: center;
		    justify-content: center;
		}
	}
</style>