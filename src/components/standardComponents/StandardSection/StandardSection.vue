<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 16:14:19
 * @Function: Please Input Function
-->
<template>
  <section class="section-wrap">
    <standard-section-title
      :section-title="sectionTitle"
      :section-desc="sectionDesc"
    />
    <slot />
  </section>
</template>

<script>
import StandardSectionTitle from "../StandardSectionTitle/StandardSectionTitle.vue";
export default {
  name: "StandardSection",
  components: {
    StandardSectionTitle,
  },
  props: {
    sectionTitle: {
      type: String,
      default: "section title",
    },
    sectionDesc: {
      type: String,
      default: "section description",
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
  methods: {},
};
</script>
<style lang="scss" scoped>
.section-wrap {
  margin-bottom: 100px;
}
</style>
