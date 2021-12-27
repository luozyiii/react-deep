import React from './react';
import ReactDom from './react-dom';

const ele = (
  <div className="active" title="123">
    hello, <span>react</span>
  </div>
);

// 函数组件
// function Home() {
//   return (
//     <div className="active" title="123">
//       hello, <span>react</span>
//     </div>
//   );
// }

// 类组件
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
  }
  componentWillMount() {
    console.log('组件将要加载');
  }
  componentWillReceiveProps(props) {
    console.log('props');
  }
  componentWillUpdate() {
    console.log('组件将要更新');
  }
  componentDidUpdate() {
    console.log('组件更新完成');
  }
  componentDidMount() {
    console.log('组件加载完成');
  }

  handlerClick() {
    // 修改状态的唯一方法调用 setState
    this.setState({
      num: this.state.num + 1,
    });
  }

  render() {
    return (
      <div className="active" title="123">
        hello, <span>react {this.state.num}</span>
        <button onClick={this.handlerClick.bind(this)}>点击</button>
      </div>
    );
  }
}

const title = 'active';
// ReactDom.render(<Home name={title} />, document.querySelector('#root'));
ReactDom.render(ele, document.querySelector('#root'));

// const ele = /*#__PURE__*/React.createElement("div", {
//     className: "active",
//     title: "123"
// }, "hello, ", /*#__PURE__*/React.createElement("span", null, "react"));
