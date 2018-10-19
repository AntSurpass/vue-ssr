import Main from '../todo/main.vue'
import Login from '../todo/login.vue'

export default [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: Main
  },
  {
    path: '/login',
    component: Login
  }
]
