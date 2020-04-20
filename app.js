//app.js
import Http from './base/http'

const SID = 'sid';
const APPID = 'wx722ddd834db4e87c'
const secret = 'db87a87f3829aa35f1ca8d448e1696dd'
var url =`https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=refresh_token`


App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${secret}&js_code=${res.code}&grant_type=refresh_token`,
          success(res){
        
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  toNextpage(url,method='switchTab'){
    wx[method]({
      url: url
    })
  },
  showToast(text){
    wx.showToast({
      title: text,
      icon: 'none'
    })
  },
  globalData: {
    userInfo:null
  }
})