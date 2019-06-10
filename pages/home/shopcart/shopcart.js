// pages/home/shopcart/shopcart.js

const Common = require('../../../utils/util.js')

Component({
  data: {
    goods: [
      {
        num: '2',
        title: '红富士/斤',
        price: '10.00',
        desc: '描述信息描述信息描述信息',
        imageURL: '../../../resource/images/a.jpg',
      },
      {
        num: '3',
        title: '橙子/斤',
        price: '10.00',
        desc: '描述信息描述信息描述信息',
        imageURL: '../../../resource/images/b.jpg',
      },
      {
        num: '2',
        title: '水仙芒果/斤',
        price: '45.53',
        desc: '描述信息描述信息描述信息',
        imageURL: '../../../resource/images/c.jpg',
      }
    ],
    totalPrice: 0
  },
  attached() {

    wx.setNavigationBarTitle({
      title: "购物车"
    })

    const goods = this.data.goods;
    for (let i = 0, len = goods.length; i < len; i++) {
      this.data.totalPrice += goods[i].num * goods[i].price;
    }
    this.setData({ totalPrice: this.data.totalPrice * 100 })
  },

  methods: {
    onSubmit() {
      wx.navigateTo({ url: '../widget/shopcart/paygoods/paygoods' })
    }
  }

})