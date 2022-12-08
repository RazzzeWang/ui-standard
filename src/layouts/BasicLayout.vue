<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 10:35:16
 * @Function: Please Input Function
-->
<template>
  <el-container class="frame-wrapper">
    <el-header class="frame-header">
      <basic-header />
    </el-header>
    <el-container class="frame-container">
      <el-aside class="frame-aside" width="200px">
        <el-menu
          default-active="1-4-1"
          class="frame-menu"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <menu-item
            v-for="menu in menus"
            :key="'menu_item_' + menu.name"
            :menu="menu"
          />
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuItem from "./components/MenuItem";
import BasicHeader from "./components/BasicHeader";
import { mapGetters } from "vuex";
export default {
  name: "BasicLayout",
  components: {
    MenuItem,
    BasicHeader,
  },
  props: {},
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapGetters({
      menus: "menus",
    }),
  },
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  methods: {
    // 展开回调
    handleOpen() {
      console.log("展开");
    },
    // 收起回调
    handleClose() {
      console.log("收起");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/themeConfig/element-variables.scss";
.frame-wrapper {
  width: 100%;
  height: 100%;
  .frame-header {
    background-color: $--color-primary;
    color: #fff;
  }
  .frame-container {
    height: 0;
    .frame-aside {
      height: 100%;
      overflow-y: auto;
      .frame-menu {
        height: 100%;
      }
    }
  }
}
</style>
