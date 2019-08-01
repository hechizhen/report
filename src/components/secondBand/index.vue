<template>
	<div class="bandSelling">
		<secondTitle :titleName="titleName"></secondTitle>
		<subTitle :subtitlename="subtitlename" :listing="listing" :explicit="explicit"></subTitle>
		<a-Row :gutter="23">
		  <a-Col :span="10">
		  	<sameMonth></sameMonth>
		  </a-Col>
		  <a-Col :span="7">
		  	<totalAmount :titleName="'环比'"></totalAmount>
		  </a-Col>
		  <a-Col :span="7">
		  	<totalAmount :titleName="'同比'"></totalAmount>
		  </a-Col>
		</a-Row>
		<core :coretype="'二帮卖得分'" :coretext="100" :evaluate="'优秀'"></core>
	</div>
</template>
<script>
	import secondTitle from "./../secondTitle.vue"
	import subTitle from "./../subTitle.vue"
	import sameMonth from "./sameMonth.vue"
	import totalAmount from "./totalAmount.vue"
	import core from "./../core.vue"
	export default {
		name:'index',
		components:{
			secondTitle,
			subTitle,
			sameMonth,
			totalAmount,
			core
		},
		props:{

		},
		data(){
			return {
				titleName:'二帮卖分析',
				subtitlename:'订单',
				listing:['订单详情','门店效益']
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