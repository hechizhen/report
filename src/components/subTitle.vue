<template>
	<div class="subtitle">
		<div class="leftLine"></div>
		<div class="subtitle_content">{{subtitlename}}</div>
		<div class="subtitle_list">
			<NewButton :btnStyle="btnStyle" :buttonHandleClick="detailHandleClick" :txtStyle="txtStyle"></NewButton>
		</div>
		<div class="subtitleBox">
			<explain :explainList="explainSecondList"></explain>
		</div>
	</div>
</template>
<script>
	import explain from '../components/explain.vue'
	import  NewButton from  './button'
	export default {
		name:'subtitle',
		components:{
			explain,
			NewButton
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
			detailHandleClick:{
				type:Function,
			},
			explainSecondList:{
				type:Object
			}
		},

		data(){
			return {
				btnStyle:{
					width: '78px',
					height: '28px',
					border: '1px solid #00A6FF',
					borderRadius:"8px",
				},
				txtStyle:{
					color:'#2D92FC'
				}
			}
		},
		methods:{
			listingClick(){
				this.detailHandleClick()
			}
		}
	}
</script>
<style lang="less" scoped>
	.subtitle {
		height: 2rem;
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
	    /*justify-content: center;		*/
	}
	.leftLine{
		width: .2rem;
		height: .75rem;
		background:rgba(45,146,252,1);
		border-radius:3px;
	}
	.subtitle_content {
		font-size: 18px;
		padding-left: .3rem;
		font-weight:600;
		color:rgba(51,51,51,1);
	}
	.subtitle_list {
		margin-left: .38rem;
	}
	.subtitle_list .new-button .txt:hover{
		color: #000;
	}

	.subtitle_list .new-button:active{
		color: #2D92FC;
		background-color: #D7D9E5;
	}
	.subtitleBox{
		display: flex;
		align-items: center;
		height:100%;
		position: absolute;
		right:30px;
		top:0
	}
</style>
