import Vue from 'vue'
import { Button } from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

// 加载mockServer即可
import './mock/mockServer'
import loading from './common/imgs/loading.gif'
import './filters'

Vue.component(Button.name, Button)
Vue.use(VueLazyLoad, {
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
