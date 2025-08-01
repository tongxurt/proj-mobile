"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      checkboxValue: false,
      id: ""
    };
  },
  onLoad(data) {
    if (data && data.id) {
      this.id = data.id;
      common_vendor.index.__f__("log", "at pages/login/index.vue:48", data.id);
    }
    const res = common_vendor.index.getStorageSync("userInfo");
    if (res) {
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
  },
  methods: {
    decryptPhoneNumber(e) {
      if (!e.detail.code)
        return;
      common_vendor.index.getUserInfo({
        success: function(res) {
          common_vendor.index.login({
            provider: "weixin",
            success(v) {
              if (v.code)
                ;
              else {
                common_vendor.index.__f__("log", "at pages/login/index.vue:83", "登录失败！" + res.errMsg);
              }
            }
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$3,
    b: !$data.checkboxValue,
    c: common_vendor.o((...args) => $options.decryptPhoneNumber && $options.decryptPhoneNumber(...args)),
    d: $data.checkboxValue,
    e: common_vendor.o(($event) => $data.checkboxValue = !$data.checkboxValue)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
