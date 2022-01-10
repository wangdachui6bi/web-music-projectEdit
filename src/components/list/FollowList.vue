<template>
  <div class="follow-list">
    <el-skeleton :rows="6" animated :loading="loading">
      <ul class="follow-list-ul">
        <li v-for="item in suberList" :key="item.userId">
          <div class="img-wrap">
            <img :src="item.avatarUrl" class="img" alt="" />
          </div>
          <div class="content-wrap">
            <div class="content-item">
              <span>{{ item.nickname }}</span>
              <span class="mleft-10">
                <i
                  v-if="item.gender == 1"
                  class="el-icon-male"
                  style="color: rgb(61, 161, 209)"
                ></i>
                <i
                  v-else-if="item.gender == 2"
                  class="el-icon-female"
                  style="color: rgb(234, 90, 149)"
                ></i>
                <i v-else></i>
              </span>
            </div>
            <div v-if="item.signature !== ''" class="content-item">
              {{ item.signature }}
            </div>
          </div>
        </li>
      </ul>
      <div class="flex_center">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </el-skeleton>
  </div>
</template>

<script>
import { getSuberList } from '@/api/DiscoverMusic/PersonalRecom'
export default {
  props: ["list"],
  data () {
    return {
      suberList: [],
      loading: true
    }
  },
  created () {
    // console.log(this.list.id)
    this.getSuberList({ id: this.list.id })
  },
  methods: {
    async getSuberList (id) {
      const res = await getSuberList(id)
      this.suberList = res.data.subscribers
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.follow-list {
  background-color: #fff;
  .follow-list-ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .img-wrap {
        border: 1px solid #eee;
        width: 60px;
        height: 60px;
        min-width: 60px;
        border-radius: 50%;
        cursor: pointer;
        .img {
          border-radius: 50%;
          height: 100%;
          width: 100%;
        }
      }
      .content-wrap {
        padding-left: 10px;
        .content-item {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
          width: 200px;
          .mleft-10 {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.flex_center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ec4141;
  color: #fff;
}
.el-pagination.is-background .el-pager li {
  margin: 0 1px;
}
</style>