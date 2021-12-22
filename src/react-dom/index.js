const ReactDom = {
  render,
};

function render(vnode, container) {
  console.log(vnode);
  if (vnode === undefined) return;

  // 如果vnode是字符串
  if (typeof vnode === 'string') {
    // 创建文本节点
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  // 否则就是虚拟dom对象
  const { tag, attrs, childrens } = vnode;
  // 创建节点对象
  const dom = document.createElement(tag);

  if (attrs) {
    // 有属性 key; className='active' tile='123'
    Object.keys(attrs).forEach((key) => {
      const value = attrs[key];
      setAttribute(dom, key, value);
    });
  }

  // 渲染子节点
  childrens.forEach((child) => render(child, dom));

  return container.appendChild(dom);
}

function setAttribute(dom, key, value) {
  // 将属性名className转换成class
  if (key === 'className') {
    key = 'class';
  }

  // 如果是事件 onClick onBlur...
  if (/on\w+/.test(key)) {
    // 转小写
    key.toLowerCase();
    dom[key] = value || '';
  } else if (key === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value && typeof value === 'object') {
      // {width: 20}
      for (let k in value) {
        if (typeof value[k] === 'number') {
          dom.style[k] = value[k] + 'px';
        } else {
          dom.style[k] = value[k];
        }
      }
    }
  } else {
    // 其它属性
    if (key in dom) {
      dom[key] = value || '';
    }
    if (value) {
      // 更新值
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}

export default ReactDom;
