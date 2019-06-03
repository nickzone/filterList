import React, { Component } from 'react'
import { render } from 'react-dom';
// lib引入
// import FilterList from 'antd-filterlist/lib/index.js';
// import 'antd-filterlist/lib/index.css';
// 
import FilterList from 'antd-filterlist';

const dataSource = Array(1000).fill().map((v, i) => {
  return {
    key: 'key' + i,
    value: 'value' + i
  }
});

render((
  <FilterList dataSource={dataSource}/>
),document.querySelector('#app'))