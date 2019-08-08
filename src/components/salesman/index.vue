<template>
	<div class="bandSelling">
		<subTitle :subtitlename="subtitlename" :listing="listing" :explainSecondList="explainSecondList"></subTitle>
		<manager :explicit="explicit" :salesmanData="salesmanData"></manager>
		<core :coretype="'业务员得分'" :coretext="100" :evaluate="'较好'"></core>
		<trendChart  v-if="echartsShow" :trendChartClick="trendChartClick" :lineEchartsData="direction"></trendChart>
		<glide  v-if="glideShow" :trendChartClick="glideClick" :salesmandownward="salesmandownward"></glide>
		<contribution   v-if="contributionShow" :trendChartClick="contributionClick" :salesmanReached="salesmanReached"></contribution>
	</div>
</template>
<script>
	import subTitle from "./../subTitle.vue"
	import manager from "./manager.vue"
	import core from "./../core.vue"
	import trendChart from "./../secondBand/trendChart.vue"
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
			contribution
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
					this.echartsShow = true;
				}else if(a == '下滑人员'){
					this.glideShow = true;
				}else if(a == '达成与贡献'){
					this.contributionShow = true;
				}
			},
			trendChartClick(){
				this.echartsShow = false;
			},
			glideClick(){
				this.glideShow = false;
			},
			contributionClick(){
				this.contributionShow = false;
			}
		},
		watch:{
            salesmanTrendData(val){
            	this.direction = {
                    id:'lineId',
                    xAxisData:val.monthArr,
                    lineData:val.seriesData
            	}
        	},
        	salesmandownwardData(val) {
        		this.salesmandownward = val
        	},
        	salesmanReachedData(val) {
        		this.salesmanReached = val
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