<template>
  <view class="detail-root">
    <Login
      v-if="isLogin"
      @hide="isLogin = false"
      @ok="isLogin = false; init()"
    />
    <!-- 骨架屏 -->
    <view
      v-if="loading"
      class="skeleton-container"
    >
      <!-- 脚本信息骨架屏 -->
      <view class="skeleton-main-container">
        <view class="skeleton-script-header">
          <view class="skeleton-title-row">
            <view class="skeleton-title"></view>
            <view class="skeleton-regen-btn"></view>
          </view>
          <view class="skeleton-meta"></view>
          <view class="skeleton-tags">
            <view class="skeleton-tag"></view>
            <view class="skeleton-tag"></view>
          </view>
        </view>

        <!-- 脚本要求骨架屏 -->
        <view class="skeleton-requirement-list">
          <view class="skeleton-requirement-card">
            <view class="skeleton-req-title"></view>
            <view class="skeleton-req-desc"></view>
          </view>
          <view class="skeleton-requirement-card">
            <view class="skeleton-req-title"></view>
            <view class="skeleton-req-desc"></view>
          </view>
          <view class="skeleton-requirement-card">
            <view class="skeleton-req-title"></view>
            <view class="skeleton-req-desc"></view>
          </view>
        </view>
      </view>

      <!-- 分镜头脚本骨架屏 -->
      <view class="skeleton-section-title-row">
        <view class="skeleton-section-title"></view>
        <view class="skeleton-section-count"></view>
      </view>

      <view class="skeleton-shot-list">
        <view
          class="skeleton-shot-card"
          v-for="i in 3"
          :key="i"
        >
          <view class="skeleton-shot-header">
            <view class="skeleton-shot-index"></view>
            <view class="skeleton-shot-info">
              <view class="skeleton-shot-title"></view>
              <view class="skeleton-shot-meta"></view>
            </view>
            <view class="skeleton-shot-status"></view>
          </view>
          <view class="skeleton-shot-content">
            <view class="skeleton-shot-label"></view>
            <view class="skeleton-shot-text"></view>
          </view>
          <view class="skeleton-shot-content">
            <view class="skeleton-shot-label"></view>
            <view class="skeleton-shot-text"></view>
          </view>
          <view class="skeleton-shot-content">
            <view class="skeleton-shot-label"></view>
            <view class="skeleton-shot-text"></view>
          </view>
          <view class="skeleton-shot-actions">
            <view class="skeleton-shot-btn"></view>
            <view class="skeleton-shot-btn"></view>
          </view>
          <view class="skeleton-shot-record">
            <view class="skeleton-record-label"></view>
            <view class="skeleton-record-empty"></view>
          </view>
        </view>
      </view>
    </view>

    <view
      v-else-if="data.status !== 'completed'"
      class="work-loading"
    >
      <view class="steps-list">
        <view
          v-for="(step, index) in getSetps()"
          :key="index"
          class="step-item"
          :class="{ 'completed': step.status === 'done', 'current': step.status !== 'done' }"
        >
          <view class="step-icon">
            <image
              v-if="step.status === 'done'"
              class="check-icon"
              src="/static/check-white.svg"
              mode="aspectFit"
            ></image>
            <view
              v-else
              class="loading-dots"
            >
              <view class="dot dot1"></view>
              <view class="dot dot2"></view>
              <view class="dot dot3"></view>
            </view>
          </view>
          <text class="step-text">{{ step.step }}</text>
        </view>
      </view>
    </view>
    <!-- 实际内容 -->
    <view
      v-else
      class="main-content"
    >
      <view class="main-container">
        <!-- 脚本信息 -->
        <view class="script-header">
          <view class="script-title-row">
            <view class="script-title">{{ data.commodity.title }}</view>
            <button
              class="regen-btn"
              @click="regen"
            >重新生成</button>
          </view>
          <view class="script-meta">{{ formatTimestamp(data.createdAt) }} 创建</view>
          <view class="script-tags">
            <view class="tag pink">{{data?.commodity?.category}}</view>
            <view class="tag blue">{{ data.script.segments.length }} 个镜头</view>
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
            <view class="req-desc">{{ data.script.style }}</view>
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
            <view class="req-desc">{{ data.script.contentStyle }}</view>
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
            <view class="req-desc">{{ data.script.sceneStyle }}</view>
          </view>
        </view>
      </view>

      <!-- 分镜头拍摄脚本 -->
      <view class="section-title-row">
        <view class="section-title">分镜头拍摄脚本</view>
        <view class="section-count">共 {{ data.script.segments.length }} 个镜头</view>
      </view>
      <view class="shot-list">
        <!-- 镜头列表 -->
        <view
          class="shot-card card"
          v-for="(item, key) in data.script.segments"
          :key="key"
        >
          <!-- 折叠状态 -->
          <view
            v-if="!item.isExpanded"
            class="shot-collapsed"
            @click="toggleExpand(item, key)"
          >
            <view class="shot-header-collapsed">
              <view class="shot-index">{{ key + 1 }}</view>
              <view class="shot-info-collapsed-row">
                <view class="shot-info-collapsed">
                  <view class="shot-title">{{ item.stage?.name }}</view>
                  <view class="shot-desc">{{ item?.content?.subtitle }}</view>
                </view>
                <view class="shot-thumbnail">
                  <image
                    class="shot-img"
                    :src="item.reference.coverUrl"
                    mode="aspectFill"
                  ></image>
                  <image
                    @click.stop="play(item)"
                    class="play-btn"
                    src="/static/play.svg"
                  />
                </view>
              </view>
              <!-- <view class="expand-icon">
                <image
                  src="/static/arrow.svg"
                  mode="aspectFit"
                  class="arrow-down"
                ></image>
              </view> -->
            </view>
            <view
              class="shot-actions-collapsed"
              @click.stop="open(item)"
            >
              <image src="/static/show.svg" />
              查看拍摄手法
            </view>
          </view>

          <!-- 展开状态（保持原有内容） -->
          <view v-else>
            <view
              class="shot-header"
              @click="toggleExpand(item, key)"
            >
              <view class="shot-index">{{ key + 1 }}</view>
              <view class="shot-info">
                <view class="shot-title">{{ item.stage.name }}</view>
                <!-- <view class="shot-meta">时长：{{item.reference.timeStart}}-{{item.reference.timeEnd}}秒</view> -->
              </view>
              <view class="shot-status-box orange">
                <image
                  class="shot-status"
                  src="/static/clock.svg"
                  mode="aspectFit"
                ></image>
              </view>
              <!-- <view class="expand-icon">
                <image
                  src="/static/arrow.svg"
                  mode="aspectFit"
                  class="arrow-up"
                ></image>
              </view> -->
            </view>
            <view class="shot-content">
              <view class="shot-label">口播文案：</view>
              <view class="shot-text">{{ item?.content?.subtitle }}</view>
            </view>
            <!--            <view class="shot-content">-->
            <!--              <view class="shot-label">视频内文案：</view>-->
            <!--              <view class="shot-text">{{ item?.content?.textInVideo }}</view>-->
            <!--            </view>-->
            <view class="shot-content">
              <view class="shot-label">画面解读：</view>
              <view class="shot-text">{{ item?.desc }}</view>
            </view>
            <view class="shot-content-img">
              <view class="shot-label">画面参考：</view>
              <view style="position: relative;">
                <image
                  class="shot-img"
                  :src="item.reference.coverUrl"
                  mode="aspectFill"
                ></image>
                <image
                  @click.stop="play(item)"
                  class="play"
                  src="/static/play.svg"
                />
              </view>
            </view>
            <view class="shot-actions">
              <button
                class="shot-btn outline"
                @click="open(item)"
              >
                <image src="/static/show.svg" />
                查看拍摄手法
              </button>
              <button
                class="shot-btn"
                @click="upload(item, key)"
              >
                <image src="/static/upload.svg" />
                上传素材
              </button>
            </view>
            <view class="shot-record">
              <view class="record-label">成片记录：</view>
              <view
                class="record-empty"
                v-if="!item.uploadUrl"
              >暂无上传素材</view>
              <view
                class="record-empty1"
                v-else
              >
                <image
                  src="/static/video_1.svg"
                  mode="aspectFill"
                />
                {{ item.uploadUrl }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部操作栏 -->
      <view class="footer-bar">
        <view class="footer-bar-text">已上传素材({{ uploadUrlLength }}/{{ data.script.segments.length }})</view>
        <view class="footer-btn-box">
          <button class="footer-btn outline">导出脚本</button>
          <button class="footer-btn">一键成片</button>
        </view>
      </view>
    </view>

    <!-- 视频播放弹窗 -->
    <view
      v-if="showVideoPlayer"
      class="video-popup-mask"
      @click="closeVideoPlayer"
    ></view>

    <view
      v-if="showVideoPlayer"
      class="video-popup"
    >
      <view
        class="video-popup-close"
        @click="closeVideoPlayer"
      >
        <image
          src="/static/close.svg"
          mode="aspectFit"
        ></image>
      </view>
      <view class="video-container">
        <video
          id="videoPlayer"
          :src="currentVideo.url"
          :controls="true"
          :autoplay="true"
          :initial-time="currentVideo.timeStart"
          :loop="false"
          class="video-player"
          @timeupdate="onTimeUpdate"
          @ended="onVideoEnded"
          @error="onVideoError"
          @loadedmetadata="onVideoLoaded"
        ></video>
      </view>
      <view class="video-info">
        <text>播放时间: {{ currentTime }}s / {{ currentVideo.timeEnd }}s</text>
      </view>
    </view>

    <!-- 拍摄手法弹窗 -->
    <view
      v-if="showPhotograph"
      class="popup-mask"
      @click="showPhotograph = false"
    ></view>
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
        <view
          v-for="(item, index) in shootingStyle"
          :key="index"
        >
          <view class="vip-content-subTitle">{{ item }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import request from "../../../request";
import config from "../../../config";
import share from "../../../pages/mixins/share";
import Login from "../../../components/login/index.vue";
export default {
  mixins: [share],
  components: {
    Login
  },
  data () {
    return {
      isLogin: false,
      loading: true, // 添加loading状态
      showPhotograph: false,
      showVideoPlayer: false,
      currentVideo: {
        url: '',
        timeStart: 0,
        timeEnd: 0
      },
      currentTime: 0,
      videoContext: null,
      isVideoLoaded: false,
      hasReachedEnd: false,
      data: {
        script: { segments: [] },
        commodity: {}
      },
      shootingStyle: [],
      formatTimestamp: config.formatTimestamp,
      unloaded: false
    }
  },
  onLoad (options) {
    this.unloaded = false
    this.id = options.id
    this.init()
  },
  onHide () {
    this.unloaded = true
  },
  onUnload () {
    this.unloaded = true
  },
  computed: {
    uploadUrlLength () {
      return this.data.script.segments.filter(e => e.uploadUrl).length
    }
  },
  methods: {
    init () {
      this.getDetail(this.id)
    },
    async uploadImg (url, index) {
      const data = await request({
        url: `/api/pro/v1/tasks/${this.id}`,
        method: 'PATCH',
        data: { "action": "updateProduction", params: { production: url, index: index.toString() } }
      })
      if (data.code === "UNAUTHORIZED") {
        this.isLogin = true
        return
      }
    },
    async regen () {
      const data = await request({
        url: `/api/pro/v1/tasks/${this.data._id}`,
        method: 'PATCH',
        data: { "action": "refresh" }
      })
      if (data.code === "UNAUTHORIZED") {
        this.isLogin = true
        return
      }
      this.getDetail(this.data._id)
    },
    async getDetail (id, isRefresh = false) {
      try {
        if (!isRefresh) {
          this.loading = true
        }
        const data = await request({
          url: `/api/pro/v1/tasks/${id}`,
          method: 'GET',
        })
        if (data.code === "UNAUTHORIZED") {
          this.isLogin = true
          return
        }
        this.data = data.data
        if (this.data.status !== 'completed') {
          this.loading = false
          setTimeout(() => {
            if (this.unloaded) return
            this.getDetail(id, true)
          }, 10000);
          return
        }
        // 初始化所有镜头为折叠状态
        this.data.script.segments.forEach(segment => {
          this.$set(segment, 'isExpanded', false)
        })
      } catch (error) {
        console.error('获取详情失败:', error);
      } finally {
        this.loading = false; // 结束加载
      }
    },
    // 切换展开/折叠状态
    toggleExpand (item, index) {
      this.$set(item, 'isExpanded', !item.isExpanded)
    },

    play (item) {
      this.hasReachedEnd = false
      this.isVideoLoaded = false

      const timeStart = parseFloat(item.reference?.timeStart) || 0
      const timeEnd = parseFloat(item.reference?.timeEnd) || 0

      this.currentVideo = {
        url: item.reference?.url,
        timeStart: timeStart,
        timeEnd: timeEnd + 2
      }

      this.currentTime = timeStart
      this.showVideoPlayer = true

      this.$nextTick(() => {
        this.videoContext = uni.createVideoContext('videoPlayer', this)
      })
    },

    closeVideoPlayer () {
      if (this.videoContext) {
        this.videoContext.pause()
      }
      this.showVideoPlayer = false
      this.currentVideo = {
        url: '',
        timeStart: 0,
        timeEnd: 0
      }
      this.currentTime = 0
      this.isVideoLoaded = false
      this.hasReachedEnd = false
      this.videoContext = null
    },

    onVideoLoaded (e) {
      this.isVideoLoaded = true
    },

    onTimeUpdate (e) {
      if (!this.isVideoLoaded || this.hasReachedEnd) return

      const newTime = e.detail.currentTime
      this.currentTime = newTime

      if (newTime >= this.currentVideo.timeEnd) {
        this.hasReachedEnd = true
        setTimeout(() => {
          if (this.videoContext) {
            this.videoContext.pause()
          }
        }, 100)

        uni.showToast({
          title: '播放完成',
          icon: 'success',
          duration: 1500
        })
      }
    },

    onVideoEnded () {
      this.hasReachedEnd = true
    },

    onVideoError (e) {
      uni.showToast({
        title: '视频播放失败',
        icon: 'none'
      })
    },

    open (item) {
      this.shootingStyle = item.shootingStyle.split('\n')
      this.showPhotograph = true
    },

    getFileName (name) {
      const n = name.split('/')
      return n[n.length - 1]
    },

    async upload (item, index) {
      const that = this
      uni.chooseMedia({
        mediaType: ["video"],
        count: 1,
        sourceType: ['album'],
        success: (chooseMediaRes) => {
          const { tempFilePath, fileType } = chooseMediaRes.tempFiles[0]
          const name = that.getFileName(tempFilePath)

          uni.request({
            url: `${config.qiniuHost}?bucket=${config.qiniuBucket}`,
            method: 'GET',
            success: async (res) => {
              uni.uploadFile({
                url: 'https://upload.qiniup.com', //仅为示例，非真实的接口地址
                filePath: tempFilePath,
                name: 'file',
                formData: {
                  uri: tempFilePath,
                  type: fileType,
                  name,
                  key: name,
                  token: res.data.data.token
                },
                success: () => {
                  const url = `${config.qiniuDownload}/${name}`
                  item.uploadUrl = url
                  that.uploadImg(url, index)
                }
              });
            },
            fail: res => {
              console.log(res);
            }
          })
        }
      });
    },
    getSetps () {
      return Object.entries(this.data.steps).map(([key, value]) => {
        return {
          step: value.title,
          status: value.status
        }
      }).filter(item => item.status !== 'waiting')
    },
  }
}
</script>

<style lang="scss" scoped>
/* 骨架屏样式 */
.skeleton-container {
  width: 92vw;
  max-width: 700rpx;
  margin: 0 auto;
  padding-top: 24rpx;
  padding-bottom: 32rpx;
}

.skeleton-main-container {
  background: #fff;
  padding: 10px;
  border-radius: 30rpx;
  margin-bottom: 30rpx;
}

.skeleton-script-header {
  padding: 20rpx 10rpx;
  margin-bottom: 28rpx;

  .skeleton-title-row {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;

    .skeleton-title {
      height: 36rpx;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 8rpx;
      flex: 1;
      margin-right: 20rpx;
    }

    .skeleton-regen-btn {
      width: 120rpx;
      height: 56rpx;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 12rpx;
    }
  }

  .skeleton-meta {
    height: 24rpx;
    width: 200rpx;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 6rpx;
    margin-bottom: 12rpx;
  }

  .skeleton-tags {
    display: flex;
    gap: 16rpx;

    .skeleton-tag {
      width: 80rpx;
      height: 32rpx;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 8rpx;
    }
  }
}

.skeleton-requirement-list {
  margin-bottom: 32rpx;

  .skeleton-requirement-card {
    display: flex;
    flex-direction: column;
    border-radius: 30rpx;
    padding: 28rpx 32rpx 20rpx 32rpx;
    margin-bottom: 30rpx;
    background: #f8f9fa;

    .skeleton-req-title {
      height: 26rpx;
      width: 120rpx;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 6rpx;
      margin-bottom: 8rpx;
    }

    .skeleton-req-desc {
      height: 24rpx;
      width: 80%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 6rpx;
    }
  }
}

.skeleton-section-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
  padding: 0 4rpx;

  .skeleton-section-title {
    height: 28rpx;
    width: 200rpx;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 6rpx;
    flex: 1;
    margin-right: 20rpx;
  }

  .skeleton-section-count {
    height: 24rpx;
    width: 100rpx;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 6rpx;
  }
}

.skeleton-shot-list {
  .skeleton-shot-card {
    border-radius: 24rpx;
    box-shadow: 0 8rpx 32rpx 0 rgba(0, 0, 0, 0.06);
    background: #fff;
    margin-bottom: 32rpx;
    padding: 36rpx 32rpx 24rpx 32rpx;

    .skeleton-shot-header {
      display: flex;
      align-items: center;
      margin-bottom: 18rpx;

      .skeleton-shot-index {
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        margin-right: 20rpx;
      }

      .skeleton-shot-info {
        flex: 1;

        .skeleton-shot-title {
          height: 28rpx;
          width: 60%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
          border-radius: 6rpx;
          margin-bottom: 8rpx;
        }

        .skeleton-shot-meta {
          height: 22rpx;
          width: 40%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
          border-radius: 6rpx;
        }
      }

      .skeleton-shot-status {
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        margin-left: 12rpx;
      }
    }

    .skeleton-shot-content {
      margin-bottom: 14rpx;
      background: #f9fafb;
      border-radius: 20rpx;
      padding: 20rpx;
      margin-bottom: 20rpx;

      .skeleton-shot-label {
        height: 24rpx;
        width: 150rpx;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 6rpx;
        margin-bottom: 15rpx;
      }

      .skeleton-shot-text {
        height: 26rpx;
        width: 90%;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 6rpx;
      }
    }

    .skeleton-shot-actions {
      display: flex;
      margin: 18rpx 0 10rpx 0;
      gap: 50rpx;

      .skeleton-shot-btn {
        flex: 1;
        height: 70rpx;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 12rpx;
      }
    }

    .skeleton-shot-record {
      margin-top: 35rpx;
      padding-top: 35rpx;
      border-top: 1px solid #eee;

      .skeleton-record-label {
        height: 24rpx;
        width: 120rpx;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 6rpx;
        margin-bottom: 10rpx;
      }

      .skeleton-record-empty {
        height: 24rpx;
        width: 150rpx;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 6rpx;
        margin-top: 4rpx;
      }
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

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
      gap: 10rpx;

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

        .play {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100rpx;
          height: 100rpx;
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
          width: 150rpx;
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
        .record-empty1 {
          font-size: 24rpx;
          color: #333;
          margin-top: 4rpx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          image {
            width: 30rpx;
            height: 30rpx;
            vertical-align: middle;
          }
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
    flex-direction: column;
    justify-content: space-between;
    padding: 24rpx 36rpx 32rpx 36rpx;
    box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.03);
    z-index: 10;
    .footer-bar-text {
      font-size: 28rpx;
      color: #999;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
    .footer-btn-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
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
    max-height: 70vh;
    overflow: auto;

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

/* 视频播放弹窗样式 */
.video-popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

.video-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 600rpx;
  background: #000;
  border-radius: 20rpx;
  z-index: 1000;
  overflow: hidden;
}

.video-popup-close {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 60rpx;
  height: 60rpx;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;

  image {
    width: 30rpx;
    height: 30rpx;
  }
}

.video-container {
  width: 100%;
  height: 350rpx;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  position: relative;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}

.video-info {
  padding: 20rpx;
  background: rgba(255, 255, 255, 0.1);
  text-align: center;

  text {
    color: #fff;
    font-size: 24rpx;
  }
}

/* 折叠状态样式 */
.shot-collapsed {
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(52, 120, 246, 0.05);
  }
}

.shot-header-collapsed {
  display: flex;
  align-items: flex-start;
  padding: 20rpx 10rpx;
  position: relative;

  .shot-index {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    text-align: center;
    line-height: 48rpx;
    font-size: 28rpx;
    font-weight: bold;
    background: #3478f6;
    color: #eaf2ff;
  }

  .shot-info-collapsed-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }
}

.shot-info-collapsed {
  flex: 1;
  margin-left: 20rpx;
  margin-right: 20rpx;

  .shot-title {
    font-size: 30rpx;
    font-weight: 500;
    color: #222;
    margin-bottom: 8rpx;
    line-height: 1.4;
  }

  .shot-desc {
    font-size: 26rpx;
    color: #666;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    //text-overflow: ellipsis;
  }
}

.shot-thumbnail {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 20rpx;

  .shot-img {
    width: 100%;
    height: 100%;
  }

  .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40rpx;
    height: 40rpx;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    padding: 8rpx;
  }
}

.shot-actions-collapsed {
  padding: 0 10rpx 20rpx;
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #3478f6;
  padding-left: 100rpx;
  gap: 10rpx;

  image {
    width: 30rpx;
    height: 30rpx;
  }

  .shot-btn {
    background: #3478f6;
    color: #fff;
    font-size: 26rpx;
    border-radius: 12rpx;
    padding: 16rpx 32rpx;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    image {
      width: 24rpx;
      height: 24rpx;
      margin-right: 8rpx;
    }
  }
}

.expand-icon {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    width: 24rpx;
    height: 24rpx;
    transition: transform 0.3s ease;
  }

  .arrow-down {
    transform: rotate(0deg);
  }

  .arrow-up {
    transform: rotate(180deg);
  }
}

/* 修改展开状态的header样式 */
.shot-header {
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(52, 120, 246, 0.05);
  }
}

/* 展开内容的动画 */
.shot-content,
.shot-content-img,
.shot-actions,
.shot-record {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 卡片悬停效果 */
.shot-card {
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12rpx 40rpx 0 rgba(0, 0, 0, 0.1);
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
</style>
