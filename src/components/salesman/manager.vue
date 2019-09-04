<template>
	<div class="manager">
		<a-Row  class="managerRow">
		  <a-Col :span="8" class="managerCol">
		  	<div class="conclude">
		  		<a-Row class="managerRow">
				  <a-Col :span="6" class="managerCol">
				  	<div class="icon">
				  		<img src="./../../assets/img/yewuyaun.png">
				  	</div>
				  </a-Col>
				  <a-Col :span="6" class="managerCol">
				  	<p>业务员达成</p>
				  </a-Col>
				  <a-Col :span="3" class="managerCol">
				  	<p>{{salesmanData.emp_rate}}</p>
				  </a-Col>
				  <a-Col :span="9" class="managerCol" style="text-align: center;">
				  	<!-- <p @click="concludeClick('达成与贡献')">达成与贡献</p>
				  	<p @click="trendClick('走势图')">走势图</p> -->
					  <newbutton defaultVal="达成与贡献" :buttonHandleClick="concludeClick" :btnStyle="btnStyle" :txtStyle="txtStyle"></newbutton>
					  <newbutton defaultVal="走势图" :buttonHandleClick="trendClick" style="margin-top:8px;" class="lineButton" :btnStyle="btnStyle" :txtStyle="txtStyle"></newbutton>
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
				  	<p>总人数(人)</p>
				  	<p style="margin-top:6px;">人均产出(万元)</p>
				  </a-Col>
				  <a-Col :span="6" class="managerCol">
				  	<p><span>{{salesmanData.all_cnt}}</span></p>
				  	<p style="margin-top:5px;">￥<span>{{salesmanData.emp_avg_money}}</span></p>
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
				  <a-Col :span="8" class="managerCol">
				  	<p>总业务员人数(人)</p>
				  	<p>业绩下滑人数(人)</p>
				  </a-Col>
				  <a-Col :span="3" class="managerCol">
				  	<p>{{salesmanData.emp_cnt}}</p>
				  	<p>{{salesmanData.emp_drop_cnt}}</p>
				  </a-Col>
				  <a-Col :span="7" class="managerCol"  style="text-align: center;">
				  	<!-- <p @click="glidingClick('下滑人员')">下滑人员</p> -->
					  <newbutton defaultVal="下滑人员" :buttonHandleClick="glidingClick" :btnStyle="btnStyle" :txtStyle="txtStyle"></newbutton>
				  </a-Col>
				</a-Row>
		  	</div>
		  </a-Col>
		</a-Row>
		<loading-data :isShow="isShow"></loading-data>
	</div>
</template>
<script>
	import loadingData from '../base/loadingData'
	import newbutton from '../button'
	export default {
		name:'manager',
		components:{
			loadingData,
			newbutton
		},
		props:{
			explicit:{
				type:Function,
			},
			salesmanData:{
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
				btnStyle:{
					width: '88px',
					height: '26px',
					border: '1px solid #FFFFFF',
					// hover:{
					// 	color:'red'
					// }
				},
				txtStyle:{
					fontSize:'14px',
					color:'#ffffff',
					fontWeight:400
				},
			}
		},
		mounted(){

		},
		methods:{
			concludeClick(item){
				let value = item.target.innerText
				this.explicit(value)
			},
			trendClick(item){
				let value = item.target.innerText
				this.explicit(value)
			},
			glidingClick(item){
				let value = item.target.innerText
				this.explicit(value)
			}
		},
		computd:{

		},
		distroyed:{

		}
	}
</script>
<style lang="less">
.lineButton{
	.new-button{
		padding: 0 30px!important
	}
}
</style>
<style lang="less" scoped>
	.manager {
		width: 100%;
		height:3.68rem;
		background:rgba(255,255,255,1);
		border-radius:10px;
		padding: .3rem .2rem;
		position: relative;
		.managerRow {
			width: 100%;
			height: 100%;
			margin:0!important;
			padding:0!important;
			.managerCol {
				height: 100%;
				padding-left: 1%;
				padding-right: 1%;
				img{
					width:1.5rem
				}
			}
		}
		.conclude {
			width: 100%;
			height: 100%;
			background:linear-gradient(90deg,rgba(13, 207, 109, 1),rgba(1, 206, 199, 1));
			box-shadow:0px 2px 15px 0px rgba(255,182,2,0.13);
			border-radius:6px;
			.managerCol:nth-child(2) {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
			    p {
			     	margin: 0px;
				    font-size:.4rem;
					font-family:PingF	angSC-Medium;
					font-weight:bold;
					color:rgba(255,255,255,1);
				}
			}
			.managerCol:nth-child(3)  {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
			    p {
			     	margin: 0px;
				    font-size:.4rem;
					font-family:PingFangSC-Medium;
					font-weight:bold;
					color:rgba(255,255,255,1);
				}
			}
			.managerCol:nth-child(4)  {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
				align-items: center;
			}
		}
		.produce {
			width: 100%;
			height: 100%;
			background:linear-gradient(90deg,rgba(17, 113, 255, 1),rgba(22, 157, 255, 1));
			box-shadow:0px 2px 15px 0px rgba(255,182,2,0.13);
			border-radius:6px;
			.managerCol {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
			    p {
			    	margin: 0px;
			    	font-size:14px;
					font-family:PingFangSC-Medium;
					font-weight:bold;
					color:rgba(255,255,255,1);
			    }
			}
			.managerCol:nth-child(3) {
				p {
					text-align: right;
					padding-right: 1rem;
					font-size: .4rem;
					span {
						font-size: .5rem;
					}
				}
			}
		}
		.compare {
			width: 100%;
			height: 100%;
			background:linear-gradient(90deg,rgba(254, 148, 0, 1),rgba(253, 184, 0, 1));
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
					font-size:.4rem;
				}
			}
			.managerCol:nth-child(3) {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
			    p {
			    	width: 100%;
			    	text-align: right;
			    	padding-right: 20%;
			     	margin: 0px;
				    font-size:.4rem;
					font-family:PingFangSC-Medium;
					font-weight:bold;
					color:rgba(255,255,255,1);
					span {
						margin-left: 6px;
					}
				}
				p:nth-child(2) {
					margin-top: 6px;
					font-size:.4rem;
				}
			}
			.managerCol:nth-child(4)  {
				display: flex;
			    justify-content: center;
			    flex-direction: column;
				align-items: center;
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
