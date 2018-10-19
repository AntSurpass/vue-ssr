import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './App.vue'
import creatRouter from './routers/router'

import Notify from './components/notify'
import './assets/a.jpg'
import './style/index.scss'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notify)

export default () => {
  const router = creatRouter()
  const app = new Vue({
    router,
    render: (h) => h(App)
  })

  return { router, app }
}
