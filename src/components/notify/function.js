import Notify from './notify.vue'

export default {
  extends: Notify,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  data () {
    return {
      verticalOffset: 0,
      autolose: 1000,
      visiable: false,
      height: 0
    }
  },
  mounted () {
    this.creatTime()
  },
  methods: {
    creatTime () {
      if (this.autolose) {
        this.timer = setTimeout(() => {
          this.visiable = false
        }, this.autolose)
      }
    },
    clearTime () {
      clearTimeout(this.timer)
    },
    afterenter () {
      console.log(this.$el.offsetHeight)
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory () {
    this.clearTimer()
  }
}
