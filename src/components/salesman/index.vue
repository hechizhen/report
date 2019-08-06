<template>
	<div class="bandSelling">
		<subTitle :subtitlename="subtitlename" :listing="listing"></subTitle>
		<manager :explicit="explicit" :salesmanData="salesmanData"></manager>
		<core :coretype="'业务员得分'" :coretext="100" :evaluate="'较好'"></core>
		<trendChart  v-if="echartsShow" :trendChartClick="trendChartClick"></trendChart>
		<glide  v-if="glideShow" :trendChartClick="glideClick"></glide>
		<contribution   v-if="contributionShow" :trendChartClick="contributionClick"></contribution>
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
			}
		},
		data(){
			return {
				subtitlename:'业务员',
				listing:[],
				echartsShow:false,
				glideShow:false,
				contributionShow:false,
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
		computd:{

		},
		distroyed:{

		}
	}
</script>
<style lang="less" scoped>
	
</style>