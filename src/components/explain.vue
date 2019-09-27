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
		<!-- <div class="trendChart" v-if="isShow"></div> -->
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
				isShow:false,
				monitorData:this.$store.state.monitorData,
				originSource:this.$store.state.originSource
			}
		},
		methods:{
			//插入监控数据
            setMonitorData(){
				if(!this.originSource){
					var _this = this
                	_this.$http({
						url: _this.$store.state.isLandUrl + '/userlog/insertCommonUserLog',
						method: 'POST',
						params: _this.monitorData
					}).then(function (res) {
					})
				}
            },
			//显示弹窗
			detailHandleClick(){
				this.monitorData.page_text = this.explainList.titleName
                this.setMonitorData()
				this.isShow = true
				this.stopScoll()//禁止页面滑动
			},
			//关闭弹窗
			closeHandleClick(){
				this.isShow = false
				//弹框消失，恢复正常滑动效果
				this.moveScoll()
			}
		}
	}
</script>
<style lang="less" scoped>
	.explain {
		display: flex;
		align-items: center;
		p{
			margin:0;
		}
		.explainTxt{
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
			z-index: 120;
			height: 100%;
			width: 100%;
			display: -ms-flexbox;
			display: flex;
			-ms-flex-align: center;
			align-items: center;
			-ms-flex-pack: center;
			justify-content: center;
			background-color:rgba(0,0,0,0.5);
		}
	}
</style>
