<template>
	<div class="bandSelling">
		<subTitle :subtitlename="subtitlename" :listing="listing"></subTitle>
		<manager :explicit="explicit" :salesmanData="salesmanData"></manager>
		<core :coretype="'业务员得分'" :coretext="100" :evaluate="'较好'"></core>
	</div>
</template>
<script>
	import subTitle from "./../subTitle.vue"
	import manager from "./manager.vue"
	import core from "./../core.vue"
	export default {
		name:'index',
		components:{
			subTitle,
			manager,
			core
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
			}
		},
		mounted(){

		},
		methods:{
			explicit(a){
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