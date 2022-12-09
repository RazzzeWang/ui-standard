<script>
import bus from "@/bus.js";
import DocStyle from "./DocStyle";
import { themeApi } from "@/api";
import { updateDomHeadStyle } from "../lib/utils.js";
import {
  ACTION_APPLY_THEME,
  ACTION_DOWNLOAD_THEME,
  ACTION_USER_CONFIG_UPDATE,
} from "@/constant";
import {
  loadUserThemeFromLocal,
  loadPreviewFromLocal,
} from "../lib/localstorage.js";
import { getActionDisplayName } from "./lib/utils";
import { mapMutations } from "vuex";

export default {
  mixins: [DocStyle],
  mounted() {
    this.checkLocalThemeConfig();
    bus.$on(ACTION_APPLY_THEME, (val) => {
      this.userConfig = val;
      this.onAction();
    });
    bus.$on(ACTION_DOWNLOAD_THEME, (themeConfig, themeName) => {
      this.onDownload(themeConfig, themeName);
    });
  },
  data() {
    return {
      userConfig: {},
      lastApply: 0,
    };
  },
  methods: {
    ...mapMutations("theme", ["SET_PRIMARY_COLOR"]),
    applyStyle(res, time) {
      if (time < this.lastApply) return;
      this.updateDocs(() => {
        updateDomHeadStyle("chalk-style", res);
      });
      this.lastApply = time;
    },
    onDownload(themeConfig, themeName) {
      this.triggertProgressBar(true);
      themeApi
        .updateVars(Object.assign({}, themeConfig, { download: true }), {
          responseType: "blob",
        })
        .catch((err) => {
          this.onError(err);
        })
        .then(() => {
          this.triggertProgressBar(false);
        });
    },
    onAction() {
      this.triggertProgressBar(true);
      const time = +new Date();

      themeApi
        .updateVars(this.userConfig)
        .then((res) => {
          const { global } = this.userConfig;
          if (global && global["$--color-primary"]) {
            this.SET_PRIMARY_COLOR(global["$--color-primary"]);
          }
          this.applyStyle(res, time);
        })
        .catch((err) => {
          console.log(err);
          this.onError(err);
        })
        .then(() => {
          this.triggertProgressBar(false);
        });
    },
    onError(err) {
      let message;
      try {
        message = JSON.parse(err).message;
      } catch (e) {
        message = err;
      }
      this.$message.error(message);
    },
    triggertProgressBar(isLoading) {
      bus.$emit("user-theme-config-loading", isLoading);
    },
    updateDocs(cb) {
      window.userThemeConfig = JSON.parse(JSON.stringify(this.userConfig));
      bus.$emit(ACTION_USER_CONFIG_UPDATE, this.userConfig);
      this.updateDocStyle(this.userConfig, cb);
    },
    checkLocalThemeConfig() {
      // load user local theme
      const previewConfig = loadPreviewFromLocal();
      if (previewConfig.type === "user") {
        const userConfig = loadUserThemeFromLocal();
        this.$message(getActionDisplayName("load-local-theme-config"));
        const config = userConfig.filter(
          (theme) => theme.name === previewConfig.name
        );
        if (config && config[0]) {
          this.userConfig = JSON.parse(config[0].theme);
          this.onAction();
        }
      }
    },
  },
};
</script>
