import Vue from 'vue'
import Vuex from 'vuex'
// 进行匹配 store文件夹modules下的文件并进行引入
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
