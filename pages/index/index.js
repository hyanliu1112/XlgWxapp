//index.js
//获取应用实例

Page({

  data: {
    active: 0
  },
  switchTabar(e) {
    this.setData({
      active: e.detail
    })
  }
})