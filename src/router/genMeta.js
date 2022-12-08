/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 18:06:42
 * @Function: Please Input Function
 */
/**
 *
 * @param {String} title 菜单名 | 页面名
 * @param {String} icon 菜单图标
 * @param {Array} permission 权限标识
 * @param {Boolean} keepAlive 是否保持缓存
 * @param {String} menuType 类型是头部菜单、菜单还是普通页面 'headMenu' | 'menu' | 'page'
 * @param {Boolean} isShow 是否显示
 * @param {String} mainMenuName 非menu页面时对应菜单页面的name
 * @returns
 */
export default function ({
  title,
  icon,
  permission = ["*"],
  keepAlive = false,
  menuType = "menu",
  isShow = true,
  mainMenuName,
} = {}) {
  return {
    title,
    icon,
    permission,
    keepAlive,
    menuType,
    isShow,
    mainMenuName,
  };
}
