<template>
  <view class="container">
    <!-- 绑定抖音账号区域 -->
    <view class="bind-douyin">
      <view class="bind-info">
        <image
          class="douyin-icon"
          src="/static/dy.svg"
          mode="aspectFit"
        ></image>
        <view>
          <view class="bind-title">绑定抖音账号</view>
          <view class="bind-desc">获得更精准的脚本生成</view>
        </view>
      </view>
      <button
        class="bind-btn"
        @click="goTo"
      >立即绑定</button>
    </view>

    <!-- 商品链接输入区域 -->
    <view class="card">
      <view class="label">商品链接</view>
      <view class="input-row">
        <input
          class="input"
          placeholder="粘贴商品链接，一键生成爆款脚本"
          v-model="productLink"
        />
        <image
          class="link-icon"
          src="/static/link.svg"
          mode="aspectFit"
        ></image>
      </view>
      <button
        class="gen-btn"
        @click="generateScript"
      >生成爆款脚本</button>
    </view>
  </view>
  <!-- AI分析生成脚本弹框 -->
  <view
    v-if="showDialog"
    class="ai-dialog-mask"
  >
    <view class="ai-dialog">
      <view class="ai-title">AI 正在分析并生成脚本...</view>
      <view class="ai-steps">
        <view
          v-for="(step, idx) in steps"
          :key="idx"
          class="ai-step"
        >
          <text
            v-if="idx < currentStep"
            class="ai-step-icon done"
          >✔</text>
          <text
            v-else-if="idx === currentStep"
            class="ai-step-icon doing"
          >⟳</text>
          <text
            v-else
            class="ai-step-icon"
          >○</text>
          <text class="ai-step-text">{{ step }}</text>
        </view>
      </view>
      <view class="ai-tip">请稍候，正在为您生成专业的短视频脚本...</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      productLink: '',
      showDialog: false,
      steps: [
        '正在分析商品链接...',
        '成功获取商品信息',
        '正在分析商品类别和特性...',
        '识别为高端滋补品类，目标受众为25-45岁女性',
        '正在分析商品卖点和价值主张...',
        '提取核心卖点：天然燕窝、独特工艺、营养价值',
        '正在匹配最佳脚本模板...',
        '选择「真人出镜+种草口播」模板',
        '正在优化脚本内容...',
        '完成14个分镜头的文案撰写'
      ],
      currentStep: 0,
      stepTimer: null
    }
  },
  methods: {
    goTo () {
      uni.navigateTo({
        url: '/package/pages/bindAccount/index'
      })
    },
    generateScript () {
      if (!this.productLink) {
        uni.showToast({ title: '请粘贴商品链接', icon: 'none' });
        return;
      }
      // 显示弹框并重置进度
      this.showDialog = true;
      this.currentStep = 0;
      this.nextStep();
    },
    nextStep () {
      if (this.currentStep < this.steps.length) {
        this.stepTimer = setTimeout(() => {
          this.currentStep++;
          this.nextStep();
        }, 700); // 每步0.7秒
      } else {
        // 全部完成后1.2秒关闭弹框
        setTimeout(() => {
          this.showDialog = false;
        }, 1200);
      }
    }
  },
  onShow () {
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: 0
      });
    }
  },
  beforeDestroy () {
    if (this.stepTimer) clearTimeout(this.stepTimer);
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 32rpx;
  background: #f7f8fa;
  min-height: 100vh;

  .bind-douyin {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f5f7ff;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 40rpx;

    .bind-info {
      display: flex;
      align-items: center;

      .douyin-icon {
        width: 56rpx;
        height: 56rpx;
        margin-right: 20rpx;
      }
      .bind-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #222;
      }
      .bind-desc {
        font-size: 24rpx;
        color: #888;
      }
    }
    .bind-btn {
      background: #3478f6;
      color: #fff;
      border-radius: 12rpx;
      font-size: 28rpx;
      padding: 0 36rpx;
      height: 64rpx;
      line-height: 64rpx;
      margin: 0;
    }
  }

  .card {
    background: #fff;
    border-radius: 20rpx;
    padding: 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);

    .label {
      font-size: 28rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
    .input-row {
      display: flex;
      align-items: center;
      background: #f5f6fa;
      border-radius: 12rpx;
      padding: 0 20rpx;
      margin-bottom: 32rpx;

      .input {
        flex: 1;
        height: 80rpx;
        border: none;
        background: transparent;
        font-size: 28rpx;
      }
      .link-icon {
        width: 36rpx;
        height: 36rpx;
        margin-left: 10rpx;
        opacity: 0.5;
      }
    }
    .gen-btn {
      width: 100%;
      background: #3478f6;
      color: #fff;
      border-radius: 12rpx;
      font-size: 32rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-weight: bold;
    }
  }
}
.ai-dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ai-dialog {
  width: 600rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 48rpx 36rpx 36rpx 36rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
}
.ai-title {
  font-size: 34rpx;
  font-weight: bold;
  margin-bottom: 32rpx;
  text-align: center;
}
.ai-steps {
  margin-bottom: 24rpx;
}
.ai-step {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}
.ai-step-icon {
  width: 36rpx;
  display: inline-block;
  text-align: center;
  font-size: 28rpx;
  margin-right: 16rpx;
  color: #bbb;
}
.ai-step-icon.done {
  color: #4caf50;
}
.ai-step-icon.doing {
  color: #3478f6;
  animation: ai-spin 1s linear infinite;
}
@keyframes ai-spin {
  100% {
    transform: rotate(360deg);
  }
}
.ai-step-text {
  font-size: 26rpx;
  color: #333;
}
.ai-tip {
  font-size: 24rpx;
  color: #888;
  text-align: center;
  margin-top: 18rpx;
}
</style>
