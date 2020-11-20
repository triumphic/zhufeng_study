import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({ //导出一个store的实例
  modules: {
    a: {
      state: {a: 1,},
      modules: {
        c: {
          state: { c: 3 }
        }
      }
    },
    b: {
      state: { b: 2 }
    }
  },

  state: {
    age: 10
  },
  getters: {
    myAge(state){
      return state.age + 18;
    }
  },
  mutations: {
    syncAdd(state, payload){
      state.age += payload;
    },
    syncMinus(state, payload){
      state.age -= payload
    }
  },
  actions: {
    asyncMinus({commit}, payload){ //action  异步获取完后，提交到mutation中
      setTimeout( () => {
        commit('syncMinus', payload)
      }, 1000 )
    }
  },
  modules: {
  }
})
