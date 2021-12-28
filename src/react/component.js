import { renderComponent } from '../react-dom';
import { enqueueSetState } from './setStateQueue';
class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }

  setState(stateChange) {
    // // 对象拷贝
    // Object.assign(this.state, stateChange);
    // // 渲染组件
    // renderComponent(this);

    // 异步state
    enqueueSetState(stateChange, this);
  }
}

export default Component;
