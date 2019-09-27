<template>
	<div class="bandSellings">
		<subTitle :subtitlename="subtitlename" :listing="listing" :explainSecondList="explainSecondList"></subTitle>
		<manager :explicit="explicit" :salesmanData="salesmanData" :isShow="isShow"></manager>
		<core :coretype="coreData.coretype" :coretext="coreData.coretext" :evaluate="coreData.evaluate" :subscribe="coreData.subscribe"></core>
		<trendChart  v-if="echartsShow" :trendChartClick="trendChartClick" :lineEchartsData="salesmanTrend" :isShow="salesmanTrendPie"></trendChart>
		<glide  v-if="glideShow" :trendChartClick="glideClick" :salesmandownward="salesmandownward" :isShow="salesmandownwardBar"></glide>
		<contribution   v-if="contributionShow" :trendChartClick="contributionClick" :salesmanReachedDetail="salesmanReached" :salesmanContributionDetail="salesmanContribution"
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
				salesmanTrend:this.salesmanTrendData,
				explainSecondList:{
					imgType:3,
					tableData:[
						{title:'总人数：',data:'统计当月属于系统的账号数（在职用户）（去重）'},
						{title:'总业务员数：',data:'统计当月在系统内业务员的用户数（去重）'},
						{title:'业务员达成：',data:'统计当月业务员下单金额/业务员当月销量目标'},
						{title:'业绩下滑人数：',data:'统计当月业务员下单金额与上个月下单金额有所降低的业务员人数'},
						{title:'人均产出：',data:'统计当月下单金额/系统的账号数（在职用户）'},
					],
					titleName:'二帮卖分析-业务员指标解释',
				},
				monitorData:this.$store.state.monitorData,
				originSource:this.$store.state.originSource
			}
		},
		mounted(){
		},
		methods:{
			//插入监控数据
            setMonitorData(){
				if(!this.originSource){
					var _this = this
                	_this.$http({
						url: _this.$store.state.isLandUrl + '/userlog/insertCommonUserLog',
						method: 'POST',
						params: _this.monitorData
					}).then(function (res) {
					})
				}
            },
			explicit(a){
				var _this = this
				if(a == '走势图'){
					_this.stopScoll()
					_this.echartsShow = true;
					_this.monitorData.page_text = '走势图'
					_this.setMonitorData()
				}else if(a == '下滑人员'){
					_this.stopScoll()
					_this.glideShow = true;
					_this.monitorData.page_text = '下滑人员'
					_this.setMonitorData()
				}else if(a == '达成与贡献'){
					_this.stopScoll()
					_this.contributionShow = true;
					_this.monitorData.page_text = '达成与贡献'
					_this.setMonitorData()
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
			},
			salesmanTrendData(val){
				this.salesmanTrend = val
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
