// pages/load/load.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 login(){
  getApp().toNextpage('/pages/login/login','navigateTo')
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      if(wx.getStorageSync('sid')){
        getApp().toNextpage('/pages/main/main','switchTab')
      }
      // 查看是否授权
   
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                getApp().userInfo = res.userInfo
                getApp().toNextpage('/pages/main/main','switchTab')
              }
            })
          }
        }
      })
  },
  bindGetUserInfo (e) {
    if(e.detail.userInfo){
      console.log(e.detail)
      let params = Object.assign({},e.detail.userInfo)
      params.sign = e.detail.signature
      params.user_img=params.avatarUrl
      params.user_name = params.nickName
      wx.setStorageSync('sid', params)
      console.log(wx.getStorageSync('sid'))
      getApp().toNextpage('/pages/main/main','switchTab')
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading({
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(getApp().userInfo,'---------')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})