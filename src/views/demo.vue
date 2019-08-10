
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
        <report-table :searchList="dataList" :tablecColumns="tablecColumns" :tableData="tableData" v-if="tableData.length!=0 && tablecColumns.length!=0" :serachClick="serachHandleClick" :exportClick="exportHandleClick"></report-table>
    </div>
</template>
<script>
    import pieEchart from '../components/echarts/pie.vue'
    import lineEchart from '../components/echarts/line.vue'
    import barEchart from '../components/echarts/bar.vue'
    import reportTable from '../components/base/reportTable.vue'
    export default {
        name : 'index',
        components : {
            pieEchart,
            lineEchart,
            barEchart,
            reportTable
        },
        data () {
            return {
                tableData:'',
                tableColmns:'',
                requestHttpUrl:this.$store.state.requestHttpUrl,
                dataList:['类型'],
                params:['立白洗衣粉']
            }
        },
        mounted () {
            this.getSalesData()
        },
        methods: {
            //点击搜索
            serachHandleClick(item){
                this.params=item
                this.getSalesData()
            },
            //导出的方法
            exportHandleClick() {
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../excel/Export2Excel');
                    const tHeader = ['编码', '事业部', '品类', '系列', '名称', '销量', '销量占比'];
                    // 上面设置Excel的表格第一行的标题
                    const filterVal = ['code', 'business', 'category', 'series', 'name', 'sales', 'salesPercent'];
                    // 上面的index、nickName、name是tableData里对象的属性
                    const list = this.tableData;  //把data里的tableData存到list
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '列表excel');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            getSalesData() {
                var _this = this
                var params = {
                    "inputParam":{
                        "date_dt":_this.currentDate
                    },
                    "outputCol":"monthSales,monthReach,yearSales,yearReach",
                    "pageNum":1,
                    "pageSize":1000,
                    "serviceId":"inspect_report_sales_data",
                    "orderCol":"monthSales"
                }
                this.$http({
                    url: _this.requestHttpUrl+'/commodityDetail',
                    method: 'POST',
                    data: {
                        type:_this.params[0]
                    }
                }).then(function (res) {
                    console.log(res)
                    let data = res.data.data.data
                    _this.tableData = data
                    _this.tablecColumns = [
                        {
                            title: '编码',
                            dataIndex: 'code',
                        },
                        {
                            title: '事业部',
                            dataIndex: 'business',
                        },
                        {
                            title: '品类',
                            dataIndex: 'category',
                        },
                        {
                            title: '系列',
                            dataIndex: 'series',
                        },
                        {
                            title: '名称',
                            dataIndex: 'name',
                        },
                        {
                            title: '销量',
                            dataIndex: 'sales',
                        },
                        {
                            title: '销量占比',
                            dataIndex: 'salesPercent',
                        },
                    ]
                })
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
