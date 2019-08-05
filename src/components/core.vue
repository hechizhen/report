<template>
	<div class="core">
		<p><span>{{coretype}}: </span>{{coretext}}</p>
		<p>总结： <span>{{evaluate}}</span></p>
		<p>|&nbsp;&nbsp;&nbsp;本月体检报整体<span>{{evaluate}}</span>，体检报告的总结情况。</p>
	</div>
</template>
<script>
	export default {
		name:'core',
		components:{

		},
		props:{
			coretype:{
				type:String,
				default:'二帮卖得分'
			},
			coretext:{
				type:Number,
				default:100
			},
			evaluate:{
				type:String,
				default:'优秀'
			},
		},

		data(){
			return {

			}
		},
		methods:{

		}
	}
</script>
<style lang="less" scoped>
	.core {
		height: 50px;
		display: flex;
		align-items: center;
		p {
			display: inline-block;
			font-family:PingFangSC-Regular;
			font-weight:400;
			margin: 0px;
		}
		p:nth-child(1) {
			height: 25px;
			width: 125px;
			font-size:14px;
			color:rgba(0,124,255,1);
			text-align: center;
			line-height: 25px;
			background:rgba(222,238,255,1);
		}
		p:nth-child(2) {
			margin: 0px 10px;
			font-size:14px;
			color:rgba(51,51,51,1)
		}
		p:nth-child(3) {
			font-size:12px;
			color:rgba(152,162,180,1);
		}
	}
</style>