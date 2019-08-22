
<template>
    <div class="headerTitle">
        <div class="headerTitle_left">
            <p class="paddingStyle">
                <span class="spanFont spanSize">{{dealName}}经销商体验分析</span>
                <span class="spanFont1">以下是针对您企业的体验分析结果，请认真审阅：</span>
            </p>
            <p class="paddingStyle1">
                <span class="spanFont">查询日期：</span>
                <a-month-picker v-model="defaultValDate" :format="monthFormat" :allowClear="false" @change="changeDate" />
                <button-list :buttonType="buttonList.buttonType" :isGhost="buttonList.isGhost" :buttonHandleClick="buttonHandleClick" :defaultVal="buttonList.defaultVal" style="margin-left:20px;"></button-list>
            </p>
            <p>
                <span style="font-size:14px;">经销商：</span>
                <a-select v-model="defaultSelectVal" style="width: 200px;height:40px;" @change="onChange">
                    <a-select-option v-for="(item,index) in dealList" :key="index" :value="item.name">{{item.name}}</a-select-option>
                </a-select>
            </p>
        </div>
        <div class="headerTitle_right">
            <span class="spanFont2 spanSize">{{score.coretype}}：</span>
            <span class="spanFont2 spanSize2">{{score.coretext}}</span>
            <span class="spanFont spanSize">总结：</span>
            <span class="spanFont spanSize">{{score.evaluate}}</span>
            <span class="spanFont1 spanSize3">{{score.subscribe}}</span>
        </div>
    </div>
</template>
<script>
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn');
    import buttonList from '../components/base/newButton.vue'
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
            dealList:{
                type:Array
            },
        },
        components : {
            buttonList
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
                newId:this.dealList[0].id,
                defaultValDate:moment(this.defaultDate, this.monthFormat),
                defaultSelectVal:this.dealList[0].name,
                defaultDateValue:this.defaultDate.substring(0,4)+this.defaultDate.substring(5,7),
            }
        },
        mounted () {
                console.log(this.score)
        },
        methods: {
            moment,
            //点击查询
            buttonHandleClick(){
                this.changeDateHandle(this.defaultDateValue,this.newId,this.defaultSelectVal)
            },
            //选择时间
            changeDate(val,newDate){
                let dateTime = newDate
                this.defaultDateValue = dateTime.substring(0,4)+dateTime.substring(5,7)
            },
            //选择经销商
            onChange(val){
                var _this = this
                _this.dealList.map(function(item){
                    console.log(item)
                    if(item.name==val){
                        _this.newId = item.id
                    }
                })
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
    .headerTitle{
        width:100%;
        padding:0 35px;
        height:135px;
        background:rgba(255,255,255,1);
        display: flex;
        flex-wrap: wrap;
        .headerTitle_left{
            width:45%;
            height:100%;
        }
        .headerTitle_right{
            width:55%;
            height:100%;
            display: flex;
            align-items: flex-end;
            padding-bottom:50px;
        }
        .paddingStyle{
            padding-top:40px;
        }
        .paddingStyle1{
            display: flex;
            align-items: center;
            margin-top:10px;
            position: relative;
        }
        .spanFont{
            color:#45485A
        }
        .spanFont1{
            color:#A0A5B1;
            padding-left:10px;
        }
        .spanFont2{
            color:#2D92FC
        }
        .spanSize{
            font-size: 16px;
        }
        .spanSize1{
            font-size: 12px;
        }
        .spanSize2{
            font-size: 50px;
            margin-right:20px;
            line-height: 42px;
        }
        .spanSize3{
            border-left:1px solid #A0A5B1;
            margin-left:15px;
        }
    }
</style>
