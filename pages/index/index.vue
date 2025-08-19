<template>
  <view class="container">
    <Login
      v-if="isLogin"
      @hide="isLogin = false"
      @ok="isLogin = false; init()"
    />
    <view
      class="header"
      v-if="freeInfo.planId === 'free'"
    >
      <view class="header-left">
        <image
          class="vip-icon"
          src="/static/vip.svg"
          mode="aspectFit"
        />
        <view>免费版 (剩余 {{ freeInfo.remaining || 0 }} 次生成)</view>
      </view>
      <view
        class="header-right"
        @click="goToMember"
      >升级会员</view>
    </view>
    <!-- 绑定抖音账号区域 -->
    <view class="bind-douyin">
      <!-- 骨架屏状态 -->
      <template v-if="isUserLoading">
        <view class="bind-info">
          <view class="skeleton-avatar"></view>
          <view style="flex: 1">
            <view class="skeleton-title"></view>
            <view class="skeleton-desc"></view>
          </view>
        </view>
        <view class="skeleton-btn"></view>
      </template>

      <!-- 实际内容 -->
      <template v-else>
        <view class="bind-info">
          <image
            class="douyin-icon"
            :src="dyUser.avatar || '/static/dy.svg'"
            mode="aspectFit"
          ></image>
          <view style="flex: 1">
            <view class="bind-title">{{ dyUser.name || '绑定抖音账号' }}</view>
            <view class="bind-desc">{{ dyUser.sign || '获得更精准的脚本生成' }}</view>
          </view>
        </view>
        <button
          v-if="!dyUser.name"
          class="bind-btn"
          @click="goTo"
        >立即绑定</button>
        <button
          v-else
          @click="delBind"
          class="bind-btn"
        >删除绑定</button>
      </template>
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

    <!-- 分镜头脚本区域 -->
    <view class="script-card">
      <view class="script-header">
        <text class="script-title">分镜头脚本</text>
        <button
          class="regenerate-btn"
          @click="regenerateScript"
        >重新生成</button>
      </view>

      <!-- 脚本要求 -->
      <view class="requirements-section">
        <view class="requirement-item">
          <text class="requirement-label">脚本要求：</text>
          <text class="requirement-content">真人出镜+种草口播形式</text>
        </view>
        <view class="requirement-item">
          <text class="requirement-label">文案要求：</text>
          <text class="requirement-content">口播觉得文案读不顺的可以适当修改</text>
        </view>
        <view class="requirement-item">
          <text class="requirement-label">场景要求：</text>
          <text class="requirement-content">{{ currentScriptIndex === 0 ? '建议餐厅或家庭厨房' : '建议餐厅或客厅或冰箱前' }}</text>
        </view>
      </view>

      <!-- 分镜头列表 -->
      <view class="scenes-list">
        <view
          class="scene-item"
          v-for="(scene, index) in currentScenes"
          :key="index"
        >
          <view class="scene-number">{{ index + 1 }}</view>
          <view class="scene-content">
            <view class="scene-main-text">{{ scene.mainText }}</view>
            <view class="scene-sub-text">{{ scene.subText }}</view>
            <view
              class="scene-action"
              v-if="scene.action"
            >{{ scene.action }}</view>
          </view>
          <view class="scene-thumbnail">
            <image
              :src="scene.thumbnail"
              mode="aspectFill"
              class="thumbnail-img"
            ></image>
          </view>
        </view>
      </view>
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
import request from "../../request";
import share from "../mixins/share";
import Login from "@/components/login/index.vue";
export default {
  mixins: [share],
  components: {
    Login
  },
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
      stepTimer: null,
      dyUser: {},
      isUserLoading: true,
      scenes: [
        {
          mainText: '都说老婆美丽才是老公最大的面子',
          subText: '窝瓶子里捞丝展示/美颜脸部展示',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/19e92c126f3cc0fc0527e36209b58fab.png'
        },
        {
          mainText: '我老公现在真就每天雷打不动让我喝一瓶燕窝',
          subText: '喝燕窝 (这部分不用口播,直接配音就行）',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/5d2f4be6e8ef4dcad2eb19d278b364a8.png',
        },
        {
          mainText: '小仙炖的鲜炖燕窝我是自己吃了两个月才给你们分享的',
          subText: '拿着一瓶燕窝口播',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/a58dfdb84a55f698d784d33289edceb8.png'
        },
        {
          mainText: '对比两个月前的变化真的是肉眼可见',
          subText: '展示平时打扮的美美的和出去旅游美美的照片或视频',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/7d645f6f2989d41a673c99ed1eb24709.png'
        },
        {
          mainText: '它这每一瓶都是独立小罐装',
          subText: '真人出镜-打开盖子展示',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/721993afc3987bdff2b646d2e0466772.png'
        },
        {
          mainText: '掀开盖子燕窝丝根根分明的',
          subText: '真人出镜-燕窝捞丝展示',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/3bd13d46feaf5800391f6c9bb1ec33da.png'
        },
        {
          mainText: '用的全是马来和印尼那边可溯源的燕窝',
          subText: '扫描溯源码，展示产地',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/a1a6151d3b9bc14bb574927d24f99d54.png'
        },
        {
          mainText: '而且配料很干净啊只有燕窝、冰糖和水',
          subText: '展示配料表',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/7f22b93b09b5adf86664cc083291716c.png'
        },
        {
          mainText: '而且特有的鲜炖工艺直接把三倍活性蛋白都锁在瓶里',
          subText: '倒出燕窝展示',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/3bd13d46feaf5800391f6c9bb1ec33da.png'
        },
        {
          mainText: '这可比你说一百遍"多喝热水"实在多了',
          subText: '再次捞丝展示，注意画面要展示出燕丝粗长',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/f4032a44b3489b14d1e5765fed263aa2.png'
        },
        {
          mainText: '关键现在买两箱还能送你这个同款面膜',
          subText: '真人出镜-拿着面膜口播',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/c6b5c9ecd74a86d00bb9d5df583d1fea.png'
        },
        {
          mainText: '所以说有些钱不能省,但也不用多花',
          subText: '箱子里拿出一瓶口播',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/d385297222746724e7bf729892777492.png'
        },
        {
          mainText: '以后每天她掀开瓶盖的那瞬间',
          subText: '边开盖子边口播，最后一句表情可以丰富一点',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/721993afc3987bdff2b646d2e0466772.png'
        }
      ],
      // 第二个文案集合 - 礼盒方向
      giftScenes: [
        {
          mainText: '妈妈无论多少岁也都是女孩子',
          subText: '拿着一瓶燕窝边打开边口播',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/721993afc3987bdff2b646d2e0466772.png'
        },
        {
          mainText: '操劳半生的她比谁都值得被宠成公主',
          subText: '妈妈出镜吃燕窝',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/5d2f4be6e8ef4dcad2eb19d278b364a8.png'
        },
        {
          mainText: '女神节快到了可别忘记给妈妈也准备一份礼物',
          subText: '一边说话一边拿出礼盒',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/7d645f6f2989d41a673c99ed1eb24709.png'
        },
        {
          mainText: '小仙炖新出的精炖燕窝限定礼盒',
          subText: '礼盒展示特写',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/d385297222746724e7bf729892777492.png'
        },
        {
          mainText: '红色的硬箱打开瞬间贵气拉满',
          subText: '打开礼盒展示',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/d385297222746724e7bf729892777492.png'
        },
        {
          mainText: '里面5瓶精炖燕窝和5瓶爆珠的cp组合',
          subText: '开盖把燕窝倒出来+贴图展示',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/7f22b93b09b5adf86664cc083291716c.png'
        },
        {
          mainText: '每瓶都是用马来和印尼的金丝燕窝现炖',
          subText: '捞丝展示',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/f4032a44b3489b14d1e5765fed263aa2.png'
        },
        {
          mainText: '你看这燕丝都稠到能挂勺',
          subText: '燕窝瓶子里捞丝展示',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/3bd13d46feaf5800391f6c9bb1ec33da.png'
        },
        {
          mainText: '配料表还特别的干净,给妈妈吃就很放心',
          subText: '礼盒背面配料表特写',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/7f22b93b09b5adf86664cc083291716c.png'
        },
        {
          mainText: '而且燕窝对女人来说是特别好的',
          subText: '以妈妈为背景,拿一瓶燕窝打开盖子把燕窝递给妈妈',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/a58dfdb84a55f698d784d33289edceb8.png'
        },
        {
          mainText: '趁着女神节赶紧给妈妈把这个章子怡同款的燕窝礼盒给安排上',
          subText: '一边说话一边盖上礼盒,后拿着礼盒口播推荐',
          thumbnail: 'https://yoozy.oss-cn-hangzhou.aliyuncs.com/demo/7d645f6f2989d41a673c99ed1eb24709.png'
        }
      ],
      currentScriptIndex: 0, // 当前显示的文案索引
      freeInfo: {},
      isLogin: false
    }
  },
  computed: {
    currentScenes () {
      const scriptSets = [this.scenes, this.giftScenes];
      return scriptSets[this.currentScriptIndex];
    }
  },
  methods: {
    init () {
      this.getDyInfo()
      this.getFree()
    },
    async getFree () {
      const data = await request({
        url: '/api/v1/users/me/credit-state',
        method: 'GET',
      })
      if (data.code === "UNAUTHORIZED") {
        this.isLogin = true
        return
      }
      this.freeInfo = data.data || {}
    },
    goToMember () {
      uni.navigateTo({
        url: '/package/pages/memberCenter/index'
      })
    },
    async delBind () {
      await request({
        url: `/api/pro/v1/accounts/${this.dyUser._id}`,
        method: 'PATCH',
        data: { "action": "delete" }
      })
      uni.showToast({ title: '删除成功', icon: 'success' });
      this.getDyInfo()
    },
    async getDyInfo () {
      try {
        const data = await request({
          url: '/api/pro/v1/accounts',
          method: 'GET',
        })
        if (data.code === "UNAUTHORIZED") {
          this.isLogin = true
          return
        }
        this.dyUser = data.data || {}
      } catch (error) {
        console.error('获取用户信息失败:', error)
      } finally {
        this.isUserLoading = false
      }
    },
    goTo () {
      uni.navigateTo({
        url: '/package/pages/bindAccount/index'
      })
    },
    async generateScript () {
      if (!this.productLink) {
        uni.showToast({ title: '请粘贴商品链接', icon: 'none' });
        return;
      }
      uni.showLoading({
        title: '加载中'
      });
      const data = await request({
        url: '/api/pro/v1/tasks',
        method: 'POST',
        data: {
          commodityUrl: this.productLink
        }
      })
      uni.hideLoading();
      if (data.code === "UNAUTHORIZED") {
        this.isLogin = true
        return
      }
      if (!data || !data.data) {
        uni.showToast({ title: '失败', icon: 'none' });
        return
      }
      uni.switchTab({
        url: '/pages/history/index'
      })
      // const id = data.data._id
      // // 显示弹框并重置进度
      // this.showDialog = true;
      // this.currentStep = 0;
      // this.nextStep();
    },
    nextStep () {
      if (this.currentStep < this.steps.length) {
        this.stepTimer = setTimeout(() => {
          this.currentStep++;
          this.nextStep();
        }, 18000); // 每步0.7秒
      } else {
        // 全部完成后1.2秒关闭弹框
        setTimeout(() => {
          this.showDialog = false;
          uni.switchTab({
            url: '/pages/history/index'
          })
        }, 1200);
      }
    },
    regenerateScript () {

      // 在两个文案集合之间轮播
      this.currentScriptIndex = (this.currentScriptIndex + 1) % 2;
    }
  },
  onShow () {
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: 0
      });
    }
    // const token = uni.getStorageSync('token')
    // if (!token) {
    //   uni.redirectTo({
    //     url: '/pages/login/index'
    //   })
    //   return
    // }
    this.init()
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
  padding-bottom: 110rpx;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(90deg, #ff6700, #ff2d38);
    margin-top: -32rpx;
    margin-left: -32rpx;
    margin-right: -32rpx;
    // position: fixed;
    // z-index: 9999;
    // left: 0;
    // right: 0;
    // top: 0;
    padding: 20rpx 40rpx;
    .header-left {
      display: flex;
      align-items: center;
      .vip-icon {
        width: 50rpx;
        height: 50rpx;
        margin-right: 20rpx;
      }
      view {
        color: #fff;
        font-size: 26rpx;
      }
    }
    .header-right {
      font-size: 24rpx;
      color: #fff;
      background: rgba($color: #fff, $alpha: 0.6);
      padding: 5rpx 20rpx;
      border-radius: 15rpx;
    }
  }
  .bind-douyin {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f5f7ff;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 40rpx;
    gap: 15rpx;
    .bind-info {
      display: flex;
      align-items: center;
      flex: 1;
      .douyin-icon {
        width: 100rpx;
        height: 100rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
      }
      .bind-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #222;
      }
      .bind-desc {
        font-size: 24rpx;
        color: #888;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .bind-btn {
      background: #3478f6;
      color: #fff;
      border-radius: 12rpx;
      font-size: 28rpx;
      padding: 0 25rpx;
      height: 64rpx;
      line-height: 64rpx;
      margin: 0;
    }

    // 绑定区域骨架屏
    .skeleton-avatar {
      width: 100rpx;
      height: 100rpx;
      background: linear-gradient(90deg, #e5e7eb 25%, #d5d7db 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      border-radius: 10rpx;
      margin-right: 20rpx;
      animation: skeleton-shimmer 1.5s infinite;
    }

    .skeleton-title {
      height: 32rpx;
      width: 160rpx;
      background: linear-gradient(90deg, #e5e7eb 25%, #d5d7db 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      border-radius: 8rpx;
      margin-bottom: 12rpx;
      animation: skeleton-shimmer 1.5s infinite;
    }

    .skeleton-desc {
      height: 24rpx;
      width: 240rpx;
      background: linear-gradient(90deg, #e5e7eb 25%, #d5d7db 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      border-radius: 6rpx;
      animation: skeleton-shimmer 1.5s infinite;
    }

    .skeleton-btn {
      width: 128rpx;
      height: 64rpx;
      background: linear-gradient(90deg, #e5e7eb 25%, #d5d7db 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      border-radius: 12rpx;
      animation: skeleton-shimmer 1.5s infinite;
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

  .script-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-top: 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);

    .script-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32rpx;

      .script-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #222;
      }

      .regenerate-btn {
        background: #3478f6;
        color: #fff;
        border-radius: 12rpx;
        font-size: 28rpx;
        padding: 0 24rpx;
        height: 56rpx;
        line-height: 56rpx;
        margin: 0;
      }
    }

    .requirements-section {
      background: #f8f9fa;
      border-radius: 16rpx;
      padding: 24rpx;
      margin-bottom: 32rpx;

      .requirement-item {
        display: flex;
        margin-bottom: 16rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .requirement-label {
          font-size: 28rpx;
          color: #666;
          min-width: 140rpx;
          font-weight: 500;
        }

        .requirement-content {
          font-size: 28rpx;
          color: #333;
          flex: 1;
        }
      }
    }

    .scenes-list {
      .scene-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 32rpx;
        padding: 24rpx;
        background: #f8f9fa;
        border-radius: 16rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .scene-number {
          width: 48rpx;
          height: 48rpx;
          background: #3478f6;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          font-weight: bold;
          margin-right: 20rpx;
          flex-shrink: 0;
        }

        .scene-content {
          flex: 1;
          margin-right: 20rpx;

          .scene-main-text {
            font-size: 30rpx;
            color: #222;
            font-weight: 500;
            margin-bottom: 12rpx;
            line-height: 1.4;
          }

          .scene-sub-text {
            font-size: 26rpx;
            color: #666;
            margin-bottom: 8rpx;
            line-height: 1.4;
          }

          .scene-action {
            font-size: 24rpx;
            color: #3478f6;
            text-decoration: underline;
          }
        }

        .scene-thumbnail {
          width: 120rpx;
          height: 120rpx;
          border-radius: 12rpx;
          overflow: hidden;
          flex-shrink: 0;

          .thumbnail-img {
            width: 100%;
            height: 100%;
          }
        }
      }
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

@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
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
