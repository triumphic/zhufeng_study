import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import lkUi from './packages/index'

Vue.use(lkUi);

new Vue({
  render: h => h(App),
}).$mount('#app')
