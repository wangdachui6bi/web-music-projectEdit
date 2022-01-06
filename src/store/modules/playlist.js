import { getAllCat } from '@/api/apiwk/playList.js'
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
    console.log(arr)
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
