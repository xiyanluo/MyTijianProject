//获取应用实例
var app = getApp();
var servsers = getApp().globalData.baseUrl;
var imageUrl = getApp().globalData.imageUrl;
Page({
	data: {
		navbar: ['公司简介', '宣传片', '环境展示', '联系我们'],
		currentTab: 0,
		showLoading: false,
		currentIndex: 1,
		servsers: servsers,
		imageUrl: imageUrl,
		fileList: [],
		message: {},
		phone: '0551-63829889',
		titleA: '我们是谁?',
		titleB: 'who we are',
		markers: [{
			iconPath: "../../images/map.png",
			id: 0,
			latitude: 31.834260,
			longitude: 117.135150,
			width: 32,
			height: 32
		}]
	},
	onLoad: function() { //加载数据渲染页面
		var that = this
		var fileList2 = [];
		wx.request({
			url: servsers + '/khtj/json/base/tabAboutus/queryByAll',
			data: {},
			success: function(e) {
				for(let i = 0; i < e.data.result.fileList.length; i++) { // 循环列表得到每个数据
					fileList2.push(imageUrl + e.data.result.fileList[i].fileUrl)
				}
				that.setData({
					message: e.data.result,
					phone: e.data.result.callphone,
					fileList: fileList2
				})
			},
			fail: function(e) {
				wx.showToast({
					title: '查询失败',
					icon: 'fail',
					duration: 1200
				})
			},
			complete: function(comp) {
				that.setData({
					showLoading: true
				});
			},
		})

	},
	navbarTap: function(e) {
		this.setData({
			currentTab: e.currentTarget.dataset.idx
		})
	},
	calling: function() {
		var that = this
		wx.makePhoneCall({
			phoneNumber: that.data.phone, //此号码并非真实电话号码，仅用于测试
			success: function() {},
			fail: function() {}
		})
	},

	//三点-分享
	onShareAppMessage: function() {
		return {
			title: '关于我们',
			path: 'pages/index/index'
		}
	}
})