import Vue from 'vue'
import App from './App.vue'
import './style.css'
import router from "./router/routes"
import vuetify from './plugins/vuetify'
import './plugins/axios'
import VueMask from 'v-mask'

Vue.use(VueMask);
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
