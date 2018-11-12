<template>
  <div class="tree-menu">
    <Row type="flex" justify="space-between" style='margin-bottom:15px'>
      <Col span="8" :style="indent">
        <Col span="2">
          <div @click="toggleChildren" class="zhedie">
            <Icon color='#2db7f5' size='24' :type="isObject?(showChildren?'md-arrow-dropdown':'md-arrow-dropright'):''" />
          </div>
        </Col>
        <Col span="22">
          <!-- :style="indentWith" -->
          <Input v-show="!parentTypeIsArray" :class="sameClass?'same-name':''" type="text" v-model="bindLabel" placeholder="请填写参数名" />
          <Input v-show="parentTypeIsArray" readonly="readonly" disabled type="text" v-model="bindLabel" placeholder="请填写参数名" />
        </Col>
      </Col>
      <Col span="16">
        <Col span="2" style='text-align: center;'>
          <Checkbox v-model="bindIsRequired"></Checkbox>
        </Col>
        <Col span="6" style='padding-right:15px'>
          <Input v-show="!isObject" type="text" v-model="bindMock" placeholder="请填写示例值" />
          <Input v-show="isObject" readonly="readonly" disabled type="text" v-model="bindMock" placeholder="请填写示例值" />
        </Col>
        <Col span="6" style='padding-right:15px'>
          <Input type="text" v-model="bindRemarks" placeholder="请填写备注" />
        </Col>
        <Col span="5" style='padding-right:15px'>
          <Select v-model="bindType">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="2">
          <Col v-if="!isRoot" span="3" style='margin-right: 10px;'>
            <Icon @click="handleMonitor(nowSet,parentSet,'remove')" type="ios-close" class="ios-close-self" />
          </Col>
          <Col span="3">
            <Poptip trigger="hover" content="content" placement="right" :transfer='transfer' :popper-class="testclass">
              <div slot="content">
                <div v-if="isRoot" class="operation-pop-tip">
                  <span @click="handleMonitor(nowSet,parentSet,'child')">添加子节点</span>
                </div>
                <div v-else-if="!isObject" class="operation-pop-tip">
                  <span @click="handleMonitor(nowSet,parentSet,'brother')">添加兄弟节点</span>
                </div>
                <div v-else>
                  <div v-for="(op,index) in operate.option" :key="index" class="operation-pop-tip">
                    <span @click="handleMonitor(nowSet,parentSet,op.value)">{{op.label}}</span>
                  </div>
                </div>
              </div>
              <Icon v-show="!(isRoot&&!isObject)" type="ios-add" class="ios-add-self" />
              <!-- <Tooltip :content="operateLabel" placement="top">
                  <Icon v-show="!(isRoot&&!isObject)" type="ios-add" class="ios-add-self" />
                </Tooltip> -->
            </Poptip>
          </Col>
        </Col>
      </Col>
    </Row>
    <tree-menu v-if="showChildren" v-for="(node,index) in nodes" :key="index" :nodes="node.nodes" :depth="depth + 1" :add-count="addCount" :map-set="node.mapSet" v-model="node.mapSet" :now-set="node" :parent-set="nowSet" :root-set="rootSet">

    </tree-menu>
  </div>
