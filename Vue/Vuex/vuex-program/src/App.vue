<template>
  <div id="app">
    {{$store.state.age}}
    <br>
    {{$store.getters.myAge}}
    <br>
    <button @click="add">增加</button>
    <button @click="asyncAdd">异步增加</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
    console.log(this.$store)
  },
  methods: {
    add(){
      this.$store.commit('syncAdd', 10)
    },
    asyncAdd(){
      this.$store.dispatch('asyncMinus', 5)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
