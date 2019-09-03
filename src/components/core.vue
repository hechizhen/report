<template>
	<div class="core">
		<p><span>{{coretype}}: </span>{{coretext}}</p>
		<p>总结： <span>{{evaluate}}</span></p>
		<p>|&nbsp;&nbsp;&nbsp;{{subscribe}}</p>
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
				type:String,
				default:"100"
			},
			evaluate:{
				type:String,
				default:'优秀'
			},
			subscribe:{
				type:String
			}
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
		height: 2rem;
		display: flex;
		align-items: center;
		p {
			display: inline-block;
			font-family:PingFangSC-Regular;
			font-weight:400;
			margin: 0px;
		}
		p:nth-child(1) {
			height: 1rem;
			width: 4.95rem;
			font-size: 0.6rem;
			color: #007cff;
			text-align: center;
			line-height: 1rem;
			background: #deeeff;
		}
		p:nth-child(2) {
			margin: 0px 10px;
			font-size: 0.6rem;
			color:rgba(51,51,51,1)
		}
		p:nth-child(3) {
			font-size:0.4rem;
			color:rgba(152,162,180,1);
		}
	}
</style>
