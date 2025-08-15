<template>
  <view class="content">
    <view class="head">
      <image
        class="logo"
        src="/static/logo.jpg"
      ></image>
    </view>

    <!-- 手机号输入区域 -->
    <view class="form-section">
      <!-- 手机号输入 -->
      <view class="input-group phone-group">
        <view class="country-code">
          <text>+86</text>
          <image
            class="arrow-icon"
            src="/static/arrow.svg"
          ></image>
        </view>
        <input
          class="phone-input"
          v-model="phoneNumber"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
        />
      </view>

      <!-- 验证码输入 -->
      <view class="input-group">
        <input
          class="code-input"
          v-model="verifyCode"
          placeholder="请输入验证码"
          type="number"
          maxlength="6"
        />
        <button
          class="get-code-btn"
          :class="{ disabled: !canGetCode || countdown > 0 }"
          :disabled="!canGetCode || countdown > 0"
          @click="getVerifyCode"
        >
          {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
        </button>
      </view>
    </view>

    <!-- 登录按钮 -->
    <view class="login-btn-container">
      <button
        class="login-btn"
        :class="{ disabled: !canLogin }"
        :disabled="!canLogin"
        @click="handleLogin"
      >
        登 录
      </button>
      <button
        class="login-btn"
        open-type="getPhoneNumber"
        :disabled="!checkboxValue"
        :class="{ disabled: !checkboxValue }"
        @getphonenumber="decryptPhoneNumber"
      >一键登录</button>
    </view>
    <!-- 协议选择 -->
    <view class="agreement">
      <view class="check">
        <checkbox-group @change="checkboxValue = !checkboxValue">
          <checkbox
            :value="checkboxValue"
            :checked="checkboxValue"
            color="#00C896"
            style="transform:scale(0.8)"
          />
        </checkbox-group>
      </view>
      <view class="text">
        我已阅读并同意<text @click="goToAgreement">用户协议</text> <text @click="goToPrivacy">隐私政策</text>
      </view>
    </view>
  </view>
</template>

<script>
import request from '../../request.js'

export default {
  data () {
    return {
      phoneNumber: '',
      verifyCode: '',
      checkboxValue: true,
      countdown: 0,
      timer: null,
      id: ''
    }
  },
  computed: {
    // 是否可以获取验证码
    canGetCode () {
      return this.phoneNumber.length === 11 && /^1[3-9]\d{9}$/.test(this.phoneNumber)
    },
    // 是否可以登录
    canLogin () {
      return this.canGetCode &&
        this.verifyCode.length === 6 &&
        this.checkboxValue
    }
  },
  onLoad (data) {
    if (data && data.id) {
      this.id = data.id
    }
    const token = uni.getStorageSync('token')
    if (token) {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  onUnload () {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    decryptPhoneNumber (e) {

      console.log('e.detail.code', e.detail.code)

      if (!e.detail.code) return
      const that = this
      uni.getUserInfo({
        success: function (res) {
          uni.login({
            provider: "weixin",
            success (v) {
              console.log(v);

              // if (v.code) {
              //   //发起网络请求
              //   request({
              //     url: `/api/user`,
              //     method: 'post',
              //     data: {
              //       loginCode: v.code,
              //       phoneCode: e.detail.code,
              //       logo: res.userInfo.avatarUrl,
              //       from: that.id
              //     },
              //   }).then(res => {
              //     uni.setStorageSync('userInfo', JSON.stringify(res.data))
              //     uni.switchTab({ url: '/pages/home/home' })
              //   })
              // } else {
              //   console.log('登录失败！' + res.errMsg)
              // }
            }
          })
        }
      })
    },
    // 获取验证码
    async getVerifyCode () {
      if (!this.canGetCode) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }

      try {
        uni.showLoading({
          title: '发送中...'
        })

        // 调用发送验证码接口
        const result = await request({
          url: '/api/v1/phone-auth-codes?phone=' + this.phoneNumber,
          method: 'GET',
        })

        uni.hideLoading()

        if (result.data) {
          uni.showToast({
            title: '验证码已发送',
            icon: 'success'
          })

          // 开始倒计时
          this.startCountdown()
        } else {
          uni.showToast({
            title: result.message || '发送失败',
            icon: 'none'
          })
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: '网络异常，请重试',
          icon: 'none'
        })
      }
    },

    // 开始倒计时
    startCountdown () {
      this.countdown = 60
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },

    // 处理登录
    async handleLogin () {
      if (!this.canLogin) {
        uni.showToast({
          title: '请完善登录信息',
          icon: 'none'
        })
        return
      }

      try {
        uni.showLoading({
          title: '登录中...'
        })

        // 调用登录接口
        const result = await request({
          url: `/api/v1/phone-auth-tokens?phone=${this.phoneNumber}&code=${this.verifyCode}`,
          method: 'GET',
        })

        uni.hideLoading()

        if (result.data) {
          // 保存用户信息和token
          uni.setStorageSync('token', result.data.token)

          uni.showToast({
            title: '登录成功',
            icon: 'success'
          })

          // 跳转到首页
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1500)
        } else {
          uni.showToast({
            title: result.message || '登录失败',
            icon: 'none'
          })
        }
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: '网络异常，请重试',
          icon: 'none'
        })
      }
    },

    // 跳转到用户协议
    goToAgreement () {
      uni.navigateTo({
        url: '/package/pages/userAgreement/index'
      })
    },

    // 跳转到隐私政策
    goToPrivacy () {
      uni.navigateTo({
        url: '/package/pages/privacy/index'
      })
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  padding: 40rpx 40rpx 60rpx;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f7f8fa;
  color: #222222;
}

