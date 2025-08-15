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
          @confirm="getList"
        />
        <image
          class="search-icon"
          src="/static/search.svg"
          mode="aspectFit"
          @click="getList"
        ></image>
      </view>
      <view
        class="filter-btn"
        :class="{'active': isFilter}"
        @click="filter"
      >
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
      <!-- 骨架屏状态 -->
      <template v-if="isLoading">
        <view class="stat-item">
          <view class="skeleton-stat-num"></view>
          <text class="stat-label">总作品数</text>
        </view>
        <view class="stat-item">
          <view class="skeleton-stat-num"></view>
          <text class="stat-label">本月创作</text>
        </view>
        <view class="stat-item">
          <view class="skeleton-stat-num"></view>
          <text class="stat-label">今日创作</text>
        </view>
      </template>

      <!-- 实际数据 -->
      <template v-else>
        <view class="stat-item">
          <text class="stat-num">{{totalObj.total || 0}}</text>
          <text class="stat-label">总作品数</text>
        </view>
        <view class="stat-item">
          <text class="stat-num orange">{{totalObj.monthlyCount || 0}}</text>
          <text class="stat-label">本月创作</text>
        </view>
        <view class="stat-item">
          <text class="stat-num green">{{totalObj.dailyCount || 0}}</text>
          <text class="stat-label">今日创作</text>
        </view>
      </template>
    </view>

    <!-- 作品卡片列表 -->
    <view class="work-list">
      <!-- 骨架屏 -->
      <view
        v-if="isLoading"
        class="skeleton-list"
      >
        <view
          v-for="n in 3"
          :key="n"
          class="skeleton-card"
        >
          <view class="skeleton-title-row">
            <view class="skeleton-title"></view>
            <view class="skeleton-status"></view>
          </view>
          <view class="skeleton-time"></view>
          <view class="skeleton-content">
            <view class="skeleton-line"></view>
            <view class="skeleton-line short"></view>
          </view>
          <view class="skeleton-tags-row">
            <view class="skeleton-tag"></view>
            <view class="skeleton-tag"></view>
            <view class="skeleton-icon"></view>
          </view>
        </view>
      </view>

      <!-- 实际数据列表 -->
      <view
        v-else
        v-for="item in list"
        :key="item._id"
        class="work-card"
        @click="goToDetail(item)"
      >
        <view class="work-title-row">
          <view class="work-title">{{item.commodity.title}}</view>
          <view class="work-status-check">
            <image
              class="work-status"
              :src="item.status === 'completed' ? '/static/check.svg' : '/static/clock.svg'"
              mode="aspectFit"
            ></image>
          </view>
        </view>
        <view class="work-time">{{formatTimestamp(item.createdAt)}}</view>

        <!-- 完成状态的内容 -->
        <view
          class="work-content"
          v-if="item.status === 'completed'"
        >
          <view>{{item.script.style}}</view>
        </view>
        <view
          class="work-tags-row"
          v-if="item.status === 'completed'"
        >
          <view class="work-tags-box">
            <view class="work-tag">{{ item.script.segments.length }} 个镜头</view>
            <!-- <view class="work-tag">{{ item.commodity.brand }}</view> -->
            <view class="work-tag">{{ item.commodity.category }}</view>
          </view>
          <button
            open-type="share"
            :data-item="item"
            class="share-btn"
            @click.stop=""
          >
            <image
              class="work-icon"
              src="/static/share.svg"
              mode="aspectFit"
            ></image>
          </button>
          <image
            @click.stop="deleteItem(item)"
            class="work-icon"
            src="/static/del.svg"
            mode="aspectFit"
          ></image>
        </view>

        <!-- 加载中状态的内容 -->
        <view
          class="work-loading"
          v-if="item.status !== 'completed'"
        >
          <view class="steps-list">
            <view
              v-for="(step, index) in getDisplaySteps()"
              :key="index"
              class="step-item"
              :class="{ 'completed': index < currentStepIndex, 'current': index === currentStepIndex }"
            >
              <view class="step-icon">
                <image
                  v-if="index < currentStepIndex"
                  class="check-icon"
                  src="/static/check-white.svg"
                  mode="aspectFit"
                ></image>
                <view
                  v-else-if="index === currentStepIndex"
                  class="loading-dots"
                >
                  <view class="dot dot1"></view>
                  <view class="dot dot2"></view>
                  <view class="dot dot3"></view>
                </view>
              </view>
              <text class="step-text">{{ step }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import request from "../../request";
import config from "../../config";
export default {
  data () {
    return {
      searchText: '',
      list: [],
      copyList: [],
      isLoading: true,
      totalObj: {
        total: 0,
        monthlyCount: 0,
        dailyCount: 0
      },
      isFilter: false,
      formatTimestamp: config.formatTimestamp,
      steps: [
        '正在分析商品链接',
        '正在获取商品信息',
        '正在分析商品类别和特性',
        '正在分析商品卖点和价值主张',
        '提取核心卖点',
        '正在匹配最佳脚本模板',
        '正在优化脚本内容',
        '正在进行分镜头的文案撰写',
        '正在完善脚本细节',
      ],
      currentStepIndex: 0,
      stepTimer: null,
      unloaded: false
    }
  },
  onShareAppMessage: (item) => {
    const promise = new Promise(resolve => {
      resolve({
        path: `package/pages/detail/index?id=${item.target.dataset.item._id}`,
        title: config.name,
      })
    })
    return {
      path: `package/pages/detail/index?id=${item.target.dataset.item._id}`,
      title: config.name,
      promise
    }
  },
  onShow () {
    this.unloaded = false
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: 1
      });
    }
    this.loadData()
  },
  onHide () {
    this.unloaded = true
  },
  onUnload () {
    this.unloaded = true
  },
  methods: {
    async deleteItem (item) {
      uni.showLoading({
        title: '删除中...'
      })
      await request({
        url: `/api/pro/v1/tasks/${item._id}`,
        method: 'PATCH',
        data: { "action": "delete" }
      })
      uni.hideLoading()
      this.getList()
    },
    filter () {
      if (!this.isFilter) {
        this.copyList = [...this.list]
        this.list.sort((a, b) => b.createdAt - a.createdAt)
      } else {
        this.list = [...this.copyList]
      }
      this.isFilter = !this.isFilter
    },
    async loadData () {
      this.isLoading = true
      try {
        const [listData, totalData] = await Promise.all([
          this.getList(),
          this.getTotal()
        ])
      } catch (error) {
        console.error('数据加载失败:', error)
      } finally {
        this.isLoading = false
      }
    },
    async getList () {
      try {
        const data = await request({
          url: `/api/pro/v1/tasks?keyword=${this.searchText}`,
          method: 'GET',
        })
        this.list = data.data.list
        // 重新启动步骤轮换（如果有未完成的任务）
        this.startStepRotation()
        return data
      } catch (error) {
        console.error('获取列表失败:', error)
        throw error
      }
    },
    async getTotal () {
      try {
        const data = await request({
          url: '/api/pro/v1/task-summary',
          method: 'GET',
        })
        this.totalObj.total = data.data.total || 0
        this.totalObj.monthlyCount = data.data.monthlyCount || 0
        this.totalObj.dailyCount = data.data.dailyCount || 0
        return data
      } catch (error) {
        console.error('获取统计数据失败:', error)
        throw error
      }
    },
    goToDetail (item) {
      if (item.status === 'completed') {
        uni.navigateTo({
          url: '/package/pages/detail/index?id=' + item._id
        })
      } else {
        uni.showToast({ title: '作品正在生成中，请稍后再来查看', icon: 'none' });
      }
    },
    getCurrentLoadingText () {
      return this.steps[this.currentStepIndex] || '脚本生成中...'
    },
    getDisplaySteps () {
      // 返回当前应该显示的步骤（从0到currentStepIndex）
      return this.steps.slice(0, this.currentStepIndex + 1)
    },
    startStepRotation () {
      // 检查是否有未完成的任务
      const hasIncompleteTask = this.list.some(item => item.status !== 'completed')
      if (!hasIncompleteTask) {
        return
      }

      setTimeout(() => {
        if (this.unloaded) return
        if (this.currentStepIndex < this.steps.length - 1) {
          this.currentStepIndex++
        }
        this.getList()
      }, 10000)
    },
  },
}
</script>

