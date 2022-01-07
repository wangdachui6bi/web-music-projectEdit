import { getAllCat } from '@/api/DiscoverMusic/playList.js'
const state = {
  categories: [],
  sub: []
}

const mutations = {
  setcategories(state, payload) {
    state.categories = payload
  },
  setsub(state, payload) {
    state.sub = payload
  }
}

const actions = {
  async getAlcat({ commit }) {
    const res = await getAllCat()
    commit("setcategories", res.data.categories)
    commit("setsub", res.data.sub)
  }
}

const getters = {
  // 将小分类与对应大分类相同的 合成数组
  catesub(state) {
    const arr = []
    for (var key in state.categories) {
      var smarr = []
      state.sub.forEach((item2) => {
        if (item2.category === Number(key)) {
          smarr.push(item2)
        }
      })
      arr.push(smarr)
    }
    return arr
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
