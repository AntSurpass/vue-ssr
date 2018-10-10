import Vue from 'vue'
import App from './App.vue'

import './assets/a.jpg'
import './style/index.scss'

const root = document.createElement('div')

document.body.appendChild(root)

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

new Vue({
  render: (h) => h(App)
}).$mount(root)
