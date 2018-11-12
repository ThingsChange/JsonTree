import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import treeMmenu from '@/components/tree/index'
Vue.component('jsonTree', treeMmenu);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
