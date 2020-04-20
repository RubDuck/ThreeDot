// pages/main/main.js
const Http = require('../../base/http')
const Util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[1,2],
    articalList:[],
  },
  getList(){
    let that = this
    Http.request({
      url:'/allartical',
      method:'GET'
    }).then(e=>{
      let data = Object.assign([],e.data.data)
      that.setData({
        articalList:data.reverse()
      })
    })
  },

  approve(e){
    let that = this
    let id = e.currentTarget.dataset.id.page_id
    let params = Object.assign({},wx.getStorageSync('sid'))
    params.page_id = id
    console.log(params,id)
    Http.request({
      url:'/approve',
      data:params
    }).then(e=>{
      that.getList()
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
    this.getList()
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