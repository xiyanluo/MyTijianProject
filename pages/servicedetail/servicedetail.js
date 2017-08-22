var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var servsers = getApp().globalData.baseUrl;
var imageUrl = getApp().globalData.imageUrl;
Page({
  data: {
  	showLoading: false,
    currentIndex: 1,
  	servsers: servsers,
    imageUrl: imageUrl,
    navbar: ['套餐详情', '体检须知'],
    currentTab: 0,
    pro: {},
    msgTwo: '',
    default_number: 1,
    toggle: false,//是否隐藏底部tar
    colorValue: '#e64340',
    btntype: 0,
    spaceimgs:[],
    phoneNumber: '0551-63829889'
  },
  onLoad: function (options) {
    var that = this
    wx.getStorage({
			key: 'iphonenew',
			success(res) {
				that.setData({
					phoneNumber: res.data,
				})
			}
		}),
  	wx.request({
      url: servsers+'/khtj/json/base/tabPersonalPackage/getDetails',
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
          pro: res.data.result,
          spaceimgs: list,
          msgTwo: WxParse.wxParse('msgTwo', 'html', res.data.result.cnts, that, 5)
        })
      },
      complete: function(comp) {
					that.setData({
						showLoading: true
					});
				},
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
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //拨打电话
  bindGoIndex: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  //点击加入购物车
  showCartBox: function () {
    this.setData({
      toggle: true,
      default_number: 1,
      btntype: 1
    })
  },
  //点击立即购买
  showBuyBox: function () {
    this.setData({
      toggle: true,
      default_number: 1,
      btntype: 2
    })
  },
  //添加数量
  addCount: function () {
    let num = this.data.default_number; //商品数
    let repertory = this.data.pro.repertory; // 库存
    num++;
    if (num > repertory) {
      num = readonly;
    }
    this.setData({
      default_number: num
    })
  },
  //减少数量
  reduceCount: function () {
    let num = this.data.default_number; //商品数
    num--;
    if (num <= 1) {
      num = 1;
    }
    this.setData({
      default_number: num
    })
  },
  //x-关闭窗口
  hideCartBox: function () {
    this.setData({
      toggle: false
    })
  },
  //悬浮按钮-前往购物车
  bindGoCart: function (event) {
    wx.navigateTo({
      url: '/pages/cart/cart'
    })
  },
  // 添加商品到缓存
  goods_add_cart: function () {
    let that = this;
    let total = that.data.default_number;
    let intro = that.data.pro;
    let btntype = that.data.btntype;//按钮类型 0:无 1:加入购物车-跳转购物车  2:立即购买-跳转我的订单
    let cache = {
      id: intro.id,
      title: intro.title,
      image: imageUrl + intro.logo,
      price: intro.price,
      num: total,
      selected: true
    };
    that.setData({
      toggle: false
    });
    if (btntype == 1) {//加入购物车
      let proIntro = wx.getStorageSync('proIntro');
      proIntro ? proIntro = proIntro : proIntro = [];
      proIntro.push(cache);
      wx.setStorage({
        key: "proIntro",
        data: proIntro
      });
      wx.navigateTo({
        url: '../cart/cart'
      })
    } else if (btntype == 2) {//加入订单
      let orderList=[];
      orderList.push(cache);
      wx.setStorage({
        key: "orderInfo",
        data: orderList
      });
      wx.redirectTo({
        url: '../orders/orders'
      });
    }
    
  }
})