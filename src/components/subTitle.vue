<template>
	<div class="subtitle">
		<div class="subtitle_content">{{subtitlename}}</div>
		<div class="subtitle_list">
			<ul>
				<li v-for="(item,index) in listing" @click="listingClick(item,index)">{{item}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		name:'subtitle',
		components:{

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
	    /*justify-content: center;		*/
	}
	.subtitle_content {
		font-size:20px;
		padding-left: 10px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(51,51,51,1);
		border-left: 6px solid #2D92FC;
	}
	.subtitle_list {
		margin-left: 15px;
	}
	.subtitle_list ul {
		padding: 0;
		margin: 0;
	}
	.subtitle_list li {
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
</style>