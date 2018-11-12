# json-tree

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

###  说明
    功能：
    无限极扩展的json编辑表格，树状结构一目了然，可以获取指定格式的json

    在做公司内部管理台相关内容，遇见了需求，输入编辑json树状结构，在网上搜索一番，并未得到满意的答案，
    就顺手写了一个，功能可能稍显薄弱，类似定制，如有错误之处，请各位指点一二，汗颜。

###  调用方式
      <json-tree ref="abc" :json-object="jsonObject" @original-json="getInputJson" @create-json="createJson"
             :original-button="originalButton" :create-button="createButton">
             
### 属性


```
1、json-object ：可以传递一个空对象，在组件中默认值是
    {
        nodes: [
        ],
        mapSet: {
          label: '',
          value: '',
          type: 'object',
          remarks: '',
          isRequired: true,
          id: '0'
        },
        parentSet: null,
        addCount: 100,
      }
  该值是操作的数据源，所有的数据修改都在此数据上面。
2、original-button：Boolean类型，是否显示获取原始数据的按钮，建议搭配 slot "originalData"使用
3、create-button：Boolean类型，是否显示生成JSON数据的按钮，建议搭配 slot "createJson"使用

```

### 方法


```
1、original-json：获取原始数据类型，Function类型，函数第一个参数即为原始数据data.
2、create-json：生成JSON数据结构，Function类型，函数第一个参数即为生成的JSON结构，其中会根据数据结构类型做数据转换。
   e.g. type为number,输入值为a,则会得到默认值0.其他同理


```
