<template>
  <div class="theme-container">
    <div class="theme-aside">
      <theme-configurator
        style="height: 100%; display: flex; flex-direction: column"
        :isOfficial="isOfficial"
        :themeConfig="themeConfig"
        :previewConfig="previewConfig"
        :onUserConfigUpdate="onUserConfigUpdate"
      />
    </div>
    <div class="theme-main">
      <basic-tokens-preview />
      <components-preview />
    </div>
  </div>
</template>

<script>
import bus from "@/bus";
import ThemeConfigurator from "./components/ThemeConfigurator.vue";
import ComponentsPreview from "./components/components-preview";
import BasicTokensPreview from "./components/basic-tokens-preview";
import { getActionDisplayName } from "./components/lib/utils";
import {
  saveUserThemeToLocal,
  loadUserThemeFromLocal,
  loadPreviewFromLocal,
} from "./lib/localstorage";
import { ACTION_APPLY_THEME } from "@/constant";
import { getThemeConfigObject } from "./lib/utils";
import PreviewMixin from "./components/PreviewMixin";
import "./demo-styles/index.scss";
const maxUserTheme = 8;

export default {
  name: "ThemePreview",
  components: {
    ThemeConfigurator,
    ComponentsPreview,
    BasicTokensPreview,
  },
  props: {},
  data() {
    return {
      isOfficial: false, // 是否是官方
      previewConfig: {},
      themeConfig: {},
      userTheme: [],
    };
  },
  mixins: [PreviewMixin],
  computed: {},
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.userTheme = loadUserThemeFromLocal();
    const previewConfig = loadPreviewFromLocal();
    this.previewConfig = previewConfig;
    const themeConfig = getThemeConfigObject(previewConfig.theme);
    if (themeConfig) {
      this.themeConfig = themeConfig;
      bus.$emit(ACTION_APPLY_THEME, themeConfig);
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  methods: {
    getNewUserThemeName(originName) {
      let n = 1;
      let name;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        name = `${originName}-${n}`;
        if (
          this.userTheme.filter((theme) => theme.name === name).length === 0
        ) {
          break;
        }
        n += 1;
      }
      return name;
    },
    onUserConfigUpdate(userConfig) {
      const themeConfig = JSON.stringify(userConfig);
      const { type, name } = this.previewConfig;
      if (this.isOfficial) {
        if (this.userTheme.length >= maxUserTheme) {
          this.$message.error(getActionDisplayName("max-user-theme"));
          return;
        }
        const autoUserName = this.getNewUserThemeName(name);
        this.previewConfig.name = autoUserName;
        this.previewConfig.type = "user";
        this.userTheme.push({
          update: Date.now(),
          name: autoUserName,
          theme: themeConfig,
        });
        saveUserThemeToLocal(this.userTheme);
        return;
      }
      if (type === "user") {
        this.userTheme.forEach((config) => {
          if (config.name === name) {
            config.update = Date.now();
            config.theme = themeConfig;
          }
        });
        saveUserThemeToLocal(this.userTheme);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.theme-container {
  width: 100%;
  height: 100%;
  display: flex;
  .theme-aside {
    height: 100%;
    min-width: 200px;
    overflow-y: hidden;
    margin-right: 24px;
    background-color: #f5f7fa;
  }
  .theme-main {
    height: 100%;
    flex: 1;
    min-width: 0;
    overflow-y: auto;
  }
}
</style>
