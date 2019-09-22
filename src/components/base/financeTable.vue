
<template>
    <div class="financeTable">
        <a-row v-for="(item,index) in tableData" :key="index" class="rowStyle">
            <a-col :span="9" class="colLeft">{{item.name}}</a-col>
            <a-col :span="15" class="colRight">
                <span>￥</span>
                <span>{{item.val}}</span>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    export default {
        name : 'financeTable',
        props:{
            //列表数据
            tableData:{
                type:Array,
            }
        },
        components : {
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
    .financeTable{
        width: 92%;
        margin:0 auto;
        border:1px solid rgba(229,229,229,1);
        .rowStyle{
            width:100%;
            height:40px;
            border-bottom:1px solid rgba(229,229,229,1);
            display: flex;
            align-items: center;
           .colLeft{
                text-align: right;
                font-size:16px;
                font-weight:bold;
                color:rgba(152,162,180,1);
                width:160px;
           }
           .colRight{
                width: calc(~"100% - 160px");
                text-align: right;
                padding-right:0.9rem;
                span{
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                }
                span:first-child{
                    font-size:14px;
                }
                span:nth-child(2){
                    font-size:16px;
                }
           }
       }
    }
</style>
