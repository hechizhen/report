<template>
    <div class="productRight">
        <div class="pinRight" >
            <div class="pinRight-centen">
                <div class="product-centen">
                    <span>立白</span>
                    <div class="w" v-bind:style="{ 'width': '88%'}">
                        <div class="q">32.34%</div>
                    </div>
                </div>
                <div class="product-centen">
                    <span>立白</span>
                    <div class="w" v-bind:style="{ 'width': '32.34%'}">
                        <div class="q">32.34%</div>
                    </div>
                </div>
                <div class="product-centen">
                    <span>立白</span>
                    <div class="w" v-bind:style="{ 'width': '32.34%'}">
                        <div class="q">32.34%</div>
                    </div>
                </div>
                <div class="product-centen">
                    <span>立白</span>
                    <div class="w" v-bind:style="{ 'width': '32.34%'}">
                        <div class="q">32.34%</div>
                    </div>
                </div>
                <div class="product-centen">
                    <span>立白</span>
                    <div class="w" v-bind:style="{ 'width': '32.34%'}">
                        <div class="q">32.34%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "productRight",
        data(){
            return{
                productRight:false
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
                    margin-left: 8%;
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
