import { renderComponent } from '../react-dom';

/**
 * 1. 异步更新state 短时间内把多个setState合并一个(队列：先进先出)
 * 2. 一段时间之后，循环清空队列，渲染组件
 */
const setStateQueue = [];
// 保存当前的组件
const renderQueue = [];
export function enqueueSetState(stateChange, component) {
  if (setStateQueue.length === 0) {
    setTimeout(() => {
      flush();
    }, 0);
  }
  // 1. 短时间内合并多个setState
  setStateQueue.push({
    stateChange,
    component,
  });
  // 如果 renderQueue 里面没有组件，添加到队列中
  let r = renderQueue.some((item) => {
    return item === component;
  });
  if (!r) {
    // 首次添加
    renderQueue.push(r);
  }
}

// 一段时间之后
function flush() {
  let item, component;
  while ((item = setStateQueue.shift())) {
    const { stateChange, component } = item;

    // 保存之前的状态
    if (!component.prevState) {
      component.prevState = Object.assign({}, component.state);
    }
    if (typeof stateChange === 'function') {
      // 是一个回调函数
      Object.assign(component.state, stateChange(component.prevState, component.props));
    } else {
      // 是一个对象
      Object.assign(component.state, stateChange);
    }
    // 赋值
    component.prevState = component.state;
  }
  while ((component = renderQueue.shift())) {
    renderComponent(component);
  }
}
