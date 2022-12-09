<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-09 15:41:17
 * @Function: Please Input Function
-->
<template>
  <el-input
    @keyup.enter.native="onUpdate"
    v-model="value"
    @blur="onUpdate"
    v-bind="$attrs"
  >
    <template slot="suffix">
      <slot name="suffix" />
    </template>
  </el-input>
</template>

<script>
export default {
  props: ["val", "onChange"],
  data() {
    return {
      value: "",
      oldValue: "",
    };
  },
  methods: {
    onUpdate(e) {
      const { value } = e.target;
      if (value !== this.oldValue) {
        this.oldValue = value;
        this.$emit("change", value);
      }
    },
  },
  watch: {
    val: {
      immediate: true,
      handler(value) {
        this.value = value;
        if (!this.oldValue) {
          this.oldValue = value;
        }
      },
    },
  },
};
</script>
