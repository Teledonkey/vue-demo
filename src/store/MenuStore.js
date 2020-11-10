export default {
  state: {
    //当前激活的选项卡
    editableTabsValue: "desktop",
    tabs: [
      {
        title: "首页",
        name: "desktop",
      }
    ],
    //左侧菜单数据
    menu_data: [],
    //菜单收缩属性
    isCollapse: false,
  },
  mutations: {
      getTabs(state){
        let storedTabs = sessionStorage.getItem("tabList");
        if (storedTabs) {
          let currentTabs = JSON.parse(storedTabs);
          state.tabs = currentTabs;
        }
      },
      setActiveTab(state,currentTab) {
        state.editableTabsValue = currentTab;
      },
      selectMenu(state,menu){
          // console.log(menu);
          //把当前点击的菜单对象添加到tabs
          //1.判断tabs中是否包含当前菜单对象
          //2.如果不包含，则添加到tabs中
          let res = state.tabs.findIndex(tab => tab.name === menu.name);
          if (res === -1) {
              let tab_tmp = {};
              tab_tmp.title = menu.label;
              tab_tmp.name = menu.name;
              state.tabs.push(tab_tmp);
          }
          //设置当前选中对象
          // state.editableTabsValue = menu.name;
          // console.log(state.tabs);
          //保存当前tabs内容到sessionStorage
          sessionStorage.setItem("tabList",JSON.stringify(state.tabs));
      },

      getMenuList(state,router) {
        //1.获取sessionStorage中的菜单数据
        let menuList = sessionStorage.getItem("menuList");
        //2.设置菜单数据
        if (menuList) {
          state.menu_data = JSON.parse(menuList);
        }
        //3.取出路由数据
        let oldRouterList = sessionStorage.getItem("routerList");
        let dynamicRouterList = [];
        if (oldRouterList) {
          dynamicRouterList = JSON.parse(oldRouterList);
        }
        // console.log(dynamicRouterList)
        //4.动态的生成路由
          //4.1获取原来的路由
        let staticRouterList = router.options.routes;
        // console.log(staticRouterList)
          //4.2动态生成路由
          //        component: () => import('@/views/system/Department/DepartmentList.vue')
        dynamicRouterList.forEach(dynRoute => {
          dynRoute.component = () => import(`@/views${dynRoute.url}.vue`);
          staticRouterList[1].children.push(dynRoute);
        });
        //5.设置路由
        router.addRoutes(staticRouterList);
      },
      setOpenOrClose(state) {
        state.isCollapse = !state.isCollapse;
      },
  },
  actions: {},
};
