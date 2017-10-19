// library
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueRouterSync from 'vuex-router-sync'
// css
import './common/styles/base.scss'
import './common/styles/reset.scss'
import 'font-awesome/css/font-awesome.css'
// ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// util
import Http from './common/helper/http.js'
import Auth from './common/helper/auth.js'
import States from './common/global/store.js'
import Routers from './common/global/router.js'

/** Plugins */
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)

/** Routers */
const router = new VueRouter(Routers)
router.beforeEach((to, from, next) => {
  Auth.accessibility(to, from, next)
  Auth.interceptor()
})

/** Store */
const store = new Vuex.Store(States)

/** Sync $route to store */
const unsync = VueRouterSync.sync(store, router)
unsync()

/** Mount */
const app = new Vue({
  store,
  router
}).$mount('#app')
