<template>
  <div class="MyCollection view-main mtop-20">
    <el-skeleton :rows="6" animated :loading="loading">
      <template v-if="!loading">
        <div class="subscribe-view">
          <div class="router-list">
            <ul class="tab-menu">
              <li
                v-for="(tab, index) in tabs"
                :key="index"
                :class="index === active ? 'isActive' : ''"
                @click="change(index)"
              >
                <span>{{ tab }}</span>
              </li>
            </ul>
          </div>
          <div class="sub-main mtop-60">
            <div class="sub-album">
              <div class="subalbum-head">
                <div>
                  <span class="font-bold">收藏的{{ tab }}</span>
                  <span class="font-12" style="color: rgb(207, 207, 207)">
                    ({{ list.length }})
                  </span>
                </div>
                <div class="detail-search"></div>
              </div>
              <div class="mtop-20">
                <ul class="info-list">
                  <li
                    class="info-item"
                    @click="goDetail(item.id || item.vid)"
                    v-for="item in list"
                    :key="item.id"
                  >
                    <img
                      class="sub-img mleft-10"
                      v-if="active === 2"
                      :src="item.coverUrl"
                    />
                    <img class="sub-img mleft-10" v-else :src="item.picUrl" />
                    <div class="sub-title font-14 mleft-10" v-if="active === 2">
                      {{ item.title }}
                    </div>
                    <div class="sub-title font-14 mleft-10" v-else>
                      {{ item.name }}
                    </div>
                    <div class="sub-item font-12" v-if="active === 0">
                      <span>{{ item.artists[0].name }}</span>
                    </div>
                    <div class="sub-item font-12" v-if="active === 0">
                      18 首
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { getColAlbum, getColArtists, getColMV } from "@/api/MyCollection"
// 我的收藏
export default {
  name: "MyCollection",
  data () {
    return {
      tabs: ["专辑", "歌手", "MV"],
      active: 0,
      tab: "专辑",
      list: [],
      loading: true
    }
  },
  methods: {
    async change (index = 0) {
      this.loading = true
      this.active = index
      this.tab = this.tabs[index]
      if (index === 0) {
        const { data: { data } } = await getColAlbum()
        this.list = data
      } else if (index === 1) {
        const { data: { data } } = await getColArtists()
        this.list = data
      } else if (index === 2) {
        const { data: { data } } = await getColMV()
        this.list = data
      }
      // console.log(this.list)
      this.loading = false
    },
    goDetail (id) {
      if (this.active === 1) {
        this.$router.push("/artistdetail/" + id)
      }
    }
  },
  created () {
    this.change(2)
  }
}
</script>

<style lang="scss" scoped>
.MyCollection {
  .subscribe-view {
    .router-list {
      height: 60px;
      display: flex;
      position: fixed;
      top: 60px;
      z-index: 99;
      background-color: #fff;
      align-items: center;
      left: 0;
      width: 100%;
      overflow-x: scroll;
      padding-left: 0;
      text-align: center;
      transition: all 0.5s linear;
      .tab-menu {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        li {
          margin: 10px;
        }
        li.isActive {
          font-size: 18px;
          font-weight: 700;
        }
        li.isActive:after {
          display: block;
          content: '';
          height: 4px;
          width: 90%;
          margin: 0 auto;
          background-color: #ec4141;
          border-radius: 2px;
        }
      }
    }
    .info-list {
      .info-item {
        display: flex;
        height: 90px;
        align-items: center;
        .sub-img {
          height: 60px;
          width: 60px;
          border-radius: 4px;
        }
        .sub-title {
          min-width: 100px;
          flex: 1;
        }
        .sub-item {
          width: 150px;
          color: #c3c3c4;
        }
      }
      .info-item:nth-child(odd) {
        background-color: #f9f9f9;
      }
      .info-item:nth-child(2n) {
        background-color: #fff;
      }
    }
  }
}
</style>