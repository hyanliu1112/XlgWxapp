// pages/home/my/my.js

const util = require('../../../utils/util.js');
const user = require('../../../utils/user.js');
const app = getApp();

Page({

  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 查看是否授权
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      return;
    }

    user.checkLogin().catch(() => {

      user.loginByWeixin(e.detail.userInfo).then(res => {
        app.globalData.hasLogin = true;

        wx.navigateBack({
          delta: 1
        })
      }).catch((err) => {
        app.globalData.hasLogin = false;
        wx.showToast({
          title: '微信登录失败',
          icon:'none'
        })
      });

    });
    
  },
  checkSessionAndLogin() {
    let that = this;
    let thisOpenId = wx.getStorageSync('openid');

    // 已经进行了登录，检查登录是否过期
    if (thisOpenId) {
      console.log('have openid')
      wx.checkSession({
        success: function() {
          //session_key 未过期，并且在本生命周期一直有效
          wx.navigateBack({});
        },
        fail: function() {
          console.log('but session_key expired');
          // session_key 已经失效，需要重新执行登录流程
          wx.removeStorageSync('openid');
          that.checkSessionAndLogin();
        }
      })
    } else {
      // 没有进行登录则先进行登录操作
      console.log('do not have openid');
      that.loginAndGetOpenid();
    }

  },
  loginAndGetOpenid() {
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          util.request({
            url: 'auth/wxlogin',
            data: {
              code: res.code
            }
          }).then(res => {
            console.log(res);
            if (res.code === 0) {
              wx.showModal({
                title: 'set openid',
                content: res.data,
              })
              wx.setStorageSync('openid', res.data);
              // that.sendUserInfoToServer();
            } else {
              wx.showModal({
                title: 'Sorry',
                content: '用户登录失败~',
              })
            }

          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  sendUserInfoToServer: function() {

    console.log('now send user info to server');
    let userInfo = wx.getStorageSync('userInfo');
    let thisOpenId = wx.getStorageSync('openid');

    userInfo.openid = thisOpenId;

    wx.request({
      url: Domain + '/user/updateUser',
      method: 'POST',
      dataType: 'json',
      data: userInfo,
      success: function(res) {
        res = res.data;
        if (res.code === 0) {
          wx.navigateBack({});
        } else {
          wx.showModal({
            title: 'Sorry',
            content: '同步信息出错~',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})