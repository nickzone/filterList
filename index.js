import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Icon, List, Checkbox } from 'antd'
import InfiniteScroll from 'react-infinite-scroller';
import './index.scss';

export default class FilterList extends Component {
  constructor(props) {
    super(props);
    const { value, defaultValue } = this.props;
    this.state = {
      value: defaultValue, // 已选值
      page: 1, // 当前页
      filterText: '', // 过滤词
      filterResult: [] // 过滤结果
    };
    // 受控状态
    this.controlled = {
      value: value !== undefined // value是受控状态
    };
    this.checkDelay = null;  // 选中事件防抖
    this.inputDelay = null;  // 搜索事件防抖
    this.filterInput = null; // 搜索框引用
    this.checkContainer = null; // 列表容器引用
  }
  // 监控输入值，添加防抖避免卡顿
  handleFilterChange = (e) => {
    let filterText = e.target.value.trim();
    this.setState({
      filterText
    });
    window.clearTimeout(this.inputDelay);
    this.inputDelay = setTimeout(() => {
      let filterResult = this.getFilterResult(filterText);
      this.setState({
        filterResult
      });
    }, 200);
  }
  // 添加或删除项目
  handleFilterItem = (key) => {
    window.clearTimeout(this.checkDelay);
    this.checkDelay = setTimeout(() => {
      const value = this.getControlledState('value');
      const nextValue = value.slice();
      let itemIndex = -1;
      // 根据已选项判定是添加还是删除
      for (let i = 0; i < value.length; i++) {
        if (value[i] == key) {
          itemIndex = i;
          break;
        }
      }
      // 获取新的状态
      const isAdd = itemIndex === -1;
      if (isAdd) {
        nextValue.unshift(key);
      } else {
        nextValue.splice(itemIndex, 1);
      }
      // 调用回调
      this.props.onChange(nextValue);
      // 如果不是受控，则直接更新状态
      if (!this.controlled.value) {
        this.setState({
          value: nextValue
        });
      }
      // 清空过滤条件和结果
      this.setState({
        filterText: '',
        filterResult: []
      });
      // 搜索框获取焦点用于再次输入
      try {
        this.filterInput.input.focus();
        if (isAdd) { // 添加操作需要重置滚动到顶部
          this.checkContainer.scrollTop = 0;
        }
      } catch (e) {
        console.log(e)
      }
    }, 200);
  }
  // 是否过滤态
  isSearching = () => {
    const { filterText } = this.state;
    return filterText.trim().length > 0;
  }
  // 获取过滤列表
  getFilterResult = (keyWord) => {
    const { dataSource, filterOption, maxSearchCount } = this.props;
    return dataSource.filter((item) => {
      const isMatch = filterOption(keyWord, item);
      return isMatch
    }).slice(0, maxSearchCount)
  }
  // 已选列表分页处理
  loadMore = (page) => {
    this.setState({
      page:page
    });
  }
  // 获取受控状态
  getControlledState = (prop) => {
    if(this.controlled[prop]) {
      return this.props[prop];
    }
    return this.state[prop];
  }
  // 过滤输入框
  renderFilter = () => {
    const propConfig = {
      placeholder: this.props.placeholder,
      prefix: <Icon type="search" style={{ color: '#ddd' }} />,
      allowClear: true,
      onChange: this.handleFilterChange,
      value: this.state.filterText,
      ref: (e) => this.filterInput = e
    };
    return <Input {...propConfig} />;
  }
  // 过滤项
  renderResultList = () => {
    if (!this.isSearching()) {
      return null;
    }
    const { filterResult } = this.state;
    const { renderItem } = this.props;
    const value = this.getControlledState('value');
    const propConfig = {
      itemLayout: 'vertical',
      split: false,
      size: 'small'
    };
    const items = filterResult.map((item) => {
      let checked = false;
      for (let i = 0; i < value.length; i++) {
        if (value[i] == item.key) {
          checked = !checked;
          break;
        }
      }
      return (
        <List.Item key={item.key}>
          <span className="filterList-title">{renderItem(item)}</span>
          <span 
            className={(checked ? 'checked' : '') + " filterList-action"} 
            onClick={() => { this.handleFilterItem(item.key) }}>
            <Checkbox defaultChecked={checked}></Checkbox>
          </span>
        </List.Item>
      );
    });
    const list = (
      <List {...propConfig}>
        {items}
      </List>
    );
    return list;
  }
  // 已选项
  renderCheckedList = () => {
    const { page } = this.state;
    const value = this.getControlledState('value');
    const { pageSize, renderItem } = this.props;
    const visibleValue = value.slice(0, page * pageSize);
    const { dataSource } = this.props;
    const propConfig = {
      itemLayout: 'vertical',
      split: false,
      size: 'small'
    };
    const scrollConfig = {
      useWindow: false,
      loadMore: this.loadMore,
      hasMore: visibleValue.length < value.length
    };
    const items = visibleValue
      .map(item => dataSource.find(_item => _item.key == item) || { key: item, value:''})
      .map((item) => {
        return (
          <List.Item key={item.key}>
            <span className="filterList-title">{renderItem(item)}</span>
            <span 
              className="filterList-action"
              onClick={() => { this.handleFilterItem(item.key) }}>
              <Icon theme="filled" type="close-circle"/>
            </span>
          </List.Item>
        );
      });
    const list = (
      <InfiniteScroll {...scrollConfig}>
        <List {...propConfig}>
          {items}
        </List>
      </InfiniteScroll>
    );
    return list;
  }
  // 总量提示
  renderTotal = () => {
    const value = this.getControlledState('value');
    let total = value.length;
    total = <div>{this.props.renderTotal(total)}</div>;
    return total;
  }
  // 搜索结果合计
  renderFilterTotal = () => {
    const { filterResult } = this.state;
    const total = filterResult.length;
    return <div>搜索到{total}个结果</div>
  }
  render() {
    const { scrollHeight } = this.props;
    const containerStyle = {
      height: scrollHeight, 
      overflowY: 'scroll'
    }
    const isSearching = this.isSearching();
    return (
      <div className="filterList-container">
        <div className="filteList-keyword">
          {this.renderFilter()}
        </div>
        <div className="filterList-content"
          style={{display: isSearching ? 'none' : 'block' }}>
          <div className="filterList-info">
            {this.renderTotal()}
          </div>
          <div className="filteList-checked" style={{ ...containerStyle}}
            ref={(ref) => { this.checkContainer = ref}}>
            {this.renderCheckedList()}
          </div>
        </div>
        <div className="filteList-content"
          style={{display: isSearching ? 'block' : 'none'}}>
          <div className="filterList-info">
            {this.renderFilterTotal()}
          </div>
          <div className="filteList-sugList" style={{ ...containerStyle }}>
            {this.renderResultList()}            
          </div>
        </div>
      </div>
    )
  }
}

