<template>
  <view class="container">
    <!-- 顶部横幅 -->
    <view class="banner">
      <view class="banner-content">
        <view class="banner-title">7天带货破万单</view>
        <view class="banner-subtitle">爆款选品·专业运营</view>
      </view>
      <view class="banner-icons">
        <view class="icon shopping-bag-pink"></view>
        <view class="icon shopping-bag-blue"></view>
        <view class="icon gift-box"></view>
        <view class="icon coins"></view>
        <view class="icon chart"></view>
      </view>
    </view>

    <!-- 服务描述区域 -->
    <view class="services-section">
      <view class="service-card">
        <view class="service-icon blue-icon">
          <image
            class="list-icon"
            src="/static/vip-green.svg"
            mode="aspectFit"
          ></image>
        </view>
        <view class="service-content">
          <view class="service-title">爆款选品指导</view>
          <view class="service-desc">热销品类分析,高利润选品策略</view>
        </view>
      </view>

      <view class="service-card">
        <view class="service-icon green-icon">
          <image
            class="list-icon"
            src="/static/req-text.svg"
            mode="aspectFit"
          ></image>
        </view>
        <view class="service-content">
          <view class="service-title">爆款视频制作</view>
          <view class="service-desc">专业剪辑团队,高转化脚本</view>
        </view>
      </view>

      <view class="service-card">
        <view class="service-icon purple-icon">
          <image
            class="list-icon"
            src="/static/link1.svg"
            mode="aspectFit"
          ></image>
        </view>
        <view class="service-content">
          <view class="service-title">供应链对接</view>
          <view class="service-desc">一手货源,高佣金政策支持</view>
        </view>
      </view>
    </view>

    <!-- 学员好评区域 -->
    <view class="reviews-section">
      <view class="reviews-title">学员好评</view>

      <view class="review-card">
        <view class="review-header">
          <image
            class="avatar"
            src="/static/user2.jpg"
            mode="aspectFill"
          ></image>
          <view class="review-info">
            <view class="review-name">服饰博主小美</view>
            <view class="review-stars">★★★★★</view>
          </view>
        </view>
        <view class="review-content">
          "一条视频带货3000单,单月利润10万+,选品和剪辑团队都很专业！"
        </view>
      </view>

      <view class="review-card">
        <view class="review-header">
          <image
            class="avatar"
            src="/static/user1.jpg"
            mode="aspectFill"
          ></image>
          <view class="review-info">
            <view class="review-name">百货达人阿杰</view>
            <view class="review-stars">★★★★★</view>
          </view>
        </view>
        <view class="review-content">
          "从月销100单到现在日销500+,供应链资源特别靠谱,老师指导很用心。"
        </view>
      </view>
    </view>

    <!-- 底部咨询按钮 -->
    <view class="consultation-section">
      <button
        class="consultation-btn"
        @click="addWeChat"
      >
        <view class="btn-icon">
          <image
            src="/static/wx.svg"
            mode="aspectFit"
          />
        </view>
        <text>添加企业微信咨询</text>
      </button>
      <view class="consultation-tip">添加微信后,我们将为您提供专业服务</view>
    </view>

    <!-- 二维码弹框 -->
    <view
      class="qr-modal"
      v-if="showQRModal"
      @click="closeQRModal"
    >
      <view
        class="qr-content"
        @click.stop
      >
        <view class="qr-header">
          <text class="qr-title">扫码添加企业微信</text>
          <view
            class="qr-close"
            @click="closeQRModal"
          >
            <image
              src="/static/close.svg"
              mode="aspectFit"
            />
          </view>
        </view>
        <view class="qr-body">
          <image
            class="qr-code"
            src="/static/wxkf.jpg"
            mode="aspectFit"
          />
          <view class="qr-tip">请使用微信扫描二维码添加客服</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      showQRModal: false
    }
  },
  methods: {
    addWeChat () {
      // 显示二维码弹框
      this.showQRModal = true;
    },
    closeQRModal () {
      // 关闭二维码弹框
      this.showQRModal = false;
    }
  },
  onShow () {
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: 2
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 110rpx;
}

