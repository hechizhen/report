<template>
    <div class="new-button" @click="buttonClick" :style="btnStyle">
        <div class="txt" :style="txtStyle"> {{defaultVal}}</div>
    </div>
</template>

<script>
    export default {
        name: "button",
        props:{
            //点击事件
            buttonHandleClick:{
                type:Function
            },
            //按钮文字
            defaultVal:{
                type:String,
                default:'订单详情'
            },
            // 按钮样式
            btnStyle: {
                type: Object,
                default: () => {
                    return {
                        width: '88px',
                        height: '32px',
                    };
                }
            },
            // 文字样式
            txtStyle: {
                type: Object,
                default: () => {
                    return {

                    };
                }
            },
        },
        methods: {
            buttonClick(val){
                this.buttonHandleClick(val)
            }
        },
    }
</script>

<style scoped>
    .new-button{
        border:1px solid rgba(220,220,220,1);
        border-radius:6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor:pointer;
    }
    .txt{
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    }

</style>
