"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      showPhotograph: false
    };
  },
  methods: {
    upload() {
      common_vendor.index.chooseImage({
        success: (chooseImageRes) => {
          common_vendor.index.__f__("log", "at package/pages/detail/index.vue:279", chooseImageRes);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$5,
    b: common_assets._imports_1$3,
    c: common_assets._imports_2$1,
    d: common_assets._imports_3$2,
    e: common_assets._imports_4$1,
    f: common_vendor.o(($event) => $data.showPhotograph = true),
    g: common_assets._imports_5,
    h: common_vendor.o((...args) => $options.upload && $options.upload(...args)),
    i: common_assets._imports_6,
    j: common_assets._imports_4$1,
    k: common_assets._imports_5,
    l: common_vendor.o((...args) => $options.upload && $options.upload(...args)),
    m: common_assets._imports_7$1,
    n: common_assets._imports_6,
    o: common_assets._imports_4$1,
    p: common_assets._imports_5,
    q: common_vendor.o((...args) => $options.upload && $options.upload(...args)),
    r: common_assets._imports_7$1,
    s: $data.showPhotograph
  }, $data.showPhotograph ? {
    t: common_vendor.o(($event) => $data.showPhotograph = false)
  } : {}, {
    v: $data.showPhotograph
  }, $data.showPhotograph ? {
    w: common_assets._imports_8,
    x: common_vendor.o(($event) => $data.showPhotograph = false)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6be9b229"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/package/pages/detail/index.js.map
