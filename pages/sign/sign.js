// pages/sign/sign.js

import Http from '../../base/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    password:''
  },
  login(){
    wx.navigateBack({
      delta:1
    })
  },
  enter(){
    let that = this
    Http.request({
      data:{
        user:that.data.user,
        password:that.data.password
      },
      url:'/sign',
    }).then(e=>{
      getApp().showToast(e.data.msg)
      if(e.data.code == 0){
        wx.setStorageSync('sid', e.data.data)
        setTimeout(function(){
          getApp().toNextpage('/pages/main/main')
        },1000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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