<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 10:17:59
 * @Function: Please Input Function
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Loading } from "element-ui";
export default {
  name: "App",
  components: {},
  props: {},
  data() {
    return {
      loadingInstance: null,
    };
  },
  computed: {
    ...mapState({
      showLoading: (state) => state.loading.showLoading,
    }),
  },
  watch: {
    showLoading: function (flag) {
      if (flag) {
        this.loadingInstance = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      } else {
        this.$nextTick(() => {
          this.loadingInstance && this.loadingInstance.close(); // 隐藏loading
        });
      }
    },
  },
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
<style lang="" scoped></style>
