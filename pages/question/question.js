//获取应用实例
var app = getApp()

var util = require('../../utils/util')
var servsers = getApp().globalData.baseUrl;
var imageUrl = getApp().globalData.imageUrl;
Page({
	data: {
		phone: '0551-6125398',
		servsers: servsers,
		hidden: true,
		showLoading: true,
		question: {
			name: '',
			phone: '',
			detail: ''
		}
	},
	onLoad: function() {},

	questionSubmit: function() {
		var self = this;
		var name = self.data.question.name;
		var phone = self.data.question.phone;
		var detail = self.data.question.detail;
		if(name == null || name == "") {
			wx.showModal({
				title: '提示',
				content: '请填写联系人姓名',
				showCancel: false
			})
			return;
		}
		if(phone == null || phone == "") {
			wx.showModal({
				title: '提示',
				content: '请填写手机号码',
				showCancel: false
			})
			return;
		}
       var that = this;
       that.data.showLoading = false;
		wx.request({
			url: servsers + '/khtj/json/base/tabConsultation/add',
			data: {
				name: self.data.question.name,
				phone: self.data.question.phone,
				cnts: self.data.question.detail
			},
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(e) {
				if(e.data.status == 200) {
					wx.showToast({
							title: '提交成功',
							icon: 'success',
							duration: 1200
						}),
						that.setData({
							question: {
								name: '',
								phone: '',
								detail: ''
							}
						});
				} else {
					wx.showToast({
						title: '提交失败',
						icon: 'success',
						duration: 1200
					})
				}

			},
			complete: function(comp) {
				that.setData({
					showLoading: true
				});
			},
			fail: function(e) {
				wx.showToast({
					title: '提交失败',
					icon: 'fail',
					duration: 1200
				})
			}

		})

	},
	callphone: function(e) { //拨打电话
		wx.makePhoneCall({
			phoneNumber: this.data.phone
		})
	},
	bindName(e) {
		this.setData({
			'question.name': e.detail.value
		})
	},
	bindPhone(e) {
		this.setData({
			'question.phone': e.detail.value
		})
	},
	bindDetail(e) {
		this.setData({
			'question.detail': e.detail.value
		})
	}

})