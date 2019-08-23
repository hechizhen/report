<template>
	<div class="bandSelling">
		<secondTitle :titleName="titleName"></secondTitle>
		<subTitle :subtitlename="subtitlename" :listing="listing" :detailHandleClick="detailHandleClick"  :explainSecondList="explainSecondList"></subTitle>
		<a-Row :gutter="23">
		  <a-Col :span="10">
		  	<sameMonth :orderAmountData="orderAmountData.thatMonth" :isShow="towHelpSaleMonthShow"></sameMonth>
		  </a-Col>
		  <a-Col :span="14">
		  	<a-Row :gutter="20">
		  		<a-Col :span="12">
				  	<totalAmount :displayData="orderAmountData.chainratio" :isShow="towHelProportion"></totalAmount>
				</a-Col>
				<a-Col :span="12">
				  	<totalAmount :displayData="orderAmountData.yearOnYear" :isShow="towHelYoy"></totalAmount>
				</a-Col>
				<a-Col :span="24">
				  	<trendChart :lineEchartsData="directionLineData" :isShow="towHelpSaleMonthLineShow" v-if="directionLineData!=''"></trendChart>
				</a-Col>
		  	</a-Row>
		  </a-Col>
		</a-Row>
		<public-table v-if="isShowDetail" :close="closePopup" :tableHeader="tableData.header" :interfaceParams="tableData.params" :titleName="tableData.titleName" :buttonGroup="buttonGroup" :selectButtonClick="selectButtonClick"></public-table>
		<core :coretype="coreData.coretype" :coretext="coreData.coretext" :evaluate="coreData.evaluate" :subscribe="coreData.subscribe"></core>
	</div>
</template>
<script>
	import secondTitle from "./../secondTitle.vue"
	import subTitle from "./../subTitle.vue"
	import sameMonth from "./sameMonth.vue"
	import totalAmount from "./totalAmount.vue"
	import core from "./../core.vue"
	import trendChart from "./trendChart.vue"
	import publicTable from '../base/publicTable.vue'
	export default {
		name:'index',
		components:{
			secondTitle,
			subTitle,
			sameMonth,
			totalAmount,
			core,
			trendChart,
			publicTable
		},
		props:{
			orderAmountData:{
				type:Object,
				default:{}
			},
			directionLineData:{
				type:Object,
				default:{}
			},
			towHelpSaleMonthShow:{
				type:Boolean,
				default:false,
			},
			towHelProportion:{
				type:Boolean,
				default:false,
			},
			towHelYoy:{
				type:Boolean,
				default:false,
			},
			towHelpSaleMonthLineShow:{
				type:Boolean,
				default:false
			},
			tableData:{
				type:Object
			},
			selectButtonClick:{
				type:Function
			},
			orderDetailClick:{
				type:Function
			},
			coreData:{
				type:Object
			}
		},
		data(){
			return {
				titleName:'二帮卖分析',
				subtitlename:'订单',
				listing:['订单详情'],
				lineEchartsData:"",
				isShowDetail:false,
				buttonGroup:{   //切换维度按钮
					show:true,
					list:['品类','系列','商品']
				},
				explainSecondList:{
					imgType:2,
					tableData:[
						{title:'下单金额：',data:'统计当月用户下单金额'},
						{title:'下单金额环比：',data:'统计（当月下单金额-上个月下单金额）/上个月下单金额*100%'},
						{title:'下单金额同比：',data:'统计（当月下单金额-去年同月下单金额）/去年同月下单金额*100%'},
						{title:'立白下单金额占比：',data:'统计当月立白事业部下单金额/下单金额*100%'},
						{title:'好爸爸下单金额占比：',data:'统计当月好爸爸事业部下单金额/下单金额*100%'},
						{title:'超威下单金额占比：',data:'统计当月超威事业部下单金额/下单金额*100%'},
						{title:'口腔下单金额占比：',data:'统计当月口腔事业部下单金额/下单金额*100%'},
						{title:'晟美下单金额占比：',data:'统计当月晟美事业部下单金额/下单金额*100%'},
						{title:'其他下单占比：',data:'统计当月其他事业部下单金额/下单金额*100%'},
						{title:'立白下单环比：',data:'统计（当月立白事业部下单金额-上个月立白事业部下单金额）/上个月立白事业部下单金额*100%'},
						{title:'好爸爸下单环比：',data:'统计（当月好爸爸事业部下单金额-上个月好爸爸事业部下单金额）/上个月好爸爸事业部下单金额*100%'},
						{title:'超威下单环比：',data:'统计（当月超威下单金额-上个月超威下单金额）/上个月超威下单金额*100%'},
						{title:'口腔下单环比：',data:'统计（当月口腔下单金额-上个月口腔下单金额）/上个月口腔下单金额*100%'},
						{title:'晟美下单环比：',data:'统计（当月晟美下单金额-上个月晟美下单金额）/上个月晟美下单金额*100%'},
						// {title:'好爸爸下单同比：',data:'统计（当月好爸爸事业部下单金额-去年同月好爸爸事业部下单金额）/去年同月好爸爸事业部下单金额*100%'},
					],
					span:6,
					span2:18,
					titleName:'二帮卖分析-订单指标解释',
				}
			}
		},
		mounted(){
			console.log(this.coreData)
		},
		methods:{
			explicit(a,b){

			},
			//打开订单明细
			detailHandleClick(){
				this.stopScoll()//禁止页面滑动
				this.orderDetailClick()
				this.isShowDetail = true
			},
			//关闭订单明细
			closePopup(){
				this.moveScoll()//禁止页面滑动
				this.isShowDetail = false
			},
		},
		computd:{

		},
		watch:{
            // directionData(val){
			// 	console.log(val)

            // },
        },
		distroyed:{

		}
	}
</script>
<style lang="less" scoped>

</style>
