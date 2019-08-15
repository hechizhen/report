<template>
    <div class="finance">
        <second-title :titleName="titleName" :explainSecondList="explainSecondList"></second-title>
        <div class="buttonList">
            <new-button :buttonType="buttonDeafult.buttonType" :isGhost="buttonDeafult.isGhost" :defaultVal="buttonDeafult.defaultValL" :buttonHandleClick="storeHandleClick"></new-button>
            <new-button :buttonType="buttonDeafult.buttonType" :isGhost="buttonDeafult.isGhost" :defaultVal="buttonDeafult.defaultValR" style="margin-left:12px;" :buttonHandleClick="personHandleClick"></new-button>
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
            <public-table v-if="isShowDetail" :close="closePopup" :tableHeader="tableData.header" :interfaceParams="tableData.params"></public-table>
        </div>
    </div>
</template>
<script>
    import financeTable from '../components/base/financeTable.vue'//财务报表
    import receivable from '../components/receivable.vue'//应收账款
    import overDue from '../components/overDue.vue'
    import newButton from '../components/base/newButton.vue'
    import secondTitle from '../components/secondTitle.vue'
    import loadingData from './base/loadingData'
    import publicTable from './base/publicTable.vue'
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
            newButton,
            secondTitle,
            loadingData,
            publicTable
        },
        data () {
            return {
                // isShow:true,
                //按钮样式
                buttonDeafult:{
                    buttonType:'primary',
                    isGhost:true,
                    defaultValL:'门店效益',
                    defaultValR:'人均效能'
                },
                explainSecondList:{
					imgType:7,
					tableData:[
						{title:'收入',data:'统计销售金额-销售折让-销退金额'},
						{title:'大成本：',data:'统计商品、退货、赠品等成本'},
						{title:'毛利：',data:'统计收入-成本'},
						{title:'厂家费用：',data:'统计厂家费用（返利等）'},
						{title:'支出费用：',data:'统计客户费用（投入门店的费用eg：陈列费等）、内部费用（工资、租金等）'},
						{title:'利润：',data:'统计毛利+厂家费用-客户费用-内部费用'},
						{title:'应收欠款：',data:'统计累计成交金额-实收金额'},
						{title:'实收金额：',data:'统计累计用户实收账款'},
						{title:'逾期金额：',data:'统计累计用户逾期金额'},
						{title:'逾期占比：',data:'统计累计逾期金额/应收欠款'},
					],
					titleName:'财务指标解释'
                },
                isShowDetail:false
            }
        },
        mounted () {

        },
        methods: {
            //门店收益
            storeHandleClick(){

            },
            //人均效能
            personHandleClick(){

            },
            //关闭逾期明细
            closePopup(){
                this.isShowDetail = false
            },
            //打开逾期明细
            overDueHandleClick(){
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
            left:60px;
            padding: 29px 0 18px;
            display: flex;
            align-items: center;
        }
        .financeBox{
            width:100%;
            height:285px;
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
                padding-top:23px;
            }
            .financeRight{
                width:30%;
                height:100%;
            }
        }
    }
</style>
