/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-12 16:32:56
 * @Function: Please Input Function
 */

const standardConfig = {
  type: "user",
  name: "raze-ui-standard",
  theme: JSON.stringify({
    global: {
      "$--color-primary": "#5B69FF",
      "$--color-primary-light-1": "#6B78FF",
      "$--color-primary-light-2": "#7C87FF",
      "$--color-primary-light-3": "#8C96FF",
      "$--color-primary-light-4": "#9DA5FF",
      "$--color-primary-light-5": "#ADB4FF",
      "$--color-primary-light-6": "#BDC3FF",
      "$--color-primary-light-7": "#CED2FF",
      "$--color-primary-light-8": "#DEE1FF",
      "$--color-primary-light-9": "#EFF0FF",

      "$--color-success": "#67C23A",
      "$--color-warning": "#E6A23C",
      "$--color-danger": "#F56C6C",
      "$--color-info": "#909399",

      "$--color-success-light": "#E1F3D8",
      "$--color-warning-light": "#FAECD8",
      "$--color-danger-light": "#FDE2E2",
      "$--color-info-light": "#E9E9EB",

      "$--color-success-lighter": "#F0F9EB",
      "$--color-warning-lighter": "#FDF6EC",
      "$--color-danger-lighter": "#FEF0F0",
      "$--color-info-lighter": "#F4F4F5",
    },
    local: {},
  }),
};
export default function () {
  return {
    currentTheme: { ...standardConfig },
    configsList: [{ ...standardConfig }],
  };
}
