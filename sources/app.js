/** Library */
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import VueRouterSync from "vuex-router-sync";
import VueI18n from "vue-i18n";
import "@babel/polyfill";
// CSS
import "animate.css/animate.min.css";
import "./common/styles/base.scss";
import "./common/styles/reset.scss";
// Vuetify UI
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
// Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// Fontawesome
import "@fortawesome/fontawesome-free/js/all.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

/** Helper */
import Http from "./common/scripts/http.js";
import Auth from "./common/scripts/auth.js";
import States from "./common/scripts/store.js";
import Routers from "./router.js";

/** Plugins */
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(ElementUI);
Vue.use(Vuetify);

/** Vuetify Instantiation */
const vuetify = new Vuetify({
  theme: {
    dark: true,
  },
  icons: {
    iconfont: "mdi"
  },
});

/** Routers */
const router = new VueRouter(Routers);
router.beforeEach((to, from, next) => {
  Auth.accessibility(to, from, next);
  Auth.interceptor();
});

/** Store */
const store = new Vuex.Store(States);

/** Sync $route to store */
const unsync = VueRouterSync.sync(store, router);
unsync();

/** Mount functions to the Prototype */
import http from "./common/scripts/prototype/http";
import storage from "./common/scripts/prototype/storage";
Vue.prototype.http = http;
Vue.prototype.storage = storage;

/** I18N */
const I18nCN = "./common/scripts/i18n/en.json";
const i18n = new VueI18n({
  locale: Vue.prototype.storage.get("i18n") === "CN" || "EN",
  silentTranslationWarn: true,
  messages: {
    CN: require("./common/scripts/i18n/en.json")
  }
});
if (module.hot) {
  module.hot.accept(["./common/scripts/i18n/en.json"], () => {
    i18n.setLocaleMessage("CN", require("./common/scripts/i18n/en.json"));
  });
}

/** Mount */
const app = new Vue({
  i18n,
  store,
  router,
  vuetify
}).$mount("#app");
