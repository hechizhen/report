
<template>
    <div class="index">
        <div style="width:500px;height:500px;">
            <pie-echart></pie-echart>
        </div>
        <div style="width:500px;height:500px;">
            <line-echart></line-echart>
        </div>
        <div style="width:500px;height:500px;">
            <bar-echart></bar-echart>
        </div>
    </div>
</template>
<script>
    import pieEchart from '../components/echarts/pie.vue'
    import lineEchart from '../components/echarts/line.vue'
    import barEchart from '../components/echarts/bar.vue'
    export default {
        name : 'index',
        components : {
            pieEchart,
            lineEchart,
            barEchart
        },
        data () {
            return {
                
            }
        },
        mounted () {
          
        },
        methods: {
          
        },
        computed:{
          
        },
        watch: {
           
        },
        distroyed: function () {
            
        }
    }
</script>
<style scoped lang="less">
    .index{
       
    }
</style>
