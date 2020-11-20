<template>
    <div id="app">
        <zf-menu>
            <!-- 里面有两部分 一部分是标题  另一部分是标题展开的内容 -->
            <zf-submenu>
                <template slot="title">导航一</template>
                <zf-menu-item>导航1-1</zf-menu-item>
                <zf-menu-item>导航1-2</zf-menu-item>
            </zf-submenu>
            <zf-menu-item>导航二</zf-menu-item>
            <zf-menu-item>导航三</zf-menu-item>
        </zf-menu>
    </div>
</template>

<script>
import zfMenu from './components/zf-menu'
import zfMenuItem from './components/zf-menu-item'
import zfSubmenu from './components/zf-submenu'

export default {
    components: {
        zfMenu,
        zfMenuItem,
        zfSubmenu
    }
}
</script>

<style>

</style>