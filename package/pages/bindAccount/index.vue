<template>
  <view class="bind-container">
    <!-- 扫码绑定内容 -->
    <view class="scan-content">
      <view class="title">扫码授权绑定</view>
      <view class="desc">使用抖音 APP 扫描下方二维码完成授权</view>
      <view class="qrcode-box">
        <image
          class="qrcode"
          :src="qrcodeUrl"
          mode="aspectFit"
        ></image>
        <view
          class="refresh-btn"
          @click="refreshQrcode"
        >
          <image
            src="/static/refresh.svg"
            class="refresh-icon"
            mode="aspectFit"
          ></image>
        </view>
      </view>
      <view class="scan-tip">
        <view class="tip-title">请使用抖音 APP 扫描二维码</view>
        <view class="tip-desc">扫码后在手机上确认授权即可完成绑定</view>
      </view>
      <view class="steps-box">
        <view class="steps-title">
          <text class="iconfont">&#xe60b;</text>
          绑定步骤
        </view>
        <view class="steps-list">
          <view>1. 打开抖音 APP</view>
          <view>2. 点击右上角扫一扫</view>
          <view>3. 扫描上方二维码</view>
          <view>4. 在手机上确认授权</view>
        </view>
      </view>
      <button
        class="confirm-btn"
        @click="confirmAuth"
      >确认授权</button>
      <view class="protocol">
        点击确认授权即表示同意
        <text
          class="link"
          @click="openPrivacy"
        >《隐私政策》</text>
        和
        <text
          class="link"
          @click="openUser"
        >《用户协议》</text>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data () {
    return {
      qrcodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=example' // 可替换为后端生成的二维码
    }
  },
  methods: {
    refreshQrcode () {
      // 刷新二维码逻辑
      this.qrcodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + Math.random();
    },
    confirmAuth () {
      uni.showToast({ title: '授权成功', icon: 'success' });
    },
    openPrivacy () {
      // 跳转隐私政策
      uni.navigateTo({ url: '/package/pages/privacy/index' });
    },
    openUser () {
      // 跳转用户协议
      uni.navigateTo({ url: '/package/pages/userAgreement/index' });
    }
  }
}
</script>

<style lang="scss" scoped>
.bind-container {
  background: #f7f8fa;
  min-height: 100vh;
  padding: 32rpx 0;

  .tab-bar {
    display: flex;
    background: #fff;
    border-radius: 32rpx 32rpx 0 0;
    overflow: hidden;
    margin: 0 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);

    .tab {
      flex: 1;
      text-align: center;
      font-size: 32rpx;
      font-weight: 500;
      color: #888;
      padding: 24rpx 0;
      background: #fff;
      border: none;
      &.active {
        color: #3478f6;
        background: #f7f8fa;
        border-bottom: 4rpx solid #3478f6;
        font-weight: bold;
      }
    }
  }

  .scan-content,
  .account-content {
    background: #fff;
    margin: 0 32rpx 32rpx 32rpx;
    border-radius: 0 0 32rpx 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
    padding: 40rpx 32rpx 32rpx 32rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #222;
    margin-bottom: 16rpx;
    text-align: center;
  }
  .desc {
    font-size: 26rpx;
    color: #888;
    margin-bottom: 32rpx;
    text-align: center;
  }
  .qrcode-box {
    position: relative;
    margin-bottom: 24rpx;
    padding: 10px;
    border: 1px dashed #aaa;
    border-radius: 15px;
    .qrcode {
      width: 320rpx;
      height: 320rpx;
      border-radius: 24rpx;
      border: 2rpx dashed #e5e6eb;
      background: #fff;
      display: block;
    }
    .refresh-btn {
      position: absolute;
      top: -16rpx;
      right: -16rpx;
      width: 48rpx;
      height: 48rpx;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      .refresh-icon {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
  .scan-tip {
    margin-bottom: 24rpx;
    .tip-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #222;
      text-align: center;
      margin-bottom: 8rpx;
    }
    .tip-desc {
      font-size: 24rpx;
      color: #888;
      text-align: center;
    }
  }
  .steps-box {
    width: 100%;
    background: #f5f7ff;
    border-radius: 20rpx;
    padding: 24rpx;
    margin-bottom: 32rpx;
    .steps-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #3478f6;
      margin-bottom: 12rpx;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 28rpx;
        margin-right: 8rpx;
      }
    }
    .steps-list {
      font-size: 26rpx;
      color: #222;
      line-height: 2.2;
      padding-left: 8rpx;
    }
  }
  .confirm-btn {
    width: 100%;
    background: #3478f6;
    color: #fff;
    border-radius: 12rpx;
    font-size: 32rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
  }
  .protocol {
    font-size: 22rpx;
    color: #888;
    text-align: center;
    margin-top: 8rpx;
    .link {
      color: #3478f6;
      text-decoration: underline;
      margin: 0 4rpx;
    }
  }
}
</style>