</template>
<script>
  export default {
    name: 'tree-menu',
    props: ['nodes', 'depth', 'addCount', "mapSet", "nowSet", "parentSet", 'rootSet'],
    data() {
      return {
        transfer: false,
        testclass: 'testclass',
        showChildren: true,
        bindMock: this.mapSet.value,
        bindLabel: this.mapSet.label,
        bindType: this.mapSet.type,
        bindIsRequired: this.mapSet.isRequired,
        bindRemarks: this.mapSet.remarks,
        typeList: [
          { label: 'string', value: 'string' },
          { label: 'number', value: 'number' },
          { label: 'boolean', value: 'boolean' },
          { label: 'array', value: 'array' },
          { label: 'object', value: 'object' },
          { label: 'integer', value: 'integer' }],
        operate: {
          loading: false,
          confirm: false,
          option: [{
            label: '添加子节点',
            value: 'child',
          },
            {
              label: '添加兄弟节点',
              value: 'brother',
            }
          ],
          id: '',
          type: '',
          status: '',
          context: ''
        },
        // rootObj:{},
        sameClass: false,
      }
    },
    watch: {
      value(val) {
        this.visible = val;
      },
      bindIsRequired(val) {
        this.$emit('input', this.cengValue);
      },
      bindRemarks(val) {
        this.$emit('input', this.cengValue);
      },
      bindMock(val) {
        this.$emit('input', this.cengValue);
      },
      bindLabel(val) {
        this.$emit('input', this.cengValue);
        let a = 0;
        if (this.parentSet && this.parentSet.type === 'object') {  //是对象的话，键值不能重复
          this.parentSet.nodes.forEach(v => {
            if (v.mapSet.label === val) {
              a++;
            }
          })
          if (a > 1) {
            this.sameClass = true;
            //console.log('命名重复');
          } else {
            this.sameClass = false
          }
        }
      },
      bindType(val, oldVal) {
        // console.log(val,oldVal);
        // 说明有引用数据类型转换成基本数据类型了，  integer回头再说
        if (['object', 'array'].includes(oldVal) && !['object', 'array'].includes(val)) {
          this.nowSet.type = val;
          this.nowSet.nodes.splice(0);
        }
        // console.log('当前数组是', this.nowSet);
        this.$emit('input', this.cengValue);
        // this.$emit('input', {label:this.bindLabel,value:this.bindMock,type:val});
      }
    },
    computed: {
      cengValue() {
        return {
          value: this.bindMock,
          label: this.bindLabel,
          type: this.bindType,
          isRequired: this.bindIsRequired,
          remarks: this.bindRemarks
        }
      },

      iconClasses() {
        return {
          'fa-plus-square-o': !this.showChildren,
          'fa-minus-square-o': this.showChildren
        }
      },
      labelClasses() {
        return { 'has-children': this.nodes }
      },
      indent() {
        return { paddingLeft: `${this.depth * 25}px` }
      },
      indentWith() {
        return { width: `${699 - this.depth * 45}px` }
      },
      isArrayType() {
        return this.bindType === 'array'
      },
      parentTypeIsArray() {
        return this.parentSet && this.parentSet.mapSet.type === 'array'
      },
      isObject() {
        return ['object', 'array'].includes(this.bindType)
      },
      isRoot() {
        return this.parentSet === null;
      },
      operateLabel() {
        // 添加兄弟/子节点':'添加兄弟节点
        let temp = '';
        temp = this.isRoot ? '子' : (this.isObject ? '兄弟/子' : '兄弟')
        return `添加${temp}节点`
      }
    },
    created() {
      /*      console.log('我是当前节点的数据呀',this.nowSet);
            if(this.parentSet===null){
              this.rootObj=Object.assign({},this.rootObj,this.nowSet);
            }*/
    },
    methods: {
      /*
  *需要一个工具方法，判断要添加新数据的类型，基本数据还是引用数据,integer 是个问题，后台的数据类型啊。
  * */
      getDataType(obj) {
        //console.log(obj);
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
      },
      //添加兄弟/子节点  key值，层级值，操作（兄弟或者子）
      handleMonitor(tree, parentTree, type) {
        //  console.log('当前的值是什么呢？：', tree, parentTree, type);
        if (['child', 'brother'].includes(type)) {
          this.rootSet.addCount++;
        }
        let temp = {
          nodes: [],
          mapSet: {
            //label: `item${this.rootSet.addCount}`,
            label: '',
            value: '',
            type: 'string',
            remarks: '',
            isRequired: true,
            id: `${this.rootSet.addCount}`
          }
        }
        if (type === 'brother') {
          parentTree.nodes.push(temp)
        } else if (type === 'child') {
          if (this.getDataType(tree.nodes) != 'array') {
            this.$set(tree, 'nodes', []);
          }
          tree.nodes.push(temp);
          // tree.nodes.shift();
        } else if (type === 'remove') {
          let parentType = parentTree.mapSet.type;
          if (['object', 'array'].includes(parentType)) {
            let deleteIndex = parentTree.nodes.findIndex(v => {
              if (v.mapSet.id === tree.mapSet.id) {
                return true
              }
            })
            parentTree.nodes.splice(deleteIndex, 1)
            this.$parent.showChildren = false;
            this.$nextTick(() => {
              this.$parent.showChildren = true;
            })
          }
        }
      },
      toggleChildren() {
        this.showChildren = !this.showChildren;
      }
    }
  }
</script>
<style scoped>
  .zhedie {
    cursor: pointer;
    text-align: right;
    padding-right: 15px;
  }
  .ios-add-self {
    color: #2395f1;
    font-size: 30px;
    cursor: pointer;
  }
  .ios-close-self {
    color: #ff561b;
    font-size: 30px;
    cursor: pointer;
  }
  .operation-pop-tip {
    cursor: pointer;
    line-height: 20px;
  }
  .operation-pop-tip span:hover {
    font-size: 18px;
    color: #2d8cf0;
  }
  .same-name {
    border-color: red;
  }
  .testclass {
    z-index: 99999;
  }
</style>
