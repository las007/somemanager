import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
// import App from './App';
// import Life from './pages/demo/Life';
import reportWebVitals from './reportWebVitals';
// import Admin from './admin'
// import Home from './pages/route_demo/route1/Home'
import Router from './router'
import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import { Provider } from 'react-redux'
import store from './redux/store'
import {createStore} from "redux";
import reducer from "./redux/reducer";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={createStore(reducer)}>
          <Router />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
