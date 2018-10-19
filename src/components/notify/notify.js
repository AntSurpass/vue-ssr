import Vue from 'vue'
import component from './function'

const NotifyConstrutor = Vue.extend(component)

const instances = []
let leed = 1

const removeitem = (instance) => {
  let length = instances.length
  let index = instances.findIndex((item) => {
    return item.id === instance.id
  })
  instances.splice(index, 1)

  if (length <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < length - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset - removeHeight - 16)
  }
}

const notify = (option) => {
  if (Vue.prototype.$isServer) return

  const {
    autolose,
    ...rest
  } = option

  const instance = new NotifyConstrutor({
    propsData: {
      ...rest
    },
    data: {
      autolose: autolose === undefined ? 1500 : autolose
    }
  })
  const insid = `notifi_${leed++}`
  instance.id = insid
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visiable = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  instance.vm.$on('closed', () => {
    removeitem(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visiable = false
  })

  return instance.vm
}

export default notify
