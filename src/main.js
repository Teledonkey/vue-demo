import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入element组件库
import ElementUI from "element-ui";
//引入element样式文件
import "element-ui/lib/theme-chalk/index.css";
//引入弹性盒子布局样式
import "./assets/css/flex.css";
//使用element
Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  //to 即将进入的路由
  //from 即将离开的路由
  //路由变化前先到sessionStorage中获取tabs内容
  store.commit("getTabs");
  //设置tabs中当前激活的选项卡
  store.commit("setActiveTab", to.name);

  //解决刷新后vuex中菜单没有的问题
  let menuData = sessionStorage.getItem("menuList");
  // console.log(menuData);
  if (menuData) {
    //缓存有菜单数据
    if (store.state.MenuStore.menu_data.length == 0) {
      //vuex中没有数据，router中也没有动态路由，需将缓存数据拉到vuex和router中，并且要重定向路由，不然无法找到新添加的动态路由
      store.commit("getMenuList", router);
      next({ path: to.path });
    }
    // console.log(store.state.MenuStore.menu_data);
    if (to.path === "/login") {
      //且是登录页
      // console.log("这里是有缓存且是登录页");
      next({ path: "/home" });
    } else {
      // console.log("这里是有缓存但不是登录页");
      next();
    }
  } else {
    //没有缓存
    if (to.path === "/login") {
      //且是登陆页
      next();
    } else {
      //没有缓存又不是登录页，说明非法访问，强制跳转到登录页
      next({ path: "/login" });
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
