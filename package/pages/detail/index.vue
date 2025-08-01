<template>
  <view class="detail-root">

    <view class="main-content">
      <view class="main-container">
        <!-- 脚本信息 -->
        <view class="script-header">
          <view class="script-title-row">
            <view class="script-title">小仙炖燕窝种草脚本</view>
            <button class="regen-btn">重新生成</button>
          </view>
          <view class="script-meta">2024-12-15 14:30 创建</view>
          <view class="script-tags">
            <view class="tag pink">美妆护肤</view>
            <view class="tag blue">3 个镜头</view>
          </view>
        </view>

        <!-- 脚本要求 -->
        <view class="requirement-list">
          <view class="requirement-card blue">
            <view class="req-title">
              <image
                class="req-icon"
                src="/static/req-script.svg"
                mode="aspectFit"
              ></image>
              脚本要求
            </view>
            <view class="req-desc">美妆护肤短视频，突出产品功效和使用体验，适合各主流平台投放</view>
          </view>
          <view class="requirement-card yellow">
            <view class="req-title">
              <image
                class="req-icon"
                src="/static/req-text.svg"
                mode="aspectFit"
              ></image>
              文案要求
            </view>
            <view class="req-desc">语言要真实自然，强调个人使用感受，包含产品亮点和使用效果对比</view>
          </view>
          <view class="requirement-card green">
            <view class="req-title">
              <image
                class="req-icon"
                src="/static/req-scene.svg"
                mode="aspectFit"
              ></image>
              场景要求
            </view>
            <view class="req-desc">用家居环境，光线明亮自然，有氛围感，突出产品质感</view>
          </view>
        </view>
      </view>

      <!-- 分镜头拍摄脚本 -->
      <view class="section-title-row">
        <view class="section-title">分镜头拍摄脚本</view>
        <view class="section-count">共 3 个镜头</view>
      </view>
      <view class="shot-list">
        <!-- 镜头1 -->
        <view class="shot-card card">
          <view class="shot-header">
            <view class="shot-index">1</view>
            <view class="shot-info">
              <view class="shot-title">开场引入</view>
              <view class="shot-meta">类别：中景 | 时长：3-5秒</view>
            </view>
            <view class="shot-status-box orange">
              <image
                class="shot-status"
                src="/static/clock.svg"
                mode="aspectFit"
              ></image>
            </view>
          </view>
          <view class="shot-content">
            <view class="shot-label">台词文案：</view>
            <view class="shot-text">“都说老婆美丽才是老公最大的面子”</view>
          </view>
          <view class="shot-content-img">
            <view class="shot-label">画面参考：</view>
            <image
              class="shot-img"
              src="data:image/jpeg;base64,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"
              mode="aspectFill"
            ></image>
          </view>
          <view class="shot-actions">
            <button
              class="shot-btn outline"
              @click="showPhotograph = true"
            >
              <image src="/static/show.svg" />查看拍摄手法
            </button>
            <button
              class="shot-btn"
              @click="upload"
            >
              <image src="/static/upload.svg" />上传素材
            </button>
          </view>
          <view class="shot-record">
            <view class="record-label">成片记录：</view>
            <view class="record-empty">暂无上传素材</view>
          </view>
        </view>
        <!-- 镜头2 -->
        <view class="shot-card card">
          <view class="shot-header">
            <view class="shot-index">2</view>
            <view class="shot-info">
              <view class="shot-title">产品展示</view>
              <view class="shot-meta">类别：特写 | 时长：5-8秒</view>
            </view>
            <view class="shot-status-box green">
              <image
                class="shot-status"
                src="/static/check.svg"
                mode="aspectFit"
              ></image>
            </view>
          </view>
          <view class="shot-content">
            <view class="shot-label">台词文案：</view>
            <view class="shot-text">“我老公现在真就每天盯着不动让我喝一瓶燕窝。”</view>
          </view>
          <view class="shot-content-img">
            <view class="shot-label">画面参考：</view>
            <image
              class="shot-img"
              src="data:image/jpeg;base64,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"
              mode="aspectFill"
            ></image>
          </view>
          <view class="shot-actions">
            <button class="shot-btn outline">
              <image src="/static/show.svg" />查看拍摄手法
            </button>
            <button
              class="shot-btn"
              @click="upload"
            >
              <image src="/static/upload.svg" />上传素材
            </button>
          </view>
          <view class="shot-record">
            <view class="record-label">成片记录：</view>
            <view class="record-file">
              <view class="file-box">
                <image
                  class="file-icon"
                  src="/static/video_1.svg"
                  mode="aspectFit"
                ></image>
              </view>
              已上传素材：drinking_scene.mp4 (2.3MB)
            </view>
          </view>
        </view>
        <!-- 镜头3 -->
        <view class="shot-card card">
          <view class="shot-header">
            <view class="shot-index">3</view>
            <view class="shot-info">
              <view class="shot-title">产品推荐</view>
              <view class="shot-meta">类别：单品 | 时长：8-10秒</view>
            </view>
            <view class="shot-status-box green">
              <image
                class="shot-status"
                src="/static/check.svg"
                mode="aspectFit"
              ></image>
            </view>
          </view>
          <view class="shot-content">
            <view class="shot-label">台词文案：</view>
            <view class="shot-text">“小仙炖的鲜炖燕窝我是自己吃了两个月才给你们分享的”</view>
          </view>
          <view class="shot-content-img">
            <view class="shot-label">画面参考：</view>
            <image
              class="shot-img"
              src="data:image/jpeg;base64,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"
              mode="aspectFill"
            ></image>
          </view>
          <view class="shot-actions">
            <button class="shot-btn outline">
              <image src="/static/show.svg" />查看拍摄手法
            </button>
            <button
              class="shot-btn"
              @click="upload"
            >
              <image src="/static/upload.svg" />上传素材
            </button>
          </view>
          <view class="shot-record">
            <view class="record-label">成片记录：</view>
            <view class="record-file">
              <view class="file-box">
                <image
                  class="file-icon"
                  src="/static/video_1.svg"
                  mode="aspectFit"
                ></image>
              </view>
              已上传素材：product_talk.mp4 (4.1MB)
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="footer-bar">
      <button class="footer-btn outline">导出脚本</button>
      <button class="footer-btn">一键成片</button>
    </view>
  </view>

  <!-- 拍摄手法弹窗遮罩 -->
  <view
    v-if="showPhotograph"
    class="popup-mask"
    @click="showPhotograph = false"
  ></view>
  <!-- 拍摄手法 -->
  <view
    v-if="showPhotograph"
    class="vip-popup"
  >
    <view
      class="popup-close"
      @click="showPhotograph = false"
    >
      <image
        src="/static/close.svg"
        mode="aspectFit"
      ></image>
    </view>
    <view class="vip-title">拍摄指导</view>
    <view class="vip-content">
      <view class="vip-content-title">美颜脸部特写 </view>
      <view class="vip-content-angle">机位角度</view>
      <view class="vip-content-subTitle">机位角度: 正面特写，略微上扬 </view>
      <view class="vip-content-angle">光线要求</view>
      <view class="vip-content-subTitle">光线要求:柔和自然光，主光源偏左 </view>
      <view class="vip-content-angle">拍摄技巧 </view>
      <view class="vip-content-subTitle">拍摄技巧： </view>
      <view class="vip-content-subTitle">- 面部特写占画面70% </view>
      <view class="vip-content-subTitle">- 保持45度侧脸角度 </view>
      <view class="vip-content-subTitle">- 突出肌肤质感和光泽 </view>
      <view class="vip-content-angle">注意事项 </view>
      <view class="vip-content-subTitle">注意事项： </view>
      <view class="vip-content-subTitle">- 画面背景虚化处理 </view>
      <view class="vip-content-subTitle">- 肤色要自然通透 </view>
      <view class="vip-content-subTitle">- 表情要自然优雅 </view>
    </view>
  </view>
