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
				  	<trendChart :lineEchartsData="lineEchartsData" :isShow="towHelpSaleMonthLineShow" v-if="lineEchartsData"></trendChart>
				</a-Col>
		  	</a-Row>
		  </a-Col>
		</a-Row>
		<public-table v-if="isShowDetail" :close="closePopup" :tableHeader="tableData.header" :interfaceParams="tableData.params"  :buttonGroup="buttonGroup"></public-table>
		<core :coretype="'二帮卖得分'" :coretext="100" :evaluate="'优秀'"></core>
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
			directionData:{
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
					],
					span:7,
					span2:17,
					titleName:'二帮卖分析-订单指标解释',
				}
			}
		},
		mounted(){
		console.log(this.tableData)
		},
		methods:{
			explicit(a,b){

			},
			//打开订单明细
			detailHandleClick(){
				this.isShowDetail = true
			},
			//关闭订单明细
			closePopup(){
				this.isShowDetail = false
			},
		},
		computd:{

		},
		watch:{
            directionData(val){
                this.lineEchartsData = {
                    id:'lineIdBand',
					xAxisData:val.monthArr,
					unit:['money','tenth'],
                    lineData:[
                        {
                            name:'订单金额',
                            data:val.seriesData,
                            color:'#00E2BF'
                        },
					],
                }
            }
        },
		distroyed:{

		}
	}
</script>
<style lang="less" scoped>

</style>
