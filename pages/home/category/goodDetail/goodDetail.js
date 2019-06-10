// pages/home/category/goodDetail/goodDetail.js
const util = require('../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: '',
    choiceShow: false,
    remainNum: '',//不同规格剩余的数量
    specification: '',//选中的规格
    goodsOnePrice:'',//单个价格
    goodsTotal: '',//根据选中的规格，数量计算出来的价格
    goodsCount:1,//商品数量
    specificationId:''//规格id
  },
  onLoad(options) {
    const __t = this;

    util.request({ url: 'goods/detail', data: { id: options.id || 100 } }).then(res => {
      __t.setData({ 
        goodsDetail: res, 
        specificationId:res.productList[0].id,
        specification:res.productList[0].specifications[0],
        remainNum: res.productList[0].number,
        goodsOnePrice: res.productList[0].price
      })

    })

  },

  onChoice(event) {

    this.setData({ choiceShow: true })
  },
  onClose() {
    this.setData({ choiceShow: false });
  },
  choiceSpecification(event) {
    const id = event.currentTarget.dataset.id;
    const __t=this;
    this.data.goodsDetail.productList.filter((element, index, array) => {
      if (element.id === id) {
        __t.setData({
          specification:element.specifications[0],
          goodsOnePrice:element.price,
          specificationId:id
        })
      }
    })
  },
  onChangeNum(event){
    
    this.setData({
      goodsCount:event.detail
    })
  }

})