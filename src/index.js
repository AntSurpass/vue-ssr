import Vue from 'vue'
import VueRouter from 'vue-router'
import creatRouter from './routers/router'
import App from './App.vue'

import './assets/a.jpg'
import './style/index.scss'

const router = creatRouter()

Vue.use(VueRouter)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
