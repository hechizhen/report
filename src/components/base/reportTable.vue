
<template>
    <div class="reportTable">
        <div class="titleBox">
            <div class="title" v-for="(parentItem,parentIndex) in searchList" :key="parentIndex">
                <span>{{parentItem.name}}:</span>
                <a-input  placeholder="default size" style="width:60%;" v-model="inputVal[parentIndex]" v-if="parentItem.type=='input'" />
                <a-select  v-model="inputVal[parentIndex]"  style="width:60%;" v-if="parentItem.type=='select'">
                    <a-select-option :value="childItem" v-for="(childItem,childIndex) in parentItem.list" :key="childIndex">{{childItem}}</a-select-option>
                </a-select>
                <a-select  v-model="inputVal[parentIndex]"  style="width:60%;" v-if="parentItem.type=='selectModel'">
                    <a-select-option :value="childItem" v-for="(childItem,childIndex) in parentItem.list" :key="childIndex">{{childItem}}</a-select-option>
                </a-select>
            </div>
            <div class="title">
                <new-button :defaultVal="searchButton.defaultVal" :buttonType="searchButton.buttonType" :buttonHandleClick="searchHandleClick"></new-button>
                <new-button :defaultVal="exportButton.defaultVal" :buttonType="exportButton.buttonType" :buttonHandleClick="exportHandleClick"></new-button>
            </div>
        </div>
        <a-table :columns="tablecColumns" :dataSource="tableData" bordered :rowKey='tableData.SALE_DCL' :pagination="false" v-if="tableData.length!=0">
            <template slot="name" slot-scope="text">
                {{text}}
            </template>
        </a-table>
        <div class="paginationTable">
            <a-pagination showQuickJumper :defaultCurrent="1" :total="totalSize" :defaultPageSize="defaultSize" @change="onChange" />
        </div>
    </div>
</template>
<script>
    import newButton from './newButton.vue'
    export default {
        name : 'reportTable',
        props:{
            //查询值
            searchList:{
                type:Array,
                default:()=>['bo1','bo2','bo3','bo4']
            },
            //点击搜索
            serachClick:{
                type:Function
            },
            //抬头
            tableHeader:{
                type:Array
            },
            //接口参数
            interfaceParams:{
                type:Object
            }
        },
        components : {
            newButton
        },
        data () {
            return {
                //查询按钮样式
                searchButton:{
                    defaultVal:'查询',
                    buttonType:'primary'
                },
                //导出按钮样式
                exportButton:{
                    defaultVal:'导出数据',
                },
                inputVal:'',
                tableData:'',//列表数据
                tableColmns:'',//表头数据
                requestHttpUrl:this.$store.state.testRequestHttpUrl,//接口请求地址
                requestHttpUrl1:'http://dccuat.liby.com.cn/hanadcc/queryData',//接口请求地址
                 //表头key
                tableHeaderKey:'',
                //表头文字
                tableHeaderTxt:'',
                //参数
                newInterfaceParams:this.interfaceParams,
                requestList:'',
                params:'',
                totalSize:'',//数据总条数
                defaultSize:'',//数据条数/页
            }
        },
        created(){
            var _this = this
            let list = []
            _this.searchList.map(function(item){
                list.push(item.defaultParam)
            })
            _this.inputVal = list
        },
        mounted () {
            this.getTableData()
            this.getSelectData()
        },
        methods: {
            onChange(pageNumber) {
            },
            //点击查询
            searchHandleClick(){
                this.serachClick(this.inputVal)
            },
             //导出的方法
            exportHandleClick() {
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../../excel/Export2Excel.js');
                    const tHeader = this.tableHeaderTxt
                    // 上面设置Excel的表格第一行的标题
                    const filterVal = this.tableHeaderKey
                    // 上面的index、nickName、name是tableData里对象的属性
                    const list = this.tableData;  //把data里的tableData存到list
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '列表excel');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            getTableData() {
                var _this = this
                this.$http({
                    url: _this.requestHttpUrl,
                    method: 'POST',
                    data: _this.newInterfaceParams
                }).then(function (res) {
                    let pageData = res.data.data
                    _this.totalSize = pageData.totalSize
                    _this.defaultSize = pageData.pageSize
                    //表头key值
                    _this.tableHeaderKey = _this.interfaceParams.outputCol.split(',')
                    //表头文字
                    let header = []
                    _this.tableHeader.map(function(item){
                        header.push(item.txt)
                    })
                    _this.tableHeaderTxt = header
                    let list =[]
                    //遍历表头文字
                    _this.tableHeaderTxt.map(function(parentItem){
                        list.push({title:parentItem,dataIndex:''})
                    })
                    //遍历表头key值
                    _this.tableHeaderKey.map(function(childItem,index){
                        list[index].dataIndex = childItem
                    })
                    //获取表格表头格式
                    _this.tablecColumns = list
                    let data = res.data.data.data
                    //表格数据处理
                    data.map(function(parentItem){
                        _this.tableHeaderKey.map(function(childItem,index){
                            if(_this.tableHeader[index].unit){
                                parentItem[childItem] = _this.dataProcess(parentItem[childItem],_this.tableHeader[index].unit,_this.tableHeader[index].unit1).num+
                                _this.dataProcess(parentItem[childItem],_this.tableHeader[index].unit,_this.tableHeader[index].unit1).unit
                            }
                        })
                    })
                    //获取表格数据
                    _this.tableData = data
                })
            },

            getSelectData(){
                var _this = this
                let requestList = []
                _this.searchList.map(function(item,index){
                    if(item.type=='selectModel'){
                        _this.$http({
                            url: _this.requestHttpUrl1,
                            method: 'POST',
                            data: item.params
                        }).then(function (res) {
                            let data = res.data.data.data
                            let list = []
                            data.map(function (item, index) {
                                list.push(item[0])
                            })
                            requestList.push(list)
                        })
                    }else{
                        requestList.push('')
                    }
                })
                setTimeout(function(){
                    _this.searchList.map(function(item,index){
                        if(item.type=='selectModel'){
                            _this.searchList[index].list=requestList[index]
                        }
                    })
                },3000)
            }
        },
        computed:{

        },
        watch: {
            interfaceParams(val){
                this.newInterfaceParams=val
                this.getTableData()
            }
        },
        distroyed: function () {

        }
    }
</script>
<style scoped lang="less">
    .reportTable{
        width:100%;
        height:100%;
        background:#fff;
        padding:20px;
        .titleBox{
            width:100%;
            display:flex;
            flex-wrap:wrap;
            padding: 10px 0;
            .title{
                height:40px;
                width:20%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }
        .buttonList{
            width:100%;
            display:flex;
            flex-wrap: wrap;
            padding:20px 0 ;
            justify-content: flex-start;
        }
        .paginationTable{
            width:100%;
            text-align: right;
            padding:20px 0;
        }
    }
</style>
