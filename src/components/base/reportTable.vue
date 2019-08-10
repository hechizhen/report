
<template>
    <div class="reportTable">
        <div class="titleBox">
            <div class="title" v-for="(item,index) in searchList" :key="index">
                <span>{{item}}:</span>
                <a-input  placeholder="default size" style="width:60%;" v-model="inputVal[index]"/>
            </div>
            <!-- <a-input v-for="(item,index) in searchList" :key="index" placeholder="default size" :value="value[index]" /> -->
            <div class="title">
                <new-button :defaultVal="searchButton.defaultVal" :buttonType="searchButton.buttonType" :buttonHandleClick="searchHandleClick"></new-button>
                <new-button :defaultVal="exportButton.defaultVal" :buttonType="exportButton.buttonType" :buttonHandleClick="exportHandleClick"></new-button>
            </div>
        </div>
        <a-table :columns="tablecColumns" :dataSource="tableData" bordered>
            <template slot="name" slot-scope="text">
                {{text}}
            </template>
        </a-table>
    </div>
</template>
<script>
    import newButton from './newButton.vue'
    export default {
        name : 'reportTable',
        props:{
            searchList:{
                type:Array,
                default:()=>['bo1','bo2','bo3','bo4']
            },
            tableData:{
                type:Array,
                default:()=>[
                    {
                        key: '1',
                        name: 'John Brown',
                        money: '￥300,000.00',
                        address: 'New York No. 1 Lake Park',
                    }, {
                        key: '2',
                        name: 'Jim Green',
                        money: '￥1,256,000.00',
                        address: 'London No. 1 Lake Park',
                    }, {
                        key: '3',
                        name: 'Joe Black',
                        money: '￥120,000.00',
                        address: 'Sidney No. 1 Lake Park',
                    }
                ]
            },
            tablecColumns:{
                type:Array,
                default:()=>[
                    {
                        title: 'Name',
                        dataIndex: 'name',
                    }, {
                        title: 'Cash Assets',
                        dataIndex: 'money',
                    }, {
                        title: 'Address',
                        dataIndex: 'address',
                    }
                ]
            },
            //点击搜索
            serachClick:{
                type:Function
            },
            //点击导出
            exportClick:{
                type:Function
            }
        },
        components : {
            newButton
        },
        data () {
            return {
                //查询按钮样式
                searchButton:{
                    defaultVal:'查询',
                    buttonType:'primary'
                },
                //导出按钮样式
                exportButton:{
                    defaultVal:'导出数据',
                },
                inputVal:[]
            }
        },
        mounted () {

        },
        methods: {
            //点击查询
            searchHandleClick(){
                console.log(this.inputVal)
                this.serachClick(this.inputVal)
            },
            //点击导出
            exportHandleClick(){
                this.exportClick()
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
    .reportTable{
        width:100%;
        height:100%;
        background:#fff;
        padding:20px;
        .titleBox{
            width:100%;
            display:flex;
            flex-wrap:wrap;
            .title{
                height:40px;
                width:20%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }
        .buttonList{
            width:100%;
            display:flex;
            flex-wrap: wrap;
            padding:20px 0 ;
            justify-content: flex-start;
        }
    }
</style>
