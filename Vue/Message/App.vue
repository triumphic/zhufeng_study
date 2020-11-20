<template>
    <button @click="show">弹层</button>
</template>

<script>
import Vue from 'vue'
// import { Message } from './Message'
import ZFUi from './Message'
Vue.use(ZFUi);      //use 方法使用的时候，默认会调用内部的install方法
export default {
    methods: {
        show() {
            // Message.success({
            //     message: '你好',
            //     duration: 3000
            // })
            this.$message.success({
                message: '你好',
                duration: 3000
            })
        }
    }
}
</script>