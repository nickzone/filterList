## 说明

适合大规模（超过1000条）key-value数据项多选，能够提供无卡顿的使用体验。

初衷是解决antd-transfer大于1000条后异常卡顿的问题。

内部通过分页和搜索防抖实现性能优化。

如果使用中有任何问题，欢迎提issue。

## 安装

```bash
npm install antd-filterlist
```

## 使用

```js
import FilterList from "antd-filterlist";

// 该组件依赖 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 按需加载antd组件样式,如果样式有问题,请先排除此问题,或导入样式
// import 'antd/dist/antd.css';

const dataSource = Array(1000)
  .fill()
  .map((v, i) => {
    return {
      key: "key" + i,
      value: "value" + i
    };
  }); // 实测10000条以下不卡顿

const comp = 
  <FilterList
    dataSource={dataSource}
    onChange={(keys)=>{console.log(keys)}}/>
```

## 在线示例

[codesandbox](https://codesandbox.io/s/antdfilterlistexample-euvvb)

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