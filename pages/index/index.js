//index.js

/** 在app.json里   window   backgroundTextStyle   字段需为 dark 或 light
 *                          navigationBarTextStyle  字体颜色  navigationBarTextStyle  white / black
 *                          disableScroll           禁止页面拉动
 *                          "requiredBackgroundModes":["audio","location"] 
 *                                                    申请需要后台运行的能力， audio：后台音乐播放   location：后台定位
 *                          tabBar                tab 应用
 */


Page({
  data:{},

  jumpGoNews:function(){
    //跳转页面
    //  wx.navigateTo({
    //    url: '../news/news',
    //  })
     //跳转页面， 带有tabBar
     wx.switchTab({
      url: '../news/news',
     })
  }

})
