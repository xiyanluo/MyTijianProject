// page/component/orders/orders.js
//获取应用实例
var app = getApp();
var servsers = getApp().globalData.baseUrl;
Page({
	data: {
		address: {},
		hasAddress: false,
		servsers: servsers,
		total: 0,
		idslast: '',
		priceslast: '',
		numberslast: '',
		totalPrice: 0, // 总价，初始为0
		carts: [], // 购物车列表
		cartsorder: [], // 购物车列表
		hasList: false, // 列表是否有数据

	},

	onReady() {
		this.getTotalPrice();
	},

	onShow: function() {
		const self = this;
		var listSelect = [];
		let that = this;
		let value = wx.getStorageSync('orderInfo');
		let f = false;
		if(value) {
			wx.getStorage({
				key: 'orderInfo',
				success: function(res) {
					if(res.data && res.data.length > 0) {
						for(let i = 0; i < res.data.length; i++) { // 循环列表得到每个数据
							if(res.data[i].selected) { // 判断选中才会计算价格
								listSelect.push(res.data[i])
							}
						}
						that.setData({
							hasList: true,
							carts: res.data,
							cartsorder: listSelect
						});
					} else {
						that.setData({
							hasList: false
						});
					}
					that.getTotalPrice();
				}
			})
		}
		wx.getStorage({
			key: 'address',
			success(res) {
				self.setData({
					address: res.data,
					hasAddress: true
				})
			}
		})
	},

	/**
	 * 计算总价
	 */
	getTotalPrice() {
		let carts = this.data.carts; // 获取购物车列表
		let total = 0;
		for(let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
			if(carts[i].selected) { // 判断选中才会计算价格
				total += carts[i].num * carts[i].price; // 所有价格加起来
			}
		}
		this.setData({ // 最后赋值到data中渲染到页面
			carts: carts,
			totalPrice: total.toFixed(2)
		});
	},

	toPay() {
		let that = this;
		wx.showModal({
			title: '提示',
      content: '确认要支付吗？',
			success: function(res) {

				if(res.confirm) {

					that.getPay();
				}
			}
		})
	},

	getPay() {
		if(!this.data.hasAddress) {
			wx.showModal({
				title: '提示',
				content: '请添加收货人信息',
				showCancel: false
			});
			return;
		};
		wx.showToast({
			title: '付款中...',
			icon: 'loading'
		});
		var that = this;
		let cartsorder = this.data.cartsorder; // 获取购物车列表
		let total = 0;
		var idsnew = "";
		var pricesnew = "";
		var numbernew = "";
		for(let i = 0; i < cartsorder.length; i++) { // 循环列表得到每个数据
			idsnew += cartsorder[i].id + ',';
			pricesnew += cartsorder[i].price + ',';
			numbernew += cartsorder[i].num + ',';
		}
		this.setData({ // 最后赋值到data中渲染到页面
			idslast: idsnew,
			priceslast: pricesnew,
			numberslast: numbernew
		});
		wx.login({
			success: function(res) {
				that.getOpenId(res.code);
			}
		});
	},

	//获取openid
	getOpenId: function(code) {
		var that = this;
		wx.request({
			url: servsers + '/khtj/json/base/weixinpay/pay',
			data: {
				ids: this.data.idslast,
				prices: this.data.priceslast,
				numbers: this.data.numberslast,
				code: code,
				price: this.data.totalPrice,
				name: this.data.address.name,
				phone: this.data.address.phone,
				addr: this.data.address.detail,
				body: '个人体检套餐交费'
			},
			success: function(res) {
        wx.hideToast();
				if(res.data.status != 200) {
					wx.showModal({
						title: '提示',
						content: res.data.message,
						showCancel: false
					});
				};
				var openId = res.data.openid;
				wx.requestPayment({
					'timeStamp': res.data.timeStamp.toString(),
					'nonceStr': res.data.nonceStr,
					'package': res.data.package,
					'signType': res.data.signType,
					'paySign': res.data.paySign,
					'success': function(succ) {
            wx.redirectTo({
              url: '../orderList/orderList'
            });
					},
					'fail': function(err) {
						wx.showModal({
							title: '提示',
							content: '支付失败,请重新付款',
							showCancel: false
						});
					},
					'complete': function(comp) {
						wx.removeStorageSync('proIntro');
						wx.removeStorageSync('orderInfo');
						wx.hideToast();
					}
				})
			},
			fail: function(res) {
				wx.hideToast();
				wx.showModal({
					title: '提示',
					content: '下单失败',
					showCancel: false
				});
			}
		})
	}

})