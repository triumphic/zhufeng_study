<template>
  <h1 v-if="type=='1'">
    <slot></slot>
  </h1>
  <h2 v-else-if="type=='2'">
    <slot></slot>
  </h2>
  <h3 v-else-if="type=='3'">
    <slot></slot>
  </h3>
  <h4 v-else-if="type=='4'">
    <slot></slot>
  </h4>
  <h5 v-else-if="type=='5'">
    <slot></slot>
  </h5>
  <h6 v-else-if="type=='6'">
    <slot></slot>
  </h6>
</template>

<script>
//template 不灵活，递归，功能缺陷  标签组件
//render 函数渲染元素
export default {
    render(h){  //我希望值提供render函数而不再使用template
        return h('h1',{},'你好')
    },
    props: {
        type: {
        type: String,
        default: "",
        },
    },
};
</script>