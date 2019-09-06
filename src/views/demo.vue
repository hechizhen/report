
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

<!-- <a href="javascript:;" class="file">导入表格
   <input id="upload" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
</a> -->
    </div>
</template>
<script>
    // import pieEchart from '../components/echarts/pie.vue'
    // import lineEchart from '../components/echarts/line.vue'
    // import barEchart from '../components/echarts/bar.vue'
    import reportTable from '../components/base/reportTable.vue'
    var _this = this;
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
                        defaultParam:'立白洗衣粉'
                    },
                    {
                        name:'时间类型',
                        type:'select',
                        list:['年','月'],
                        defaultParam:'月'
                    },
                    {
                        name:'时间类型',
                        type:'selectModel',
                        list:[],
                        params:{
                            "serviceId":"data_core_bo1",
                            "inputParam":{
                                "saleType":"自营"
                            },
                            "outputCol":"bo1",
                            "orderCol":"bo1 desc",
                            "pageSize":10000,
                            "pageNum":1
                        },
                        defaultParam:'立白市场部'
                    },
                    {
                        name:'时间类型',
                        type:'selectModel',
                        list:[],
                        params:{
                            "serviceId":"data_core_bo1",
                            "inputParam":{
                                "saleType":"自营"
                            },
                            "outputCol":"bo1",
                            "orderCol":"bo1 desc",
                            "pageSize":10000,
                            "pageNum":1
                        },
                        defaultParam:'立白市场部'
                    },
                ],
                //接口参数
                interfaceParams: '',
                //数据处理以及表头
                tableHeaderTxt:[
                    {txt:'事业部',unit:false},
                    {txt:'销量',unit:'money',unit1:'tenth'},
                    {txt:'目标',unit:'money',unit1:'tenth'},
                    {txt:'达成率',unit:'percent',unit1:''},
                    {txt:'同比',unit:'percent',unit1:''},
                ],
            }
        },
        created(){
        },
        mounted () {
            this.interfaceParams = {
                    "serviceId":"data_saleDay_year_month_brand",
                    "inputParam":{
                        "DATETYPE":this.searchList[1].defaultParam,
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
             importfxx(obj) {
                let _this = this;
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                this.file = event.currentTarget.files[0];
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        this.da = [...outdata]
                        let arr = []
                        this.da.map(v => {
                            let obj = {}
                            obj.id = v.id
                            obj.status = v.status
                            arr.push(obj)
                        })
                        let para = {
                            //withList: JSON.stringify(this.da)
                            withList: arr
                        }
                        _this.$message({
                            message: '请耐心等待导入成功',
                            type: 'success'
                        });
                        withImport(para).then(res => {
                            window.location.reload()
                        })
                        
                    }
                    reader.readAsArrayBuffer(f);
                }
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
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
