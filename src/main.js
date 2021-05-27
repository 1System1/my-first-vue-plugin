import Vue from 'vue'
import App from './App.vue'
import router from "./router"
Vue.config.productionTip = false
window.Vue=Vue
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

// import 'xe-utils'
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/style.css'
import  Indicator from "vue-cli-plugin-cnbi"
Vue.use(Indicator)


// console.log('-----------1--------------',window.Vue)
// Vue.use(require('vue-cli-plugin-cnbi'))
// console.log('-----------2--------------',window.Vue)


import Plain from './styles/plain'


Vue.use(Plain)



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
