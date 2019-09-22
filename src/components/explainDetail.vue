<template>
	<div class="explainDetail" @click="close">
		<div class="explainDetailBox">
			<div class="explainTitle" :style="{backgroundImage: 'url(' + bgImage + ')'}">
				<div class="explainTitleTop">
					{{titleName}}
					<p class="close" @click="close">
						<i class="iconfont icon-guanbi"></i>
					</p>
				</div>
				<div class="explainTitlebottom">
					<p class="explainTxt">指标解释</p>
				</div>
			</div>
			<a-row class="rowStyle" v-for="(item,index) in tableData" :key="index">
				<a-col :span="span" class="leftCol" :style="{color:fontColor}">{{item.title}}</a-col>
				<a-col :span="span2" class="rightCol">{{item.data}}</a-col>
			</a-row>
		</div>
	</div>
</template>
<script>
	export default {
		name:'explainDetail',
		components:{

		},
		props:{
			//标题名称
			titleName:{
				type:String,
				default:'一帮卖分析指标解释'
			},
			//图片类型
			imgType:{
				type:Number,
				default:1,
			},
			span:{
				type:Number,
				default:5
			},
			span2:{
				type:Number,
				default:19
			},
			//点击关闭
			closeHandleClick:{
				type:Function
			},
			//指标列表数据
			tableData:{
				type:Array,
				default: () =>[
					{title:'下单金额:',data:'统计年累计/当月经销商一帮卖下单的总金额'},
					{title:'下单金额:',data:'统计年/月累计出货金额/经销商合同年/分月目标销量'},
					{title:'下单金额:',data:'统计年累计/当月立白事业部出货金额/经销商合同立白事业部年/分月目标销量'},
					{title:'下单金额:',data:'统计年累计/当月好爸爸事业部出货金额/经销商合同好爸爸事业部年/分月目标销量'},
				]
			}
		},

		data(){
			return {
				bgImage:require('../assets/img/oneHelpSaleBg.png'),
				fontColor:'#FF9D3A',
				showDetail:this.isShow
			}
		},
		mounted(){
			if(this.imgType==1){
				this.bgImage = require('../assets/img/oneHelpSaleBg.png')
				this.fontColor = '#FF9D3A'
			}else if(this.imgType==2){
				this.bgImage = require('../assets/img/twoHelpSaleBg.png')
				this.fontColor = '#529629'
			}else if(this.imgType==3){
				this.bgImage = require('../assets/img/salesManBg.png')
				this.fontColor = '#0675F8'
			}else if(this.imgType==4){
				this.bgImage = require('../assets/img/storeBg.png')
				this.fontColor = '#6029DE'
			}else if(this.imgType==5){
				this.bgImage = require('../assets/img/productBg.png')
				this.fontColor = '#00B0C9'
			}else if(this.imgType==6){
				this.bgImage = require('../assets/img/stockBg.png')
				this.fontColor = '#ED6140'
			}else if(this.imgType==7){
				this.bgImage = require('../assets/img/financeBg.png')
				this.fontColor = '#357EFF'
			}
		},
		methods:{
			close(){
				this.closeHandleClick()
			}
		}
	}
</script>
<style lang="less" scoped>
	.explainDetail{
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
		.explainDetailBox {
			width: 1000px;
			background:#fff;
			padding-bottom: .5rem;
			p{
				margin-bottom:0;
			}
			.explainTitleTop{
				height: 38px;
				width: 100%;
				text-align: center;
				position: relative;
				line-height: 70px;
				font-size: 24px;
				font-weight: 500;
				color: #fff;
				.close{
					position: absolute;
					top:0;
					right:.5rem;
					cursor: pointer;
					i{
						font-size: 1rem;
						color:#fff
					}
				}
			}
			.explainTitle{
				height:100px;
				width:100%;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				margin-bottom:10px;
			}
			.explainTxt{
				font-size: 16px;
				font-weight:500;
				color:rgba(255,255,255,1);
				padding-left: 62px;
    			padding-top: 30px;
			}
			.rowStyle{
				height:40px;
				width:100%;
				border-top:1px solid rgba(229,229,229,1);
				line-height:40px;
			}
			.rowStyle:last-child{
				border-bottom:1px solid rgba(229,229,229,1);
			}
			.leftCol{
				font-size: 16px;
				font-weight:500;
				padding-left:50px;
			}
			.rightCol{
				color:#333333;
				font-size: 16px;
				font-weight:500;
			}
		}
	}
</style>
