// pages/news/new-info/new-info.js
var news=require("../../data/news.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isState:false,
    isMusic:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取其他页面传来的参数
    var id=options.id;
    this.setData(
      news.news[id]
    )
    // 视图初始化
    this.setData({
        id: id
    })


    //本地存储  把收藏的存在本地存储里
    var newsCollect = {
        // 0: false,
    }
    let collect = wx.getStorageSync("newsCollect");
    if (!collect){
        // 第一次进入的时候判断是否存在本地存储以及是否收藏
        newsCollect[id]=false;
        wx.setStorageSync("newsCollect", newsCollect); 
    }else{
        // 之前收藏过
        newsCollect = wx.getStorageSync("newsCollect");
        newsCollect[id] == undefined ? newsCollect[id] = false : newsCollect[id] = newsCollect[id];
        this.setData({
          isState: newsCollect[id]
        })
    }



  },


  /** 处理点击收藏  */
  doCollect:function(){

    let newsCollect = wx.getStorageSync("newsCollect");
    let id = this.data.id;
    newsCollect[id] = !newsCollect[id];
    wx.setStorageSync("newsCollect", newsCollect);
    this.setData({
      isState: newsCollect[id]
    })
    
    let state = newsCollect[id] ? '收藏成功' :'收藏取消';
    // 提示框
    wx.showToast({
      title: state,      //标题
      icon: 'success',   //图标 值: success、loading
      //image:''         //自定义图标的本地路径
      duration: 800,     //提示的延迟时间
      mask: true,                //是否显示透明蒙层，防止触摸穿透，
      success: function () { },  //接口调用成功的回调函数
      fail: function () { },     //接口调用失败的回调函数
      complete: function () { }  //接口调用结束的回调函数
    })
    /**
     *  wx.hideToast()  隐藏消息提示框
     *  wx.showModal()  确定框
     */


  },

  // 处理点击评论
  doComment:function(){
    // 确定 模态框
    // wx.showModal({
    //   title: '提示',
    //   content: '你确定要评论？',
    //   success: function (res) {
    //     if (res.confirm) {
    //         console.log('确定l')
    //     }
    //   }
    // })
    
    // 显示操作菜单 底部出现的菜单选择
    wx.showActionSheet({
      itemList: ['A','B','C'],
      success: function (res) {
        if (!res.cancel) {
          //下标
          console.log(res.tapIndex)
        }
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })



  },


  /**
   * 用户点击右上角 分享
   */
  onShareAppMessage: function (options) {

    var shareObj = {
         title: news.news[this.data.id].title,      // 默认是小程序的名称
  　　　　path: '/pages/share/share',                // 默认是当前页面，必须是以‘/’开头的完整路径
         imageUrl: '/pages/images/banner2.jpg',     //自定义图片路径，
  　　　　success: function (res) {
    　　　　　　// 转发成功之后的回调
    　　　　　　if (res.errMsg == 'shareAppMessage:ok') {

    　　　　　　}
  　　　　},
  　　　　fail: function () {
    　　　　　　// 转发失败之后的回调
    　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {

      　　　　　　　// 用户取消转发

    　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
      　　　　　　　
                 　// 转发失败，其中 detail message 为详细失败信息
    　　　　　　}
  　　　　},
         complets: function(){

        　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
      　　},
    　　　　　　  
  　　}   

      // 来自页面内的按钮的转发
  　　if (options.from == 'button') {
    　　　　 var eData = options.target.dataset;
    　　　　 console.log(eData.name);     // shareBtn
            console.log("来自页面内转发按钮");
            console.log(options.target);
    　　　　 // 此处可以修改 shareObj 中的内容
            // shareObj.path = '/pages/share/share';
  　　}
    
      return shareObj;
  },

  // 播放音乐
  playMusic:function(){
    
  
    let musicObj = news.news[this.data.id].music;
    let music = this.data.isMusic;
    if (!music){
      // 播放音乐
      wx.playBackgroundAudio({
        dataUrl: musicObj.url,
        title: musicObj.title,
        coverImgUrl: musicObj.coverImgUrl,
      })
      music = true;
    }else{
      //暂停音乐
      wx.pauseBackgroundAudio();
      music = false;
    }

    this.setData({
      isMusic:music
    })


    // 获取音乐的信息，（是否播放，但目前有bug）
    // wx.getBackgroundAudioPlayerState({
    //   success: function (res) {
    //     var status = res.status
    //     var dataUrl = res.dataUrl
    //     var currentPosition = res.currentPosition
    //     var duration = res.duration
    //     var downloadPercent = res.downloadPercent;
    //   },
    //   fail: function () {
    //   }
    // })

  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //停止音乐
    wx.stopBackgroundAudio();

  },


})