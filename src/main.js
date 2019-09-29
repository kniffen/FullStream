import Vue           from 'vue'
import AsyncComputed from 'vue-async-computed'
import VueLazyload   from 'vue-lazyload'

import App         from './App'
import router      from './router'

Vue.config.productionTip = false

Vue.use(AsyncComputed)
Vue.use(VueLazyload)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
