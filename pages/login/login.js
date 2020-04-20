// pages/login/login.js

import Http from '../../base/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:'',
      phone:'',
      password:'',
      repassword:'',
      params:[{name:'请输入用户名'},{phone:'请输入手机号'},{password:'请输入登陆密码'},{repassword:'请输入确认密码'}]
  },
  login(){
    let that = this;
    for(let i=0;i<that.data.params.length;i++ ){
      let key = Object.keys(that.data.params[i])[0]
      if(!that.data[key]){
        that.showToast(that.data.params[i][key])
        return
      }
    }
    if(!(/^1[3456789]\d{9}$/.test(that.data.phone))){
      that.showToast('手机号码格式不正确')
      return
    }
    if(that.data.password!==that.data.repassword){
      that.showToast('密码不一致')
      return
    }
    Http.request({
      data:{
        name:that.data.name,
        phone:that.data.phone,
        password:that.data.password
      },
      url:'/login'
    }).then(e=>{
      that.showToast(e.data.esg)
      if(e.data.code==0){
        setTimeout(function(){
             getApp().toNextpage('/pages/sign/sign','navigateTo')
        },1000)
      }
    
    })
   
  },
  enter(){
    wx.navigateTo({
      url:'/pages/sign/sign'
    })
  },
  showToast(text){
    wx.showToast({
      title: text,
      icon: 'none'
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