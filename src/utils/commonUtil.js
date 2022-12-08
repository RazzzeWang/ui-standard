/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-08 17:05:17
 * @Function: Please Input Function
 */

const commonUtil = {
  /**
   * array 转换成 tree
   * @param {*} list
   * @param {*} id
   * @param {*} pid
   * @param {*} children
   * @returns 生成的tree
   */
  transToTree(list = [], id = "id", pid = "pid", children = "children") {
    const data = JSON.parse(JSON.stringify(list));
    const result = [];
    if (!Array.isArray(data)) {
      return result;
    }
    data.forEach((item) => {
      delete item[children];
    });
    const map = {};
    data.forEach((item) => {
      const thisItem = item;
      for (const i in thisItem) {
        thisItem[i] =
          typeof thisItem[i] !== "number" ? thisItem[i] : thisItem[i] + "";
      }
      map[item[id]] = thisItem;
    });
    data.forEach((item) => {
      const parent = map[item[pid]];
      if (parent) {
        (parent[children] || (parent[children] = [])).push(item);
      } else {
        result.push(item);
      }
    });
    return result;
  },

  /**
   * 过滤treeData
   * @param {*} tree 需要过滤的树
   * @param {*} func 过滤规则 返回true则保留 返回false则过滤
   * @param {*} childrenKey 树的子级列表key
   * @returns 过滤后的树
   */
  treeFilter(tree, func, childrenKey) {
    return tree
      .map((node) => ({ ...node }))
      .filter((node) => {
        node[childrenKey] =
          node[childrenKey] &&
          this.treeFilter(node[childrenKey], func, childrenKey);
        return func(node) || (node[childrenKey] && node[childrenKey].length);
      });
  },

  /**
   * 遍历treeData
   * @param {*} tree 需要遍历的树
   * @param {*} func 遍历到当前节点需要做的操作
   * @param {*} childrenKey 树的子级列表key
   * @returns 过滤后的树
   */
  treeMap(tree, func, childrenKey) {
    return tree
      .map((node) => ({ ...node }))
      .map((node) => {
        node[childrenKey] =
          node[childrenKey] &&
          this.treeMap(node[childrenKey], func, childrenKey);
        return func(node) || node;
      });
  },
};

export default commonUtil;
