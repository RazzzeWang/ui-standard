/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-09 15:41:17
 * @Function: Please Input Function
 */
import ColorPicker from "./src/main";

/* istanbul ignore next */
ColorPicker.install = function (Vue) {
  Vue.component(ColorPicker.name, ColorPicker);
};

export default ColorPicker;
