// 所有的组件的入口

import Button from './button.vue';
import Icon from './icon.vue';

const install = (Vue) => {
    Vue.component(Button.name, Button)
    Vue.component(Icon.name, Icon)
}

// 全局直接通过script 引用的方式会默认调用install方法
if( typeof window.Vue !== "undefined" ){
    install(Vue)
}

export default {
    install  
}