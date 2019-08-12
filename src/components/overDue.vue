
<template>
    <div class="overDue">
        <div class="overDueTop">
            <div class="overDueTopBox">
                <div>
                    <p>{{overDueData.overDueTxt}}</p>
                    <p>
                        <span>{{overDueData.overDueValUnit}}</span>
                        <span>{{overDueData.overDueval}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="overDueBottom">
            <a-progress type="circle" :percent="Number(overDueData.overDueRadioPercent)" :successPercent="15"  :width="126" :showInfo="false" strokeColor="#6BBCFF" />
            <div class="overDueBox">
                <div>
                    <p>
                        <i></i>
                        <span class="salesTxt">{{overDueData.overDueRadioTxt}}</span>
                    </p>
                    <p>
                        {{overDueData.overDueRadio}}
                    </p>
                </div>
            </div>
            <new-button :defaultVal="defaultVal" :buttonHandleClick="detailHandleClick" style="position:absolute;right:0;"></new-button>
        </div>
    </div>
</template>
<script>
    import newButton from '../components/base/newButton.vue'
    export default {
        name : 'overDue',
        props:{
            //逾期账款数据
            overDueData:{
                type:Object
            }
        },
        components : {
            newButton
        },
        data () {
            return {
                defaultVal:'逾期明细'
            }
        },
        mounted () {
          
        },
        methods: {
            //逾期明细
            detailHandleClick(){

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
<style lang="less">
.ant-progress-circle-trail{
    stroke: #FD6691!important;
    border:1px solid #fff;
}
</style>
<style scoped lang="less">
    .overDue{
        width:80%;
        margin:0 auto;
        padding-top:22px;
        .overDueTopBox{
            width:100%;
            height:90px;
            border:1px solid rgba(87,174,246,1);
            border-radius:6px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            p{
                font-size:12px;
                font-weight:bold;
                color:rgba(87,174,246,1);
                margin-bottom:0;
            }
            p:nth-child(2){
                margin-top:10px;
                span{
                    color:rgba(87,174,246,1);
                }
                span:first-child{
                    font-size: 16px;
                }
                span:nth-child(2){
                    font-size: 24px;
                }
            }
        }
        .overDueBottom{
            display: flex;
            align-items: center;
            width:100%;
            height:173px;
            position: relative;
            .overDueBox{
                position: absolute;
                width:126px;
                height:126px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                p{
                    margin-bottom:0;
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                }
                p:first-child{
                    font-size:12px;
                }
                p:nth-child(2){
                    font-size:20px;
                }
            }
        }
    }
</style>