<style lang="scss" scoped>
.history-container {
  background: #f7f8fa;
  min-height: 100vh;
  padding: 0 0 110rpx 0;

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
      &.active {
        border: 2rpx solid #3478f6;
      }
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

      // 统计数据骨架屏
      .skeleton-stat-num {
        width: 60rpx;
        height: 40rpx;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        border-radius: 8rpx;
        animation: skeleton-shimmer 1.5s infinite;
        margin-bottom: 8rpx;
      }
    }
  }

  .work-list {
    margin: 32rpx 32rpx 0 32rpx;

    // 骨架屏样式
    .skeleton-list {
      .skeleton-card {
        background: #fff;
        border-radius: 20rpx;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
        padding: 32rpx;
        margin-bottom: 24rpx;
        border: 2rpx solid #f2f3f5;

        .skeleton-title-row {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;

          .skeleton-title {
            flex: 1;
            height: 32rpx;
            background: linear-gradient(
              90deg,
              #f0f0f0 25%,
              #e0e0e0 50%,
              #f0f0f0 75%
            );
            background-size: 200% 100%;
            border-radius: 8rpx;
            animation: skeleton-shimmer 1.5s infinite;
          }

          .skeleton-status {
            width: 42rpx;
            height: 42rpx;
            border-radius: 50%;
            background: linear-gradient(
              90deg,
              #f0f0f0 25%,
              #e0e0e0 50%,
              #f0f0f0 75%
            );
            background-size: 200% 100%;
            margin-left: 16rpx;
            animation: skeleton-shimmer 1.5s infinite;
          }
        }

        .skeleton-time {
          height: 24rpx;
          width: 180rpx;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          border-radius: 6rpx;
          margin-bottom: 16rpx;
          animation: skeleton-shimmer 1.5s infinite;
        }

        .skeleton-content {
          background: #f7f8fa;
          border-radius: 12rpx;
          padding: 20rpx;
          margin-bottom: 16rpx;

          .skeleton-line {
            height: 28rpx;
            background: linear-gradient(
              90deg,
              #e5e7eb 25%,
              #d5d7db 50%,
              #e5e7eb 75%
            );
            background-size: 200% 100%;
            border-radius: 6rpx;
            margin-bottom: 12rpx;
            animation: skeleton-shimmer 1.5s infinite;

            &.short {
              width: 60%;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        .skeleton-tags-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .skeleton-tag {
            height: 32rpx;
            width: 80rpx;
            background: linear-gradient(
              90deg,
              #f0f0f0 25%,
              #e0e0e0 50%,
              #f0f0f0 75%
            );
            background-size: 200% 100%;
            border-radius: 8rpx;
            margin-right: 16rpx;
            animation: skeleton-shimmer 1.5s infinite;

            &:last-of-type {
              margin-right: 0;
            }
          }

          .skeleton-icon {
            width: 32rpx;
            height: 32rpx;
            background: linear-gradient(
              90deg,
              #f0f0f0 25%,
              #e0e0e0 50%,
              #f0f0f0 75%
            );
            background-size: 200% 100%;
            border-radius: 6rpx;
            animation: skeleton-shimmer 1.5s infinite;
          }
        }
      }
    }

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
        view {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .work-tags-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .work-tags-box {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 1rpx;
          overflow: auto;
          .work-tag {
            font-size: 24rpx;
            color: #3478f6;
            background: #f5f7ff;
            border-radius: 8rpx;
            padding: 4rpx 16rpx;
            margin-right: 16rpx;
            white-space: nowrap;
          }
        }
        .work-icon {
          width: 32rpx;
          height: 32rpx;
          margin-left: 12rpx;
        }
      }

      // 加载中状态样式
      .work-loading {
        background: #f7f8fa;
        border-radius: 12rpx;
        padding: 20rpx;
        margin-bottom: 16rpx;

        .steps-list {
          .step-item {
            display: flex;
            align-items: center;
            margin-bottom: 16rpx;
            opacity: 0;
            animation: stepFadeIn 0.5s ease-out forwards;

            &:last-child {
              margin-bottom: 0;
            }

            .step-icon {
              width: 32rpx;
              height: 32rpx;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 16rpx;
              flex-shrink: 0;

              .check-icon {
                width: 18rpx;
                height: 18rpx;
              }

              .loading-dots {
                display: flex;
                align-items: center;
                justify-content: center;

                .dot {
                  width: 8rpx;
                  height: 8rpx;
                  border-radius: 50%;
                  background: #3478f6;
                  margin: 0 3rpx;
                  animation: loading-bounce 1.4s infinite ease-in-out both;

                  &.dot1 {
                    animation-delay: -0.32s;
                  }
                  &.dot2 {
                    animation-delay: -0.16s;
                  }
                  &.dot3 {
                    animation-delay: 0s;
                  }
                }
              }
            }

            .step-text {
              font-size: 26rpx;
              line-height: 1.4;
              flex: 1;
            }

            &.completed {
              .step-icon {
                background: #00c48f;
              }
              .step-text {
                color: #666;
              }
            }

            &.current {
              .step-icon {
                background: #f0f8ff;
                // border: 2rpx solid #3478f6;
              }
              .step-text {
                color: #222;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
}

// 加载动画
@keyframes loading-bounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes stepFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10rpx);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
.share-btn {
  border: none;
  padding: 0;
  margin: 0;
  background: none;
  height: 40rpx;
  line-height: unset;
}
.share-btn::after {
  display: none;
}
</style>