import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element组件库
import ElementUI from 'element-ui';
//引入element样式文件
import 'element-ui/lib/theme-chalk/index.css';
//引入弹性盒子布局样式
import './assets/css/flex.css';
//使用element
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
