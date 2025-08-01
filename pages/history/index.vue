<template>
  <view class="history-container">
    <!-- 标题和副标题 -->
    <view class="header">
      <view class="title">我的作品</view>
      <view class="subtitle">管理您创作的短视频脚本</view>
    </view>

    <!-- 搜索和筛选 -->
    <view class="search-bar">
      <view class="search-group">
        <input
          class="search-input"
          placeholder="搜索作品标题或内容"
          v-model="searchText"
        />
        <image
          class="search-icon"
          src="/static/search.svg"
          mode="aspectFit"
        ></image>
      </view>
      <view class="filter-btn">
        <image
          class="filter-icon"
          src="/static/filter.svg"
          mode="aspectFit"
        ></image>
        <text>最新</text>
      </view>
    </view>

    <!-- 统计数据 -->
    <view class="stat-bar">
      <view class="stat-item">
        <text class="stat-num">24</text>
        <text class="stat-label">总作品数</text>
      </view>
      <view class="stat-item">
        <text class="stat-num orange">18</text>
        <text class="stat-label">本月创作</text>
      </view>
      <view class="stat-item">
        <text class="stat-num green">6</text>
        <text class="stat-label">今日创作</text>
      </view>
    </view>

    <!-- 作品卡片列表 -->
    <view class="work-list">
      <view
        class="work-card"
        @click="goToDetail"
      >
        <view class="work-title-row">
          <view class="work-title">小仙炖燕窝种草脚本</view>
          <view class="work-status-check">
            <image
              class="work-status"
              src="/static/check.svg"
              mode="aspectFit"
            ></image>
          </view>
        </view>
        <view class="work-time">2024-12-15 14:30</view>
        <view class="work-content">
          都说老婆美丽才是老公最大的面子，我老公现在看就跟天雷打不动让我喝一瓶燕窝。小仙炖的鲜炖燕窝我是自己吃了两个月才给你们分...
        </view>
        <view class="work-tags-row">
          <view class="work-tags-box">
            <view class="work-tag">3 个镜头</view>
            <view class="work-tag">美妆护肤</view>
          </view>
          <image
            class="work-icon"
            src="/static/share.svg"
            mode="aspectFit"
          ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    goToDetail () {
      uni.navigateTo({
        url: '/package/pages/detail/index'
      })
    },
  },
  onShow () {
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: 1
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.history-container {
  background: #f7f8fa;
  min-height: 100vh;
  padding: 0 0 32rpx 0;

  .header {
    padding: 48rpx 32rpx 0 32rpx;
    .title {
      font-size: 40rpx;
      font-weight: bold;
      color: #222;
      margin-bottom: 8rpx;
    }
    .subtitle {
      font-size: 26rpx;
      color: #888;
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
    margin: 32rpx 32rpx 0 32rpx;
    position: relative;
    .search-group {
      border-radius: 16rpx;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
      padding: 0 24rpx;
      display: flex;
      align-items: center;
      background: #fff;
      flex: 1;
    }

    .search-input {
      flex: 1;
      height: 80rpx;
      border: none;
      background: transparent;
      font-size: 28rpx;
      outline: none;
    }
    .search-icon {
      width: 36rpx;
      height: 36rpx;
      opacity: 0.5;
    }
    .filter-btn {
      display: flex;
      align-items: center;
      margin-left: 24rpx;
      font-size: 28rpx;
      color: #222;
      border-radius: 16rpx;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
      padding: 0 24rpx;
      display: flex;
      align-items: center;
      background: #fff;
      .filter-icon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 8rpx;
      }
      text {
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .stat-bar {
    display: flex;
    justify-content: space-between;
    margin: 32rpx 32rpx 0 32rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx 0;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);

    .stat-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .stat-num {
        font-size: 40rpx;
        font-weight: bold;
        color: #3478f6;
        &.orange {
          color: #ff9900;
        }
        &.green {
          color: #00c48f;
        }
      }
      .stat-label {
        font-size: 24rpx;
        color: #888;
        margin-top: 8rpx;
      }
    }
  }

  .work-list {
    margin: 32rpx 32rpx 0 32rpx;
    .work-card {
      background: #fff;
      border-radius: 20rpx;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
      padding: 32rpx;
      margin-bottom: 24rpx;
      border: 2rpx solid #f2f3f5;

      .work-title-row {
        display: flex;
        align-items: center;
        .work-title {
          font-size: 32rpx;
          font-weight: bold;
          color: #222;
          flex: 1;
        }
        .work-status-check {
          padding: 5px;
          border-radius: 50%;
          background: #dcfce7;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .work-status-edit {
          padding: 5px;
          border-radius: 50%;
          background: #dbe9fe;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .work-status {
          width: 32rpx;
          height: 32rpx;
        }
      }
      .work-time {
        font-size: 24rpx;
        color: #888;
        margin: 8rpx 0 16rpx 0;
      }
      .work-content {
        font-size: 28rpx;
        color: #222;
        background: #f7f8fa;
        border-radius: 12rpx;
        padding: 20rpx;
        margin-bottom: 16rpx;
      }
      .work-tags-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .work-tags-box {
          display: flex;
          align-items: center;
          .work-tag {
            font-size: 24rpx;
            color: #3478f6;
            background: #f5f7ff;
            border-radius: 8rpx;
            padding: 4rpx 16rpx;
            margin-right: 16rpx;
          }
        }
        .work-icon {
          width: 32rpx;
          height: 32rpx;
          margin-left: 12rpx;
        }
      }
    }
  }
}
</style>