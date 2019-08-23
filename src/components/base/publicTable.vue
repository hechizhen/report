
<template>
    <div class="publicTable">
        <div class="publicBox" ref="divHeight">
            <loading-data :isShow="loadingShow"></loading-data>
            <div class="titleName">
                <p>{{titleName}}</p>
            </div>
            <div class="titleBox">
                <div class="buttonGroup" v-if="buttonGroup.show">
                    <a-radio-group :defaultValue="buttonGroup.list[0]" buttonStyle="solid" @change="changeDimension">
                        <a-radio-button v-for="(item,index) in buttonGroup.list" :key="index" :value="item">{{item}}</a-radio-button>
                    </a-radio-group>
                </div>
                <new-button :defaultVal="exportButton.defaultVal" :buttonHandleClick="exportHandleClick" style="margin-right:2%;"></new-button>
                <!-- <new-button :defaultVal="returnButton.defaultVal" :buttonType="returnButton.buttonType" :buttonHandleClick="returnHandleClick"></new-button> -->
                <i class="iconfont icon-guanbi iStyle" @click="returnHandleClick"></i>
            </div>
            <Table :height="maxHeight" :columns="tablecColumns" :data="tableData" border  v-if="tableData.length!=0" :loading="tableLoading"></Table>
            <div class="paginationTable">
                <Page :total="totalSize" :current="1" :page-size="defaultSize" show-elevator v-if="totalSize!='' && defaultSize!=''" @on-change="onChange" />
            </div>
        </div>
    </div>
</template>
<script>
    import newButton from './newButton.vue'
    import loadingData from '../base/loadingData.vue'
    export default {
        name : 'publicTable',
        props:{
            //抬头
            tableHeader:{
                type:Array
            },
            //接口参数
            interfaceParams:{
                type:Object
            },
            //关闭弹窗
            close:{
                type:Function
            },
            //多维度单选
            buttonGroup:{
                type:Object,
                default:()=>({
                    show:false,
                    list:['a','b','c']
                })
            },
            //多维度单选点击
            selectButtonClick:{
                type:Function
            },
            titleName:{
                type:String,
                default:''
            }
        },
        components : {
            newButton,
            loadingData
        },
        data () {
            return {
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
                newTableHeader:this.tableHeader,
                requestList:'',
                totalSize:'',//数据总条数
                defaultSize:'',//数据条数/页
                loadingShow:false,
                maxHeight:'',
                tableLoading:false,
                pageNumber:1,
                result:'',
            }
        },
        created(){
            // alert(JSON.stringify(this.tableHeader))
        },
        mounted () {
            //  alert(JSON.stringify(this.tableHeader))
            let height =this.$refs.divHeight.offsetHeight;
            this.maxHeight = height*0.70
            this.getTableData()
        },
         computed:{
            getObj () {
            this.result={
                params:this.interfaceParams,
                header:this.tableHeader
            }
                return this.result
            },
        },
        watch: {
            getObj: {
                handler(newName) {
                    this.newInterfaceParams = newName.params
                    this.newTableHeader = newName.header
                    this.getTableData()
                },
                deep: true
            },
        },
        methods: {
            //分页
            onChange(pageNumber) {
                this.pageNumber = pageNumber
                this.newInterfaceParams.pageNum = this.pageNumber
                this.getTableData()
            },
            //选择维度
            changeDimension(item){
                console.log(item.target.value)
                this.selectButtonClick(item.target.value)
            },
            //点击关闭
            returnHandleClick(){
                this.close()
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
            //获取表格数据
            getTableData() {
                var _this = this
                _this.loadingShow=true
                this.$http({
                    url: _this.requestHttpUrl,
                    method: 'POST',
                    data: _this.newInterfaceParams
                }).then(function (res) {
                    let pageData = res.data.data
                    _this.totalSize = res.data.data.totalSize
                    _this.defaultSize = pageData.pageSize
                    //表头key值
                    let keyValue = _this.newInterfaceParams.outputCol.split(',')
                    let numArray = ['numberId']
                    _this.tableHeaderKey = numArray.concat(keyValue)
                    //表头文字
                    let header = []
                    _this.newTableHeader.map(function(item){
                        header.push(item.txt)
                    })
                    _this.tableHeaderTxt = header
                    let list =[]
                    //遍历表头文字
                    _this.tableHeaderTxt.map(function(parentItem){
                        list.push({title:parentItem,key:''})
                    })
                    //遍历表头key值
                    _this.tableHeaderKey.map(function(childItem,index){
                        list[index].key = childItem
                    })
                    //获取表格表头格式
                    _this.tablecColumns = list
                    let data = res.data.data.data
                    //表格数据处理
                    data.map(function(parentItem,parentIndex){
                        parentItem.numberId = (_this.pageNumber-1)*_this.defaultSize+parentIndex+1
                        _this.tableHeaderKey.map(function(childItem,index){
                            if(_this.tableHeader[index].unit){
                                if(_this.tableHeader[index].unit!='percent'){
                                    parentItem[childItem] = _this.dataProcess(parentItem[childItem],_this.tableHeader[index].unit,_this.tableHeader[index].unit1).num
                                }else{
                                    parentItem[childItem] = _this.dataProcess(parentItem[childItem],_this.tableHeader[index].unit,_this.tableHeader[index].unit1).num
                                                            + _this.dataProcess(parentItem[childItem],_this.tableHeader[index].unit,_this.tableHeader[index].unit1).unit
                                }
                            }else{
                                if(_this.tableHeader[index].txt=='是否开业' || _this.tableHeader[index].txt=='是否动销'){
                                    parentItem[childItem] = parentItem[childItem]==0 ? '否' : '是'
                                }
                            }
                        })
                    })
                    //获取表格数据
                    _this.tableData = data
                    _this.loadingShow=false
                })
            },
        },
        distroyed: function () {

        }
    }
</script>
<style scoped lang="less">
    .publicTable{
        width:100%;
        height:100%;
        background-color: rgba(69,72,90,.5);
        left: 0;
        top: 0;
        z-index: 10;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top:0;
        .publicBox{
            width:90%;
            height:80%;
            padding:20px;
            background:#fff;
            border-radius: 5px;
            position: relative;
        }
        .titleBox{
            width:100%;
            display:flex;
            align-items: center;
            justify-content: flex-end;
            padding: 10px 0;
            .buttonGroup{
                position: absolute;
                left:20px;
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
            padding:1.5% 0;
        }
        .iStyle{
            position: absolute;
            right:5px;
            top:5px;
            font-size: 30px;
            cursor: pointer;
        }
    }
    .titleName{
        font-size: 22px;
        display: flex;
        justify-content: center;
    }
</style>
