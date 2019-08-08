<template>
	<div class="explain">
		<a-popover placement="top">
			<template slot="content">
				<p>指标解释</p>
			</template>
			<p class="explainTxt" @click="detailHandleClick">?</p>
		</a-popover>
		<explain-detail v-if="isShow" :closeHandleClick="closeHandleClick" :tableData="explainList.tableData"
						:imgType="explainList.imgType" :titleName="explainList.titleName"
						:span="explainList.span"  	:span2="explainList.span2"
		></explain-detail>
		<div class="trendChart" v-if="isShow"></div>
	</div>
</template>
<script>
	import explainDetail from '../components/explainDetail.vue'
	export default {
		name:'explain',
		components:{
			explainDetail,
		},
		props:{
			//数据集合
			explainList:{
				type:Object
			}
		},
		data(){
			return {
				//是否显示指标弹出框
				isShow:false
			}
		},
		methods:{
			//显示弹窗
			detailHandleClick(){
				this.isShow = true
			},
			//关闭弹窗
			closeHandleClick(){
				this.isShow = false
			}
		}
	}
</script>
<style lang="less" scoped>
	.explain {
		height:100%;
		display: flex;
		align-items: center;
		p{
			margin:0;
		}
		.explainTxt{
			position: absolute;
			right:30px;
			width:22px;
			height:22px;
			font-size: 18px;
			line-height: 19px;
			text-align: center;
			color:#A0A5B1;
			border-radius: 50%;
			border:2px solid #A0A5B1;
			margin-bottom:0;
			cursor: pointer;
		}
		.trendChart{
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10;
			height: 100%;
			width: 100%;
			display: -ms-flexbox;
			display: flex;
			-ms-flex-align: center;
			align-items: center;
			-ms-flex-pack: center;
			justify-content: center;
			background-color: rgba(69,72,90,.5);
		}
	}
</style>
