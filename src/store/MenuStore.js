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
          state.editableTabsValue = menu.name;
          // console.log(state.tabs);
          //保存当前tabs内容到sessionStorage
          sessionStorage.setItem("tabList",JSON.stringify(state.tabs));
      },
  },
  actions: {},
};
