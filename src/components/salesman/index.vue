<template>
	<div class="bandSelling">
		<subTitle :subtitlename="subtitlename" :listing="listing"></subTitle>
		<manager :explicit="explicit" :salesmanData="salesmanData"></manager>
		<core :coretype="'业务员得分'" :coretext="100" :evaluate="'较好'"></core>
		<trendChart  v-if="echartsShow" :trendChartClick="trendChartClick"></trendChart>
	</div>
</template>
<script>
	import subTitle from "./../subTitle.vue"
	import manager from "./manager.vue"
	import core from "./../core.vue"
	import trendChart from "./../secondBand/trendChart.vue"
	export default {
		name:'index',
		components:{
			subTitle,
			manager,
			core,
			trendChart
		},
		props:{
			salesmanData:{
				type:Object,
				default:{}
			}
		},
		data(){
			return {
				subtitlename:'业务员',
				listing:[],
				echartsShow:false,
			}
		},
		mounted(){

		},
		methods:{
			explicit(a){
				if(a == '走势图'){
					this.echartsShow = true;
				}
			},
			trendChartClick(){
				this.echartsShow = false;
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