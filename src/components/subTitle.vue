<template>
	<div class="subtitle">
		<div class="leftLine"></div>
		<div class="subtitle_content">{{subtitlename}}</div>
		<div class="subtitle_list">
			<NewButton :btnStyle="btnStyle" :buttonHandleClick="detailHandleClick" :txtStyle="txtStyle"></NewButton>
		</div>
		<explain :explainList="explainSecondList"></explain>
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
					width: '2.4rem',
					height: '.9rem',
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
		width:6px;
		height:.5rem;
		background:rgba(45,146,252,1);
		border-radius:3px;
	}
	.subtitle_content {
		font-size:.6rem;
		padding-left: .3rem;
		font-family:PingFangSC-Medium;
		font-weight:500;
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

</style>
