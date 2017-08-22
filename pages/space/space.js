//获取应用实例
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var servsers = getApp().globalData.baseUrl;
var imageUrl = getApp().globalData.imageUrl;
Page({
	data: {
	showLoading: false,
  	servsers: servsers,
    spacedata:{},
    speciallist:[], //会议室列表列表
    spaceimgs:[],
    companyList:[],
    serviceList:[],
    honorList:[],
    tagList:[],
    customList:[],
    msgserviceInfo: '',
    msgcompanyInfo: '',
    msghonorInfo: '',
    msgcustomInfo: '',
    imageUrl: imageUrl,
    currentIndex:1,
    navbar: ['服务内容', '机构介绍','资质荣誉','客户评价'],
    currentTab: 0,
  },
  
  onLoad: function () {
    var that = this
  	//调取职业病
    wx.request({
      url: servsers +'/khtj/json/base/tabGroupcheck/getZybDetails',
      success: function (e) {
      	var list = [];
      	var taglist = [];
      	var comlist = [];
      	var sevlist = [];
      	var honorlist = [];
      	var customlist = [];
        var datas = e.data.result.serviceList;
        
         list.push(imageUrl + e.data.result.logo);
         for (var i = 0; i < e.data.result.serviceList.length; i++) {
            sevlist.push(imageUrl + e.data.result.serviceList[i].fileUrl);
          }
          for (var i = 0; i < e.data.result.companyList.length; i++) {
            comlist.push(imageUrl + e.data.result.companyList[i].fileUrl);
          }
            for (var i = 0; i < e.data.result.honorList.length; i++) {
            honorlist.push(imageUrl + e.data.result.honorList[i].fileUrl);
          }
              for (var i = 0; i < e.data.result.customList.length; i++) {
            customlist.push(imageUrl + e.data.result.customList[i].fileUrl);
          }
              for (var i = 0; i < e.data.result.labels.length; i++) {
            taglist.push(e.data.result.labels[i]);
          }
        that.setData({
          speciallist:e.data.result,
          spaceimgs: list,
          tagList:taglist,
          serviceList:sevlist,
          companyList: comlist,
          honorList: honorlist,
          customList: customlist,
          msgserviceInfo: WxParse.wxParse('msgserviceInfo', 'html', e.data.result.serviceInfo, that, 5),
          msgcompanyInfo: WxParse.wxParse('msgcompanyInfo', 'html', e.data.result.companyInfo, that, 5),
          msghonorInfo: WxParse.wxParse('msghonorInfo', 'html', e.data.result.honorInfo, that, 5),
          msgcustomInfo: WxParse.wxParse('msgcustomInfo', 'html', e.data.result.customInfo, that, 5)
        })
      },
      complete: function(comp) {
					that.setData({
						showLoading: true
					});
				},
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '数据加载失败',
          showCancel: false
        });
      }
    })
  },
  setCurrent: function(e){  //当前图片索引
    this.setData({
      currentIndex:e.detail.current+1
    })
  },
    //拨打电话
  reserveHandle: function (event) {
  	var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.speciallist.callphone, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
    imgPreview: function(e){ //图片预览
  	var that = this
  	const imgs = this.data.spaceimgs;
    wx.previewImage({
      current: imgs[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  imgPreviewS: function(e){ //图片预览
  	var that = this
  	const imgs = this.data.serviceList;
    wx.previewImage({
      current: imgs[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  imgPreviewC: function(e){ //图片预览
  	var that = this
  	const imgs = this.data.companyList;
    wx.previewImage({
      current: imgs[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  imgPreviewZ: function(e){ //图片预览
  	var that = this
  	const imgs = this.data.honorList;
    wx.previewImage({
      current: imgs[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  imgPreviewM: function(e){ //图片预览
  	var that = this
  	const imgs = this.data.customList;
    wx.previewImage({
      current: imgs[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onShareAppMessage: function () {
  	var that = this
    return {
      title: '职业病体检',
      desc: '服务内容、机构介绍、资质荣誉、客户评价',
      path:  '/pages/space/space'
    }
  }
})
