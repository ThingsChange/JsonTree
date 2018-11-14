# json-tree

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```



----

## 说明

----
1.json-tree是基于组件库iView组件的一个扩展组件，其功能是——可以将json格式的数据，直接渲染为对应的可编辑的树状结构
特点：
1）数据与视图分离的树形结构

2）可以对树形结构进行无限层级的添加、编辑和删除操作

----


## 使用场景 


想要自定义编辑任意结构的json对象的属性、属性值等的场景，具有层级结构的数据结构也可试用
    例如：做一个mock数据的表格，或者编辑组织权限结构




## 操作


![image](https://github.com/ThingsChange/JsonTree/blob/master/src/assets/20181112_154556.gif)



## 如何使用



该项目下有components/treee组件，你可以局部或者全局注册，然后直接使用即可。下面是例子：
``` vue
    <json-tree ref="abc" :json-object="jsonObject" @original-json="getInputJson" @create-json="createJson"
                   :original-button="originalButton" :create-button="createButton">
        <template slot="createJson">
            <span>生成JSON</span>
        </template>
        <template slot="originalData">
            <span>原始数据</span>
        </template>
    </json-tree>
```
```js
    export default {
            data() {
                return {
                    name: 'app',
                    jsonObject: {},//你要传递给组件的初始对象，具体请参考下面属性
                    originalButton: false,
                    createButton: false,
                }
            },
            components: {
                HelloWorld
            },
            methods: {
                getInputJson(obj) {
                    console.log('原始数据：', obj);
                },
                createJson(obj) {
                    console.log('生成的json：', obj);
                },
            }
        }
```



## 属性


- json-object ：Object类型; 可以传递一个空对象 {}，在组件中默认值是
``` js
    {
        nodes: [], //如果有子节点
        mapSet: { //当前层级所对应数据
          label: '',//键
          value: '',//值
          type: 'object',//类型
          remarks: '',//备注
          isRequired: true,//是否必填
          id: '0'//层级ID
        },
        parentSet: null,//层级的父级对象，第一层必须为null,做数据回显的时候有用
        addCount: 100,// id 的计算起始
      }
``` 
  该值是操作的数据源，所有的数据修改都在此数据上面。
  

- original-button：Boolean类型，是否显示获取原始数据的按钮，建议搭配 slot "originalData"使用


- create-button：Boolean类型，是否显示生成JSON数据的按钮，建议搭配 slot "createJson"使用


## 方法


- original-json：Function类型; 获取原始数据类型，函数第一个参数即为原始数据data.
- create-json：Function类型; 生成标准的JSON数据结构，函数第一个参数即为生成的JSON结构，其中会根据数据结构类型做数据转换。
   e.g. type为number,输入值为a,则会得到默认值0.其他同理


## 浏览器兼容性


基于VUE框架，所以在任何支持VUE的浏览器上都是支持的，IE需要做Profill处理，毕竟就你自己不能原生支持VUE

