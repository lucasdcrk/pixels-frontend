import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

window.line_size = 1920 / 20;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
