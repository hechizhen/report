
<template>
    <div class="finance">
        <second-title :titleName="titleName"></second-title>
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
                <over-due :overDueData="overDueData"></over-due>
            </div>
        </div>
    </div>
</template>
<script>
    import financeTable from '../components/base/financeTable.vue'//财务报表
    import receivable from '../components/receivable.vue'//应收账款
    import overDue from '../components/overDue.vue'
    import newButton from '../components/base/newButton.vue'
    import secondTitle from '../components/secondTitle.vue'
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
            }
        },
        components : {
            financeTable,
            receivable,
            overDue,
            newButton,
            secondTitle
        },
        data () {
            return {
                //按钮样式
                buttonDeafult:{
                    buttonType:'primary',
                    isGhost:true,
                    defaultValL:'门店效益',
                    defaultValR:'人均效能'
                }
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
