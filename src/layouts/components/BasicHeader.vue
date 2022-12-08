<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 17:23:48
 * @Function: Please Input Function
-->
<template>
  <el-menu
    :default-active="currentHeaderMenu"
    class="header-menu-wrap"
    mode="horizontal"
    :background-color="primaryColor"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item
      v-for="headerMenu in headerMenus"
      :key="headerMenu.name"
      :index="headerMenu.name"
      @click="handleClick(headerMenu)"
    >
      {{ headerMenu.meta.title }}
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { primaryColor } from "@/assets/themeConfig/variables.module.scss";
export default {
  name: "BasicHeader",
  components: {},
  props: {},
  data() {
    return {
      primaryColor: primaryColor,
    };
  },
  computed: {
    ...mapGetters({
      currentHeaderMenu: "currentHeaderMenu",
      headerMenus: "headerMenus",
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
    ...mapMutations("permission", ["SET_CURRENT_HEADER_MENU"]),

    handleClick(menu) {
      this.SET_CURRENT_HEADER_MENU(menu.name);
      this.$router.push(menu.path);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/themeConfig/element-variables.scss";
.el-menu.header-menu-wrap {
  // background-color: $--color-primary;
}
</style>
