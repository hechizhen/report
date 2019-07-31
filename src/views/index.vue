
<template>
    <div class="index">
        <div class="title">
            <p>体检报告</p>
            <i></i>
        </div>
        <header-title></header-title>
    </div>
</template>
<script>
    import headerTitle from '../components/headerTitle.vue'//头部标题
    import pieEchart from '../components/echarts/pie.vue'//饼图
    import lineEchart from '../components/echarts/line.vue'//折线图
    import barEchart from '../components/echarts/bar.vue'//柱状图
    export default {
        name : 'index',
        components : {
            headerTitle,
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
       width:100%;
       padding:0 20px;
       background:#eaeff8;
       p{
           margin-bottom:0;
       }
       .title{
           background:#fff;
           width:140px;
           height:40px;
           border-bottom:2px solid #2D92FC;
           display: flex;
           align-items: center;
           justify-content: center;
           p{
               color:#2D92FC;
               font-size: 16px;
           }
       }
    }
</style>
