
<template>
    <div class="receivable">
        <a-row class="rowStyle bg">
            <a-col :span="18" class="fontStyle">{{receivableData.receivableTxt}}</a-col>
            <a-col :span="6" class="fontStyle">
                <span>{{receivableData.receivableValUnit}}</span>
                <span class="fontStyle2">{{receivableData.receivableVal}}</span>
            </a-col>
        </a-row>
        <a-row class="rowStyle bg1 borderBottom">
            <a-col :span="18" class="fontStyle1">{{receivableData.receivableMonth}}</a-col>
            <a-col :span="6" class="fontStyle1">
                <span>{{receivableData.receivableMonthValUnit}}</span>
                <span>{{receivableData.receivableMonthVal}}</span>
            </a-col>
        </a-row>
        <a-row class="rowStyle bg1">
            <a-col :span="18" class="fontStyle1">{{receivableData.receivableAverage}}</a-col>
            <a-col :span="6" class="fontStyle1">{{receivableData.receivableAverageVal}}</a-col>
        </a-row>
        <!-- <a-row class="rowStyle1 bg marginStyle">
            <a-col :span="18" class="fontStyle">{{receivableData.receivableDay}}</a-col>
            <a-col :span="6" class="fontStyle">{{receivableData.receivableDayVal}}</a-col>
        </a-row> -->
    </div>
</template>
<script>
    export default {
        name : 'receivable',
        props:{
            //应收欠款数据
            receivableData:{
                type:Object
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
    .receivable{
        width:90%;
        margin:0 auto;
        .rowStyle{
            height:81px;
            width:100%;
            display:flex;
            align-items: center;
            line-height: 73px;
        }
        .rowStyle1{
            height:43px;
            width:100%;
            line-height: 43px;
        }
        .borderBottom{
            border-bottom:1px solid rgba(220,223,230,1);
        }
        .bg{
            background:rgba(107,188,255,1);
        }
        .bg1{
            background:rgba(241,244,251,1);
        }
        .fontStyle{
            font-size:14px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            white-space: nowrap;
        }
        .fontStyle1{
            font-size:12px;
            font-weight:bold;
            color:#98A2B4;
            white-space: nowrap;
        }
        .fontStyle2{
            font-size:24px;
            font-weight:bold;
        }
        /deep/.ant-col-18{
            padding-left:21px;
        }
        /deep/.ant-col-6{
            text-align: right;
            padding-right:21px;
        }
        .marginStyle{
            margin-top:31px;
            height:50px;
            line-height: 50px;
        }
    }
</style>
