
<template>
    <div class="finance">
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
</template>
<script>
    import financeTable from '../components/base/financeTable.vue'//财务报表
    import receivable from '../components/receivable.vue'//应收账款
    import overDue from '../components/overDue.vue'
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
            }
        },
        components : {
            financeTable,
            receivable,
            overDue
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
    .finance{
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
</style>
