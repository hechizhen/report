<template>
    <div class="landGuide" v-if="isShow">
        <div class="card">
            <div class="cardTop">
                <p>温馨提示</p>
                <i class="iconfont icon-guanbi iStyle" @click="close(1)"></i>
            </div>
            <div class="cardMid">
                <p>一、每月5号生成上个月的体检报告；</p>
                <p>二、当您上线立购星时间覆盖一个自然月即可生成对应的体检报告，若不满一个自然月则需到上线后第三个月5号生成体检报告（例：当前时间为9月6号，A经销商于9月6号上线立购星，9月的体检报告由于数据未满一个自然月故无法生成。10月的体检报告将于11月5号生成）；</p>
                <p>三、为使体检报告达到最好的使用效果，建议您每月及时设置业务员的目标量、正确维护商品的79码及成本价。</p>
                <div class="ignore">
                    <a-checkbox @change="onChange" :value="checkedVal">不再提示</a-checkbox>
                </div>
            </div>
            <div class="cardBottom">
                <p class="sure" @click="close(2)">确定</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'landGuide',
        props:{
        },
        components : {
        },
        data () {
            return {
                isShow:false,//是否展示弹窗
                requestUrl:this.$store.state.isLandUrl,//接口请求地址
                checkedVal:false
            }
        },
        mounted () {
            this.getLoginData()
        },
        methods: {
            onChange (e) {
                this.checkedVal = e.target.checked
            },
            //获取用户信息
            getLoginData(){
                var _this = this
                _this.$http({
                    url: _this.requestUrl + '/userlog/selectDealerLogin',
                    method: 'POST',
                    params: {
                        dealer_code:'ff80808169c93eb80169d6a73cc02d04'
                    }
                }).then(function (res) {
                    console.log(res)
                    let status = res.data.data.status
                    if(status=='1'){
                        _this.isShow = true
                    }else{
                        _this.isShow = false
                    }
                })
            },
            //修改用户信息
            setLoginData(){
                var _this = this
                _this.$http({
                    url: _this.requestUrl + '/userlog/insertDealerLogin',
                    method: 'POST',
                    params: {
                        dealer_code:'ff80808169c93eb80169d6a73cc02d04'
                    }
                }).then(function (res) {
                })
            },
            //关闭弹窗
            close(val){
                if(val==2 && this.checkedVal){
                    this.setLoginData()
                }
                this.isShow = false
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
    .landGuide{
        position: fixed;
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,0.5);
        z-index:121;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 0;
        .card{
            width:1000px;
            height:440px;
            background: #fff;
            border-radius: 5px;
            .cardTop{
                width:100%;
                height:130px;
                text-align: center;
                background: url('../../assets/img/landBg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                p{
                    font-size:30px;
                    color:#fff;
                    margin-bottom:15px;
                }
                .iStyle{
                    font-size:30px;
                    color:#fff;
                    position: absolute;
                    top:10px;
                    right:10px;
                    cursor: pointer;
                }
            }
            .cardMid{
                width:100%;
                height:220px;
                padding:10px 30px;
                position: relative;
                p{
                    color:#999999;
                    font-size: 16px;
                    line-height: 35px;
                }
                .ignore{
                    font-size:16px;
                    color:#999;
                    margin: 0 auto;
                    width:100%;
                    margin-top:10px;
                    position: absolute;
                    bottom:5px;
                    left:30px;
                }
            }
            .cardBottom{
                height:90px;
                width:100%;
                display: flex;
                align-items: center;
                .sure{
                    width:185px;
                    height:40px;
                    margin:0 auto;
                    background:linear-gradient(0deg,rgba(254,136,49,1),rgba(254,167,30,1));
                    border-radius:10px;
                    color:#fff;
                    font-size: 18px;
                    text-align: center;
                    line-height: 40px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
