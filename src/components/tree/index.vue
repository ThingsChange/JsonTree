<template>
  <div ref="jsonObject">
    <div class="container">
      <h4>可以编辑的JSON<br/></h4>
      <div id="app">
        <tree-menu
          :nodes="tree.nodes"
          :depth="0"
          :map-set="tree.mapSet"
          v-model="tree.mapSet"
          :now-set="tree"
          :root-set="tree"
          :parent-set="tree.parentSet"
        ></tree-menu>
      </div>
    </div>
    <div >
      <Button  v-if="createButton" @click="showJson">
        <slot name='createJson'>
          看看你都干了啥
        </slot>
      </Button>
      <Button  v-if="originalButton" @click="showOriginalJson">
        <slot name='originalData'>原始数据</slot>
      </Button>
    </div>
  </div>
</template>
<script>
    /* eslint-disable */
    import TreeMenu from './treeMenu'
    let temp={
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
    export default {
    data() {
      let initData=JSON.parse(JSON.stringify(temp))
      return {
        tree: Object.keys(this.jsonObject).length === 0 ? initData : JSON.parse(JSON.stringify(this.jsonObject)),
        initData,
        abc:true
      }
    },
    watch: {
      jsonObject:{
        handler(newVal, oldVal){
          this.tree = Object.assign({},this.tree,newVal)
        },
        deep: true
      }
    },
    mounted() {
      //console.log(this.jsonObject, 'luhan')
    },
    computed: {
    },
    props: {
      originalButton:{
        type:Boolean,
        default:false
      },
      createButton:{
        type:Boolean,
        default:false
      },
      jsonObject: {
        type: Object,
        required: false,
        default: JSON.parse(JSON.stringify(temp))
      }
    },
    methods: {
      showOriginalJson() {
        this.$emit('original-json', this.tree)
      },
      showJson() {
        let result = {}
        let temp;
        //如果仅是一层
        if (['string', 'number', 'boolean'].includes(this.tree.mapSet.type) && this.tree.nodes && this.tree.nodes.length === 0) {
          temp = this.tree.mapSet.value;
          if (this.tree.mapSet.type === 'number') {
            temp = Number(temp) || 0;
          }
          if (this.tree.mapSet.type === 'boolean') {
            temp = Boolean(temp) || true;
          }
          result = temp;
          this.$emit('create-json', result)
          return;
        }
        this.getJson(this.tree, result);
        this.$emit('create-json', result)
      },
      //tree  为父节点，result 是截止到当前的父层，要去添加子层的操作
      getJson(tree, result) {
        let type = tree.mapSet.type;
        let arrayIndexInArray = 0;
        switch (type) {
          case 'object':
            if (this.getDataType(result) === 'array') {
              result.push({});
            } else {
              if (tree.nodes && tree.nodes.length > 0) {
                result[tree.mapSet.label] = {};
              }
            }
            break;
          case 'array':
            if (this.getDataType(result) === 'array') {
              result.push([]);
              arrayIndexInArray = result.length - 1;
            } else {
              if (tree.nodes && tree.nodes.length > 0) {
                result[tree.mapSet.label] = [];
              }
            }
            break;
          case 'string':
          case 'number':
          case 'boolean':
          case 'integer':
            let temp = tree.mapSet.value;
            if (['integer','number'].includes(tree.mapSet.type )) {
              temp = Number(temp) || 0;
            }
            if (tree.mapSet.type === 'boolean') {
              if (temp === 'false') {
                temp = false;
              } else {
                temp = Boolean(temp) || true;
              }
            }
            if (this.getDataType(result) === 'array') {
              result.push(temp);
            } else {
              result[tree.mapSet.label] = temp;
            }
            break;
          default:
            console.log(tree.nodes);
        }
        // console.log('当前解析出来的结果是',result);
        tree.nodes && tree.nodes.forEach((nodes) => {
          this.getJson(nodes, result[tree.mapSet.label] || result[arrayIndexInArray])
        })
      },
      /*
      *需要一个工具方法，判断要添加新数据的类型，基本数据还是引用数据,integer 是个问题，后台的数据类型啊。
      * */
      getDataType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
      },
    },
    components: {
      TreeMenu
    }
  }
</script>
