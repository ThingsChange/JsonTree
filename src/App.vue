<template>
    <div id="app">
        <json-tree ref="abc" :json-object="jsonObject" @original-json="getInputJson" @create-json="createJson"
                   :original-button="originalButton" :create-button="createButton">
            <template slot="createJson">
                <span>生成JSON</span>
            </template>
            <template slot="originalData">
                <span>原始数据</span>
            </template>
        </json-tree>
    </div>
</template>

<script>
    /* eslint-disable */
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        data() {
            return {
                name: 'app',
                jsonObject: {},
                originalButton: true,
                createButton: true,
            }
        },
        components: {
            HelloWorld
        },
        methods: {
            getInputJson(obj) {
                console.log('原始数据1：', obj);
                // console.log(this.$refs, this.$refs['abc'].tree)
            },
            createJson(obj) {
                console.log('生成的json：', obj);
            },
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
