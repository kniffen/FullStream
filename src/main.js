import Vue         from 'vue'
import VueLazyload from 'vue-lazyload'
import App         from './App'
import router      from './router'

Vue.config.productionTip = false
Vue.use(VueLazyload)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
