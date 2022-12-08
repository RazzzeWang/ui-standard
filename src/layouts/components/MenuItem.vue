<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 11:08:07
 * @Function: Please Input Function
-->
<template>
  <el-submenu
    v-if="menu.children && menu.children.length > 0"
    :index="menu.name"
    :key="'group_' + menu.name"
  >
    <template slot="title">
      <i class="el-icon-location" />
      <span slot="title">{{ menu.meta.title }}</span>
    </template>
    <menu-item
      v-for="submenu in menu.children"
      :key="'menu_item_' + submenu.name"
      :menu="submenu"
    />
  </el-submenu>
  <el-menu-item
    v-else
    :index="menu.name"
    :key="'menu_' + menu.name"
    @click="handleClick(menu)"
  >
    <i :class="menu.meta.icon" />
    <span slot="title">{{ menu.meta.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "MenuItem",
  components: {},
  props: {
    menu: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
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
    handleClick(menu) {
      this.$router.push(menu.path);
    },
  },
};
</script>
<style lang="scss" scoped></style>
