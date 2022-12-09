<!--
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-08 16:52:50
 * @Function: Please Input Function
-->
<template>
  <div>
    <action-panel
      :selectOptions="selectOptions"
      :userConfigHistory="userConfigHistory"
      :userConfigRedoHistory="userConfigRedoHistory"
      :onUndo="undo"
      :onRedo="redo"
      :isOfficial="isOfficial"
      @select="onSelectChange"
    />

    <main-panel
      v-if="defaultConfig"
      :currentConfig="currentConfig"
      :defaultConfig="defaultConfig"
      :userConfig="userConfig"
      :globalValue="globalValue"
      @onChange="userConfigChange"
    />
  </div>
</template>

<script>
import bus from "@/bus.js";
import {
  ACTION_COMPONECT_SELECT,
  ACTION_APPLY_THEME,
  ACTION_DOWNLOAD_THEME,
} from "@/constant";

import ActionPanel from "./Action";
import MainPanel from "./Main";
import Shortcut from "./Shortcut";

import { themeApi } from "@/api";
import defaultTheme from "./lib/defaultTheme";
import { filterConfigType, filterGlobalValue } from "./lib/utils";
import vars from "@/assets/themeConfig/variables.module.scss";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ThemeConfigurator",
  components: {
    ActionPanel,
    MainPanel,
  },
  mixins: [Shortcut],
  props: {
    themeConfig: Object,
    previewConfig: Object,
    isOfficial: Boolean,
    onUserConfigUpdate: Function,
  },
  data() {
    return {
      env: "local", // 'local' | 'remote'

      init: false, // 是否初始化过

      selectOptions: [], // 下拉类别
      selectedComponent: "color", // 当前编辑的分类

      defaultConfig: null, // 默认配置
      currentConfig: null, // 根据当前分类过滤后的配置项

      userConfig: {
        global: {},
        local: {},
      },
      userConfigHistory: [],
      userConfigRedoHistory: [],
    };
  },
  computed: {
    globalValue() {
      return filterGlobalValue(this.defaultConfig, this.userConfig);
    },
  },
  watch: {
    themeConfig: {
      handler(val, oldVal) {
        if (!oldVal.globnal) {
          this.userConfig = val;
        }
      },
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.showConfigurator();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  methods: {
    // 初始化theme config
    showConfigurator() {
      if (this.init) return;
      this.$nextTick(() => {
        let defaultConfig;

        // themeApi.getVars()
        //   .then((res) => {
        defaultConfig = this.env === "local" ? defaultTheme() : {};
        // })
        // .then(() => {
        setTimeout(() => {
          if (defaultConfig) {
            this.defaultConfig = defaultConfig;
            this.setSelectOption();
            this.filterCurrentConfig();
            this.init = true;
          }
        }, 300); // action after transition
        // });
      });
    },
    // 设置下拉选项
    setSelectOption() {
      this.selectOptions = this.defaultConfig
        .map((config) => ({
          label: config.name.charAt(0).toUpperCase() + config.name.slice(1),
          value: config.name,
        }))
        .sort((a, b) => {
          const A = a.label;
          const B = b.label;
          if (A < B) return -1;
          if (A > B) return 1;
          return 0;
        });
    },
    // 根据下拉过滤当前配置
    filterCurrentConfig() {
      this.currentConfig = this.defaultConfig.find((config) => {
        return config.name === this.selectedComponent;
      });
    },

    // 撤销
    undo() {
      if (this.userConfigHistory.length > 0) {
        this.userConfigRedoHistory.push(JSON.stringify(this.userConfig));
        this.userConfig = JSON.parse(this.userConfigHistory.pop());
        this.onAction();
      }
    },
    // 重做
    redo() {
      if (this.userConfigRedoHistory.length > 0) {
        this.userConfigHistory.push(JSON.stringify(this.userConfig));
        this.userConfig = JSON.parse(this.userConfigRedoHistory.shift());
        this.onAction();
      }
    },
    // 重置
    onReset() {
      this.userConfigRedoHistory = [];
      this.userConfigHistory = [];
      this.userConfig = {
        global: {
          "$--color-primary": vars.primaryColor,
        },
        local: {},
      };
      this.onAction();
    },
    // 用户配置切换
    userConfigChange(e) {
      this.userConfigHistory.push(JSON.stringify(this.userConfig));
      this.userConfigRedoHistory = [];
      this.$set(
        this.userConfig[filterConfigType(this.currentConfig.name)],
        e.key,
        e.value
      );
      this.onAction();
    },

    // 操作记录
    onAction() {
      console.log(this.defaultConfig);
      this.onUserConfigUpdate(this.userConfig);
      bus.$emit(ACTION_APPLY_THEME, this.userConfig);
    },

    // 下载
    onDownload() {
      bus.$emit(
        ACTION_DOWNLOAD_THEME,
        this.userConfig,
        this.previewConfig.name
      );
    },

    // 下拉切换
    onSelectChange(val) {
      bus.$emit(ACTION_COMPONECT_SELECT, val);
      this.selectedComponent = val;
      this.filterCurrentConfig();
    },
  },
};
</script>
<style lang="" scoped></style>
