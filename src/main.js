import Vue       from 'vue'
import App       from './App'
import router    from './router'

Vue.config.productionTip = false

// Icon font
require('./assets/fonts/fullstream-iconfont/fullstream-iconfont.css')

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
