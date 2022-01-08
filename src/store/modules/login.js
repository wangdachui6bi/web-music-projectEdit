const state = {
  profile: {},
  account: {},
  isLogin: sessionStorage.getItem('isLogin')
}

const mutations = {
  setProfile (state, profile) {
    state.profile = profile
  },
  setAccount (state, account) {
    state.account = account
  }
}

const actions = {

}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
