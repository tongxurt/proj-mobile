Component({
  data: {
    selected: 0,
    color: "#333333",
    selectedColor: "#3C82F6",
    list: [{
      pagePath: "/pages/index/index",
      text: "首页",
      icon: "/static/home.svg",
      activeIcon: "/static/home_active.svg"
    }, {
      pagePath: "/pages/history/index",
      text: "我的作品",
      icon: "/static/video.svg",
      activeIcon: "/static/video_active.svg"
    }, {
      pagePath: "/pages/account/index",
      text: "账号分析",
      icon: "/static/chart.svg",
      activeIcon: "/static/chart_active.svg"
    }, {
      pagePath: "/pages/my/index",
      text: "我的",
      icon: "/static/my.svg",
      activeIcon: "/static/my_active.svg"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})