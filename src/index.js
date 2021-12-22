import React from './react';
import ReactDom from './react-dom';

const ele = (
  <div className="active" title="123">
    hello, <span>react</span>
  </div>
);
ReactDom.render(ele, document.querySelector('#root'));

// const ele = /*#__PURE__*/React.createElement("div", {
//     className: "active",
//     title: "123"
// }, "hello, ", /*#__PURE__*/React.createElement("span", null, "react"));
