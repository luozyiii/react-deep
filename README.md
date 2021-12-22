# react-deep

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

## 异步的 setState
