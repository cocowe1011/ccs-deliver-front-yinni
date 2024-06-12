import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'; //全局引入element
import 'element-ui/lib/theme-chalk/index.css'; //全局引入element的样式
import axios from 'axios';
import VueCookies from 'vue-cookies'
import i18n from './i18n'; // 引入 i18n 配置
import './assets/iconfont.css'
Vue.use(VueCookies)

Vue.config.productionTip = false;
Vue.use(ElementUI); //全局注入element
Vue.prototype.$axios = axios;
axios.defaults.timeout = 20000;

  new Vue({
    router,
    i18n, // 使用 i18n
    store,
    render: (h) => h(App)
  }).$mount('#app');
