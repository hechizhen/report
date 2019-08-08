<template>
	<div class="subtitle">
		<div class="leftLine"></div>
		<div class="subtitle_content">{{subtitlename}}</div>
		<div class="subtitle_list">
			<ul>
				<li v-for="(item,index) in listing" @click="listingClick(item,index)" :key="index">{{item}}</li>
			</ul>
		</div>
		<explain :explainList="explainSecondList"></explain>
	</div>
</template>
<script>
	import explain from '../components/explain.vue'
	export default {
		name:'subtitle',
		components:{
			explain
		},
		props:{
			// 副标题名称
			subtitlename:{
				type:String,
				default:'订单'
			},
			listing:{
				type:Array,
				default:["订单详情"],
			},
			explicit:{
				type:Function,
			},
			explainSecondList:{
				type:Object
			}
		},

		data(){
			return {

			}
		},
		methods:{
			listingClick(a,b){
				this.explicit(a,b)
			}
		}
	}
</script>
<style lang="less" scoped>
	.subtitle {
		height: 50px;
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
	    /*justify-content: center;		*/
	}
	.leftLine{
		width:6px;
		height:20px;
		background:rgba(45,146,252,1);
		border-radius:3px;
	}
	.subtitle_content {
		font-size:20px;
		padding-left: 12px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.subtitle_list {
		margin-left: 15px;
	}
	.subtitle_list ul {
		padding: 0;
		margin: 0;
	}
	.subtitle_list li {
		cursor: pointer;
		float: left;
		height: 30px;
		line-height: 30px;
		padding: 0 10px;
		border:1px solid rgba(0,166,255,1);
		border-radius:8px;
		margin-right: 15px;
		font-size:14px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(45,146,252,1);
	}
	.subtitle_list li:hover {
		color:rgba(106,179,255,1);
	}
	.subtitle_list li:active {
		color:rgba(45,146,252,1);
		background:rgba(215,217,229,1);
	}
</style>