var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var servsers = getApp().globalData.baseUrl;
var imageUrl = getApp().globalData.imageUrl;
Page({
  data: {
    list: [],
    servsers: servsers,
    activitydata:{},
    spaceimgs:[],
    msgConts:'',
    imageUrl: imageUrl,
    currentIndex:1,
    showLoading:false
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: servsers+'/khtj/json/base/tabInformation/getDetails',
      data: {
        id: options.id
      },
      success: function (res) {
        var list = [];
        if(res.data.result.fileList.length == 0) {
          list.push(imageUrl + res.data.result.logo);
        } else {
          for (var i = 0; i < res.data.result.fileList.length; i++) {
            list.push(imageUrl + res.data.result.fileList[i].fileUrl);
          }
        }
        that.setData({
          activitydata: res.data.result,
          spaceimgs: list,
          msgConts: WxParse.wxParse('msgConts', 'html', res.data.result.cnts, that, 5)
        })
      },
      complete: function (comp) {
        that.setData({
          showLoading: true
        });
      }
    })

    wx.setNavigationBarTitle({
        title: "活动详情"
    })
  },
  setCurrent: function(e){
    this.setData({
      currentIndex:e.detail.current+1
    })
  },
  imgPreview: function(){ //图片预览
    const imgs = this.data.spaceimgs;
    wx.previewImage({
      current: imgs[this.data.currentIndex-1], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  }

})
