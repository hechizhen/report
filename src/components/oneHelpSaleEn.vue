<template>
	<div class="oneHelpSaleEn">
		<second-title :titleName="titleName"></second-title>
		<div class="oneHelpSaleEnBox">
			<div class="oneHelpSaleEnBoxLeft">
				<one-help-sale :salesData="salesData.monthData" :barData="barData.monthBarData"></one-help-sale>
			</div>
			<div class="oneHelpSaleEnBoxRight">
				<one-help-sale :salesData="salesData.yearData" :barData="barData.yearBarData"></one-help-sale>
			</div>
		</div>
		<core :coretype="coreData.coretype" :coretext="coreData.coretext" :evaluate="coreData.evaluate"></core>
	</div>
</template>
<script>
	import oneHelpSale from '../components/oneHelpSale.vue'
	import core from '../components/core.vue'
	import secondTitle from '../components/secondTitle.vue'
	export default {
		name:'oneHelpSaleEn',
		components:{
			oneHelpSale,
			core,
			secondTitle
		},
		props:{
			//标题名
			titleName:{
				type:String
			},
			//一帮卖本月/累计销量
            salesData:{
                type:Object,
            },
            //达成率柱状图数据
            barData:{
                type:Object
			},
			//评分组件
			coreData:{
				type:Object
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
	.oneHelpSaleEn {
		width:100%;
		.oneHelpSaleEnBox{
			width:100%;
			display: flex;
			flex-wrap: wrap;
			.oneHelpSaleEnBoxLeft{
				width:49%;
				margin-right:2%;
			}
			.oneHelpSaleEnBoxRight{
				width:49%;
			}
		}
	}
</style>