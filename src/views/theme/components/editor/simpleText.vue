<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-09 15:41:17
 * @Function: Please Input Function
-->
<template>
  <section class="config" :key="displayName">
    <div class="config-label">
      <el-tooltip :content="displayName" placement="top">
        <span>{{ displayKeyName }}</span>
      </el-tooltip>
    </div>
    <div class="config-content">
      <theme-input :val="value" size="medium" @change="onChange" />
    </div>
  </section>
</template>

<script>
import Input from "./input";
import Mixin from "./mixin";

export default {
  components: {
    themeInput: Input,
  },
  data() {
    return {
      value: "",
    };
  },
  mixins: [Mixin],
  watch: {
    mergedValue: {
      immediate: true,
      handler(value) {
        this.value = this.mergedValue;
      },
    },
  },
};
</script>