FilterList.propTypes = {
  dataSource: PropTypes.array.isRequired, // 数据源:key-value对象数组
  value: PropTypes.array, // 受控模式
  defaultValue: PropTypes.array, // 默认已选的值，用于回显
  onChange: PropTypes.func, // 输入框内容变化时的回调，传入选择值列表
  renderItem: PropTypes.func, // 渲染列表元素，传入当前key-value对象
  filterOption: PropTypes.func, // 根据输入过滤，function(inputValue,currentItem)
  renderTotal: PropTypes.func, // 总量提示文字,传入总量
  pageSize: PropTypes.number, // 滚动分页size
  scrollHeight: PropTypes.number, // 列表滚动区域高度
  placeholder: PropTypes.string, // 输入框占位符
  maxSearchCount: PropTypes.number, // 搜索结果最多显示条数
}

FilterList.defaultProps = {
  dataSource: [],
  defaultValue: [],
  onChange: (value) => {},
  renderItem: (item) => `${item.value}（${item.key}）`,
  filterOption: (value, item) => ('' + item.value).indexOf(value) !== -1,
  renderTotal: (count) => { return `已选择了${count}项`},
  pageSize: 10,
  scrollHeight: 220,
  placeholder: '输入关键词以添加/删除项目',
  maxSearchCount: 20
}