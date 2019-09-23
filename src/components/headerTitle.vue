
<template>
    <div class="headerTitle">
        <div class="headerTitle_left">
            <p class="paddingStyle">
                <!-- <span class="spanFont spanSize">{{dealName}}</span> -->
                <span class="spanFont spanSize">以下是针对您企业的体检报告分析结果，请认真审阅：</span>
            </p>
            <p class="paddingStyle1">   
                <span class="spanFont" style="font-size:14px;">查询日期：</span>
                <!-- <a-month-picker v-model="defaultValDate" :disabledDate="disabledDate" :format="monthFormat" :allowClear="false" @change="changeDate" /> -->
                <DatePicker type="month" v-model="defaultValDate" :options="options3" format="yyyy/MM" :clearable="false" @on-change="changeDate" style="width:170px" v-if="options3!=''"></DatePicker>
                <button-list :buttonType="buttonList.buttonType" :isGhost="buttonList.isGhost" :buttonHandleClick="buttonHandleClick" :defaultVal="buttonList.defaultVal" style="margin-left:20px;"></button-list>
            </p>
            <p style="margin-top: 2%">
                <span style="font-size:14px;padding-left:10px;">经销商：</span>
                <a-select showSearch v-model="defaultSelectVal" @change="onChange" style="width:170px;">
                    <a-select-option v-for="(item,index) in dealList" :key="item+index" :value="item.name" :disabled="item.date_dt==nowDate ? true : false">{{item.name}}</a-select-option>
                </a-select>
            </p>
        </div>
        <div class="headerTitle_mid">
            <gauge-chart :gaugeChartData="gaugeChartData" v-if="gaugeChartData!=''"></gauge-chart>
            <div class="headerTitle_mid_box">
                <div>
                    <p>{{score.coretext}}</p>
                    <p>{{score.coretype}}</p>
                </div>
            </div>
        </div>
        <div class="headerTitle_right">
            <!-- <span class="spanFont2 spanSize4">{{score.coretype}}：</span>
            <span class="spanFont2 spanSize2">{{score.coretext}}</span> -->
            <div>
                <span class="spanFont spanSize4">总结：</span>
                <span class="spanFont spanSize4">{{score.evaluate}}</span>
                <span class="spanFont1 spanSize3">{{score.subscribe}}</span>
            </div>
        </div>
        <loading-data></loading-data>
    </div>
