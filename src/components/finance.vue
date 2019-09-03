<template>
    <div class="finance">
        <second-title :titleName="titleName" :explainSecondList="explainSecondList"></second-title>
        <div class="buttonList">
            <newbutton :defaultVal="buttonDeafult.defaultValL" :buttonHandleClick="storeHandleClick" :btnStyle="btnStyle" :txtStyle="txtStyle"></newbutton>
            <newbutton  :defaultVal="buttonDeafult.defaultValR" style="margin-left:12px;" :buttonHandleClick="personHandleClick" :btnStyle="btnStyle" :txtStyle="txtStyle"></newbutton>
        </div>
        <div class="financeBox">
            <div class="financeLeft">
                <finance-table :tableData="financeData"></finance-table>
            </div>
            <div class="financeMid">
                <receivable :receivableData="receivableData"></receivable>
            </div>
            <div class="financeRight">
                <over-due :overDueData="overDueData" :overDueClick="overDueHandleClick"></over-due>
            </div>
            <loading-data :isShow="isShow"></loading-data>
            <public-table v-if="isShowDetail" :close="closePopup" :tableHeader="tableData.header" :interfaceParams="tableData.params" :titleName="tableData.titleName"></public-table>
        </div>
        <preview-table v-if="storeShow" :data="tableStoreList" :columns="tableStoreColumns" titleName="门店效益" :buttonGroup="cardStore"
        :selectButtonClick="changeStoreButtonVal" :returnClick="storeReturnClick"></preview-table>
        <preview-table v-if="personShow" :data="tablePersonList" :columns="tablePersonColumns" titleName="人均效能" :buttonGroup="cardPerson"
        :selectButtonClick="changePersonButtonVal"  :returnClick="personReturnClick"></preview-table>
    </div>
