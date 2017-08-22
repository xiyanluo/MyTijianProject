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
    msgTwo: '',
    imageUrl: imageUrl,
    spaceimgs:[],
    currentIndex:1
  },
  onLoad: function () {
  	var that = this
  	//调取特殊服务
    wx.request({
      url: servsers +'/khtj/json/base/tabGroupcheck/getVipDetails',
      success: function (e) {
      	var list = [];
        var datas = e.data.result.serviceList;
        if(e.data.result.serviceList.length == 0) {
          list.push(imageUrl + e.data.result.logo);
        } else {
          for (var i = 0; i < e.data.result.serviceList.length; i++) {
            list.push(imageUrl + e.data.result.serviceList[i].fileUrl);
          }
        }
        that.setData({
          speciallist:e.data.result,
          spaceimgs: list,
          msgTwo: WxParse.wxParse('msgTwo', 'html', e.data.result.serviceInfo, that, 5)
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
  	
  	
//  this.setData({
//    spacedata:{
//      "ParkCode": "ZCKJ20160831200444",
//      "ParkName": "福利体检",
//      "phone": "0551-6125398",
//      "companyName": "合肥康虹（职业）健康体检中心",
//      "Address": "合肥康虹（职业）健康体检中心安徽省合肥市高新区创新大道2760号创新公寓商配A座3层C1（创新大道与云飞路东南角)",
//      "TagIDs": ["专业机构","权威机构"],
//      "latitude": 31.0921575226,
//      "longitude": 121.3146194992,
//      "TotalBulidingArea": 1017,
//      "TotalWorkstation": 214,
//      "TotalRoom": 8,
//      "RoomRate": 65,
//      "Summary": "阿里云创客+位于莘砖公路 518 号双子楼 1 楼，漕河泾开发区松江新兴产业园内，项目于 2015 年 12 月签约，2016 年 1 月完成设计方案，目前正进行装修施工，预计 5 月底前完工，6 月底前投入使用。交付标准为全装修，包括全部家具，无线网络、门禁、监控等系统 。",
//      "Policy": "<p>A、入住企业工位费减免政策（每项减免 1~3 个月工位费，可累加计算）</p><p>1）在校学生（或毕业 1 年内应届毕业生）发起创立的小微企业。 &nbsp; &nbsp;</p><p>2）创业项目在最近一年内获得过国内知名创新创业竞赛名次。 &nbsp; &nbsp;&nbsp;</p><p>3）创立后至少完成一次股权融资。 &nbsp;</p><p>4）创立者有外资成份，且外资占比不少于 30%的创业项目。 &nbsp; &nbsp;&nbsp;</p><p>5）互联网及新兴行业的创新产品和商业模式，向我司提交申请及商业计划书，</p><p>经我方审核通过，且向我方开放股权投资的企业。&nbsp;</p><p>6） 合作机构推荐的企业也享有相应的优惠政策。 &nbsp;</p><p><br></p><p>B、阿里云扶持政策&nbsp;</p><p>1） 免费阿里云使用、上云支持、支付产品、移动产品、安全产品等等；&nbsp;</p><p>2） 不定期培训和沙龙、创业大赛、阿里集团优质资源对接；&nbsp;</p><p>3） 风投对接、淘宝众筹平台、投融资对接。 &nbsp;</p><p><br></p><p>C、科技政策咨询服务&nbsp;</p><p>我们的团队可帮助入驻企业提供国家级、市级、区级各部门的科技政策项目</p><p>咨询，争取一些政府各类优惠政策的支持。&nbsp;</p><p>1） 无偿资助类（创新基金、科技小巨人、区级研发机构）；&nbsp;</p><p>2） 税务减免类（高新技术企业认定、高新技术成果转化认定、双软认定、技术</p><p>合同认定）；&nbsp;</p><p>3） 人才补助类（浦江人才计划、启明星计划、千人计划）。</p>"
//    },
//  })  
  },
  setCurrent: function(e){  //当前图片索引
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
  },
    setCurrent: function (e) {  //当前图片索引
    this.setData({
      currentIndex: e.detail.current + 1
    })
  },
  imgPreview: function () { //图片预览
    const imgs = this.data.spaceimgs;
    wx.previewImage({
      current: imgs[this.data.currentIndex - 1], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  getAddress:function(e){
    const d = e.currentTarget.dataset;
    const address = d.address;
    const latitude = d.latitude;
    const longitude = d.longitude;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      // name: address,
      address: address,
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      },
      success:function(res){
        console.log(res);
      }
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
  onShareAppMessage: function () {
    var that = this
    return {
      title: '特别服务',
      desc: '加入我们介绍',
      path: '/pages/special/special'
    }
  },
  goApply: function(){
    wx.navigateTo({
      url: '../apply/apply'
    })
  }
  // formateNumber:function(n){
  //   return n>9?n:'0'+n
  // }
})
