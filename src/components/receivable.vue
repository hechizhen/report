
<template>
    <div class="receivable">
        <a-row class="rowStyle bg">
            <a-col :span="14" class="fontStyle colLeft">{{receivableData.receivableTxt}}</a-col>
            <a-col :span="10" class="fontStyle colRight">
                <span>{{receivableData.receivableValUnit}}</span>
                <!-- <span class="fontStyle2">{{receivableData.receivableVal.split('.')[0]}}.</span>
                <span>{{receivableData.receivableVal.split('.')[1]}}</span> -->
                <span class="fontStyle2">{{receivableData.receivableVal}}</span>
            </a-col>
        </a-row>
        <a-row class="rowStyle bg1 borderBottom">
            <a-col :span="14" class="fontStyle1 colLeft">{{receivableData.receivableMonth}}</a-col>
            <a-col :span="10" class="fontStyle1 colRight">
                <span>{{receivableData.receivableMonthValUnit}}</span>
                <span>{{receivableData.receivableMonthVal}}</span>
            </a-col>
        </a-row>
        <a-row class="rowStyle bg1">
            <a-col :span="14" class="fontStyle1 colLeft">{{receivableData.receivableAverage}}</a-col>
            <a-col :span="10" class="fontStyle1 colRight">{{receivableData.receivableAverageVal}}</a-col>
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
            height:80px;
            width:100%;
            display:flex;
            align-items: center;
            line-height:80px;
        }
        .borderBottom{
            border-bottom:1px solid rgba(220,223,230,1);
        }
        .bg{
            background:rgba(29,145,240,1);
        }
        .bg1{
            background:rgba(241,244,251,1);
        }
        .fontStyle{
            font-size:18px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            white-space: nowrap;
        }
        .fontStyle1{
            font-size:18px;
            font-weight:bold;
            color: #737d8f;
            white-space: nowrap;
        }
        .fontStyle2{
            font-size:24px;
            font-weight:bold;
        }
        .colLeft{
            padding-left:15px;
        }
        .colRight{
            text-align: right;
            padding-right:15px;
        }
        .marginStyle{
            margin-top:1rem;
            height:1.2rem;
            line-height: 1.2rem;
        }
    }
</style>
