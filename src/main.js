import Vue from 'vue'
import { Button } from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'

// 加载mockServer即可
import './mock/mockServer'

Vue.component(Button.name, Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