.logo {
  height: 160rpx;
  width: 160rpx;
  margin: 60rpx auto 100rpx;
  display: block;
}

.head {
  text-align: center;
  margin-bottom: 120rpx;
}

.input-group {
  margin-bottom: 40rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 70rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
}

.phone-group {
  border: 1rpx solid #e5e7eb;
}

.country-code {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  border-right: 1rpx solid #e5e7eb;
  font-size: 28rpx;
  color: #374151;
  height: 100%;
}

.arrow-icon {
  width: 16rpx;
  height: 16rpx;
  margin-left: 6rpx;
}

.phone-input {
  flex: 1;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #374151;
  background: transparent;
  height: 100%;
}

.phone-input::placeholder {
  color: #9ca3af;
  font-size: 26rpx;
}

.code-input {
  flex: 1;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #374151;
  background: transparent;
  border: 1rpx solid #e5e7eb;
  border-radius: 12rpx 0 0 12rpx;
  height: 68rpx;
}

.code-input::placeholder {
  color: #9ca3af;
  font-size: 26rpx;
}

.get-code-btn {
  background-color: #d1d5db;
  color: #6b7280;
  font-size: 24rpx;
  font-weight: 400;
  padding: 0 20rpx;
  border: none;
  border-radius: 0 12rpx 12rpx 0;
  min-width: 160rpx;
  height: 70rpx;
  line-height: 70rpx;
}

.get-code-btn:not(.disabled) {
  background-color: #3478f6;
  color: #ffffff;
}

.get-code-btn.disabled {
  background-color: #d1d5db;
  color: #6b7280;
}

.get-code-btn::after {
  border: none;
}

/* 协议区域 */
.agreement {
  display: flex;
  align-items: center;
  padding: 0 8rpx;
  margin-top: 20rpx;
}

.check {
  margin-right: 10rpx;
  margin-top: 4rpx;
}

.text {
  font-size: 22rpx;
  color: #6b7280;
  line-height: 1.6;
  flex: 1;
}

.text text {
  color: #3478f6;
  margin: 0 4rpx;
}

/* 登录按钮 */
.login-btn-container {
  margin-top: auto;
  padding: 0 8rpx;
}

.login-btn {
  width: 100%;
  height: 70rpx;
  background-color: #d1d5db !important;
  color: #6b7280;
  font-size: 30rpx;
  font-weight: 400;
  border-radius: 35rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50rpx;
}

.login-btn:not(.disabled) {
  background-color: #3478f6 !important;
  color: #ffffff;
}

.login-btn::after {
  border: none;
}
</style>
