import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import plugins from '@/plugins'
import i18n from '@/locales'

Vue.use(plugins)
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
