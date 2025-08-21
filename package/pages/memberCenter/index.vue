<template>
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
      <button
        @click="handleBuy('l3-month')"
        class="plan-card-btn plan-card-btn-vip"
      >立即开通</button>
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
      <button
        @click="handleBuy('l2-month')"
        class="plan-card-btn plan-card-btn-pro"
      >立即开通</button>
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
      <button
        @click="handleBuy('l1-month')"
        class="plan-card-btn plan-card-btn-basic"
      >选择套餐</button>
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
</template>

<script>
import share from "../../../pages/mixins/share";
import request from "../../../request";
export default {
  mixins: [share],
  data () {
    return {
    };
  },
  methods: {
    handleBuy (planId) {
      uni.login({
        success: async (res) => {
          try {
            const data = await request({
              url: `/api/v1/wx-open-id?code=${res.code}`,
              method: 'GET',
            })
            this.pay(data.data.openId, planId)

          } catch (error) {
            console.log(error);
          }
        },
        fail: (err) => {
          console.log(err)
        }
      })
    },
    async pay (openId, planId) {
      const data = await request({
        url: `/api/v1/wx-orders`,
        method: 'POST',
        data: {
          openId: openId,
          planId: planId
        }
      })
      wx.requestPayment({
        timeStamp: data.data.timeStamp,
        nonceStr: data.data.nonceStr,
        package: data.data.package,
        signType: data.data.signType,
        paySign: data.data.paySign,
        success: (res) => {
          console.log(res)
        },
        fail: (err) => {
          console.log(err)
        }
      })
      console.log(data)
    }
  }
};
</script>

<style lang="scss" scoped>
.plan-list {
  flex: 1;
  min-height: 0;
  padding: 0 24rpx 24rpx 24rpx;
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
  .plan-card-vip {
    border: 4rpx solid #ffb300;
  }
  .plan-card-pro {
    border: 4rpx solid #3478f6;
  }
  .plan-card-basic {
    border: 4rpx solid #22c38e;
  }
  .plan-card-free {
    border: 4rpx solid #aaa;
  }
}
</style>