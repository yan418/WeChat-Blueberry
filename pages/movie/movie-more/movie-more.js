// pages/movie/movie-more/movie-more.js


let app=getApp();
let movieAPI=app.movieAPI.url;
let apikey = app.movieAPI.apikey;
let util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieUrl:"",
    count: 20,
    start: 0,
    movieGather:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = options.more;

   
    wx.setNavigationBarTitle({
      title: title,
    })
   

    let url = "";
    switch (title){
      case "正在上映的电影-北京":
        url = movieAPI + "/v2/movie/coming_soon?apikey=" + apikey + "&start=" + this.data.start + "&count=" + this.data.count;
        break;
      case "即将上映的电影":
        url = movieAPI + "/v2/movie/in_theaters?apikey=" + apikey + "&start=" + this.data.start + "&count=" + this.data.count;
        break;
      case "豆瓣电影Top250":
        url = movieAPI + "/v2/movie/top250?apikey=" + apikey + "&start=" + this.data.start + "&count=" + this.data.count;
        break;
    }

    // 封装的网络请求
    util.https(url, title, this.callback);

    // 把 url 变成全局变量
    this.setData({
      movieUrl: url
    })

  },

  //  请求后的回调函数
  callback:function(data) {
  
    if(!data){
      return;
    }
    if (data.subjects.length<=0) {
      wx.showToast({
          icon: 'loading', 
          title: '已经到底了...',
          duration: 800,     //提示的延迟时间
          mask: true,  
      })
      wx.hideNavigationBarLoading();
      return;
    }

    let allArr = [];
    let list = [];
    for (let item in data.subjects) {
      //模板
      var subjects = {
        id: data.subjects[item].id,
        title: util.processing(data.subjects[item].title),
        stars: util.starArr(data.subjects[item].rating.stars),
        image: data.subjects[item].images.large
      };
      list.push(subjects);
    }

    // 将每次请求的数组进行拼接
    allArr=this.data.movieGather.concat(list);
 
    this.setData({
      data: allArr,
      movieGather: allArr
    })

    // 取消加载动画
    wx.hideNavigationBarLoading();
    wx.hideLoading();

  },

  //点击进入详情页面
  goInfo: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../movie-info/movie-info?id=" + id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

      wx.showNavigationBarLoading();
      //加载动画
      wx.showLoading({
        title: '加载中...',
      })

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉加载
    let url = this.data.movieUrl;
    url.search("&start");
    let count = this.data.count;
    let start = this.data.start + count;
    this.setData({
      start: start
    })
    url = url.substring(0, url.search("&start")) + "&start=" + start + "&count=" + count;

    wx.showNavigationBarLoading();
    // 封装的网络请求
    util.https(url, "more", this.callback);

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
   * 页面相关事件处理函数--监听用户下拉动作  (下来刷新)
   */
  onPullDownRefresh: function () {
    //先在json 配置     "enablePullDownRefresh":true
    //                  backgroundTextStyle :  dark  下拉动作 会有三个
    //停止下来操作       wx.stopPullDownRefresh; 
   
    let url = this.data.movieUrl;
    url.search("&start");
    let count = this.data.count;
    let start = this.data.start + count;
    
    this.setData({
      start: start
    })
    url = url.substring(0, url.search("&start")) + "&start=" + start + "&count=" + count;
    console.log(url);

    // 封装的网络请求
    util.https(url, "more", this.callback);

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})