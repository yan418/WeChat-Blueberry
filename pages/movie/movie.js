// pages/movie/movie.js

//  /v2/movie/in_theaters?start=0&count=3"   即将上映
//  /v2/movie/coming_soon?start=0&count=3";  正在热映
//  /v2/movie/top250?start=0&count=3";       排行榜
//  /v2/movie/search?q=" + text;             搜索
//  http://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b
//  http://api.douban.com/v2/movie/search?apikey=0b2bdeda43b5688921839c8ecb20399b&q=
//  http://api.douban.com/v2/movie/search?apikey=0b2bdeda43b5688921839c8ecb20399b&q=小小的愿望

var app = getApp();
let movieAPI = app.movieAPI.url;
let apikey = app.movieAPI.apikey;
// 公共的函数方法
var util = require('../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieAPI: app.movieAPI, //电影接口
    isIocn:false,
    isShowView:true,
    searchArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let movieOne = movieAPI + '/v2/movie/in_theaters?apikey=' + apikey + '&start=0&count=3';
    let movieTwo = movieAPI + '/v2/movie/coming_soon?apikey=' + apikey + '&start=0&count=3';
    let movieThree = movieAPI + '/v2/movie/top250?apikey=' + apikey + '&start=0&count=3';

    util.https(movieOne, "movieOne",this.callback);
    util.https(movieTwo, "movieTwo",this.callback);
    util.https(movieThree, "movieThree",this.callback);

  },


  // 请求后的回调函数
  callback: function (data, classes) {

    // 隐藏加载动画
    wx.hideLoading();

    let arr = {};
    let list=[];
    for (let item in data.subjects){
      //模板
      var subjects={
          id: data.subjects[item].id,
          title: util.processing(data.subjects[item].title), 
          stars: util.starArr(data.subjects[item].rating.stars),
          image: data.subjects[item].images.large
      };
      list.push(subjects);
    }

    arr[classes] = {
      data:list,
      title: data.title
    };
    this.setData(arr);

    //console.log(this.data.movieOne)

  },

  //点击进入详情页面
  goInfo:function(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url:"./movie-info/movie-info?id="+id
    })
  },

  //点击进入更多列表页面
  goToMorePage: function (event){
    let more = event.currentTarget.dataset.more;
    wx.navigateTo({
      url: "./movie-more/movie-more?more=" + more
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // 显示加载动画
    wx.showLoading({
      title: '加载中...',
    })

  },

  // 表单获取焦点事件
  doFocus:function(){
    //更换
    this.setData({
      isShowView: false,
      isIocn:true
    })
  },

  // 表单失去焦点事件
  doblur:function(){
    //更换
    
  },
  // 这个可以获取 表单的内容 在其他方法里
  talks: function (e) {
    this.setData({
      talks: e.detail.value
    })
  },

  // 点击关闭搜索
  doClear: function ($event) {
    //更换
    console.log("关闭");
    this.setData({
      isShowView: true,
      isIocn: false,
      searchArr:[],
      content: ''
    });

    //console.log(this.data.talks)

  },

  // 表单点击完成触发
  doConfirm: function ($event) {

    // 获取表单上的值
    let value = $event.detail.value;
    // 目前 搜索API 不通  /v2/movie/search?apikey    us_box 目前是 北美票房榜 + '&q=' + value
    var searchUrl = movieAPI + "/v2/movie/us_box?apikey=" + apikey ;

    // 提示框
    wx.showToast({
      title: value,      //标题
      icon: 'loading',   //图标 值: success、loading
      //image:''         //自定义图标的本地路径
      duration: 1200,     //提示的延迟时间
      mask: true,                //是否显示透明蒙层，防止触摸穿透，
    })

    // 加载动画
    wx.showNavigationBarLoading();
    // wx.showLoading({
    //   title: '搜索加载中...',
    // })
    util.https(searchUrl, "searchArr", this.doSearch);


  },

  // 搜到的回调函数
  doSearch: function (data, classes) {

    let list = [];
    for (let item of data.subjects) {
    
      //模板
      var subjects = {
        id: item.subject.id,
        title: util.processing(item.subject.title),
        stars: util.starArr(item.subject.rating.stars),
        image: item.subject.images.large
      };
      list.push(subjects);
    }

    this.setData({
      searchArr: list
    });

   // wx.hideLoading();
    wx.hideNavigationBarLoading();
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