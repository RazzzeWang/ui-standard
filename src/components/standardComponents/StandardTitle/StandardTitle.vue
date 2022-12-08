<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 15:58:31
 * @Function: Please Input Function
-->
<template>
  <div class="standard-title-wrap">
    <i class="title-line" />
    <div class="zh-text-box">{{ zhText }}</div>
    <div class="en-text-box">{{ enTextUp }}</div>
  </div>
</template>

<script>
export default {
  name: "StandardTitle",
  components: {},
  props: {
    zhText: {
      type: String,
      default: "中文",
    },
    enText: {
      type: String,
      default: "Chinese",
    },
  },
  data() {
    return {};
  },
  computed: {
    enTextUp() {
      return this.enText.toUpperCase();
    },
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
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/themeConfig/element-variables.scss";

$padding-top: 70px;
.standard-title-wrap {
  position: relative;
  padding-top: $padding-top;
  box-sizing: border-box;
  height: 58px + $padding-top;
  margin-bottom: 59px;
  .title-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 20px;
    background-color: $--color-primary;
  }
  .zh-text-box {
    font-weight: 600;
    font-size: 48px;
    line-height: 48px;
    color: #2b313f;
    transform: matrix(1, 0, -0.1, 1, 0, 0);
    position: absolute;
    z-index: 2;
    left: 0;
    top: $padding-top;
  }
  .en-text-box {
    font-family: "Alibaba PuHuiTi";
    font-weight: 400;
    font-size: 36px;
    line-height: 40px;
    text-transform: uppercase;
    color: #d5dbe6;
    position: absolute;
    top: 23px + $padding-top;
    left: 0;
    z-index: 1;
  }
}
</style>
