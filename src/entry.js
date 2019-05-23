import React, { Component } from 'react'
import { render } from 'react-dom';
// import FilterList from './index'
import FilterList from 'antd-filterlist';
const dataSource = [{key:'001',value: 'val001'},{key: '002', value: 'val002'}];

render((
  <FilterList dataSource={dataSource}/>
),document.querySelector('#app'))