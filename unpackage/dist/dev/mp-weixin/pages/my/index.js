"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      showUpgrade: false,
      showVip: false,
      showPlanPopup: false
    };
  },
  methods: {
    upgradeNow() {
      common_vendor.index.showToast({ title: "升级成功", icon: "success" });
      this.showUpgrade = false;
    },
    goToBindAccount() {
      common_vendor.index.navigateTo({
        url: "/package/pages/bindAccount/index"
      });
    },
    goToMemberCenter() {
      common_vendor.index.navigateTo({
        url: "/package/pages/memberCenter/index"
      });
    },
    goToLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/index"
      });
    }
  },
  onShow() {
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: 2
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$2,
    b: common_vendor.o((...args) => $options.goToLogin && $options.goToLogin(...args)),
    c: common_vendor.o(($event) => $data.showPlanPopup = true),
    d: common_vendor.o(($event) => $data.showVip = true),
    e: common_vendor.o(($event) => $data.showUpgrade = true),
    f: common_assets._imports_1$2,
    g: common_vendor.o((...args) => $options.goToMemberCenter && $options.goToMemberCenter(...args)),
    h: common_assets._imports_2,
    i: common_assets._imports_3$1,
    j: common_vendor.o((...args) => $options.goToBindAccount && $options.goToBindAccount(...args)),
    k: common_assets._imports_2,
    l: common_assets._imports_4,
    m: common_assets._imports_2,
    n: $data.showUpgrade
  }, $data.showUpgrade ? {
    o: common_vendor.o(($event) => $data.showUpgrade = false)
  } : {}, {
    p: $data.showUpgrade
  }, $data.showUpgrade ? {
    q: common_assets._imports_8,
    r: common_vendor.o(($event) => $data.showUpgrade = false),
    s: common_assets._imports_6$1,
    t: common_assets._imports_7,
    v: common_assets._imports_8$1,
    w: common_assets._imports_9,
    x: common_vendor.o((...args) => $options.upgradeNow && $options.upgradeNow(...args))
  } : {}, {
    y: $data.showVip
  }, $data.showVip ? {
    z: common_vendor.o(($event) => $data.showVip = false)
  } : {}, {
    A: $data.showVip
  }, $data.showVip ? {
    B: common_assets._imports_8,
    C: common_vendor.o(($event) => $data.showVip = false),
    D: common_assets._imports_6$1,
    E: common_assets._imports_10,
    F: common_assets._imports_10,
    G: common_assets._imports_10,
    H: common_assets._imports_10
  } : {}, {
    I: $data.showPlanPopup
  }, $data.showPlanPopup ? {
    J: common_vendor.o(($event) => $data.showPlanPopup = false)
  } : {}, {
    K: $data.showPlanPopup
  }, $data.showPlanPopup ? {
    L: common_assets._imports_8,
    M: common_vendor.o(($event) => $data.showPlanPopup = false)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f97bc692"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/index.js.map
