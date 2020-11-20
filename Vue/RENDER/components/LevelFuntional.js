export default {
    props: {
        type: {
            type: String
        }
    },
    render(h) {   //h => createElement   vnode 虚拟节点  （对象）
        console.log(this);

        //render 中的this指代的是当前组件的实例
        // return h('h'+this.type, {}, this.$slots.default)      //vnode

        //jsx 与 react中的不太一样， jsx => js + xml   (html + javascript)

        //<> 都是html  如果是js  {} 
        let tag = 'h' + this.type
        return <tag a={1}>{this.$slots.default}</tag>
    }
}