//获取应用实例
var app = getApp()

var util = require('../../utils/util')
var servsers = getApp().globalData.baseUrl;
var imageUrl = getApp().globalData.imageUrl;
Page({
	data: {
		wHeight: '',
		openId: '',
		ye: 1,
		currentTab: 0,
		servsers: servsers,
		orderList: [],
		page: 0, //分页
	},
	onLoad: function() {
		var that = this;
		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					wHeight: res.windowHeight
				})
			}
		})

		wx.login({
			success: function(res) {
				if(res.code) {
					//获取openId
					wx.request({
						url: servsers + '/khtj/json/base/weixinpay/getOpenId',
						data: {　　　　　　　 //小程序唯一标识
							code: res.code
						},
						success: function(res) {
							console.info("登录成功返回的openId：" + res.data.result);

							// 判断openId是否获取成功
							if(res.data.result != null & res.data.result != undefined) {　　　　　　　　 // 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
								/**调用全部数据接口**/

								wx.request({
									url: servsers + '/khtj/json/base/tabPayinfo/queryAll',
									data: {
										page: that.data.ye,
										rows: 10,
										eqOpenid:res.data.result
									},
									success: function(e) {
										if(e.data.result.length == 0) {
											wx.showToast({
												title: '无更多数据',
												icon: 'success',
												duration: 1200
											})
										} else {
											var datas = e.data.result;
											that.setData({
												orderList: that.data.servicelist,
											});
										}

									},

									fail: function(e) {
										wx.showToast({
											title: '获取数据失败',
											icon: 'fail',
											duration: 1200
										})
									}

								})

							} else {
								wx.showToast({
									title: '获取用户openId失败',
									icon: 'fail',
									duration: 1200
								})

							}
						},
						fail: function(error) {
							console.info("获取用户openId失败");
							console.info(error);
						}
					})
				}
			}
		});

	},
	/*** 滑动切换tab */
	bindChange: function(e) {
		var that = this;
		that.setData({
			currentTab: e.detail.current
		});
	},
	/*** 点击tab切换 */
	swichNav: function(e) {
		var that = this;
		if(that.data.currentTab != e.target.dataset.current) {
			that.setData({
				currentTab: e.target.dataset.current
			})

		} else {
			return false;
		}
	}
})