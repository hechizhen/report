
<template>
    <div class="previewTable">
        <div class="tableBox" ref="divHeight">
            <!-- <loading-data :isShow="loadingShow"></loading-data> -->
            <div class="title">
                {{titleName}}
            </div>
            <i class="iconfont icon-guanbi iStyle" @click="returnHandleClick"></i>
            <div class="titleBox">
                <!-- <div class="buttonGroup" >
                    <a-radio-group :defaultValue="buttonGroup[0]" buttonStyle="solid" @change="changeDimension">
                        <a-radio-button v-for="(item,index) in buttonGroup" :key="index" :value="item">{{item}}</a-radio-button>
                    </a-radio-group>
                </div> -->
                <newbutton defaultVal="下载表格" :buttonHandleClick="exportClick" style="margin-right:2%;" :btnStyle="btnStyle" :txtStyle="txtStyle"></newbutton>
            </div>
            <Table :columns="columns" :data="data" border :height="maxHeight"></Table>
        </div>
    </div>
</template>
<script>
    import newbutton from '../button'
    import loadingData from '../base/loadingData.vue'
    export default {
        name : 'previewTable',
        components : {
            newbutton,
            loadingData
        },
        props:{
            titleName:{
                type:String
            },
            //多维度单选
            buttonGroup:{
                type:Array,
                default:()=>['a','b','c']
            },
            //多维度单选点击
            selectButtonClick:{
                type:Function
            },
            columns:{
                type:Array,
                default:()=>[
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ]
            },
            data:{
                type:Array,
                default:()=>[
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            },
            returnClick:{
                type:Function
            }
        },
        data () {
            return {
                headerTxt:'',
                headerKey:'',
                dimension:this.buttonGroup[0],
                btnStyle:{
                    width: '98px',
                    height: '30px',
                    border: '1px solid #959595',
                },
                txtStyle:{
                    fontSize:'16px',
                    color:'#333333',
                    fontWeight:400,
                    hover:{
                        color:'#BEBEBE'
                    },
                },
                maxHeight:'',
                monitorData:this.$store.state.monitorData,
				originSource:this.$store.state.originSource
            }
        },
        mounted () {
            let height =this.$refs.divHeight.offsetHeight;
            this.maxHeight = height-150
        },
        methods: {
            //插入监控数据
            setMonitorData(){
				if(!this.originSource){
					var _this = this
                	_this.$http({
						url: _this.$store.state.isLandUrl + '/userlog/insertCommonUserLog',
						method: 'POST',
						params: _this.monitorData
					}).then(function (res) {
					})
				}
            },
            //选择维度
            changeDimension(item){
                this.dimension = item.target.value
                this.selectButtonClick(item.target.value)
            },
            //关闭弹窗
            returnHandleClick(){
                this.returnClick()
            },
            //导出数据
            exportClick(){
                this.monitorData.page_text = this.titleName+'导出数据'
                this.setMonitorData()
                let headerTxt = []
                let headerKey = []
                this.columns.map(function(item){
                    headerTxt.push(item.title)
                    headerKey.push(item.key)
                })
                this.headerTxt = headerTxt
                this.headerKey = headerKey
                this.exportHandleClick(this.headerTxt,this.headerKey,this.data,this.titleName)
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
    .previewTable{
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 120;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.5);
        .ivu-table-tip{
            display: none
        }
        .tableBox{
            height: 80%;
            width: 90%;
            background:rgba(255,255,255,1);
            border-radius: 5px;
            padding: 20px;
            position: relative;
            .title{
                font-size: 22px;
                display: flex;
                justify-content: center;
            }
            .titleBox{
                width:100%;
                display:flex;
                align-items: center;
                justify-content: flex-end;
                padding: 10px 0;
                position: relative;
                .buttonGroup{
                    position: absolute;
                    left:20px;
                    top:0
                }
            }
            .iStyle{
                position: absolute;
                right:5px;
                top:5px;
                font-size: 30px;
                cursor: pointer;
            }
        }
    }
</style>
