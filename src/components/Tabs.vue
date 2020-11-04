<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// import {mapState} from 'vuex'

export default {
    computed: {
      // ...mapState({
      //   //tabs选项卡数据
      //   editableTabs: state => state.MenuStore.tabs,
      //   //当前激活的选项卡
      //   editableTabsValue :state => state.MenuStore.editableTabsValue
      // }),
      //tabs选项卡数据
      editableTabs: ({
        get() {
          return this.$store.state.MenuStore.tabs;
        },
        set(val) {
          this.$store.state.MenuStore.tabs = val;
        }
      }),
      //当前激活的选项卡
      editableTabsValue: ({
        get() {
          return this.$store.state.MenuStore.editableTabsValue;
        },
        set(val) {
          this.$store.state.MenuStore.editableTabsValue = val;
        }
      })
    },
    data() {
      return {
        // editableTabsValue: '2',
        // editableTabs: [{
        //   title: 'Tab 1',
        //   name: '1',
        //   content: 'Tab 1 content'
        // }, {
        //   title: 'Tab 2',
        //   name: '2',
        //   content: 'Tab 2 content'
        // }],
        // tabIndex: 2
      }
    },
    methods: {
      removeTab(targetName) {
        console.log(targetName);
        //不关闭首页
        if (targetName === "desktop") {
          return;
        }
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
};
</script>

<style lang="scss" scoped>
</style>