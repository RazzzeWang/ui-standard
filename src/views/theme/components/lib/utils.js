/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-09 15:41:39
 * @Function: Please Input Function
 */
import deepmerge from "deepmerge";
import constant from "./i18nTheme.json";
import defaultSettings from "@/config/defaultSettings";

// 区分global和local
export const filterConfigType = (name) => {
  switch (name) {
    case "color":
    case "typography":
    case "border":
      return "global";
    default:
      return "local";
  }
};

// 过滤出global配置项
export const filterGlobalValue = (defaultConfig, userConfig) => {
  const valueObject = {};
  const globalArr = ["color", "typography", "border"];
  globalArr.forEach((global) => {
    const configObj = {};
    defaultConfig
      .find((config) => config.name === global)
      .config.forEach((c) => (configObj[c.key] = deepmerge({}, c)));
    valueObject[global] = configObj;
    Object.keys(configObj).forEach((c) => {
      if (userConfig.global[c]) {
        configObj[c].value = userConfig.global[c];
      }
    });
  });
  return valueObject;
};

export const getStyleDisplayValue = (displayValue, global) => {
  if (displayValue.startsWith("$")) {
    return global[displayValue].value;
  }
  return displayValue;
};

const getNameFromI18N = (name) => {
  const lang = defaultSettings.lang;
  return constant.filter((config) => config.lang === lang)[0][name];
};

export const getVariableDisplayName = (key) => {
  return getNameFromI18N("variable-name")[key] || key;
};

export const getStyleDisplayName = (config, componentName) => {
  const displayNameMap = {
    "border-color": "border color",
    "font-color": "font color",
    "background-color": "background color",
    "font-weight": "font weight",
    "font-size": "font size",
    "font-line-height": "font line height",
    "border-radius": "border radius",
  };
  if (config.name) {
    return getVariableDisplayName(config.key.replace("$--", ""));
  }
  let displayName = config.key.replace(`$--${componentName}-`, "");
  Object.keys(displayNameMap).forEach((name) => {
    displayName = displayName.replace(name, displayNameMap[name]);
  });
  displayName = displayName.replace(/-/g, " ");
  return displayName.trim();
};

export const getActionDisplayName = (key) => {
  return getNameFromI18N("action")[key] || key;
};