.banner {
  position: relative;
  height: 300rpx;
  background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);
  border-radius: 0 0 30rpx 30rpx;
  overflow: hidden;
  margin-bottom: 40rpx;

  .banner-content {
    position: relative;
    z-index: 2;
    padding: 60rpx 40rpx 40rpx;
    color: #fff;

    .banner-title {
      font-size: 48rpx;
      font-weight: bold;
      margin-bottom: 16rpx;
    }

    .banner-subtitle {
      font-size: 28rpx;
      opacity: 0.9;
    }
  }

  .banner-icons {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    .icon {
      position: absolute;
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
    }

    .shopping-bag-pink {
      top: 40rpx;
      right: 60rpx;
      background: linear-gradient(45deg, #ff9a9e, #fecfef);
    }

    .shopping-bag-blue {
      top: 120rpx;
      right: 40rpx;
      background: linear-gradient(45deg, #a8edea, #fed6e3);
    }

    .gift-box {
      top: 200rpx;
      right: 80rpx;
      background: linear-gradient(45deg, #ffecd2, #fcb69f);
    }

    .coins {
      top: 80rpx;
      right: 200rpx;
      background: linear-gradient(45deg, #ffecd2, #fcb69f);
    }

    .chart {
      top: 160rpx;
      right: 180rpx;
      background: linear-gradient(45deg, #a8edea, #fed6e3);
    }
  }
}

.services-section {
  padding: 0 32rpx;
  margin-bottom: 40rpx;

  .service-card {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

    .service-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;
      margin-right: 24rpx;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .list-icon {
        width: 44rpx;
        height: 44rpx;
      }
    }

    .blue-icon {
      background: #e9f8f3;
    }

    .green-icon {
      background: #fffbe6;
    }

    .purple-icon {
      background: #edf6ff;
    }

    .service-content {
      flex: 1;

      .service-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 8rpx;
      }

      .service-desc {
        font-size: 26rpx;
        color: #666;
        line-height: 1.4;
      }
    }
  }
}

.reviews-section {
  padding: 0 32rpx;
  margin-bottom: 40rpx;

  .reviews-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 32rpx;
  }

  .review-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

    .review-header {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;

      .avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }

      .review-info {
        flex: 1;

        .review-name {
          font-size: 28rpx;
          font-weight: bold;
          color: #333;
          margin-bottom: 8rpx;
        }

        .review-stars {
          font-size: 24rpx;
          color: #ffd700;
        }
      }
    }

    .review-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.5;
      padding: 20rpx;
      background: #f8f9fa;
      border-radius: 12rpx;
      border-left: 4rpx solid #4ecdc4;
    }
  }
}

.consultation-section {
  padding: 0 32rpx;

  .consultation-btn {
    width: 100%;
    height: 88rpx;
    background: #4caf50;
    border-radius: 12rpx;
    border: none;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.3);

    .btn-icon {
      font-size: 32rpx;
      margin-right: 12rpx;
      display: flex;
      align-items: center;
      image {
        width: 50rpx;
        height: 50rpx;
      }
    }
  }

  .consultation-tip {
    text-align: center;
    font-size: 24rpx;
    color: #999;
  }
}

/* 二维码弹框样式 */
.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.qr-content {
  background: #fff;
  border-radius: 20rpx;
  width: 100%;
  max-width: 600rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.2);
}

.qr-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 1rpx solid #f0f0f0;

  .qr-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }

  .qr-close {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #f5f5f5;

    image {
      width: 24rpx;
      height: 24rpx;
    }
  }
}

.qr-body {
  padding: 40rpx;
  text-align: center;

  .qr-code {
    width: 400rpx;
    height: 400rpx;
    margin-bottom: 24rpx;
    border-radius: 12rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  }

  .qr-tip {
    font-size: 28rpx;
    color: #666;
    line-height: 1.4;
  }
}
</style>