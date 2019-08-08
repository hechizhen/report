<template>
	<div class="bandSelling">
		<secondTitle :titleName="titleName"></secondTitle>
		<subTitle :subtitlename="subtitlename" :listing="listing" :explicit="explicit"></subTitle>
		<a-Row :gutter="23">
		  <a-Col :span="10">
		  	<sameMonth :orderAmountData="orderAmountData" :proportioData="proportioData" :topography="topography"></sameMonth>
		  </a-Col>
		  <a-Col :span="7">
		  	<totalAmount :titleName="'环比'" :displayData="grossProfitData"></totalAmount>
		  </a-Col>
		  <a-Col :span="7">
		  	<totalAmount :titleName="'同比'" :displayData="grossInterestRateData"></totalAmount>
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
				type:Array,
				default:[]
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
				proportioData:this.proportio,
				echartsShow: false,
				lineEchartsData:{},
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
                this.proportioData = val;
            },
            directionData(val){
                this.lineEchartsData = {
                    id:'lineId',
                    xAxisData:val.monthArr,
                    lineData:[ 
                        {
                            name:'订单金额',
                            data:val.seriesData,
                            color:'#00E2BF'
                        },
                    ]
                }
            }
        },
		distroyed:{

		}
	}
</script>
<style lang="less" scoped>

</style>