</template>
<script>
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn');
    import buttonList from '../components/base/newButton.vue'
    import gaugeChart from '../components/echarts/gauge1.vue'
    import loadingData from './base/loadingData.vue'
    export default {
        name : 'headerTitle',
        props:{
            //经销商名称
            dealName:{
                type:String,
                default:'吴凌云1',
            },
            //评分
            score:{
                type:Object,
                default:{}
            },
            //总结
            summary:{
                type:String,
                default:'较好'
            },
            //默认时间
            defaultDate:{
                type:String,
                default:'2017/05'
            },
            //点击查询
            changeDateHandle:{
                type:Function,
            },
            //经销商数据
            dealList:{
                type:Array
            },
            //s
            startDateList:{
                type:Array
            },
            //是否展示经销商下拉框
            isShowDealIdSelect:{
                type:Boolean
            },
            startDate:{
                type:String
            },
            endDate:{
                type:String
            }
        },
        components : {
            buttonList,
            gaugeChart,
            loadingData
        },
        data () {
            return {
                monthFormat: 'YYYY/MM',
                //按钮默认样式
                buttonList:{
                    buttonType:'primary',
                    defaultVal:'查询',
                    isGhost:false
                },
                newId:'ff80808169c93eb80169d6a73cc02d04',
                defaultValDate:this.defaultDate,
                defaultSelectVal:this.dealName,
                defaultDateValue:this.defaultDate.substring(0,4)+this.defaultDate.substring(5,7),
                headerStartDate:Number(this.startDate.substring(5,7)),
                headerEndDate:Number(this.endDate.substring(5,7)),
                nowDate:'',
                options3: '',
                gaugeChartData:'',
            }
        },
        created(){
            let date = new Date;
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            month = month<10 ? '0'+month : month
            this.nowDate = year+'-'+month
        },
        mounted () {
            let endTime = this.headerEndDate
            let startTime = this.headerStartDate
            this.options3 = {
                disabledDate(date) {
                    var _this = this
                    const disabledDay = date.getMonth()+1;
                    return disabledDay > endTime || disabledDay < startTime
                },
            }
            this.gaugeChartData = {
                    name:'总得分',
                    data:this.score.coretext
                }
        },
        methods: {
            moment,
            disabledDate(current) {
                let a = moment(this.headerEndDate)
                let b = moment(this.headerStartDate)
               return current && current > a || current < b
            },
            //点击查询
            buttonHandleClick(){
                this.changeDateHandle(this.defaultDateValue,this.newId,this.defaultSelectVal)
            },
            //选择时间
            changeDate(val,newDate){
                let dateTime = val
                this.defaultDateValue = dateTime.substring(0,4)+dateTime.substring(5,7)
            },
            //选择经销商
            onChange(val){
                var _this = this
                _this.dealList.map(function(item){
                    if(item.name==val){
                        _this.newId = item.id
                        _this.defaultSelectVal = item.name
                    }
                })
                _this.startDateList.map(function(item){
                    if(_this.defaultSelectVal.indexOf(item.dealer_name)!=-1){
                        _this.headerStartDate = Number(item.date_dt.substring(4,6))
                    }
                })
                let endTime = this.headerEndDate
                let startTime = this.headerStartDate
                this.options3 = {
                    disabledDate(date) {
                        var _this = this
                        const disabledDay = date.getMonth()+1;
                        return disabledDay > endTime || disabledDay < startTime
                    },
                }
            },
        },
        computed:{
        },
        watch: {
            score(val){
                this.gaugeChartData = {
                    name:'总得分',
                    data:val.coretext
                }
            },
            dealName(val){
                this.defaultSelectVal = val
            }
        },
        distroyed: function () {

        }
    }
</script>
<style scoped lang="less">
    .headerTitle{
        width: calc(~"100% - 40px");
        padding:0 20px;
        height:135px;
        background:rgba(255,255,255,1);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        position: fixed;
        top:0;
        z-index: 101;
        .headerTitle_left{
            // height:100%;
        }
        .headerTitle_mid{
            // width: 4rem;
            width: 142px;
            height:100%;
            margin-left:1.8rem;
            position: relative;
            .headerTitle_mid_box{
                position: absolute;
                top:0;
                width: 100%;
                height:100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                p:first-child{
                    color:#0068EC;
                    // font-size: 1rem;
                    font-size: 46px;
                    padding-top:0.3rem;
                }
                p:nth-child(2){
                    color:#0068EC;
                    // font-size: 0.3rem;
                    font-size: 13px;
                }
            }
        }
        .headerTitle_right{
            // height: 100%;
            width: calc(~"63% - 135px");
            word-wrap: break-word;
            word-break: break-all;
            flex-wrap: wrap;
            // padding-top:1rem;
            // line-height: 20px;
            padding-left:0.5rem;
            display: flex;
            align-items: center;
        }
        .paddingStyle{
            // padding-top:1rem;
        }
        .paddingStyle1{
            display: flex;
            align-items: center;
            margin-top:10px;
            position: relative;
        }
        .spanFont{
            color:#45485A;
        }
        .spanFont1{
            color:#A0A5B1;
            padding-left:10px;
        }
        .spanFont2{
            color:#2D92FC
        }
        .spanSize{
            // font-size: 0.4rem;
            font-size: 12px;
            font-weight:500;
            color:rgba(160,165,177,1);
        }
        .spanSize1{
            font-size: 0.3rem;
        }
        .spanSize2{
            font-size: 50px;
            margin-right:20px;
            line-height: 42px;
        }
        .spanSize3{
            border-left:1px solid #A0A5B1;
            margin-left:15px;
            font-size: 12px;
        }
        .spanSize4{
            font-size: 0.6rem;
        }
    }
</style>
