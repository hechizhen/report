
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
            <div class="overDueBottomLeft">
                <a-progress type="circle" :percent="Number(overDueData.overDueRadioPercent)" :strokeWidth ="10" :successPercent="15"  :width="126" :showInfo="false" strokeColor="#6BBCFF" />
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
            </div>
            <newbutton :defaultVal="defaultVal" :buttonHandleClick="detailHandleClick" :txtStyle="txtStyle" :btnStyle="btnStyle"></newbutton>
        </div>
    </div>
</template>
<script>
    import newbutton from './button'
    export default {
        name : 'overDue',
        props:{
            //逾期账款数据
            overDueData:{
                type:Object
            },
            //逾期明细点击事件
            overDueClick:{
                type:Function
            }
        },
        components : {
            newbutton
        },
        data () {
            return {
                defaultVal:'逾期明细',
                btnStyle:{
                    width: '94px',
                    height: '26px',
                    border: '1px solid #DCDCDC',
                    // hover:{
                    // 	color:'red'
                    // }
                },
                txtStyle:{
                    fontSize:'12px',
                    color:'#333333',
                    fontWeight:400
                },
            }
        },
        mounted () {

        },
        methods: {
            //逾期明细
            detailHandleClick(){
                this.overDueClick()
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
// .ant-progress-inner{
//     width:3rem!important;
//     height:3rem!important
// }
</style>
<style scoped lang="less">
    .overDue{
        width:80%;
        margin:0 auto;
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
                font-size:14px;
                font-weight:bold;
                color:#333;
                margin-bottom:0;
            }
            p:first-child{
                margin-left: 0.25rem;
            }
            p:nth-child(2){
                margin-top:0.25rem;
                span{
                    color:rgba(87,174,246,1);
                }
                span:first-child{
                    font-size: 16px
                }
                span:nth-child(2){
                    font-size: 24px
                }
            }
        }
        .overDueBottom{
            display: flex;
            align-items: center;
            width:100%;
            height: 150px;
            position: relative;
            justify-content: center;
            .overDueBottomLeft{
                position: relative;
                margin-right:0.75rem;
            }
            .overDueBox{
                position: absolute;
                width:126px;
                height:126px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                top: 0;
                p{
                    margin-bottom:0;
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                }
                p:first-child{
                    font-size:14px;
                }
                p:nth-child(2){
                    font-size:20px;
                }
            }
        }
    }
</style>
