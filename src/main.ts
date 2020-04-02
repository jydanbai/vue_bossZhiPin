import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'amfe-flexible/index.js'
import router from './router'
import * as API from './api'

import { Tabbar, TabbarItem, Button, Loading, Toast} from 'vant';


Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.use(Loading);
Vue.use(Toast);

Vue.prototype.$API = API
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
