<template>
  <view class="my-root">
    <view class="main-content">
      <!-- 会员信息卡 -->
      <view class="card user-card">
        <image
          class="avatar"
          src="/static/avatar.jpg"
          mode="aspectFill"
        ></image>
        <view class="user-info">
          <view class="user-row">
            <text class="user-name">{{ userInfo.username }}</text>
            <text
              class="user-tag"
              @click="showPlanPopup = true"
            >免费版</text>
          </view>
          <!-- <view class="user-expire">会员到期时间：2025-08-10</view> -->
        </view>
        <button
          class="user-btn"
          @click="showVip = true"
        >查看特权</button>
      </view>

      <!-- 统计卡 -->
      <view class="card stat-card">
        <view class="stat-item">
          <text class="stat-num">127</text>
          <text class="stat-label">本月生成次数</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">396</text>
          <text class="stat-label">剩余生成次数</text>
        </view>
      </view>

      <!-- 升级卡 -->
      <view class="card upgrade-card">
        <view class="upgrade-row">
          <view class="upgrade-title">升级至尊享版</view>
          <text class="upgrade-tag">限时优惠</text>
        </view>
        <view class="upgrade-desc">解锁专家诊断 + 优先客服 + 更多特权</view>
        <view class="upgrade-bottom">
          <view class="upgrade-price">
            <text class="price">¥398</text>
            <text class="origin">¥598</text>
            <text class="discount">限时6.7折</text>
          </view>
          <button
            class="upgrade-btn"
            @click="showUpgrade = true"
          >立即升级</button>
        </view>
      </view>

      <!-- 功能列表 -->
      <view class="card list-card">
        <view class="list-item">
          <view class="vip-box">
            <image
              class="list-icon"
              src="/static/vip-green.svg"
              mode="aspectFit"
            ></image>
          </view>
          <view
            class="list-info"
            @click="goToMemberCenter"
          >
            <view class="list-title">会员中心</view>
            <view class="list-desc">查看会员权益和特权</view>
          </view>
          <image
            class="list-arrow"
            src="/static/arrow.svg"
            mode="aspectFit"
          ></image>
        </view>
        <view class="list-item">
          <view class="bind-box">
            <image
              class="list-icon"
              src="/static/bind.svg"
              mode="aspectFit"
            ></image>
          </view>
          <view
            class="list-info"
            @click="goToBindAccount"
          >
            <view class="list-title">账号与绑定</view>
            <view class="list-desc">管理账号信息和第三方绑定</view>
          </view>
          <text class="bind-tag">{{dyUser.name ? '已绑定抖音' : '绑定抖音'}}</text>
          <image
            class="list-arrow"
            src="/static/arrow.svg"
            mode="aspectFit"
          ></image>
        </view>
        <view class="list-item">
          <view class="help-box">
            <image
              class="list-icon"
              src="/static/help.svg"
              mode="aspectFit"
            ></image>
          </view>
          <view class="list-info">
            <view class="list-title">帮助与反馈</view>
            <view class="list-desc">常见问题和意见反馈</view>
          </view>
          <image
            class="list-arrow"
            src="/static/arrow.svg"
            mode="aspectFit"
          ></image>
        </view>
      </view>
    </view>

    <!-- 底部tab栏由自定义tabBar实现 -->

    <!-- 升级至尊享版弹窗遮罩 -->
    <view
      v-if="showUpgrade"
      class="popup-mask"
      @click="showUpgrade = false"
    ></view>
    <!-- 升级至尊享版弹窗主体 -->
    <view
      v-if="showUpgrade"
      class="upgrade-popup"
    >
      <view
        class="popup-close"
        @click="showUpgrade = false"
      >
        <image
          src="/static/close.svg"
          mode="aspectFit"
        ></image>
      </view>
      <view class="popup-title">升级至尊享版</view>
      <view class="popup-card">
        <view class="popup-row">
          <view class="popup-icon-box">
            <image
              class="popup-icon"
              src="/static/vip.svg"
              mode="aspectFit"
            ></image>
          </view>
          <view class="popup-info">
            <view class="popup-vip-title">尊享版</view>
            <view class="popup-vip-desc">专业创作者的最佳选择</view>
          </view>
          <text class="popup-tag">限时优惠</text>
        </view>
        <view class="popup-price-row">
          <text class="popup-price">¥398</text>
          <text class="popup-origin">¥598</text>
          <text class="popup-discount">限时6.7折</text>
        </view>
      </view>
      <view class="popup-feature-title">尊享版独有特权：</view>
      <view class="popup-feature-list">
        <view class="popup-feature-item">
          <view class="popup-feature-img-box">
            <image
              src="/static/diagnose.svg"
              class="feature-icon"
              mode="aspectFit"
            ></image>
          </view>
          <view>
            <view class="feature-title">专家1对1账号诊断</view>
            <view class="feature-desc">每月1次专业诊断服务</view>
          </view>
        </view>
        <view class="popup-feature-item">
          <view class="popup-feature-img-box">
            <image
              src="/static/service.svg"
              class="feature-icon"
              mode="aspectFit"
            ></image>
          </view>
          <view>
            <view class="feature-title">专属客服通道</view>
            <view class="feature-desc">VIP客服优先响应</view>
          </view>
        </view>
        <view class="popup-feature-item">
          <view class="popup-feature-img-box">
            <image
              src="/static/experience.svg"
              class="feature-icon"
              mode="aspectFit"
            ></image>
          </view>
          <view>
            <view class="feature-title">新功能抢先体验</view>
            <view class="feature-desc">第一时间体验最新功能</view>
          </view>
        </view>
      </view>
      <button
        class="popup-btn"
        @click="upgradeNow"
      >立即升级¥398</button>
    </view>

    <!-- 专业版特权弹窗遮罩 -->
    <view
      v-if="showVip"
      class="popup-mask"
      @click="showVip = false"
    ></view>
    <!-- 专业版特权弹窗主体 -->
    <view
      v-if="showVip"
      class="vip-popup"
    >
      <view
        class="popup-close"
        @click="showVip = false"
      >
        <image
          src="/static/close.svg"
          mode="aspectFit"
        ></image>
      </view>
      <view class="vip-title">专业版特权</view>
      <view class="vip-card">
        <view class="vip-row">
          <view class="vip-icon-box">
            <image
              class="vip-icon"
              src="/static/vip.svg"
              mode="aspectFit"
            ></image>
          </view>
          <view class="vip-info">
            <view class="vip-main-title">专业版会员</view>
            <view class="vip-main-desc">享受专业创作者权益</view>
          </view>
        </view>
        <view class="vip-meta-row">
          <view class="vip-meta">
            <text class="vip-meta-num">30次</text>
            <text class="vip-meta-label">月度生成额度</text>
          </view>
          <view class="vip-meta">
            <text class="vip-meta-num">2025-08-10</text>
            <text class="vip-meta-label">到期时间</text>
          </view>
        </view>
      </view>
      <view class="vip-feature-list">
        <view class="vip-feature-item">
          <view class="feature-check-box">
            <image
              src="/static/check-white.svg"
              class="feature-check"
              mode="aspectFit"
            ></image>
          </view>
          <view>
            <view class="feature-title">无限脚本生成</view>
            <view class="feature-desc">不限次数创作爆款脚本</view>
          </view>
        </view>
        <view class="vip-feature-item">
          <view class="feature-check-box">
            <image
              src="/static/check-white.svg"
              class="feature-check"
              mode="aspectFit"
            ></image>
          </view>
          <view>
            <view class="feature-title">完整账号分析</view>
            <view class="feature-desc">深度数据分析和优化建议</view>
          </view>
        </view>
        <view class="vip-feature-item">
          <view class="feature-check-box">
            <image
              src="/static/check-white.svg"
              class="feature-check"
              mode="aspectFit"
            ></image>
          </view>
          <view>
            <view class="feature-title">无水印视频</view>
            <view class="feature-desc">生成高质量无水印视频</view>
          </view>
        </view>
        <view class="vip-feature-item">
          <view class="feature-check-box">
            <image
              src="/static/check-white.svg"
              class="feature-check"
              mode="aspectFit"
            ></image>
          </view>
          <view>
            <view class="feature-title">优先客服支持</view>
            <view class="feature-desc">专属客服快速响应</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 会员套餐弹窗遮罩 -->
    <view
      v-if="showPlanPopup"
      class="popup-mask"
      @click="showPlanPopup = false"
    ></view>
    <!-- 会员套餐弹窗主体 -->
    <view
      v-if="showPlanPopup"
      class="plan-popup"
    >
      <view class="plan-popup-header">
        <view class="plan-title">选择会员套餐</view>
        <view
          class="popup-close"
          @click="showPlanPopup = false"
        >
          <image
            src="/static/close.svg"
            mode="aspectFit"
          ></image>
        </view>
      </view>
      <view class="plan-list">
        <!-- 至尊版卡片 -->
        <view class="plan-card plan-card-vip">
          <view class="plan-card-header">
            <text class="plan-card-title">尊享版</text>
            <text class="plan-card-hot">最受欢迎</text>
          </view>
          <view class="plan-card-desc">适合专业创作者和团队</view>
          <view class="plan-card-price-row">
            <text class="plan-card-price">￥398</text>
            <text class="plan-card-unit">/月</text>
          </view>
          <view class="plan-card-features">
            <view class="plan-feature">无限次脚本生成</view>
            <view class="plan-feature">完整账号分析功能</view>
            <view class="plan-feature">生成视频无水印</view>
            <view class="plan-feature">优先体验新功能</view>
            <view class="plan-feature">专家1对1账号诊断(1次/月)</view>
          </view>
          <button class="plan-card-btn plan-card-btn-vip">立即开通</button>
        </view>
        <!-- 高级版卡片 -->
        <view class="plan-card plan-card-pro">
          <view class="plan-card-header">
            <text class="plan-card-title">高级版</text>
            <text class="plan-card-recommend">推荐</text>
          </view>
          <view class="plan-card-desc">适合认真做账号的创作者</view>
          <view class="plan-card-price-row">
            <text class="plan-card-price">￥198</text>
            <text class="plan-card-unit">/月</text>
          </view>
          <view class="plan-card-features">
            <view class="plan-feature">无限次脚本生成</view>
            <view class="plan-feature">完整账号分析功能</view>
            <view class="plan-feature">生成视频无水印</view>
            <view class="plan-feature">优先体验新功能</view>
          </view>
          <button class="plan-card-btn plan-card-btn-pro">立即开通</button>
        </view>
        <!-- 专业版卡片 -->
        <view class="plan-card plan-card-basic">
          <view class="plan-card-header">
            <text class="plan-card-title">专业版</text>
            <text class="plan-card-discount">限时5折</text>
          </view>
          <view class="plan-card-desc">适合初步尝试的创作者</view>
          <view class="plan-card-price-row">
            <text class="plan-card-price">￥98</text>
            <text class="plan-card-origin">￥198</text>
          </view>
          <view class="plan-card-features">
            <view class="plan-feature">每月30次脚本生成</view>
            <view class="plan-feature">基础账号分析功能</view>
            <view class="plan-feature">生成视频无水印</view>
          </view>
          <button class="plan-card-btn plan-card-btn-basic">选择套餐</button>
        </view>
        <!-- 免费版卡片 -->
        <view class="plan-card plan-card-free">
          <view class="plan-card-header">
            <text class="plan-card-title">免费版（当前）</text>
          </view>
          <view class="plan-card-desc">体验基础功能</view>
          <view class="plan-card-features">
            <view class="plan-feature plan-feature-disable">每月仅3次脚本生成</view>
            <view class="plan-feature plan-feature-disable">无账号分析功能</view>
            <view class="plan-feature plan-feature-disable">生成视频带水印</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import request from "../../request";
