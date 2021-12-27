import Component from './component';

const React = {
  createElement,
  Component,
};

function createElement(tag, attrs, ...childrens) {
  return {
    tag, // 外层的标签
    attrs, // 属性 是一个对象
    childrens, // 是一个数组
    // key: attrs.key || null,
  };
}

export default React;
