"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    goToDetail() {
      common_vendor.index.navigateTo({
        url: "/package/pages/detail/index"
      });
    }
  },
  onShow() {
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: 1
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.searchText,
    b: common_vendor.o(($event) => $data.searchText = $event.detail.value),
    c: common_assets._imports_0$1,
    d: common_assets._imports_1$1,
    e: common_assets._imports_6,
    f: common_assets._imports_3,
    g: common_vendor.o((...args) => $options.goToDetail && $options.goToDetail(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b37acf1c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/history/index.js.map
