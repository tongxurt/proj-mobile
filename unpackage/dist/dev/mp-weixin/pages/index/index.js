"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      productLink: "",
      showDialog: false,
      steps: [
        "正在分析商品链接...",
        "成功获取商品信息",
        "正在分析商品类别和特性...",
        "识别为高端滋补品类，目标受众为25-45岁女性",
        "正在分析商品卖点和价值主张...",
        "提取核心卖点：天然燕窝、独特工艺、营养价值",
        "正在匹配最佳脚本模板...",
        "选择「真人出镜+种草口播」模板",
        "正在优化脚本内容...",
        "完成14个分镜头的文案撰写"
      ],
      currentStep: 0,
      stepTimer: null
    };
  },
  methods: {
    goTo() {
      common_vendor.index.navigateTo({
        url: "/package/pages/bindAccount/index"
      });
    },
    generateScript() {
      if (!this.productLink) {
        common_vendor.index.showToast({ title: "请粘贴商品链接", icon: "none" });
        return;
      }
      this.showDialog = true;
      this.currentStep = 0;
      this.nextStep();
    },
    nextStep() {
      if (this.currentStep < this.steps.length) {
        this.stepTimer = setTimeout(() => {
          this.currentStep++;
          this.nextStep();
        }, 700);
      } else {
        setTimeout(() => {
          this.showDialog = false;
        }, 1200);
      }
    }
  },
  onShow() {
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: 0
      });
    }
  },
  beforeDestroy() {
    if (this.stepTimer)
      clearTimeout(this.stepTimer);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: common_vendor.o((...args) => $options.goTo && $options.goTo(...args)),
    c: $data.productLink,
    d: common_vendor.o(($event) => $data.productLink = $event.detail.value),
    e: common_assets._imports_1,
    f: common_vendor.o((...args) => $options.generateScript && $options.generateScript(...args)),
    g: $data.showDialog
  }, $data.showDialog ? {
    h: common_vendor.f($data.steps, (step, idx, i0) => {
      return common_vendor.e({
        a: idx < $data.currentStep
      }, idx < $data.currentStep ? {} : idx === $data.currentStep ? {} : {}, {
        b: idx === $data.currentStep,
        c: common_vendor.t(step),
        d: idx
      });
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
