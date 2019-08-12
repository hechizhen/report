
<template>
    <div class="index">
        <!-- <div style="width:500px;height:500px;">
            <pie-echart></pie-echart>
        </div>
        <div style="width:500px;height:500px;">
            <line-echart></line-echart>
        </div>
        <div style="width:500px;height:500px;">
            <bar-echart></bar-echart>
        </div> -->
        <report-table :searchList="searchList" :serachClick="serachHandleClick" :defaultList="params" :interfaceParams="interfaceParams" 
        :tableHeader="tableHeaderTxt" v-if="interfaceParams!=''"></report-table>
    </div>
</template>
<script>
    // import pieEchart from '../components/echarts/pie.vue'
    // import lineEchart from '../components/echarts/line.vue'
    // import barEchart from '../components/echarts/bar.vue'
    import reportTable from '../components/base/reportTable.vue'
    export default {
        name : 'index',
        components : {
            // pieEchart,
            // lineEchart,
            // barEchart,
            reportTable
        },
        data () {
            return {
                //搜索文字以及条件
                searchList:[
                    {
                        name:'类型',
                        type:'input',
                    },
                    {
                        name:'时间类型',
                        type:'select',
                        list:['年','月']
                    },
                ],
                //参数
                params:['立白洗衣粉','月'],
                //接口参数
                interfaceParams:'',
                //数据处理以及表头
                tableHeaderTxt:[
                    {txt:'事业部',unit:false},
                    {txt:'销量',unit:'money',unit1:'tenth'},
                    {txt:'目标',unit:'money',unit1:'tenth'},
                    {txt:'达成率',unit:'percent',unit1:''},
                    {txt:'同比',unit:'percent',unit1:''},
                ]
            }
        },
        mounted () {
            this.interfaceParams = {
                "serviceId":"data_saleDay_year_month_brand",
                "inputParam":{
                    "DATETYPE":this.params[1],
                    "DATA_DT":"201908"
                },
                "outputCol":"ZNBO1_TEXT,SALE_SL,SALE_MB,SALE_DCL,Y2Y_PRECENT",
                "orderCol":"orderNum",
                "pageSize":100,
                "pageNum":1
            }
        },
        methods: {
            //点击搜索
            serachHandleClick(item){
                this.params=item
                this.interfaceParams = {
                    "serviceId":"data_saleDay_year_month_brand",
                    "inputParam":{
                        "DATETYPE":this.params[1],
                        "DATA_DT":"201908"
                    },
                    "outputCol":"ZNBO1_TEXT,SALE_SL,SALE_MB,SALE_DCL,Y2Y_PRECENT",
                    "orderCol":"orderNum",
                    "pageSize":100,
                    "pageNum":1
                }
            },
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
