## 说明

适合大规模（超过1000条）key-value数据项多选，能够提供无卡顿的使用体验。

初衷是解决antd-transfer大于1000条后异常卡顿的问题。

内部通过分页和搜索防抖实现性能优化。

## 安装

npm install antd-filterlist

```js
import FilterList from "antd-filterlist";
const list = [{key:'000',value:'张3'},{key:'001',value:'李4'},...]; // 实测10000条
const comp = 
  <FilterList
    dataSource={list}
    onChange={(keys)=>{console.log(keys)}}/>
```

## API

| 属性         |          说明      |   类型  |  默认值 |
|-------------|------------------|--------|:------:|
| dataSource  |  数据源:key-value对象数组 | Array | []  |
| value       |    已选项key集合：受控    |   Array | [] |
| defaultValue | 默认已选项key集合 | Array | [] |
| onChange | 输入框内容变化时的回调: function(keys) | func | null |
| renderItem | 渲染列表元素:function(item) | func | (item) => `${item.value}（${item.key}） |
| filterOption | 过滤函数:function(inputValue,currentItem) | func | (inputValue, item) => ('' + item.value).indexOf(inputValue) !== -1 |
| renderTotal | 总量提示文字: function(count) | func | (total) => `选择了${total}项` |
| pageSize | 分页size | number | 10 |
| scrollHeight | 列表滚动区域高度 | number | 220 |
| placeholder | 搜索框占位符 | string | '输入关键词以添加/删除项目' |
| maxSearchCount | 搜索结果最多显示条数 | number | 20 |