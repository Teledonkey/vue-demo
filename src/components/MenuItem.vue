<template>
  <div>
    <template v-for="menu in menuList">
      <el-submenu
        v-if="menu.children.length > 0"
        :index="menu.path"
        :key="menu.key"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span class="el-submenu__title" slot="title">{{ menu.label }}</span>
        </template>
        <menu-item :menuList="menu.children"></menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu.path" :key="menu.key" @click="selectMenu(menu)">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  name: "MenuItem",
  props: ["menuList"],
  components: {
    MenuItem,
  },
  methods: {
    selectMenu(menu) {
      //设置选项卡
      this.$store.commit("selectMenu",menu);
      //设置路由
      this.$router.push({name:menu.name});
    },
  }
};
</script>

<style lang="scss" scoped>
.el-submenu__title {
    font-size: 15px;
    font-weight: 600;
}
</style>