// pages/movie/movie-info/movie-info.js
// http://api.douban.com/v2/movie/subject/30235440?apikey=0b2bdeda43b5688921839c8ecb20399b

var utils = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
    let id = options.id;
    var url = app.movieAPI.url + '/v2/movie/subject/' + id + '?apikey=' + app.movieAPI.apikey;
    utils.https(url, 'info', this.callback)

  },

  /** 请求 回调函数 */
  callback:function (data){
    
    if (!data) {
      return;
    }

    let name=data.title;
    this.setData({
      name: name
    });

    //隐藏导航加载动画
    wx.hideNavigationBarLoading();
    // 改变最顶部的名称
    wx.setNavigationBarTitle({
      title: this.data.name,
    })


    // 影人
    let figure = "";
    let arrFigure = [];
    for (let item of data.casts){
      arrFigure.push(item);
      figure += item.name + " / ";
    }

    var temp={
      "original_title": data.original_title,
      "countries": data.countries[0],
      "year": data.year,
      "movieImg":data.images.large,
      title: data.title,
      summary: data.summary,
      stars: utils.starArr(data.rating.stars),
      generes: data.genres,
      directors:data.directors[0].name,
      figure: figure,
      arrFigure: arrFigure
    };

    this.setData(temp);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    //显示导航加载动画
    wx.showNavigationBarLoading();
  
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