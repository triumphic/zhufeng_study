<template>
    <div>
        <button class="lk-button" :class="btnClass">
            <span v-if="this.$slots.default">
                <slot></slot>
            </span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'lk-button',
    props: {
        type: {
            type:String,
            default: '',
            validator(type){
                if(type&&!['primary','warning','success','danger','info'].includes(type)){
                    console.error('type类型必须为：'+['primary','warning','success','danger','info'].join(','));
                }   
                return true;
            }
        }
    },
    computed: {
        btnClass(){
            let classes = [];
            if(this.type){
                classes.push(`lk-button-${this.type}`)
            }
            return classes
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/_var.scss';
$height: 42px;
$font-size: 16px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #3a8ee6;
.lk-button{
    border-radius: $border-radius;
    border: 1px solid $border-color;
    height: $height;
    font-size: $font-size;
    cursor: pointer;
    line-height: 1;
    padding: 12px 20px;
    display: inline-flex;
    justify-content: center;
    vertical-align: middle;
    user-select: none;
    &:hover{
        border-color: $border-color;
        background-color: $background;
    }
    &:focus,&:active{
        color: $active-color;
        border: 1px solid $active-color;
        background-color: $background;
        outline: none;
    }
    @each $type, $color in (primary:$primary, success:$success, info:$info, warning:$warning, danger:$danger){
        &-#{$type}{
            background: #{$color};
            border: 1px solid #{$color};
            color: #fff;
        }
    }
}
</style>