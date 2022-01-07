const state = {
  profile: {},
  account: {}
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
