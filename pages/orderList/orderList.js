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
		orderDetailList: [],
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
							that.setData({
								openId: res.data.result,
							});
							// 判断openId是否获取成功
							if(res.data.result != null & res.data.result != undefined) {　　　　　　　　 // 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
								/**调用全部数据接口**/

								wx.request({
									url: servsers + '/khtj/json/base/tabPayinfo/queryAll',
									data: {
										page: that.data.ye,
										rows: 10,
										eqOpenid: res.data.result
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
												orderList: e.data.result,
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

	/**
	 * 查询全部订单
	 */
	getAllOrder() {
		var that = this;
		let openId = this.data.openId; // 获取openId
		if(openId != null & openId != undefined) {　　　　　　　　

			wx.request({
				url: servsers + '/khtj/json/base/tabPayinfo/queryAll',
				data: {
					page: that.data.ye,
					rows: 10,
					eqOpenid: openId
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
							orderList: e.data.result,
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

	/**
	 * 查询待付款订单
	 */
	getWaitOrder() {
		var that = this;
		let openId = this.data.openId; // 获取openId
		if(openId != null & openId != undefined) {　　　　　　　　

			wx.request({
				url: servsers + '/khtj/json/base/tabPayinfo/queryDf',
				data: {
					page: that.data.ye,
					rows: 10,
					eqOpenid: openId
				},
				success: function(e) {
					if(e.data.result.length == 0) {
						that.setData({
							orderList: [],
						});
						wx.showToast({
							title: '无更多数据',
							icon: 'success',
							duration: 1200
						})
					} else {
						var datas = e.data.result;
						that.setData({
							orderList: e.data.result,
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

	/**
	 * 查询已完成订单
	 */
	getFinishOrder() {

		var that = this;
		let openId = this.data.openId; // 获取openId
		if(openId != null & openId != undefined) {　　　　　　　　

			wx.request({
				url: servsers + '/khtj/json/base/tabPayinfo/queryYwc',
				data: {
					page: that.data.ye,
					rows: 10,
					eqOpenid: openId
				},
				success: function(e) {
					if(e.data.result.length == 0) {
						that.setData({
							orderList: [],
						});
						wx.showToast({
							title: '无更多数据',
							icon: 'success',
							duration: 1200
						})
					} else {
						var datas = e.data.result;
						that.setData({
							orderList: e.data.result,
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

	/**
	 * 查询已付款订单
	 */
	getAlreadyOrder() {
		var that = this;
		let openId = this.data.openId; // 获取openId
		if(openId != null & openId != undefined) {　　　　　　　　

			wx.request({
				url: servsers + '/khtj/json/base/tabPayinfo/queryYf',
				data: {
					page: that.data.ye,
					rows: 10,
					eqOpenid: openId
				},
				success: function(e) {
					if(e.data.result.length == 0) {
						that.setData({
							orderList: [],
						});
						wx.showToast({
							title: '无更多数据',
							icon: 'success',
							duration: 1200
						})
					} else {
						var datas = e.data.result;
						that.setData({
							orderList: e.data.result,
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

	/*** 滑动切换tab */
	bindChange: function(e) {
		var that = this;
		if(e.detail.current == 0) {
			this.getAllOrder();
		} else if(e.detail.current == 1) {
			this.getAlreadyOrder();
		} else if(e.detail.current == 2) {
			this.getFinishOrder();
		} 
		that.setData({
			currentTab: e.detail.current
		});

	},

	toTuiKuan(e) {
		
		wx.request({
				url: servsers + '/khtj/json/base/tabPayinfo/escOrder',
				data: {
					eqId: e.currentTarget.id
				},
				success: function(e) {
					if(e.data.status == 200) {
						wx.showToast({
						title: '退款成功,等待审核',
						icon: 'success',
						duration: 1200
					})
					} else {
						wx.showToast({
						title: '退款失败',
						icon: 'success',
						duration: 1200
					})
					}

				},

				fail: function(e) {
					wx.showToast({
						title: '退款失败',
						icon: 'fail',
						duration: 1200
					})
				}

			})
	},
	toConfim(e) {
		
		wx.request({
				url: servsers + '/khtj/json/base/tabPayinfo/finshOrder',
				data: {
					eqId: e.currentTarget.id
				},
				success: function(e) {
					if(e.data.status == 200) {
						wx.showToast({
						title: '确认成功',
						icon: 'success',
						duration: 1200
					})
					} else {
						wx.showToast({
						title: '确认失败',
						icon: 'success',
						duration: 1200
					})
					}
					
				},

				fail: function(e) {
					wx.showToast({
						title: '确认失败',
						icon: 'fail',
						duration: 1200
					})
				}

			})
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