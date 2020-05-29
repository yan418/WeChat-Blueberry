//公共的js



/** 网络请求  url 路径 classes 请求分类  callback 回调函数*/
var https = (url, classes, callback) => {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'application/xml'
      //'Content-Type': 'application/json'  豆瓣的是text
    },
    success: function (res) {
      // 执行回调函数
      callback(res.data, classes)
    }
  })
};


/** 处理字母串大于6个子显示 ... */
var processing  = (str) =>{

  (str.length > 6) ? str=str.substring(0, 5) + '...' : str = str;
  return str;

}


/** 处理星星 ... */
var starArr = (num) => {
  var index = parseInt(num.substring(0, 1));
 
  var arr=[];
  for (let i = 1; i <=5;i++){
    if (index >= i){
       arr.push(true);
    }else{
       arr.push(false);
    }
  }
  num == "00" ? num = "0" : num = num;
  var stat={
    stat: num,
    arr: arr
  }
  return stat;
}


module.exports = {
  "https": https,
  "processing": processing,
  "starArr": starArr
}