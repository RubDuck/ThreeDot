// pages/main/main.js

import Http from '../../base/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[1,2],
    articalList:[],
    toast:false,
    page_id:'',
    title:'删除动态？',
    user:''
  },
  confirm(){
    let that = this 
    Http.request({
      url:'/delete',
      data:{
        page_id:that.data.page_id
      }
    }).then(e=>{
      that.setData({
        toast:false
      })
      getApp().showToast(e.data.msg)
      if(e.data.code==0){
        that.getList()
      }
    })
  },
  cancel(){
    this.setData({
      toast:false
    })
  },
  delete(e){
    this.setData({
      page_id:e.currentTarget.dataset.id
    })
    this.setData({
      toast:true
    })
  },
  getList(){
    let that = this
    let sid = wx.getStorageSync('sid')
    let keyword = sid.user_phone?sid.user_phone:sid.sign
    Http.request({
      url:`/artical?id=${keyword}`,
      method:'GET',
    }).then(e=>{
      let data = Object.assign([],e.data.data)
      that.setData({
        articalList:data.reverse()
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = Object.assign({},wx.getStorageSync('sid'))
    this.setData({
      user:user
    })
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