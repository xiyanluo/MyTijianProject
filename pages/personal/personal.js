Page({
  data: {
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
    ]
  },
  serviceValChange: function (e) {
    var allGoodsFilte = this.data.allGoodsFilte;
    var checkArr = e.detail.value;
    for (var i = 0; i < allGoodsFilte.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        allGoodsFilte[i].checked = true;
      } else {
        allGoodsFilte[i].checked = false;
      }
    }
    this.setData({
      allGoodsFilte: allGoodsFilte
    })
  }  
})
