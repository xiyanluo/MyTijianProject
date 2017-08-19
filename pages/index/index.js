//获取应用实例
var app = getApp();
var servsers = getApp().globalData.baseUrl;
var imageUrl = getApp().globalData.imageUrl;
Page({
  data: {
    indexmenu:[],
    imgUrls: [],
    servsers: servsers,
    imageUrl: imageUrl,
    loading: false,
    actTxt:'热门活动',
    phone:'0551-63829889'
  },
  onLoad:function(){
    //生命周期函数--监听页面加载
    this.fetchData();
    var that = this
    //调取首页banner
    wx.request({  
      url: servsers+'/khtj/json/base/tabBanner/queryList',
      data: {},
      success: function (e) {
        that.setData({
          imgUrls: e.data.result
        })
      },
      fail: function (e) {
      }
    })
    //调取首页活动列表
    wx.request({
      url: servsers+'/khtj/json/base/tabInformation/queryHomeList',
      data: {
        page: 1,
        rows: 10,
      },
      success: function (e) {
        var datas = e.data.result;
        for(var i = 0;i < datas.length; i++) {
           datas[i].title = datas[i].title.substring(0,14);
           datas[i].depict = datas[i].depict.substring(0,16);
        }
        that.setData({
          newsList: e.data.result
        })
      },
      fail: function (e) {
      }
    })
  },
  fetchData:function(){
    this.setData({
      indexmenu:[
        {
          'icon':'../../images/8.png',
          'text':'个人体检',
          'url':'../service/service',
          'type': 'navigate'
        },
        {
          'icon':'../../images/6.png',
          'text':'团体体检',
          'url':'../property/property',
          'type': 'navigate'
        },
        {
          'icon': '../../images/icon_13.png',
          'text': '个人定制',
          'url': '../question/question',
          'type': 'navigate'
        },
        {
          'icon':'../../images/4.png',
          'text':'活动资讯',
          'url':'../activity/activity',
          'type': 'navigate'
        },
        {
          'icon':'../../images/3.png',
          'text':'联系我们',
          'url':'../abouts/abouts',
          'type':'switchTab',
          'moth':'callMe'
        },
        {
          'icon': '../../images/icon_09.png',
          'text': '健康咨询',
          'url': '../question/question',
          'type':'navigate'
        },
        {
          'icon': '../../images/9.png',
          'text': '特别服务',
          'url': '../special/special',
          'type': 'navigate'
        },
        {
          'icon': '../../images/11.png',
          'text': '个人中心',
          'url': '../my/my',
          'type': 'switchTab'
        }
      ]
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showToast({
    title: '没事儿别乱拉',//提示信息
    icon: 'success',//成功显示图标
    duration: 2000//时间
  })
    wx.stopPullDownRefresh;
  },
  
  // 首页中间图片跳转
  goTo: function (e) {
    wx.navigateTo({
      url: '../activity/activity'
    })
  },
  //热门活动
  goToPict: function (e) {
    wx.navigateTo({
      url: '../space/space'
    })
  },
  callMe: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone, //此号码并非真实电话号码，仅用于测试
      success: function () { },
      fail: function () { }
    })
  },
  onReady:function(){
    //生命周期函数--监听页面初次渲染完成
    // console.log('onReady');
  },
  onShow :function(){
    //生命周期函数--监听页面显示
    // console.log('onShow');
  },
  onHide :function(){
    //生命周期函数--监听页面隐藏
    // console.log('onHide');
  },
  onUnload :function(){
    //生命周期函数--监听页面卸载
    // console.log('onUnload');
  },
  onPullDownRefresh:function(){
    //页面相关事件处理函数--监听用户下拉动作
    // console.log('onPullDownRefresh');
  },
  onReachBottom:function(){
    //页面上拉触底事件的处理函数
    // console.log('onReachBottom');
  },
  //下拉刷新
  onPullDownRefresh:function(){ //下拉刷新
    this.onLoad();
    wx.stopPullDownRefresh();
  },
   //三点-分享
  onShareAppMessage: function () {
    return {
      title: '我要体检',
      desc: '体检就上康虹职业病体检中心,国内专业健康体检机构,在线购买体检套餐,在线预约咨询等',
      path: 'pages/index/index'
    }
  }
})
