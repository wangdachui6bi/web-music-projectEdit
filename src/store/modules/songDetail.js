// 保存歌曲的url地址
import { getMusicUrl } from '@/api/musicPlay/getSong.js'
import { Toast } from 'vant'
import Vue from 'vue'
const state = {
  // 保存每首歌的MP3url放入该vuxstore
  // {songName,singer,id,songUrl}
  singleSongMsg: {},
  // 听歌播放状态
  isHavesong: false,
  // 歌单 方别切换上一首下一首
  songListAll: [],
  isPlay: false,
  songAllMsg: [],
  playListTracks: []
}

const mutations = {
  // 点击歌曲的时候播放该首歌并且把他添加到 歌单
  setMp3Url(state, payload) {
    // 获取新的的时候变为播放状态
    state.singleSongMsg = payload
    state.isHavesong = true
    state.isPlay = true
    // 添加到歌单 重复的歌曲不会添加
    const index = state.songListAll.findIndex((item) => item.id === state.singleSongMsg.id)
    if (index !== -1) return
    state.songListAll.push(state.singleSongMsg)
  },
  // 点击播放全部的时候将歌单里所有歌曲信息传到songListAll
  // 播放的歌曲 singleSongMsg设置为该歌单第一首歌
  setSongList(state, payload) {
    state.songListAll = payload
    state.singleSongMsg = payload[0]
    state.isHavesong = true
    state.isPlay = true
  },
  // 获得正在播放歌曲全部信息
  songAllMsg(state, payload) {
    state.songAllMsg = payload
  },
  // 获取歌单所有歌曲信息
  setplayListTracks(state, payload) {
    state.playListTracks = payload
  },
  // 点击歌曲播放 播放状态则没用
  playback(state) {
    state.isPlay = true
  },
  // 暂停 播放状态控制
  controlPlay(state, payload) {
    state.isPlay = !state.isPlay
  },
  // 切换下一首歌
  nextsong(state) {
    if (state.songListAll.length === 1) {
      Toast('您的歌单没有其他歌曲了')
      return 0
    } else if (state.songListAll.length === 0) {
      Toast('请添加歌曲到歌单')
      return 0
    }

    const indexNow = state.songListAll.findIndex((item) => item.id === state.singleSongMsg.id)
    // 有俩种情况 当一个一个点击进来的时候 都进行了MP3url的获取所以
    // 所以MP3url也被放进了songListAll数组
    // 当直接播放全部的时候 里面的每一首歌还没有进行请求MP3url

    state.songListAll.forEach((song, index) => {
      // 为最后一首的时候恢复成第一首歌
      if (indexNow === state.songListAll.length - 1) {
        state.singleSongMsg = state.songListAll[0]
        if (state.singleSongMsg.songUrl) return 0
        setUrl(state.singleSongMsg)
        return 0
      } else {
        // 如果不为最后一首歌 就切换到下一首
        if (indexNow + 1 >= state.songListAll.length) {
          state.singleSongMsg = state.songListAll[0]
        } else {
          state.singleSongMsg = state.songListAll[indexNow + 1]
        }
        if (state.singleSongMsg.songUrl) return 0
        setUrl(state.singleSongMsg)
        return 0
      }
    })
  },
  // 切换上一首歌
  presong(state) {
    if (state.songListAll.length === 1) {
      Toast('您的歌单没有其他歌曲了')
      return 0
    } else if (state.songListAll.length === 0) {
      Toast('请添加歌曲到歌单')
      return 0
    }
    const indexNow = state.songListAll.findIndex((item) => item.id === state.singleSongMsg.id)
    state.songListAll.forEach((song, index) => {
      // 为最后一首的时候恢复成第一首歌
      if (indexNow === 0) {
        state.singleSongMsg = state.songListAll[state.songListAll.length - 1]
        return 0
      } else {
        if (song.id === state.singleSongMsg.id) {
          state.singleSongMsg = state.songListAll[index - 1]
          // 更换了就退出循环
          return 0
        }
      }
    })
  }
}

const actions = {
  getoneMusic(content, payload) {
    getMusicUrl(payload.id).then((res) => {
      Vue.set(payload, 'songUrl', res.data.data[0].url)
      content.commit('setMp3Url', payload)
    })
    // 播放音乐的头像
    // getMusicListByIds(payload.id).then((res) => {
    //   console.log(res)
    // })
  }
}

const getters = {

}
function setUrl(payload) {
  getMusicUrl(payload.id).then((res) => {
    Vue.set(payload, 'songUrl', res.data.data[0].url)
  })
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
