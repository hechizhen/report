<template>
	<div class="bandSelling">
		<subTitle :subtitlename="subtitlename" :listing="listing"></subTitle>
		<core :coretype="'二帮卖得分'" :coretext="100" :evaluate="'优秀'"></core>
	</div>
</template>
<script>
	import subTitle from "./../subTitle.vue"
	import core from "./../core.vue"
	export default {
		name:'index',
		components:{
			subTitle,
			core
		},
		props:{

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
			explicit(a,b){
				alert(a)
				alert(b)
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