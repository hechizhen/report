<template>
	<div class="oneHelpSaleEn">
		<second-title :titleName="titleName" :explainSecondList="explainSecondList"></second-title>
		<div class="oneHelpSaleEnBox">
			<div class="oneHelpSaleEnBoxLeft">
				<one-help-sale :salesData="monthSalesData" :barData="monthBarData" :isShow="monthShow" v-if="monthSalesData.length!=0 && monthBarData.length!=0"></one-help-sale>
			</div>
			<div class="oneHelpSaleEnBoxRight">
				<one-help-sale :salesData="yearSalesData" :barData="yearBarData" :isShow="yearShow" v-if="yearSalesData.length!=0 && yearBarData.length!=0"></one-help-sale>
			</div>
		</div>
		<core :coretype="coreData.coretype" :coretext="coreData.coretext" :evaluate="coreData.evaluate" :subscribe="coreData.subscribe"></core>
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
			//一帮卖本月销量
            monthSalesData:{
                type:Object,
            },
			//一帮卖累计销量
            yearSalesData:{
                type:Object,
            },
            //本月达成率柱状图数据
            monthBarData:{
                type:Object
			},
            //累计达成率柱状图数据
            yearBarData:{
                type:Object
			},
			//评分组件
			coreData:{
				type:Object
			},
			//月数据laoding
			monthShow:{
				type:Boolean
			},
			//年数据loading
			yearShow:{
				type:Boolean
			}
		},
		data(){
			return {
				explainSecondList:{
					imgType:1,
					tableData:[
						{title:'下单金额：',data:'统计年累计/当月经销商一帮卖下单的总金额'},
						{title:'达成率：',data:'统计年/月累计出货金额/经销商合同年/分月目标销量'},
						{title:'立白达成率：',data:'统计年累计/当月立白事业部出货金额/经销商合同立白事业部年/分月目标销量'},
						{title:'好爸爸达成率：',data:'统计年累计/当月好爸爸事业部出货金额/经销商合同好爸爸事业部年/分月目标销量'},
						{title:'超威达成率：',data:'统计年累计/当月超威事业部出货金额/经销商合同超威事业部年/分月目标销量'},
						{title:'口腔达成率：',data:'统计年累计/当月口腔事业部出货金额/经销商合同口腔事业部年/分月目标销量'},
						{title:'晟美达成率：',data:'统计年累计/当月晟美事业部出货金额/经销商合同晟美事业部年/分月目标销量'},
						{title:'战略品达成率：',data:'统计年累计/当月战略单品出货金额/经销商合同战略单品年/分月目标销量'},
					],
					titleName:'一帮卖分析指标解释'
				}
			}
		},
		mounted(){
		},
		methods:{

		}
	}
</script>
<style lang="less" scoped>
	.oneHelpSaleEn {
		width:100%;
		margin-top:135px;
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