import share from "../mixins/share";
export default {
  mixins: [share],
  data () {
    return {
      showUpgrade: false,
      showVip: false,
      showPlanPopup: false,
      dyUser: {},
      userInfo: {}
    }
  },
  methods: {
    upgradeNow () {
      uni.showToast({ title: '升级成功', icon: 'success' })
      this.showUpgrade = false
    },
    goToBindAccount () {
      if (!this.dyUser.name) {
        uni.navigateTo({
          url: '/package/pages/bindAccount/index'
        })
      }
    },
    goToMemberCenter () {
      uni.navigateTo({
        url: '/package/pages/memberCenter/index'
      })
    },
    goToLogin () {
      uni.navigateTo({
        url: '/pages/login/index'
      })
    },
    async getDyInfo () {
      const data = await request({
        url: '/api/pro/v1/accounts',
        method: 'GET',
      })
      this.dyUser = data.data || {}
    },
    async getUserInfo () {
      const data = await request({
        url: '/api/v1/users/me',
        method: 'GET',
      })
      this.userInfo = data.data
    }
  },
  onShow () {
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: 3
      });
    }
    this.getDyInfo()
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.my-root {
  background: #f7f8fa;
  min-height: 100vh;
  .main-content {
    width: 92vw;
    max-width: 700rpx;
    margin: 0 auto;
    padding-top: 24rpx;
    .card {
      background: #fff;
      border-radius: 24rpx;
      box-shadow: 0 8rpx 32rpx 0 rgba(0, 0, 0, 0.06);
      margin-bottom: 28rpx;
      padding: 0;
    }
    .user-card {
      display: flex;
      align-items: center;
      padding: 32rpx 32rpx 32rpx 32rpx;
      .avatar {
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
        margin-right: 24rpx;
      }
      .user-info {
        flex: 1;
        .user-row {
          display: flex;
          align-items: center;
          margin-bottom: 8rpx;
          .user-name {
            font-size: 32rpx;
            font-weight: bold;
            color: #222;
            margin-right: 16rpx;
          }
          .user-tag {
            font-size: 22rpx;
            background: #22c38e;
            color: #fff;
            border-radius: 40rpx;
            padding: 4rpx 16rpx;
          }
        }
        .user-expire {
          font-size: 24rpx;
          color: #888;
        }
      }
      .user-btn {
        background: #3478f6;
        color: #fff;
        font-size: 26rpx;
        border-radius: 12rpx;
        padding: 0 28rpx;
        height: 56rpx;
        line-height: 56rpx;
        border: none;
        margin-left: 24rpx;
      }
    }
    .stat-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32rpx 32rpx;
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        .stat-num {
          font-size: 40rpx;
          font-weight: bold;
          color: #3478f6;
          margin-bottom: 8rpx;
        }
        .stat-label {
          font-size: 24rpx;
          color: #888;
        }
        .stat-infinite {
          width: 40rpx;
          height: 40rpx;
          margin-bottom: 8rpx;
        }
      }
      .stat-item + .stat-item {
        border-left: 2rpx solid #f2f3f5;
      }
    }
    .upgrade-card {
      padding: 32rpx 32rpx 24rpx 32rpx;
      background: linear-gradient(90deg, #f7f8fa 0%, #fff6fa 100%);
      .upgrade-row {
        display: flex;
        align-items: center;
        margin-bottom: 8rpx;
        .upgrade-title {
          font-size: 28rpx;
          font-weight: bold;
          color: #222;
          flex: 1;
        }
        .upgrade-tag {
          font-size: 20rpx;
          background: #22c38e;
          color: #fff;
          border-radius: 18rpx;
          padding: 4rpx 16rpx;
        }
      }
      .upgrade-desc {
        font-size: 24rpx;
        color: #888;
        margin-bottom: 18rpx;
      }
      .upgrade-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .upgrade-price {
          display: flex;
          align-items: baseline;
          flex: 1;
          .price {
            font-size: 32rpx;
            color: #3478f6;
            font-weight: bold;
            margin-right: 12rpx;
          }
          .origin {
            font-size: 24rpx;
            color: #bbb;
            text-decoration: line-through;
            margin-right: 12rpx;
          }
          .discount {
            font-size: 22rpx;
            color: #22c38e;
            background: #eaffea;
            border-radius: 8rpx;
            padding: 2rpx 10rpx;
          }
        }
        .upgrade-btn {
          background: #3478f6;
          color: #fff;
          font-size: 26rpx;
          border-radius: 12rpx;
          padding: 0 32rpx;
          height: 56rpx;
          line-height: 56rpx;
          border: none;
        }
      }
    }
    .list-card {
      padding: 0;
      .list-item {
        display: flex;
        align-items: center;
        padding: 28rpx 32rpx;
        border-bottom: 2rpx solid #eee;
        .vip-box {
          padding: 20rpx;
          background: #e9f8f3;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-content: center;
          margin-right: 20rpx;
        }
        .bind-box {
          padding: 20rpx;
          background: #edf6ff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-content: center;
          margin-right: 20rpx;
        }
        .help-box {
          padding: 20rpx;
          background: #ecfef3;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-content: center;
          margin-right: 20rpx;
        }
        .list-icon {
          width: 44rpx;
          height: 44rpx;
        }
        .list-info {
          flex: 1;
          .list-title {
            font-size: 28rpx;
            color: #222;
            font-weight: bold;
            margin-bottom: 4rpx;
          }
          .list-desc {
            font-size: 22rpx;
            color: #888;
          }
        }
        .bind-tag {
          font-size: 20rpx;
          background: #eaffea;
          color: #22c38e;
          border-radius: 8rpx;
          padding: 4rpx 16rpx;
          margin-right: 16rpx;
        }
        .list-arrow {
          width: 28rpx;
          height: 28rpx;
        }
      }
      .list-item:last-child {
        border-bottom: none;
      }
    }
  }
}
.popup-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
}
.upgrade-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 84vw;
  max-width: 540rpx;
  background: #fff;
  border-radius: 32rpx;
  box-shadow: 0 12rpx 48rpx 0 rgba(0, 0, 0, 0.1);
  z-index: 1001;
  padding: 0 0 40rpx 0;
  animation: popupIn 0.2s;
  .popup-close {
    position: absolute;
    right: 32rpx;
    top: 32rpx;
    width: 36rpx;
    height: 36rpx;
    z-index: 2;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .popup-title {
    text-align: center;
    font-size: 32rpx;
    font-weight: bold;
    color: #222;
    margin-top: 48rpx;
    margin-bottom: 24rpx;
  }
  .popup-card {
    margin: 0 32rpx 24rpx 32rpx;
    border-radius: 20rpx;
    padding: 32rpx 24rpx 24rpx 24rpx;
    background: linear-gradient(90deg, #f7f8fa 0%, #fff6fa 100%);
    .popup-row {
      display: flex;
      align-items: center;
      margin-bottom: 18rpx;
      .popup-icon-box {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18rpx;
        background: linear-gradient(90deg, #6e7cf3 0%, #e94f8b 100%);
        .popup-icon {
          width: 30rpx;
          height: 30rpx;
        }
      }
      .popup-info {
        flex: 1;
        .popup-vip-title {
          font-size: 28rpx;
          font-weight: bold;
          color: #222;
          margin-bottom: 4rpx;
        }
        .popup-vip-desc {
          font-size: 22rpx;
          color: #888;
        }
      }
      .popup-tag {
        font-size: 20rpx;
        background: #22c38e;
        color: #fff;
        border-radius: 8rpx;
        padding: 4rpx 16rpx;
      }
    }
    .popup-price-row {
      display: flex;
      align-items: baseline;
      margin-left: 74rpx;
      .popup-price {
        font-size: 36rpx;
        color: #3478f6;
        font-weight: bold;
        margin-right: 16rpx;
      }
      .popup-origin {
        font-size: 24rpx;
        color: #bbb;
        text-decoration: line-through;
        margin-right: 12rpx;
      }
      .popup-discount {
        font-size: 22rpx;
        color: #22c38e;
        background: #eaffea;
        border-radius: 8rpx;
        padding: 2rpx 10rpx;
      }
    }
  }
  .popup-feature-title {
    font-size: 24rpx;
    color: #222;
    font-weight: bold;
    margin: 0 32rpx 12rpx 32rpx;
  }
  .popup-feature-list {
    margin: 0 32rpx 0 32rpx;
    .popup-feature-item {
      display: flex;
      align-items: center;
      background: #f7f8fa;
      border-radius: 16rpx;
      padding: 18rpx 0 18rpx 24rpx;
      margin-bottom: 16rpx;
      .popup-feature-img-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #12b981;
        margin-right: 18rpx;
      }
      .feature-icon {
        width: 36rpx;
        height: 36rpx;
      }
      .feature-title {
        font-size: 24rpx;
        color: #222;
        font-weight: bold;
        margin-bottom: 4rpx;
      }
      .feature-desc {
        font-size: 22rpx;
        color: #888;
      }
    }
    .popup-feature-item:last-child {
      margin-bottom: 0;
    }
  }
  .popup-btn {
    width: 84%;
    margin: 32rpx 8% 0 8%;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    font-weight: bold;
    color: #fff;
    border: none;
    border-radius: 16rpx;
    background: linear-gradient(90deg, #6e7cf3 0%, #e94f8b 100%);
    box-shadow: 0 4rpx 16rpx 0 rgba(233, 79, 139, 0.1);
  }
}
.vip-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 84vw;
  max-width: 540rpx;
  background: #fff;
  border-radius: 32rpx;
  box-shadow: 0 12rpx 48rpx 0 rgba(0, 0, 0, 0.1);
  z-index: 1001;
  padding: 0 0 40rpx 0;
  animation: popupIn 0.2s;
  .popup-close {
    position: absolute;
    right: 32rpx;
    top: 32rpx;
    width: 36rpx;
    height: 36rpx;
    z-index: 2;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .vip-title {
    text-align: left;
    font-size: 32rpx;
    font-weight: bold;
    color: #222;
    margin: 48rpx 0 24rpx 32rpx;
  }
  .vip-card {
    margin: 0 32rpx 24rpx 32rpx;
    border-radius: 20rpx;
    background: linear-gradient(90deg, #eaf2ff 0%, #f7f8fa 100%);
    padding: 32rpx 24rpx 24rpx 24rpx;
    .vip-row {
      display: flex;
      align-items: center;
      margin-bottom: 18rpx;
      .vip-icon-box {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18rpx;
        background: #3c82f6;
        margin-right: 18rpx;
        .vip-icon {
          width: 30rpx;
          height: 30rpx;
        }
      }
      .vip-info {
        .vip-main-title {
          font-size: 28rpx;
          font-weight: bold;
          color: #222;
          margin-bottom: 4rpx;
        }
        .vip-main-desc {
          font-size: 22rpx;
          color: #888;
        }
      }
    }
    .vip-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8rpx;
      .vip-meta {
        display: flex;
        flex-direction: column;
        align-items: center;
        .vip-meta-num {
          font-size: 30rpx;
          color: #3478f6;
          font-weight: bold;
          margin-bottom: 2rpx;
        }
        .vip-meta-label {
          font-size: 22rpx;
          color: #888;
        }
      }
    }
  }
  .vip-feature-list {
    margin: 0 32rpx 0 32rpx;
    .vip-feature-item {
      display: flex;
      align-items: center;
      background: #f7f8fa;
      border-radius: 16rpx;
      padding: 18rpx 0 18rpx 24rpx;
      margin-bottom: 16rpx;
      .feature-check-box {
        width: 50rpx;
        height: 50rpx;
        background: #12b981;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 18rpx;
        border-radius: 50%;
        .feature-check {
          width: 25rpx;
          height: 25rpx;
        }
      }
      .feature-title {
        font-size: 24rpx;
        color: #222;
        font-weight: bold;
        margin-bottom: 4rpx;
      }
      .feature-desc {
        font-size: 22rpx;
        color: #888;
      }
    }
    .vip-feature-item:last-child {
      margin-bottom: 0;
    }
  }
}
.plan-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 700rpx;
  background: #fff;
  border-radius: 32rpx;
  box-shadow: 0 12rpx 48rpx 0 rgba(0, 0, 0, 0.1);
  z-index: 1002;
  padding: 0 0 40rpx 0;
  max-height: 80vh;
  margin-top: -50rpx;
  display: flex;
  flex-direction: column;
  .popup-close {
    position: absolute;
    right: 32rpx;
    top: 32rpx;
    width: 36rpx;
    height: 36rpx;
    z-index: 2;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .plan-title {
    text-align: left;
    font-size: 32rpx;
    font-weight: bold;
    color: #222;
    margin: 48rpx 0 24rpx 32rpx;
  }
  .plan-list {
    flex: 1;
    min-height: 0;
    margin: 0 24rpx;
    overflow: auto;
    .plan-card {
      background: #fff;
      border-radius: 20rpx;
      box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.04);
      margin-bottom: 24rpx;
      padding: 32rpx 24rpx;
      position: relative;
      .plan-card-header {
        display: flex;
        align-items: center;
        margin-bottom: 8rpx;
        .plan-card-title {
          font-size: 28rpx;
          font-weight: bold;
          color: #222;
          margin-right: 12rpx;
        }
        .plan-card-hot,
        .plan-card-recommend,
        .plan-card-discount {
          font-size: 20rpx;
          background: #ffb300;
          color: #fff;
          border-radius: 8rpx;
          padding: 4rpx 16rpx;
        }
        .plan-card-recommend {
          background: #3478f6;
        }
        .plan-card-discount {
          background: #ff7f00;
        }
      }
      .plan-card-desc {
        font-size: 22rpx;
        color: #888;
        margin-bottom: 12rpx;
      }
      .plan-card-price-row {
        display: flex;
        align-items: baseline;
        margin-bottom: 12rpx;
        .plan-card-price {
          font-size: 36rpx;
          color: #3478f6;
          font-weight: bold;
          margin-right: 8rpx;
        }
        .plan-card-unit {
          font-size: 22rpx;
          color: #888;
        }
        .plan-card-origin {
          font-size: 22rpx;
          color: #bbb;
          text-decoration: line-through;
          margin-left: 8rpx;
        }
      }
      .plan-card-features {
        margin-bottom: 16rpx;
        .plan-feature {
          font-size: 22rpx;
          color: #222;
          margin-bottom: 6rpx;
        }
        .plan-feature-disable {
          color: #bbb;
          text-decoration: line-through;
        }
      }
      .plan-card-btn {
        width: 100%;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 26rpx;
        font-weight: bold;
        color: #fff;
        border: none;
        border-radius: 12rpx;
        background: #3478f6;
        margin-top: 8rpx;
      }
      .plan-card-btn-vip {
        background: #ffb300;
      }
      .plan-card-btn-pro {
        background: #3478f6;
      }
      .plan-card-btn-basic {
        background: #22c38e;
      }
    }
    .plan-card:last-child {
      margin-bottom: 0;
    }
  }
}
@keyframes popupIn {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>