var servsers = getApp().globalData.baseUrl;
Page({
  data: {
    servsers: servsers,
    array: ['请选择','男', '女'],
    index: 0,
    name: '',
    phone: '',
    age: '',
    gender: '',
    detail:'',//期待要求
    showLoading: true,
    checkVals:'',
    allGoodsdetail:'',
    gxydetail:'',
    xzbdetail:'',
    tlbdetail:'',
    qtdetail:'',
    ycdetail:'',
    ssdetail:'',
    allGoodsFilte: [
      { name: '心脏病', value: '0', checked: false },
      { name: '高血压', value: '1', checked: false },
      { name: '高血脂', value: '2', checked: false },
      { name: '糖尿病', value: '3', checked: false },
      { name: '胃炎', value: '4', checked: false },
      { name: '胰腺炎', value: '5', checked: false },
      { name: '肝炎', value: '6', checked: false },
      { name: '心脑血管病', value: '7', checked: false },
      { name: '严重外伤', value: '8', checked: false },
      { name: '血液病', value: '9', checked: false },
      { name: '免疫疾病', value: '10', checked: false },
      { name: '其他', value: '11', checked: false },
    ],
    gxyList: [
      { name: '未服药', value: '12', checked: false },
      { name: '服药', value: '13', checked: false },
      { name: '病情稳定', value: '14', checked: false },
      { name: '病情未控制', value: '15', checked: false }
    ],
    xzbList: [
      { name: '未服药', value: '16', checked: false },
      { name: '服药', value: '17', checked: false },
      { name: '病情稳定', value: '18', checked: false },
      { name: '病情未控制', value: '19', checked: false }
    ],
    tlbList: [
      { name: '未服药', value: '20', checked: false },
      { name: '服药', value: '21', checked: false },
      { name: '病情稳定', value: '22', checked: false },
      { name: '病情未控制', value: '23', checked: false }
    ],
    qtList: [
      { name: '未服药', value: '24', checked: false },
      { name: '服药', value: '25', checked: false },
      { name: '病情稳定', value: '26', checked: false },
      { name: '病情未控制', value: '27', checked: false }
    ],
    ycList: [
      { name: '无', value: '28', checked: false },
      { name: '心电图', value: '29', checked: false },
      { name: '彩超', value: '30', checked: false },
      { name: 'X线', value: '31', checked: false },
      { name: '血液检验', value: '32', checked: false },
      { name: '尿液检验', value: '33', checked: false },
      { name: '临床检查', value: '34', checked: false },
      { name: '其他', value: '35', checked: false }
    ],
    ssList: [
      { name: '无', value: '36', checked: false },
      { name: '心脏', value: '37', checked: false },
      { name: '颅脑', value: '38', checked: false },
      { name: '胆囊', value: '39', checked: false },
      { name: '肝脏', value: '40', checked: false },
      { name: '脊柱', value: '41', checked: false },
      { name: '四肢', value: '42', checked: false },
      { name: '妇产科', value: '43', checked: false },
      { name: '阑尾', value: '44', checked: false },
      { name: '胃肠', value: '45', checked: false },
      { name: '脾脏', value: '46', checked: false },
      { name: '其他', value: '47', checked: false }
    ],
    jzbsList: [
      { name: '无', value: '48', checked: false },
      { name: '心脏病', value: '49', checked: false },
      { name: '高血压', value: '50', checked: false },
      { name: '糖尿病', value: '51', checked: false },
      { name: '脑血管病', value: '52', checked: false },
      { name: '其他', value: '53', checked: false }
    ],
    workList: [
      { name: '无', value: '54', checked: false },
      { name: '心脏', value: '55', checked: false },
      { name: '胸部', value: '56', checked: false },
      { name: '腹部', value: '57', checked: false },
      { name: '胃口', value: '58', checked: false },
      { name: '乏力', value: '59', checked: false },
      { name: '其他', value: '60', checked: false }
    ],
    likeList: [
      { name: '无', value: '61', checked: false },
      { name: '嗜烟', value: '62', checked: false },
      { name: '嗜酒', value: '63', checked: false },
      { name: '睡懒觉', value: '64', checked: false },
      { name: '嗜甜食', value: '65', checked: false },
      { name: '嗜油荤', value: '66', checked: false },
      { name: '嗜咸食', value: '67', checked: false },
      { name: '熬夜', value: '68', checked: false },
      { name: '其他', value: '69', checked: false }
    ], 
    tdist: [
      { name: '内向', value: '70', checked: false },
      { name: '外向', value: '71', checked: false },
      { name: '合群', value: '72', checked: false },
      { name: '独处', value: '73', checked: false },
      { name: '谨慎', value: '74', checked: false },
      { name: '紧张', value: '75', checked: false },
      { name: '压抑', value: '76', checked: false },
      { name: '其他', value: '77', checked: false }
    ]
  },
  checkbox:function(){
    let self = this;
    var vals = "";
    for (let i = 0; i < self.data.allGoodsFilte.length; i++) {
      if (self.data.allGoodsFilte[i].checked == true) {
        vals += self.data.allGoodsFilte[i].value + ',';
      }     
    }
    for (let i = 0; i < self.data.gxyList.length; i++) {
      if (self.data.gxyList[i].checked == true) {
        vals += self.data.gxyList[i].value + ',';
      }
    }
    for (let i = 0; i < self.data.xzbList.length; i++) {
      if (self.data.xzbList[i].checked == true) {
        vals += self.data.xzbList[i].value + ',';
      }
    }
    for (let i = 0; i < self.data.tlbList.length; i++) {
      if (self.data.tlbList[i].checked == true) {
        vals += self.data.tlbList[i].value + ',';
      }
    }
    for (let i = 0; i < self.data.qtList.length; i++) {
      if (self.data.qtList[i].checked == true) {
        vals += self.data.qtList[i].value + ',';
      }
    }
    for (let i = 0; i < self.data.ycList.length; i++) {
      if (self.data.ycList[i].checked == true) {
        vals += self.data.ycList[i].value + ',';
      }
    }
    for (let i = 0; i < self.data.ssList.length; i++) {
      if (self.data.ssList[i].checked == true) {
        vals += self.data.ssList[i].value + ',';
      }
    }
    for (let i = 0; i < self.data.jzbsList.length; i++) {
      if (self.data.jzbsList[i].checked == true) {
        vals += self.data.jzbsList[i].value + ',';
      }
    }
    for (let i = 0; i < self.data.workList.length; i++) {
      if (self.data.workList[i].checked == true) {
        vals += self.data.workList[i].value + ',';
      }
    }
    for (let i = 0; i < self.data.likeList.length; i++) {
      if (self.data.likeList[i].checked == true) {
        vals += self.data.likeList[i].value + ',';
      }
    }
    for (let i = 0; i < self.data.tdist.length; i++) {
      if (self.data.tdist[i].checked == true) {
        vals += self.data.tdist[i].value + ',';
      }
    }
    let gender='';
    if (self.data.index==1){
      gender='男';
    } else if (self.data.index == 2){
      gender = '女';
    }
    self.setData({
      checkVals: vals,
      gender: gender
    });  
  },
  questionSubmit: function () {
    let self = this;
    let name = self.data.name;
    let phone = self.data.phone;
    let age = self.data.age;
    if (name == null || name == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return;
    }
    if (phone == null || phone == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return;
    }
    var that = this; 
    that.setData({
      showLoading: false
    });
    self.checkbox();  
    wx.request({
      url: servsers + '/khtj/json/base/tabConsultation/save',
      data: {
        name: name,
        phone: phone,
        age: that.data.age,
        gender: that.data.gender,
        checkVals: that.data.checkVals,
        detail: self.data.detail,
        allGoodsdetail: self.data.allGoodsdetail,
        gxydetail: self.data.gxydetail,
        xzbdetail: self.data.xzbdetail,
        tlbdetail: self.data.tlbdetail,
        qtdetail: self.data.qtdetail,
        ycdetail: self.data.ycdetail,
        ssdetail: self.data.ssdetail
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        that.setData({
          showLoading: true
        });
        if (e.data.status == 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1200
          }),
            that.setData({
                index: 0,
                name: '',
                phone: '',
                age: '',
                gender: '',
                detail: '',
                checkVals: '',
                allGoodsdetail: '',
                gxydetail: '',
                xzbdetail: '',
                tlbdetail: '',
                qtdetail: '',
                ycdetail: '',
                ssdetail: ''
            });
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'success',
            duration: 1200
          })
        }
      },
      fail: function (e) {
        that.setData({
          showLoading: true
        });
        wx.showToast({
          title: '提交失败',
          icon: 'fail',
          duration: 1200
        })
      }
    })
  },
  bindDetail(e) {
    this.setData({
      detail: e.detail.value
    })
  },

  bindName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindAge(e) {
    this.setData({
      age: e.detail.value
    })
  },

  bindallGoods(e) {
    this.setData({
      allGoodsdetail: e.detail.value
    })
  },
  bindgxy(e) {
    this.setData({
      gxydetail: e.detail.value
    })
  },
  bindxzb(e) {
    this.setData({
      xzbdetail: e.detail.value
    })
  },
  bindtlb(e) {
    this.setData({
      tlbdetail: e.detail.value
    })
  },
  bindqt(e) {
    this.setData({
      qtdetail: e.detail.value
    })
  },
  bindyc(e) {
    this.setData({
      ycdetail: e.detail.value
    })
  },
  bindss(e) {
    this.setData({
      ssdetail: e.detail.value
    })
  },
  serviceValChange: function (e) {
    let allGoodsFilte = this.data.allGoodsFilte;
    let checkArr = e.detail.value;
    for (var i = 0; i < allGoodsFilte.length; i++) {
      let val = allGoodsFilte[i].value;
      if (checkArr.indexOf(val) != -1) {
        allGoodsFilte[i].checked = true;
      } else {
        allGoodsFilte[i].checked = false;
      }
    }
    this.setData({
      allGoodsFilte: allGoodsFilte
    })
  },  
  gxyListChange: function (e) {
    let gxyList = this.data.gxyList;
    let checkArr = e.detail.value;
    for (var i = 0; i < gxyList.length; i++) {
      let val = gxyList[i].value;
      if (checkArr.indexOf(val) != -1) {
        gxyList[i].checked = true;
      } else {
        gxyList[i].checked = false;
      }
    }
    this.setData({
      gxyList: gxyList
    })
  },

  xzbListChange: function (e) {
    let xzbList = this.data.xzbList;
    let checkArr = e.detail.value;
    for (var i = 0; i < xzbList.length; i++) {
      let val = xzbList[i].value;
      if (checkArr.indexOf(val) != -1) {
        xzbList[i].checked = true;
      } else {
        xzbList[i].checked = false;
      }
    }
    this.setData({
      xzbList: xzbList
    })
  },

  tlbListChange: function (e) {
    let tlbList = this.data.tlbList;
    let checkArr = e.detail.value;
    for (var i = 0; i < tlbList.length; i++) {
      let val = tlbList[i].value;
      if (checkArr.indexOf(val) != -1) {
        tlbList[i].checked = true;
      } else {
        tlbList[i].checked = false;
      }
    }
    this.setData({
      tlbList: tlbList
    })
  },

  qtListChange: function (e) {
    let qtList = this.data.qtList;
    let checkArr = e.detail.value;
    for (var i = 0; i < qtList.length; i++) {
      let val = qtList[i].value;
      if (checkArr.indexOf(val) != -1) {
        qtList[i].checked = true;
      } else {
        qtList[i].checked = false;
      }
    }
    this.setData({
      qtList: qtList
    })
  },

  ycListChange: function (e) {
    let ycList = this.data.ycList;
    let checkArr = e.detail.value;
    for (var i = 0; i < ycList.length; i++) {
      let val = ycList[i].value;
      if (checkArr.indexOf(val) != -1) {
        ycList[i].checked = true;
      } else {
        ycList[i].checked = false;
      }
    }
    this.setData({
      ycList: ycList
    })
  }
  ,

  ssListChange: function (e) {
    let ssList = this.data.ssList;
    let checkArr = e.detail.value;
    for (var i = 0; i < ssList.length; i++) {
      let val = ssList[i].value;
      if (checkArr.indexOf(val) != -1) {
        ssList[i].checked = true;
      } else {
        ssList[i].checked = false;
      }
    }
    this.setData({
      ssList: ssList
    })
  },

  jzbsListChange: function (e) {
    let jzbsList = this.data.jzbsList;
    let checkArr = e.detail.value;
    for (var i = 0; i < jzbsList.length; i++) {
      let val = jzbsList[i].value;
      if (checkArr.indexOf(val) != -1) {
        jzbsList[i].checked = true;
      } else {
        jzbsList[i].checked = false;
      }
    }
    this.setData({
      jzbsList: jzbsList
    })
  }
  ,

 workListChange: function (e) {
   let workList = this.data.workList;
    let checkArr = e.detail.value;
    for (var i = 0; i < workList.length; i++) {
      let val = workList[i].value;
      if (checkArr.indexOf(val) != -1) {
        workList[i].checked = true;
      } else {
        workList[i].checked = false;
      }
    }
    this.setData({
      workList: workList
    })
  }
  ,

  likeListChange: function (e) {
    let likeList = this.data.likeList;
   let checkArr = e.detail.value;
   for (var i = 0; i < likeList.length; i++) {
     let val = likeList[i].value;
     if (checkArr.indexOf(val) != -1) {
       likeList[i].checked = true;
     } else {
       likeList[i].checked = false;
     }
   }
   this.setData({
     likeList: likeList
   })
 },

 tdistChange: function (e) {
   let tdist = this.data.tdist;
   let checkArr = e.detail.value;
   for (var i = 0; i < tdist.length; i++) {
     let val = tdist[i].value;
     if (checkArr.indexOf(val) != -1) {
       tdist[i].checked = true;
     } else {
       tdist[i].checked = false;
     }
   }
   this.setData({
     tdist: tdist
   })
 },
 bindPickerChange: function (e) {
   this.setData({
     index: e.detail.value
   })
 }


})
