<template>
    <div class="productRight">
        <div class="pinRight" >
            <div class="pinRight-centen">
                <div class="product-centen" v-for="(item) in dataTxt">
                    <span>{{item.name}}</span>
                    <div class="w" v-bind:style="{ 'width':item.txt}">
                        <div class="q">{{item.txt}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "productRight",
        props:["dataTxt"],
        data(){
            return{
                productRight:false,
                // dataTxt:[
                //     {
                //         name:"立白",
                //         val:"48",
                //     },
                //     {
                //         name:"立白",
                //         val:"88",
                //     },
                //     {
                //         name:"立白",
                //         val:"88",
                //     }
                // ]

            }
        }
    }
</script>

<style lang="less" scoped>
    .pinRight{
        width: 60%;
        float: right;
        margin-top: 6%;
        .pinRight-centen{
            width: 80%;
            .product-centen {
                margin-top: 19px;
                transform-style: preserve-3d;
                perspective: 200px;
                span{
                    font-size:12px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    float: left;
                }
                .w {
                    margin-left: 12%;
                    text-align: left;
                    height: 14px;
                    background-color: #fff;
                    position: relative;
                    .q {
                        position: absolute;
                        top: 0;
                        right: -50px;
                        font-size: 14px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
