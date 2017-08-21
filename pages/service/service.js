//获取应用实例
var app = getApp()

var util = require('../../utils/util')
var servsers = getApp().globalData.baseUrl;
var imageUrl = getApp().globalData.imageUrl;
Page({

	data: {
		imageUrl: imageUrl,
		showtab: 0, //顶部选项卡索引
		showLoading: false,
		showtabtype: 'A', //选中类型

		tabnav: {}, //顶部选项卡数据
		ye: 1,
		servicelist: [], //套餐列表

		scrolltop: null, //滚动位置

		page: 0, //分页

		servsers: servsers,
		imageUrl: imageUrl,
		loading: false,

		tabnav: {

			tabnum: 2,

			tabitem: [

				{

					"id": 0,

					"type": "A",

					"text": "男性"

				},

				{

					"id": 1,

					"type": "B",

					"text": "女性"

				}

			]

		}

	},

	onLoad: function() { //加载数据渲染页面

		this.fetchServiceData();

	},

	fetchServiceData: function() {
		var that = this
		const newlist = [];

		if(this.data.showtabtype == 'A') { //男性加载入口

			wx.request({

				url: servsers + '/khtj/json/base/tabPersonalPackage/queryList',

				data: {

					page: 1,

					rows: 10,

					ifGender: 1

				},

				success: function(e) {
					var datas = e.data.result;
					for(var i = 0; i < datas.length; i++) {
						datas[i].title = datas[i].title.substring(0, 18);
						datas[i].depict = datas[i].depict.substring(0, 20) + "...";
					}
					that.setData({
						servicelist: e.data.result
					});
				},
				complete: function(comp) {
					that.setData({
						showLoading: true
					});
				},
				fail: function(e) {}

			})

		} else if(this.data.showtabtype == 'B') { //女性加载入口

			wx.request({

				url: servsers + '/khtj/json/base/tabPersonalPackage/queryList',

				data: {

					page: 1,

					rows: 10,

					ifGender: 2

				},

				success: function(e) {
					var datas = e.data.result;
					for(var i = 0; i < datas.length; i++) {
						datas[i].title = datas[i].title.substring(0, 18);
						datas[i].depict = datas[i].depict.substring(0, 20) + "...";
					}

					that.setData({

						servicelist: e.data.result

					});
				},
				complete: function(comp) {
					that.setData({
						showLoading: true
					});
				},
				fail: function(e) {

				}

			})

		}

	},

	setTab: function(e) { //选项卡选中

		const edata = e.currentTarget.dataset;

		this.setData({

			showtab: edata.tabindex,

			showtabtype: edata.type,
			showLoading: false

		});
        this.fetchServiceData();

	},

	scrollHandle: function(e) { //滚动事件

		this.setData({

			scrolltop: e.detail.scrollTop

		})

	},

	goToTop: function() { //回到顶部

		this.setData({

			scrolltop: 0

		})

	},

	scrollLoading: function() { //滚动加载

		this.fetchServiceData();

	},

	onPullDownRefresh: function() { //下拉刷新
		this.onLoad();
		wx.stopPullDownRefresh();
	},
	//触底上拉加载新内容
	onReachBottom: function() {
		var that = this
		//每次进入 当前页++
		that.setData({
			page: ++that.data.ye,
			loading: true
		})
		if(this.data.showtabtype == 'A') {
			wx.request({

				url: servsers + '/khtj/json/base/tabPersonalPackage/queryList',

				data: {

					page: that.data.ye,

					rows: 10,

					ifGender: 1

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
						for(var i = 0; i < datas.length; i++) {
							datas[i].title = datas[i].title.substring(0, 18);
							datas[i].depict = datas[i].depict.substring(0, 20) + "...";
						}
						that.setData({
							servicelist: that.data.servicelist.concat(e.data.result),
						});
					}

				},
				complete: function(comp) {
					that.setData({
						showLoading: true
					});
				},
				fail: function(e) {

				}

			})
		} else {
			wx.request({

				url: servsers + '/khtj/json/base/tabPersonalPackage/queryList',

				data: {

					page: that.data.ye,

					rows: 10,

					ifGender: 2

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
						for(var i = 0; i < datas.length; i++) {
							datas[i].title = datas[i].title.substring(0, 10);
							datas[i].depict = datas[i].depict.substring(0, 16) + "...";
						}
						that.setData({
							servicelist: that.data.servicelist.concat(e.data.result),
						});
					}

				},
				complete: function(comp) {
					that.setData({
						showLoading: true
					});
				},
				fail: function(e) {

				}

			})
		}

	}

})