const state = {
  profile: {},
  account: {},
  isLogin: sessionStorage.getItem('isLogin'),
  // 用来保存不同人的历史歌单
  accountId: null,
  accountHistory: []
}

const mutations = {
  setProfile(state, profile) {
    state.profile = profile
  },
  setAccount(state, account) {
    state.account = account
    state.accountId = account.id
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
