<template>
	<div class="bandSelling">
		<secondTitle :titleName="titleName"></secondTitle>
		<subTitle :subtitlename="subtitlename" :listing="listing" :explicit="explicit"  :explainSecondList="explainSecondList"></subTitle>
		<a-Row :gutter="23">
		  <a-Col :span="10">
		  	<sameMonth :orderAmountData="orderAmountData" :proportioData="proportioData" :topography="topography" v-if="proportioData.length!=0"></sameMonth>
		  </a-Col>
		  <a-Col :span="7">
		  	<totalAmount :titleName="'环比'" :displayData="grossProfitData" :totalAmountData="chainRatioData"></totalAmount>
		  </a-Col>
		  <a-Col :span="7">
		  	<totalAmount :titleName="'同比'" :displayData="grossInterestRateData" :totalAmountData="placingOrdersYearData"></totalAmount>
		  </a-Col>
		</a-Row>
		<core :coretype="'二帮卖得分'" :coretext="100" :evaluate="'优秀'"></core>
		<trendChart v-if="echartsShow" :trendChartClick="trendChartClick" :lineEchartsData="lineEchartsData"></trendChart>
	</div>
</template>
<script>
	import secondTitle from "./../secondTitle.vue"
	import subTitle from "./../subTitle.vue"
	import sameMonth from "./sameMonth.vue"
	import totalAmount from "./totalAmount.vue"
	import core from "./../core.vue"
	import trendChart from "./trendChart.vue"
	export default {
		name:'index',
		components:{
			secondTitle,
			subTitle,
			sameMonth,
			totalAmount,
			core,
			trendChart
		},
		props:{
			orderAmountData:{
				type:Object,
				default:{}
			},
			grossProfitData:{
				type:Object,
				default:{}
			},
			grossInterestRateData:{
				type:Object,
				default:{}
			},
			proportio:{
				type:Object,
				default:{}
			},
			directionData:{
				type:Object,
				default:{}
			}
		},
		data(){
			return {
				titleName:'二帮卖分析',
				subtitlename:'订单',
				listing:['订单详情'],
				proportioData:this.proportio.thoseArr,
				chainRatioData:this.proportio.chainRatio,
				placingOrdersYearData:this.proportio.placingOrdersYear,
				echartsShow: false,
				lineEchartsData:{},
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
					titleName:'二帮卖分析-订单指标解释'
				}
			}
		},
		mounted(){

		},
		methods:{
			explicit(a,b){

			},
			topography(){
				this.echartsShow = true;
			},
			trendChartClick(){
				this.echartsShow = false;
			}
		},
		computd:{

		},
		watch:{
            proportio(val){
                this.proportioData = val.thoseArr;
                this.chainRatioData = val.chainRatio;
				this.placingOrdersYearData = val.placingOrdersYear;
            },
            directionData(val){
                this.lineEchartsData = {
                    id:'lineIdBand',
                    xAxisData:val.monthArr,
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
