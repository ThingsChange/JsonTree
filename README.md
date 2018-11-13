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
json-tree 是基于Vue.js,搭配使用iView UI 组件样式形成的一个组件，旨在构建无限层级的JSON数据结构；

特点：无限层级结构一目了然，支持前端所有数据类型，以及Integer,使用简单，容易上手
- 可以接收指定格式的JSON数据，并渲染成对应的可编辑的树状结构
- 可以依据JSON数据格式，进行无限层级的数据编辑和添加
- 可以进行任意层级的删除操作
- 可以通过通过组件提供的函数获取，或者指定ref获取所编辑的原始数据
- 根据所选类型做了数据类型转换（也可以获取原始数据）
- 预留了slot，可做自定义按钮
- 使用您喜欢的CSS框架类来很好地格式化表格和显示数据
- 做了基本的数据校验
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


##浏览器兼容性

基于VUE框架，所以在任何支持VUE的浏览器上都是支持的，IE需要做Profill处理，毕竟就你自己不能原生支持VUE

