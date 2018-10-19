import createApp from './creat-app'

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#app')
})