</template>
<script>
    import financeTable from '../components/base/financeTable.vue'//财务报表
    import receivable from '../components/receivable.vue'//应收账款
    import overDue from '../components/overDue.vue'
    import newbutton from './button'
    import secondTitle from '../components/secondTitle.vue'
    import loadingData from './base/loadingData'
    import publicTable from './base/publicTable.vue'
    import previewTable from './base/previewTable.vue'
    import XLSX from 'xlsx'
    export default {
        name : 'finance',
        props:{
            //财务数据
            financeData:{
                type:Array
            },
            //应收欠款
            receivableData:{
                type:Object
            },
            //逾期欠款
            overDueData:{
                type:Object
            },
            //标题名字
            titleName:{
                type:String
            },
            isShow:{
                type:Boolean,
                default:false,
            },
            //逾期明细表格数据
            tableData:{
                type:Object
            }
        },
        components : {
            financeTable,
            receivable,
            overDue,
            newbutton,
            secondTitle,
            loadingData,
            publicTable,
            previewTable
        },
        data () {
            return {
                // isShow:true,
                //按钮样式
                buttonDeafult:{
                    // buttonType:'primary',
                    // isGhost:true,
                    defaultValL:'门店效益',
                    defaultValR:'人均效能'
                },
                btnStyle:{
                    width: '2.4rem',
                    height: '.9rem',
                    border: '1px solid #00A6FF',
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle:{
                    fontSize:'.4rem',
                    color:'#2D92FC',
                    fontWeight:400
                },
                explainSecondList:{
					imgType:7,
					tableData:[
						{title:'收入',data:'统计销售金额-销售折让-销退金额'},
						{title:'成本：',data:'统计商品、退货、赠品等成本'},
						{title:'毛利：',data:'统计收入-成本'},
						{title:'厂家费用：',data:'统计厂家费用（返利等）'},
						{title:'支出费用：',data:'统计客户费用（投入门店的费用eg：陈列费等）、内部费用（工资、租金等）'},
						{title:'利润：',data:'统计毛利+厂家费用-客户费用-内部费用'},
						{title:'应收欠款：',data:'统计累计成交金额-实收金额'},
						{title:'实收金额：',data:'统计累计用户实收账款'},
						{title:'逾期应收：',data:'统计累计用户逾期金额（与立购星统一）'},
						{title:'逾期占比：',data:'统计累计逾期金额/应收欠款'},
                        {title:'逾期平均账龄：',data:'统计逾期天数/二帮卖逾期订单总数'},
					],
					titleName:'财务指标解释'
                },
                isShowDetail:false,
                storeShow:false,
                personShow:false,
                workbookStore:'',
                workbookPerson:'',
                cardStore:'',//门店维度
                cardPerson:'',//人员维度
                tableStoreColumns:'',//门店列头
                tableStoreList:'',//门店数据
                tablePersonColumns:'',//人员列头
                tablePersonList:''//人员数据
            }
        },
        mounted () {
            this.readWorkbookFromRemoteFileStore('./static/test.xlsx')
            this.readWorkbookFromRemoteFilePerson('./static/test1.xlsx')
            // this.readWorkbookFromRemoteFileStore('src/static/test.xlsx')
            // this.readWorkbookFromRemoteFilePerson('src/static/test1.xlsx')
        },
        methods: {
            //切换门店效益维度
            changeStoreButtonVal(item){
                this.getTableStore(item)
            },
            //切换人均效能维度
            changePersonButtonVal(item){
                this.getTablePerson(item)
            },
            readWorkbookFromRemoteFileStore: function (url) {
                var xhr = new XMLHttpRequest()
                xhr.open('get', url, true)
                xhr.responseType = 'arraybuffer'
                let _this = this
                xhr.onload = function (e) {
                    if (xhr.status === 200) {
                        var data = new Uint8Array(xhr.response)
                        var workbook = XLSX.read(data, {type: 'array'})
                        console.log(workbook)

                        var sheetNames = workbook.SheetNames // 工作表名称集合
                        _this.workbookStore = workbook
                        _this.cardStore = sheetNames
                        _this.cardActive = sheetNames[0]
                        _this.getTableStore(sheetNames[0])
                    }
                }
                xhr.send()
            },
            getTableStore (sheetName) {
                var worksheet = this.workbookStore.Sheets[sheetName]
                this.tableStoreList = XLSX.utils.sheet_to_json(worksheet)
                let header = Object.keys(this.tableStoreList[0])
                let columns = []
                header.map(function(item){
                    columns.push({title:item,key:item})
                })
                this.tableStoreColumns = columns
            },
            readWorkbookFromRemoteFilePerson: function (url) {
                var xhr = new XMLHttpRequest()
                xhr.open('get', url, true)
                xhr.responseType = 'arraybuffer'
                let _this = this
                xhr.onload = function (e) {
                    if (xhr.status === 200) {
                        var data = new Uint8Array(xhr.response)
                        var workbook = XLSX.read(data, {type: 'array'})
                        console.log(workbook)

                        var sheetNames = workbook.SheetNames // 工作表名称集合
                        _this.workbookPerson = workbook
                        _this.cardPerson = sheetNames
                        _this.cardActive = sheetNames[0]
                        _this.getTablePerson(sheetNames[0])
                    }
                }
                xhr.send()
            },
            getTablePerson (sheetName) {
                var worksheet = this.workbookPerson.Sheets[sheetName]
                this.tablePersonList = XLSX.utils.sheet_to_json(worksheet)
                let header = Object.keys(this.tablePersonList[0])
                let columns = []
                header.map(function(item){
                    columns.push({title:item,key:item})
                })
                this.tablePersonColumns = columns
            },
            //门店收益
            storeHandleClick(){
                this.stopScoll()
                this.storeShow = true
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭门店收益
            storeReturnClick(){
                this.moveScoll()
                this.storeShow = false
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },
            //人均效能
            personHandleClick(){
                this.stopScoll()
                this.personShow = true
                //页面出现弹框页面禁止滚动
                this.stopScoll()
            },
            //关闭人均效能
            personReturnClick(){
                this.moveScoll()
                this.personShow = false
                //弹框消失，恢复正常滑动效果
                this.moveScoll()
            },
            //关闭逾期明细
            closePopup(){
                this.moveScoll()
                this.isShowDetail = false
            },
            //打开逾期明细
            overDueHandleClick(){
                this.stopScoll()
                this.isShowDetail = true
            }
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
    .finance{
        width:100%;
        position: relative;
        .buttonList{
            position: absolute;
            top:0;
            left:2rem;
            padding: 0.8rem 0 0.45rem;
            display: flex;
            align-items: center;
        }
        .financeBox{
            width:100%;
            height:7.2rem;
            background: #fff;
            border-radius: 6px;
            display: flex;
            flex-wrap: wrap;
            .financeLeft{
                width:40%;
                height:100%;
                display: flex;
                align-items: center
            }
            .financeMid{
                width:30%;
                height:100%;
                padding-top:0.6rem;
            }
            .financeRight{
                width:30%;
                height:100%;
            }
        }
    }
</style>
