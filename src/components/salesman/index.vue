<template>
	<div class="bandSellings">
		<subTitle :subtitlename="subtitlename" :listing="listing" :explainSecondList="explainSecondList"></subTitle>
		<manager :explicit="explicit" :salesmanData="salesmanData" :isShow="isShow"></manager>
		<core :coretype="coreData.coretype" :coretext="coreData.coretext" :evaluate="coreData.evaluate" :subscribe="coreData.subscribe"></core>
		<trendChart  v-if="echartsShow" :trendChartClick="trendChartClick" :lineEchartsData="salesmanTrendData" :isShow="salesmanTrendPie"></trendChart>
		<glide  v-if="glideShow" :trendChartClick="glideClick" :salesmandownward="salesmandownward" :isShow="salesmandownwardBar"></glide>
		<contribution   v-if="contributionShow" :trendChartClick="contributionClick" :salesmanReached="salesmanReached" :salesmanContribution="salesmanContribution"
						:salesmanContributionBar="salesmanContributionBar"  :salesmanReachedBar="salesmanReachedBar"
						:exportData="reachContributionData"></contribution>
	</div>
</template>
<script>
	import subTitle from "./../subTitle.vue"
	import manager from "./manager.vue"
	import core from "./../core.vue"
	import trendChart from "./trendChart.vue"
	import glide from "./glide.vue"
	import contribution from "./contribution.vue"
	export default {
		name:'index',
		components:{
			subTitle,
			manager,
			core,
			trendChart,
			glide,
			contribution,
		},
		props:{
			salesmanData:{
				type:Object,
				default:{}
			},
			salesmanTrendData:{
				type:Object,
				default:{}
			},
			salesmandownwardData:{
				type:Object,
				default:{}
			},
			salesmanReachedData:{
				type:Object,
				default:{}
			},
			salesmanContributionData:{
				type:Object,
				default:{}
			},
			ownwardExportData:{
				type:Object,
				default:{}
			},
			isShow:{
				type:Boolean,
				default:false,
			},
			salesmanContributionBar:{
				type:Boolean,
				default:false,
			},
			salesmanReachedBar:{
				type:Boolean,
				default:false,
			},
			salesmandownwardBar:{
				type:Boolean,
				default:false,
			},
			salesmanTrendPie:{
				type:Boolean,
				default:false,
			},
			reachContributionData:{
				type:Object
			},
			coreData:{
				type:Object
			}
		},
		data(){
			return {
				subtitlename:'人员',
				listing:[],
				echartsShow:false,
				glideShow:false,
				contributionShow:false,
				direction:{},
				salesmandownward:this.salesmandownwardData,
				salesmanReached:this.salesmanReachedData,
				salesmanContribution:this.salesmanContributionData,
				explainSecondList:{
					imgType:3,
					tableData:[
						{title:'总人数：',data:'统计当月属于系统的账号数（在职用户）（去重）'},
						{title:'总业务员数：',data:'统计当月在系统内业务员的用户数（去重）'},
						{title:'业务员达成：',data:'统计当月业务员下单金额/业务员当月销量目标'},
						{title:'业绩下滑人数：',data:'统计当月业务员下单金额与上个月下单金额有所降低的业务员人数'},
						{title:'人均产出：',data:'统计当月下单金额/系统的账号数（在职用户）'},
					],
					titleName:'二帮卖分析-业务员指标解释'
				}
			}
		},
		mounted(){
		},
		methods:{
			explicit(a){
				if(a == '走势图'){
					this.stopScoll()
					this.echartsShow = true;
				}else if(a == '下滑人员'){
					this.stopScoll()
					this.glideShow = true;
				}else if(a == '达成与贡献'){
					this.stopScoll()
					this.contributionShow = true;
				}
			},
			trendChartClick(a){
				this.moveScoll()
				this.echartsShow = false;
			},
			glideClick(a){
				if(a == '关闭'){
					this.moveScoll()
					this.glideShow = false;
				}else {
					this.exportHandleClick(this.ownwardExportData.tableHeaderTxt,this.ownwardExportData.tableHeaderKey,this.ownwardExportData.tableData,this.ownwardExportData.tableName)
				}
			},
			contributionClick(a){
				this.moveScoll()
				this.contributionShow = false;
			}
		},
		watch:{
        	salesmandownwardData(val) {
        		this.salesmandownward = val
        	},
        	salesmanReachedData(val) {
        		this.salesmanReached = val
        	},
        	salesmanContributionData(val) {
        		this.salesmanContribution = val
        	}
        },
		computd:{

		},
		distroyed:{

		}
	}
</script>
<style lang="less" scoped>
</style>
