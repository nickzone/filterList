import React, { Component } from 'react'
import { render } from 'react-dom';
// 引入本地
import FilterList from '../src/index.js';
import '../src/index.less';
// 引入npm
// import FilterList from 'antd-filterlist';

const dataSource = Array(1000).fill().map((v, i) => {
  return {
    key: 'key' + i,
    value: 'value' + i
  }
});

render((
  <FilterList dataSource={dataSource}/>
),document.querySelector('#app'))