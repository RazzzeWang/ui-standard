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
import {
  saveUserThemeToLocal,
  loadUserThemeFromLocal,
  savePreviewToLocal,
  loadPreviewFromLocal,
} from "@/views/theme/lib/localstorage";
import defaultThemeConfig from "@/config/defaultThemeConfig";
import { getThemeConfigObject } from "@/views/theme/lib/utils.js";
import { ACTION_APPLY_THEME } from "@/constant";
import bus from "./bus";
import PreviewMixin from "@/views/theme/components/PreviewMixin";

export default {
  name: "App",
  components: {},
  props: {},
  mixins: [PreviewMixin], // 主题相关mixin PreviewMixin
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
  created() {
    // --------主题相关 start---------
    const defaultList = defaultThemeConfig().configsList;
    const configList = loadUserThemeFromLocal();
    if (configList && configList[0]) {
      savePreviewToLocal({
        ...configList[0],
        type: "user",
      });
    } else {
      saveUserThemeToLocal(defaultList);
      savePreviewToLocal(defaultList[0]);
    }
    // --------主题相关 end---------
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // --------主题相关 start---------
    const previewConfig = loadPreviewFromLocal();
    const themeConfig = getThemeConfigObject(previewConfig.theme);
    if (themeConfig) {
      bus.$emit(ACTION_APPLY_THEME, themeConfig);
    }
    // --------主题相关 end---------
  },
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
