// pages/news/news.js

var newList = require('../data/news.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:{
      indicatorDots: true,
      indicatorA: "#109d59",
      autoplay: true,
      interval: 8000,
    },
    news:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   
    //逻辑层发送给视图层
    this.setData({
      news: newList.news
    });

  },

  /* 跳转详情页面 */
  jumpGoNewInfo:function(event){
    //获取自定义属性的值
    var id=event.currentTarget.dataset.newid;
    wx.navigateTo({
      url: '../news/new-info/new-info?id=' + id,
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

  



})