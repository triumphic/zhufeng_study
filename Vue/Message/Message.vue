<template>
    <div>
        <div v-for="layer in layers" :key="layer.id">
            {{layer.message}} {{layer.id}}
        </div>
    </div>
</template>
<script>
export default {
    //每次用户点击按钮式  都是增加数据  自动渲染到视图上
    data(){
        return {
            layers: []
        }
    },
    mounted(){
        this.id = 0;
    },
    methods: {
        //提供给外界去调用
        //ref $children
        add(options){   //增加一个序号，时间到了，根据序号将它移除掉
            let layer = {...options, id: ++this.id}
            this.layers.push(layer)

            layer.timer = setTimeout( () => {
                this.remove(layer)
            }, options.duration )
        },
        remove(layer){
             clearTimeout(layer.timer);  //  清除定时器和移除弹层
            this.layers = this.layers.filter( item => layer.id !== item.id )
        }
    }
}
</script>