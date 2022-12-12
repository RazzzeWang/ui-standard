/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-09 16:10:21
 * @Function: Please Input Function
 */
import { THEME_PREVIEW_CONFIG, THEME_USER_CONFIG } from "@/constant";
import defaultThemeConfig from "@/config/defaultThemeConfig";

export const saveToLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const savePreviewToLocal = (value) => {
  saveToLocal(THEME_PREVIEW_CONFIG, value);
};

export const loadPreviewFromLocal = () => {
  return loadFromLocal(THEME_PREVIEW_CONFIG);
};

export const removePreviewFromLocal = () => {
  return localStorage.removeItem(THEME_PREVIEW_CONFIG);
};

export const saveUserThemeToLocal = (value) => {
  saveToLocal(THEME_USER_CONFIG, value);
};

export const loadUserThemeFromLocal = () => {
  return loadFromLocal(THEME_USER_CONFIG);
};
