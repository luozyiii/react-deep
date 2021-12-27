import { setAttribute } from './index';
export function diff(dom, vnode, container) {
  // 对比节点的变化
  const ret = diffNode(dom, vnode);
  if (container) {
    container.appendChild(ret);
  }
  return ret;
}

function diffNode(dom, vnode) {
  let out = dom;
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';
  if (typeof vnode === 'number') vnode = String(vnode);

  // 如果vnode是字符串, 文本节点
  if (typeof vnode === 'string') {
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        // 更新文本内容
        dom.textContent = vnode;
      }
    } else {
      // 创建文本节点
      out = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceNode(out, dom);
      }
    }
    return out;
  }

  if (typeof vnode.tag === 'function') {
    diffComponent(out, vnode);
  }

  // 非文本节点
  if (!dom) {
    out = document.createElement(vnode.tag);
  }
  // 比较子节点(dom节点和组件)
  if ((vnode.childrens && vnode.childrens.length > 0) || (out.childrens && out.childrens.length > 0)) {
    // 对比组件 或者子节点
    diffChildren(out, vnode.childrens);
  }
  diffAttribute(out, vnode);
  return out;
}

function diffComponent(dom, vnode) {}

function diffChildren(dom, vChildrens) {
  const domChildren = dom.childNodes;
  const children = [];
  const keyed = {};
  // 将有key的节点（用对象保存）和没有key的节点（用数组保存）分开
  if (domChildren.length > 0) {
  }
  if (vChildrens && vChildrens.length > 0) {
    let min = 0;
    let childrenLen = children.length;
    [...vChildrens].forEach((vchild, i) => {
      // 获取虚拟DOM中所有的key
      const key = vchild.key;
      let child;
      if (key) {
        // 如果有key，找到对应key值的节点
        if (keyed[key]) {
          child = keyed[key];
          keyed[key] = undefined;
        }
      } else if (childrenLen > min) {
        // 如果没有key，则优先找类型相同的节点
        for (let j = min; j < childrenLen; j++) {
          let c = children[j];
          if (c) {
            child = c;
            children[j] = undefined;
            if (j === childrenLen - 1) childrenLen--;
            if (j === min) min++;
            break;
          }
        }
      }
      // 对比
      child = diffNode(children, vchild);
      // 更新DOM
      const f = domChildren[i];
      if (child && child !== dom && child !== f) {
        // 如果更新前的对应位置为空，说明此节点是新增的
        if (!f) {
          dom.appendChild(child);
        } else if (child === f.nextSibling) {
          removeNode(f);
          // 将更新后的节点移动到正确位置
        } else {
          dom.insertBefore(child, f);
        }
      }
    });
  }
}

function diffAttribute(dom, vnode) {
  const oldAttrs = {}; // 保存之前的DOM的所有属性
  const newAttrs = vnode.attrs;
  // dom 是原有的节点对象 vnode 虚拟DOM
  // const domAttrs = document.querySelector('#root').attributes;
  const domAttrs = dom.attributes;
  [...domAttrs].forEach((item) => {
    oldAttrs[item.name] = item.value;
  });

  // 比较
  // 如果原来的属性跟新的属性对比，不在新的属性中，则将其移除掉（属性值设为undefined）
  for (let key in oldAttrs) {
    if (!(key in newAttrs)) {
      setAttribute(dom, key, undefined);
    }
  }
  // 更新
  for (let key in newAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      // 值不同，更新值
      setAttribute(dom, key, newAttrs[key]);
    }
  }
}
