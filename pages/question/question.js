
Page({
  data: {
    phone:'13866145149'
  },
  onLoad: function () {
  },

  questionSubmit:function(){
  },
  callphone: function(e){  //拨打电话
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  }
})
