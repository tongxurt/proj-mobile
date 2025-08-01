"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      qrcodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=example"
      // 可替换为后端生成的二维码
    };
  },
  methods: {
    refreshQrcode() {
      this.qrcodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + Math.random();
    },
    confirmAuth() {
      common_vendor.index.showToast({ title: "授权成功", icon: "success" });
    },
    openPrivacy() {
      common_vendor.index.navigateTo({ url: "/package/pages/privacy/index" });
    },
    openUser() {
      common_vendor.index.navigateTo({ url: "/package/pages/userAgreement/index" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.qrcodeUrl,
    b: common_assets._imports_0$4,
    c: common_vendor.o((...args) => $options.refreshQrcode && $options.refreshQrcode(...args)),
    d: common_vendor.o((...args) => $options.confirmAuth && $options.confirmAuth(...args)),
    e: common_vendor.o((...args) => $options.openPrivacy && $options.openPrivacy(...args)),
    f: common_vendor.o((...args) => $options.openUser && $options.openUser(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-50aa1379"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/package/pages/bindAccount/index.js.map