</template>

<script>

export default {
  data () {
    return {
      showPhotograph: false
    }
  },
  methods: {
    upload () {
      uni.chooseImage({
        success: (chooseImageRes) => {
          console.log(chooseImageRes);

          // const tempFilePaths = chooseImageRes.tempFilePaths;
          // uni.uploadFile({
          //   url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
          //   filePath: tempFilePaths[0],
          //   name: 'file',
          //   formData: {
          //     'user': 'test'
          //   },
          //   success: (uploadFileRes) => {
          //     console.log(uploadFileRes.data);
          //   }
          // });
        }
      });

    }
  }
}
</script>

<style lang="scss" scoped>
.detail-root {
  background: #f7f8fa;
  min-height: 100vh;
  padding-bottom: 120rpx;
  .main-content {
    width: 92vw;
    max-width: 700rpx;
    margin: 0 auto;
    padding-top: 24rpx;
    padding-bottom: 32rpx;
  }
  .main-container {
    background: #fff;
    padding: 10px;
    border-radius: 30rpx;
    margin-bottom: 30rpx;
  }
  .card {
    border-radius: 28rpx;
    background: #fff;
    box-shadow: 0 8rpx 32rpx 0 rgba(0, 0, 0, 0.06);
    margin-bottom: 32rpx;
    padding: 0;
  }
  .script-header {
    padding: 20rpx 10rpx;
    margin-bottom: 28rpx;
    .script-title-row {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;
      .script-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #222;
        flex: 1;
      }
      .regen-btn {
        background: #3478f6;
        color: #eaf2ff;
        font-size: 26rpx;
        border-radius: 12rpx;
        padding: 0 32rpx;
        height: 56rpx;
        line-height: 56rpx;
        border: none;
      }
    }
    .script-meta {
      font-size: 24rpx;
      color: #888;
      margin-bottom: 12rpx;
    }
    .script-tags {
      display: flex;
      .tag {
        font-size: 24rpx;
        padding: 4rpx 18rpx;
        border-radius: 8rpx;
        margin-right: 16rpx;
        &.pink {
          background: #ffe6ef;
          color: #e94f8b;
        }
        &.blue {
          background: #eaf2ff;
          color: #3478f6;
        }
      }
    }
  }
  .requirement-list {
    margin-bottom: 32rpx;
    .requirement-card {
      display: flex;
      flex-direction: column;
      border-radius: 30rpx;
      padding: 28rpx 32rpx 20rpx 32rpx;
      margin-bottom: 30rpx;
      .req-title {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
        .req-icon {
          width: 32rpx;
          height: 32rpx;
          margin-right: 8rpx;
        }
      }
      .req-desc {
        font-size: 24rpx;
        color: #666;
      }
      &.blue {
        background: #eaf2ff;
      }
      &.yellow {
        background: #fffbe6;
      }
      &.green {
        background: #eaffea;
      }
    }
    .requirement-card:last-child {
      margin-bottom: 0;
    }
  }
  .section-title-row {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;
    padding: 0 4rpx;
    .section-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #222;
      flex: 1;
    }
    .section-count {
      font-size: 24rpx;
      color: #888;
      font-weight: normal;
    }
  }
  .shot-list {
    .shot-card {
      border-radius: 24rpx;
      box-shadow: 0 8rpx 32rpx 0 rgba(0, 0, 0, 0.06);
      background: #fff;
      margin-bottom: 32rpx;
      padding: 36rpx 32rpx 24rpx 32rpx;
      .shot-header {
        display: flex;
        align-items: center;
        margin-bottom: 18rpx;
        .shot-index {
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          text-align: center;
          line-height: 48rpx;
          font-size: 28rpx;
          font-weight: bold;
          margin-right: 20rpx;
          background: #3478f6;
          color: #eaf2ff;
        }
        .shot-info {
          flex: 1;
          .shot-title {
            font-size: 28rpx;
            font-weight: bold;
            color: #222;
          }
          .shot-meta {
            font-size: 22rpx;
            color: #888;
            margin-top: 4rpx;
          }
        }
        .shot-status-box {
          width: 50rpx;
          height: 50rpx;
          margin-left: 12rpx;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          &.green {
            background: #dcfce7;
          }
          &.orange {
            background: #ffedd5;
          }
          .shot-status {
            width: 30rpx;
            height: 30rpx;
          }
        }
      }
      .shot-content-img {
        .shot-label {
          font-size: 24rpx;
          color: #333;
          width: 120rpx;
          flex-shrink: 0;
          font-weight: bold;
          margin-bottom: 20rpx;
        }
        .shot-img {
          width: 100%;
          height: 160rpx;
          border-radius: 12rpx;
          object-fit: cover;
        }
      }
      .shot-content {
        margin-bottom: 14rpx;
        background: #f9fafb;
        border-radius: 20rpx;
        padding: 20rpx;
        margin-bottom: 20rpx;
        .shot-label {
          font-size: 24rpx;
          color: #333;
          width: 120rpx;
          flex-shrink: 0;
          font-weight: bold;
          margin-bottom: 15rpx;
        }
        .shot-text {
          font-size: 26rpx;
          color: #666;
          flex: 1;
        }
      }
      .shot-actions {
        display: flex;
        margin: 18rpx 0 10rpx 0;
        .shot-btn {
          flex: 1;
          height: 70rpx;
          line-height: 70rpx;
          font-size: 26rpx;
          border-radius: 12rpx;
          margin-right: 50rpx;
          background: #3478f6;
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20rpx;
          &.outline {
            background: #fff;
            color: #3478f6;
            border: 2rpx solid #3478f6;
          }
          &:last-child {
            margin-right: 0;
          }
          image {
            width: 30rpx;
            height: 30rpx;
          }
        }
      }
      .shot-record {
        margin-top: 35rpx;
        padding-top: 35rpx;
        border-top: 1px solid #eee;
        .record-label {
          font-size: 24rpx;
          color: #333;
          font-weight: bold;
          margin-bottom: 10rpx;
        }
        .record-empty {
          font-size: 24rpx;
          color: #bbb;
          margin-top: 4rpx;
        }
        .record-file {
          display: flex;
          align-items: center;
          font-size: 24rpx;
          color: #bbb;
          margin-top: 4rpx;
          .file-box {
            width: 40rpx;
            height: 40rpx;
            background: #dcfce7;
            margin-right: 8rpx;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .file-icon {
            width: 25rpx;
            height: 25rpx;
          }
        }
      }
    }
    .shot-card:last-child {
      margin-bottom: 0;
    }
  }
  .footer-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 24rpx 36rpx 32rpx 36rpx;
    box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.03);
    z-index: 10;
    .footer-btn {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 32rpx;
      border-radius: 16rpx;
      font-weight: bold;
      margin-right: 50rpx;
      background: #3478f6;
      color: #fff;
      border: none;
      &.outline {
        background: #fff;
        color: #3478f6;
        border: 2rpx solid #3478f6;
      }
      &:last-child {
        margin-right: 0;
      }
    }
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
  padding: 0 32rpx 32rpx 32rpx;
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
    margin: 32rpx 0 24rpx 0;
  }
  .vip-content {
    background: #f9fafb;
    padding: 30rpx;
    border-radius: 20rpx;
    .vip-content-title {
      font-weight: bold;
      font-size: 14px;
      color: #333;
    }
    .vip-content-angle {
      color: #999;
      font-size: 12px;
      margin-top: 20rpx;
    }
    .vip-content-subTitle {
      color: #666;
      font-size: 13px;
      margin-top: 10rpx;
      font-weight: bold;
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