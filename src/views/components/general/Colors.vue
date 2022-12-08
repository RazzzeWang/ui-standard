<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 15:55:08
 * @Function: Please Input Function
-->
<template>
  <div>
    <standard-title zh-text="主题色" en-text="Brand color" />
    <standard-section
      section-title="主题色"
      section-desc="主题色用于确定后台风格，切换皮肤功能一般只切换主题色版即可；"
    />
    <standard-section
      section-title="主题色扩展"
      section-desc="部分效果如渐变、阴影会根据主题色变化，以下是一些示例；"
    />

    <standard-title zh-text="功能色" en-text="functional color" />
    <standard-section section-title="成功色" section-desc="用于成功状态；" />
    <standard-section
      section-title="危险色"
      section-desc="用于失败/危险状态；"
    />
    <standard-section section-title="提醒色" section-desc="用于提醒状态；" />

    <standard-title zh-text="中性色" en-text="color" />
    <standard-section
      section-title="文字色"
      section-desc="用于文字颜色，一般不随主题进行更改；"
    />
    <standard-section
      section-title="边框色"
      section-desc="用于边框颜色，一般不随主题进行更改；"
    />
    <standard-section
      section-title="填充色"
      section-desc="用于填充颜色，一般不随主题进行更改；"
    />
  </div>
</template>

<script>
export default {
  name: "Colors",
  components: {},
  props: {},
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
<style lang="scss" scoped></style>
