<template>
  <view class="content">
    <view class="head">
      <image
        class="logo"
        src="/static/logo.jpg"
      ></image>
    </view>
    <view>
      <view class="login-btn">
        <button
          class="btn"
          :disabled="!checkboxValue"
          type="default"
          open-type="getPhoneNumber"
          @getphonenumber="decryptPhoneNumber"
        >一键登录</button>
      </view>
      <view class="foot">
        <view class="check">
          <checkbox-group @change="checkboxValue = !checkboxValue">
            <checkbox
              :value="checkboxValue"
              color="#FD1414"
              style="transform:scale(0.5)"
            />
          </checkbox-group>
        </view>
        <view class="text">
          已阅读并同意<text>《用户服务协议》</text>及<text>《隐私权政策》</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      checkboxValue: false,
      id: ''
    }
  },
  onLoad (data) {
    if (data && data.id) {
      this.id = data.id
      console.log(data.id)
    }
    const res = uni.getStorageSync('userInfo')
    if (res) {
      uni.switchTab({
        url: '/pages/home/home'
      })
    }
  },
  methods: {
    decryptPhoneNumber (e) {
      if (!e.detail.code) return
      const that = this
      uni.getUserInfo({
        success: function (res) {
          uni.login({
            provider: "weixin",
            success (v) {

              if (v.code) {
                //发起网络请求
                // request({
                //   url: `/api/user`,
                //   method: 'post',
                //   data: {
                //     loginCode: v.code,
                //     phoneCode: e.detail.code,
                //     logo: res.userInfo.avatarUrl,
                //     from: that.id
                //   },
                // }).then(res => {
                //   uni.setStorageSync('userInfo', JSON.stringify(res.data))
                //   uni.switchTab({ url: '/pages/home/home' })
                // })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      })
    },
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50rpx 50rpx 70rpx;
  height: 100vh;
  box-sizing: border-box;
}

.logo {
  height: 250rpx;
  width: 250rpx;
  margin-top: 200rpx;
}
.head {
  display: flex;
  align-items: flex-end;
  gap: 34rpx;
  padding: 0 25rpx;
  justify-content: center;
}
.login-btn {
  height: 98rpx;
  background: #3478f6;
  border-radius: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 30rpx;
  color: #ffffff;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.foot {
  display: flex;
  align-items: center;
  margin-top: 30rpx;
}
.text {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #a7a7a7;
  line-height: 63rpx;
}
.text text {
  color: #3478f6;
}
button::after {
  border-style: none;
}
button[disabled] {
  border: none;
  background-color: #d2d2d2;
  color: #777777;
  border-radius: 49px;
  outline: none;
}
</style>
