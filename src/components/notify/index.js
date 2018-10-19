import Notify from './notify.vue'
import notify from './notify'

export default (Vue) => {
  Vue.component(Notify.name, Notify)
  Vue.prototype.$notify = notify
}
