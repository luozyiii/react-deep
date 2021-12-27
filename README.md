# react-deep 非 fiber 版

深度学习 React，从 0 实现 React

## 火热的 0 配置的打包工具[parcel](https://www.parceljs.cn/)

### 安装 babel 插件

将 jsx 语法转换成 js 对象(虚拟 dom)

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save-dev @babel/preset-react

# 配置 .babelrc
{
    "presets": ["@babel/preset-react", "@babel/env"],
    "plugins": ["@babel/plugin-transform-react-jsx"]
}
```

## 封装 JSX 和理解虚拟 DOM

## 组件和生命周期

## diff 算法

如何减少 DOM 更新？我们需要找出渲染前后真正变化的部分，只更新这一部分，而对比变化，找到需要更新部分的算法称为 “diff 算法”

### 两个原则

- 对比当前真实的 DOM 和虚拟 DOM，在对比过程中直接更新真实 DOM
- 只对比同一层级的变化

## 异步的 setState
